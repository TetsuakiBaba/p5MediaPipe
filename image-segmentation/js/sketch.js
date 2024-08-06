let segmentation_results;
let pg;
let cam = null;
let p5canvas = null;

function setup() {
  pixelDensity(1);
  p5canvas = createCanvas(640, 480);
  p5canvas.parent('#canvas');
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


    // segmentation描画用のグラフィックキャンバス
    pg = createGraphics(100, 100);

    // お手々が見つかると以下の関数が呼び出される．resultsに各画素における検出結果（背景が255, selfieが0）が入っている．
    gotSegmentation = function (results) {

      // 読み込んでいるvideo動画のサイズに合わせてキャンバスをリサイズ
      pg.resizeCanvas(cam.width, cam.height);

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

    }

  }
}


function draw() {
  background(127);
  if (cam) {
    image(cam, 0, 0, width, height);
  }

  // pgがあれば描画する。pgには画像区分を示す画像が入っている gotSegmentation()で更新される
  if (pg) {
    image(pg, 0, 0, width, height);
  }
}
