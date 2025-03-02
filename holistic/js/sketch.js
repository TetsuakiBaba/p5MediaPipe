let capture, holistic;
let sending = false;
let holistic_results = undefined;

function setupHolistic() {
  holistic = new Holistic({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`
  });
  console.log(holistic);
  holistic.setOptions({
    modelComplexity: 1,
    upperBodyOnly: true,
    smoothLandmarks: false,
    enableSegmentation: false,
    smoothSegmentation: false,
    refineFaceLandmarks: false,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });
  holistic.onResults(onResults);
  document.querySelector('#button_webcam').disabled = false;
  document.querySelector('#button_webcam').innerHTML = "Enable Webcam";
}

let p5canvas = null;
function setup() {
  p5canvas = createCanvas(1280, 720);
  p5canvas.parent('#canvas');
  capture = createCapture(VIDEO);
  capture.size(1280, 720);
  capture.hide();

  p5canvas.style('width', '100%');
  p5canvas.style('height', 'auto');
  setupHolistic();

  setInterval(() => {
    if (!sending) {
      sending = true;
      holistic.send({ image: capture.elt }).then(() => {
        sending = false;
      });
    }
  }, 1000 / 30);
}

function draw() {
  // draw camera capture
  image(capture, 0, 0, width, height);

  {
    strokeWeight(1);
    stroke(9, 255, 0);
    // draw face landmarks
    if (holistic_results) {
      const face = holistic_results.faceLandmarks;
      if (face) {
        beginShape(POINTS);
        for (let p of face) {
          vertex(p.x * width, p.y * height);
        }
        endShape(CLOSE);
      }

      const pose = holistic_results.poseLandmarks;
      // set size of point
      strokeWeight(5);
      // color  
      stroke(255, 0, 0);
      if (pose) {
        beginShape(POINTS);
        for (let p of pose) {
          vertex(p.x * width, p.y * height);
        }
        endShape(CLOSE);
      }

      strokeWeight(5);
      stroke(0, 0, 255);
      const leftHand = holistic_results.leftHandLandmarks;
      if (leftHand) {
        beginShape(POINTS);
        for (let p of leftHand) {
          vertex(p.x * width, p.y * height);
        }
        endShape(CLOSE);
      }

      strokeWeight(5);
      stroke(0, 0, 255);
      const rightHand = holistic_results.rightHandLandmarks;
      if (rightHand) {
        beginShape(POINTS);
        for (let p of rightHand) {
          vertex(p.x * width, p.y * height);
        }
        endShape(CLOSE);
      }
    }
  }
  // let fps = frameRate();
  // fill(255);
  // stroke(0);
  // textSize(24);
  // text("FPS: " + fps.toFixed(2), 10, 20);

}

function onResults(results) {
  holistic_results = results;
}

// p5.js がグローバル関数として認識できるよう登録
window.setup = setup;
window.draw = draw;
