let pose_results;
let cam = null;
let p5canvas = null;

function setup() {
  p5canvas = createCanvas(640, 480);
  p5canvas.parent('#canvas');

  // お手々が見つかると以下の関数が呼び出される．resultsに検出結果が入っている．
  gotPoses = function (results) {
    pose_results = results;
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
  // https://developers.google.com/mediapipe/solutions/vision/pose_landmarker
  if (pose_results) {
    for (let landmarks of pose_results.landmarks) {
      for (let landmark of landmarks) {
        fill(255);
        noStroke();
        circle(landmark.x * width, landmark.y * height, 20)
      }
    }
  }

}

function windowResized() {
  adjustCanvas();
}

function adjustCanvas() {
  // Get an element by its ID
  var element_webcam = document.getElementById('webcam');
  resizeCanvas(element_webcam.clientWidth, element_webcam.clientHeight);
  //console.log(element_webcam.clientWidth);
}