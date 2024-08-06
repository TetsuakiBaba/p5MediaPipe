let hand_results;
let cam = null;
let p5canvas = null;

function setup() {
  p5canvas = createCanvas(640, 480);
  p5canvas.parent('#canvas');

  // When hands are found, the following function is called. The detection results are stored in results.
  gotHands = function (results) {
    hand_results = results;
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

  // 各頂点座標を表示する
  // 各頂点座標の位置と番号の対応は以下のURLを確認
  // https://developers.google.com/mediapipe/solutions/vision/hand_landmarker
  if (hand_results) {
    if (hand_results.landmarks) {
      for (const landmarks of hand_results.landmarks) {
        for (let landmark of landmarks) {
          noStroke();
          fill(100, 150, 210);
          circle(landmark.x * width, landmark.y * height, 10);
        }
      }
    }
  }

}