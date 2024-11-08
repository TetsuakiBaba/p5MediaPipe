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
// import vision from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";
// const { ImageSegmenter, SegmentationMask, FilesetResolver } = vision;

import vision from "./vision_bundle.js";
// import { ImageSegmenter, SegmentationMask, FilesetResolver } from "./vision_bundle.js";
const { ImageSegmenter, SegmentationMask, FilesetResolver } = vision;

let imageSegmenter;
let labels;

let runningMode = "VIDEO";

// Before we can use HandLandmarker class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment to
// get everything needed to run.
const createImageSegmenter = async () => {
    const vision = await FilesetResolver.forVisionTasks("./wasm");
    imageSegmenter = await ImageSegmenter.createFromOptions(vision, {
        baseOptions: {
            // modelAssetPath: `./models/deeplab_v3.tflite`,
            modelAssetPath: `./models/selfie_segmenter_landscape.tflite`,
            delegate: "CPU"
        },
        runningMode: runningMode,
        outputCategoryMask: true,
        outputConfidenceMasks: false

    });
    labels = imageSegmenter.getLabels();
    document.querySelector('#button_webcam').disabled = false;
    document.querySelector('#button_webcam').innerHTML = "Enable Webcam";
};
createImageSegmenter();

let video = null;

export function setCameraStreamToMediaPipe(v) {
    video = v;
    video.addEventListener("loadeddata", predictWebcam);
    video = v;

}
window.setCameraStreamToMediaPipe = setCameraStreamToMediaPipe;


let lastVideoTime = -1;
let results = undefined;


function callbackForVideo(result) {
    const mask = result.categoryMask.getAsUint8Array();
    let j = 0;
    gotSegmentation(mask);
}

async function predictWebcam() {

    // Now let's start detecting the stream.
    if (runningMode === "IMAGE") {
        runningMode = "VIDEO";
        await imageSegmenter.setOptions({ runningMode: "VIDEO" });
    }
    let startTimeMs = performance.now();
    if (lastVideoTime !== video.currentTime) {
        lastVideoTime = video.currentTime;
        results = imageSegmenter.segmentForVideo(video, startTimeMs, callbackForVideo);

    }

    if (!video.paused) {
        window.requestAnimationFrame(predictWebcam);
    }
}