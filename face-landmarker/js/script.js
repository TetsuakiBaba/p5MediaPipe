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

import { FaceLandmarker, FilesetResolver } from "./vision_bundle.js";

let faceLandmarker = undefined;
let runningMode = "IMAGE";
// Before we can use HandLandmarker class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment to
// get everything needed to run.
const createFaceLandmarker = async () => {
    const vision = await FilesetResolver.forVisionTasks("./wasm");
    faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: `./models/face_landmarker.task`,
            delegate: "GPU"
        },
        outputFaceBlendshapes: true,
        runningMode: runningMode,
        numFaces: 1
    });
    document.querySelector('#button_webcam').disabled = false;
    document.querySelector('#button_webcam').innerHTML = "Enable Webcam";
};
createFaceLandmarker();

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

    // Now let's start detecting the stream.
    if (runningMode === "IMAGE") {
        runningMode = "VIDEO";
        await faceLandmarker.setOptions({ runningMode: "VIDEO" });
    }
    let startTimeMs = performance.now();
    if (lastVideoTime !== video.currentTime) {
        lastVideoTime = video.currentTime;
        results = faceLandmarker.detectForVideo(video, startTimeMs);
    }

    gotFaces(results);

    if (!video.paused) {
        window.requestAnimationFrame(predictWebcam);
    }
}