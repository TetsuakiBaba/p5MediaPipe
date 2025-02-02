let version = `
last modified: 2025/02/02 16:42:22
`
var results;
let cam = null;
let p5canvas = null;

function setup() {
    p5canvas = createCanvas(640, 480);
    p5canvas.parent('#canvas');

    // お手々が見つかると以下の関数が呼び出される．resultsに検出結果が入っている．
    gotDetections = function (_results) {
        results = _results;
        let video_width = 640;
        let video_height = 480;
        let ratio = {
            x: width / video_width,
            y: height / video_height
        }
        // console.log(canvas_width, canvas_height);
        // console.log(ratio);
        // 取得したboundingBoxの値を現在のcanvas描画とあわせる前処理
        for (let d of results.detections) {
            let bb = d.boundingBox;
            bb.originX = ratio.x * bb.originX;
            bb.originY = ratio.y * bb.originY;
            bb.width *= ratio.x;
            bb.height *= ratio.y;
        }

    }

    document.querySelector('#version').innerHTML = version;
    startWebcam();
}

function startWebcam() {
    // If the function setCameraStreamToMediaPipe is defined in the window object, the camera stream is set to MediaPipe.
    if (window.setCameraStreamToMediaPipe) {
        //here
        const camera_id = localStorage.getItem('cameraId');
        const constraints = {
            video: {
                deviceId: camera_id,
                facingMode: 'environment',
                width: { max: 640 },
                height: { max: 480 },
                aspectRatio: { ideal: 4 / 3 }
            }
        };
        cam = createCapture(constraints);
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

    if (results) {

        for (let detection of results.detections) {
            let index = detection.categories[0].index;
            let bb = detection.boundingBox;
            let name = detection.categories[0].categoryName;
            let score = detection.categories[0].score;
            let c = getColorByIndex(index);
            c = [...c, 250];
            stroke(c);
            strokeWeight(2);
            noFill();
            rect(
                bb.originX, bb.originY,
                bb.width, bb.height
            )
            fill(c);
            rect(
                bb.originX, bb.originY - 20,
                bb.width, 20
            )

            noStroke();
            fill(255);
            textSize(20);
            textAlign(LEFT, CENTER);
            text(`${name} - ${score.toFixed(2)} `, bb.originX + 10, bb.originY - 10);
            index++;
        }
    }

    // noFill();
    // stroke(255, 100, 25);
    // strokeWeight(50);
    // rect(0, 0, width, height);

}
function getColorByIndex(index) {
    const colors = [
        [221, 160, 221], // プラム
        [240, 128, 128], // ライトコーラル
        [173, 216, 230], // ライトブルー
        [144, 238, 144], // ライトグリーン
        [220, 220, 220], // グレイ
        [244, 164, 96],  // ライトサーモン
        [192, 192, 192], // シルバー
        [255, 222, 173], // ナバホホワイト
        [175, 238, 238], // パオダーターコイズ
        [255, 228, 196], // ビスク
        [250, 128, 114], // サーモン
        [152, 251, 152], // パレグリーン
        [176, 224, 230], // パウダーブルー
        [255, 218, 185], // ピーチパフ
        [240, 230, 140], // カーキ
        [240, 128, 128], // ライトコーラル
        [144, 238, 144], // ライトグリーン
        [192, 192, 192], // シルバー
        [255, 228, 196], // ビスク
        [250, 128, 114]  // サーモン
    ];

    if (index < 0) {
        index = 0;
    }

    index = index % colors.length;

    return colors[index];
}


function share() {
    let element = document.getElementById('render');
    html2canvas(element).then(canvas => {
        canvas.toBlob(function (blob) {
            let file = new File([blob], "image.png", {
                type: "image/png",
            });
            const filesArray = [file];

            if (navigator.share) {
                navigator.share({
                    // title: 'Hiddenmickey',
                    // text: '#hiddenmickey',
                    files: filesArray
                })
                    .then(() => console.log('Share was successful.'))
                    .catch((error) => console.log('Sharing failed', error));
            } else {
                alert(`Your system doesn't support sharing files.`);
            }
        });
    });
}

let is_playing = true;;
function toggleCameraPlay() {
    is_playing = !is_playing;
    if (is_playing) {
        cam.play();
    }
    else {
        cam.pause();
    }
}


// カメラデバイスの切り替え
document.getElementById('select_camera').addEventListener('change', changedCamera);
function changedCamera() {
    const selectCamera = document.getElementById('select_camera');
    const constraints = {
        video: {
            deviceId: selectCamera.value,
            facingMode: 'environment',
            width: { max: 640 },
            height: { max: 480 },
            aspectRatio: { ideal: 4 / 3 }
        }
    };
    // selectCamera.value をlocalStorageに保存
    localStorage.setItem('cameraId', selectCamera.value);

    // navigator.mediaDevices
    //     .getUserMedia(constraints)
    //     .then(function (stream) {
    //         video.srcObject = stream;
    //         video.addEventListener("loadeddata", predictWebcam);
    //     })
    //     .catch((err) => {
    //         console.error(err);
    //     });
}