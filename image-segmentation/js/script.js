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
const { ImageSegmenter, SegmentationMask, FilesetResolver } = vision;

document.getElementById("message").innerHTML = "Loading model...";
let imageSegmenter;
let labels;

let runningMode = "VIDEO";
let enableWebcamButton;
let webcamRunning = false;
// Before we can use HandLandmarker class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment to
// get everything needed to run.
const createImageSegmenter = async () => {
    const vision = await FilesetResolver.forVisionTasks("./wasm");
    imageSegmenter = await ImageSegmenter.createFromOptions(vision, {
        baseOptions: {
            //modelAssetPath: `./models/deeplab_v3.tflite`,
            modelAssetPath: `./models/selfie_segmenter_landscape.tflite`,
            delegate: "GPU"
        },
        runningMode: runningMode,
        outputCategoryMask: true,
        outputConfidenceMasks: false

    });
    labels = imageSegmenter.getLabels();
    console.log(labels);
    document.getElementById("message").innerHTML += "done";
};
createImageSegmenter();

/********************************************************************
// Demo 2: Continuously grab image from webcam stream and detect it.
********************************************************************/
const video = document.getElementById("webcam");
const canvasElement = document.getElementById("canvas");

// Check if webcam access is supported.
const hasGetUserMedia = () => { var _a; return !!((_a = navigator.mediaDevices) === null || _a === void 0 ? void 0 : _a.getUserMedia); };
// If webcam supported, add event listener to button for when user
// wants to activate it.
if (hasGetUserMedia()) {
    enableWebcamButton = document.getElementById("webcamButton");
    enableWebcamButton.addEventListener("click", enableCam);
}
else {
    console.warn("getUserMedia() is not supported by your browser");
}
// Enable the live webcam view and start detection.
function enableCam(event) {
    if (!imageSegmenter) {
        console.log("Wait! objectDetector not loaded yet.");
        return;
    }
    if (webcamRunning === true) {
        webcamRunning = false;
        enableWebcamButton.innerText = "ENABLE PREDICTIONS";
    }
    else {
        webcamRunning = true;
        enableWebcamButton.innerText = "DISABLE PREDICTIONS";
    }
    // getUsermedia parameters.
    const constraints = {
        video: true
    };
    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        video.srcObject = stream;
        video.addEventListener("loadeddata", predictWebcam);
    });
}
let lastVideoTime = -1;
let results = undefined;


function callbackForVideo(result) {
    //const mask = result.categoryMask.getAsFloat32Array();
    const mask = result.categoryMask.getAsUint8Array();
    let j = 0;
    // for (let i = 0; i < mask.length; ++i) {
    //     const maskVal = Math.round(mask[i] * 255.0);
    //     j += 4;
    // }
    gotSegmentation(mask);

    //console.log(result);
    // if (webcamRunning === true) {
    //     window.requestAnimationFrame(predictWebcam);
    // }
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
    // gotSegmentation(results);
    // canvasCtx.save();
    // canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    // if (results.landmarks) {
    //     for (const landmarks of results.landmarks) {
    //         drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
    //             color: "#00FF00",
    //             lineWidth: 5
    //         });
    //         drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
    //     }
    // }
    // canvasCtx.restore();
    // Call this function again to keep predicting when the browser is ready.
    if (webcamRunning === true) {
        window.requestAnimationFrame(predictWebcam);
    }
}