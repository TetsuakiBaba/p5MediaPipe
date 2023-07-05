let classification_results;

function setup() {
  let p5canvas = createCanvas(400, 400);
  p5canvas.parent('#canvas');

  // お手々が見つかると以下の関数が呼び出される．resultsに検出結果が入っている．
  gotClassification = function (results) {
    classification_results = results;
    adjustCanvas();
  }
}

function draw() {
  // 描画処理
  clear();  // これを入れないと下レイヤーにあるビデオが見えなくなる

  // 各頂点座標を表示する
  // 各頂点座標の位置と番号の対応は以下のURLを確認
  // https://developers.google.com/mediapipe/solutions/vision/hand_landmarker
  if (classification_results) {
    let name = classification_results.classifications[0].categories[0].categoryName;
    let score = classification_results.classifications[0].categories[0].score;
    console.log(classification_results.classifications[0].categories[0]);
    textSize(48);
    text(`${name}: ${(score * 100).toFixed(0)} %`, 20, 64);
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