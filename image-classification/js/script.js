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
document.getElementById("message").innerHTML = "Loading model...";
let imageClassifier = undefined;
let classificationResult = undefined;
let runningMode = "IMAGE";
let enableWebcamButton;
let webcamRunning = false;
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
}

// Show demo section now model is ready to use.
document.getElementById("message").innerHTML = "Loading model...done.";

createImageClassifier();
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
    if (!imageClassifier) {
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
    //   webcamPredictions.className = "webcamPredictions";
    //   webcamPredictions.innerText =
    //     "Classification: " +
    //     classifications[0].categories[0].categoryName +
    //     "\n Confidence: " +
    //     Math.round(parseFloat(classifications[0].categories[0].score) * 100) +
    //     "%";

    // Call this function again to keep predicting when the browser is ready.
    if (webcamRunning === true) {
        window.requestAnimationFrame(predictWebcam);
    }

}