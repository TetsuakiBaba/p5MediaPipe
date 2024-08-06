let face_results;
let cam = null;
let p5canvas = null;

function setup() {
  p5canvas = createCanvas(640, 480);
  p5canvas.parent('#canvas');

  // When faces are found, the following function is called. The detection results are stored in results.
  gotFaces = function (results) {
    face_results = results;
  }
}

function startWebcam() {
  // If the function setCameraStreamToMediaPipe is defined in the window object, the camera stream is set to MediaPipe.
  if (window.setCameraStreamToMediaPipe) {
    cam = createCapture(VIDEO);
    cam.hide();
    cam.elt.onloadedmetadata = function () {
      window.setCameraStreamToMediaPipe(cam.elt);
    }
    p5canvas.style('width', '100%');
    p5canvas.style('height', 'auto');
  }
}

function draw() {
  background(127);
  if (cam) {
    image(cam, 0, 0, width, height);
  }

  // The correspondence between the position and number of each vertex coordinate can be checked at the following URL.
  // https://developers.google.com/mediapipe/solutions/vision/pose_landmarker
  if (face_results) {
    for (let landmarks of face_results.faceLandmarks) {
      for (let landmark of landmarks) {
        fill(255);
        noStroke();
        circle(landmark.x * width, landmark.y * height, 2)
      }
    }
  }
}