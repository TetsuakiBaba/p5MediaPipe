// import { ObjectDetector, FilesetResolver } from "../node_modules/@mediapipe/tasks-vision/vision_bundle.js";
import { ObjectDetector, FilesetResolver } from "./vision_bundle.js";
var objectDetector;
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
        scoreThreshold: 0.35,
        runningMode: runningMode
    });
    document.querySelector('#loading').style.display = 'none';
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
    // Call this function again to keep predicting when the browser is ready
    window.requestAnimationFrame(predictWebcam);
}

document.querySelector('#input_confidence_threshold').addEventListener('change', changedConfidenceThreshold);
function changedConfidenceThreshold(e) {
    objectDetector.setOptions(
        {
            scoreThreshold: parseFloat(e.srcElement.value)
        }
    )
    document.querySelector('#confidence_threshold').innerHTML = e.srcElement.value;
}