let segmentation_results;
let pg;
function setup() {
  pixelDensity(1);
  let p5canvas = createCanvas(400, 400);
  p5canvas.parent('#canvas');

  // segmentation描画用のグラフィックキャンバス
  pg = createGraphics(100, 100);

  // お手々が見つかると以下の関数が呼び出される．resultsに各画素における検出結果（背景が255, selfieが0）が入っている．
  gotSegmentation = function (results) {
    let video = document.querySelector('#webcam');

    // 読み込んでいるvideo動画のサイズに合わせてキャンバスをリサイズ
    pg.resizeCanvas(video.videoWidth, video.videoHeight);

    if (pg) {
      // pgの描画内容を一旦クリアにする
      pg.clear();

      // pg.pixelsに画素値をロードする
      pg.loadPixels();

      // 画素値を書き換える
      let j = 0;
      for (let i = 0; i < results.length; i++) {

        if (results[i] == 255) { //background
          pg.pixels[j + 0] = 0;
          pg.pixels[j + 1] = 0;
          pg.pixels[j + 2] = 0;
          pg.pixels[j + 3] = 220;
        }
        else { // selfie( results == 0)
          pg.pixels[j + 0] = 0;
          pg.pixels[j + 1] = 0;
          pg.pixels[j + 2] = 0;
          pg.pixels[j + 3] = 0;

        }
        j += 4;

      }

      // 画素値を反映させる
      pg.updatePixels();
    }
    adjustCanvas();
  }
}

function draw() {
  // 描画処理
  clear();  // これを入れないと下レイヤーにあるビデオが見えなくなる

  // pgがあれば描画する。pgには画像区分を示す画像が入っている gotSegmentation()で更新される
  if (pg) {
    image(pg, 0, 0, width, height);
  }
}

function windowResized() {
  adjustCanvas();
}

function adjustCanvas() {
  // Get an element by its ID
  var element_webcam = document.getElementById('webcam');
  resizeCanvas(element_webcam.clientWidth, element_webcam.clientHeight);
}