// import { ObjectDetector, FilesetResolver } from "../node_modules/@mediapipe/tasks-vision/vision_bundle.js";
import { ObjectDetector, FilesetResolver } from "./vision_bundle.js";

let objectDetector;
let runningMode = "IMAGE";



// Initialize the object detector
const initializeObjectDetector = async () => {
    // const vision = await FilesetResolver.forVisionTasks("./node_modules/@mediapipe/tasks-vision/wasm");
    const vision = await FilesetResolver.forVisionTasks("./wasm");
    objectDetector = await ObjectDetector.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: `./models/efficientdet_lite0.tflite`,
            delegate: "GPU"
        },
        scoreThreshold: 0.5,
        runningMode: runningMode
    });
    document.querySelector('#button_webcam').disabled = false;
    document.querySelector('#button_webcam').innerHTML = "Enable Webcam";
};
initializeObjectDetector();

let video = null;

export function setCameraStreamToMediaPipe(v) {
    video = v;
    video.addEventListener("loadeddata", predictWebcam);
    video = v;

}
window.setCameraStreamToMediaPipe = setCameraStreamToMediaPipe;


let lastVideoTime = -1;
async function predictWebcam() {
    // if image mode is initialized, create a new classifier with video runningMode
    if (runningMode === "IMAGE") {
        runningMode = "VIDEO";
        await objectDetector.setOptions({ runningMode: "VIDEO" });
    }
    let nowInMs = Date.now();
    // Detect objects using detectForVideo
    if (video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;
        const detections = await objectDetector.detectForVideo(video, nowInMs);

        //displayVideoDetections(detections);
        gotDetections(detections);
    }
    if (!video.paused) {
        window.requestAnimationFrame(predictWebcam);
    }
}