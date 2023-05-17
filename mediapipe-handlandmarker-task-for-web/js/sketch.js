let hand_results;

function setup() {
  let p5canvas = createCanvas(400, 400);
  p5canvas.parent('#canvas');

  gotHands = function (results) {
    hand_results = results;
    if (results.landmarks) {
      for (const landmarks of results.landmarks) {
      }
    }
    adjustCanvas();
  }
}

function draw() {
  // 描画処理
  clear();  // これを入れないと下レイヤーにあるビデオが見えなくなる

  if (hand_results) {
    if (hand_results.landmarks) {
      for (const landmarks of hand_results.landmarks) {
        for (let landmark of landmarks) {
          circle(landmark.x * width, landmark.y * height, 20);
        }
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