// Copyright 2023 The MediaPipe Authors.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//      http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// import { HandLandmarker, FilesetResolver } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";

import { ImageClassifier, FilesetResolver } from "./vision_bundle.js";
let imageClassifier = undefined;
let classificationResult = undefined;
let runningMode = "IMAGE";

// Before we can use HandLandmarker class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment to
// get everything needed to run.
const createImageClassifier = async () => {
    const vision = await FilesetResolver.forVisionTasks(
        "./wasm"
    );
    imageClassifier = await ImageClassifier.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: `./models/efficientnet_lite0.tflite`
            // NOTE: For this demo, we keep the default CPU delegate.
        },
        maxResults: 1,
        runningMode: runningMode
    });
    document.querySelector('#button_webcam').disabled = false;
    document.querySelector('#button_webcam').innerHTML = "Enable Webcam";
}
createImageClassifier();

let video = null;
export function setCameraStreamToMediaPipe(v) {
    video = v;
    video.addEventListener("loadeddata", predictWebcam);
    video = v;

}
window.setCameraStreamToMediaPipe = setCameraStreamToMediaPipe;


let lastVideoTime = -1;
let results = undefined;

async function predictWebcam() {

    // Do not classify if imageClassifier hasn't loaded
    if (imageClassifier === undefined) {
        return;
    }
    // if image mode is initialized, create a new classifier with video runningMode
    if (runningMode === "IMAGE") {
        runningMode = "VIDEO";
        await imageClassifier.setOptions({ runningMode: "VIDEO" });
    }
    let nowInMs = Date.now();
    if (video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;
        // Start classifying the stream.
        classificationResult = await imageClassifier.classifyForVideo(
            video,
            nowInMs
        );

        gotClassification(classificationResult);
    }
    const classifications = classificationResult.classifications;
    if (!video.paused) {
        window.requestAnimationFrame(predictWebcam);
    }

}