SOURCE_DIR="node_modules/@mediapipe/tasks-vision"
# vision_bundle.mjs を face-landmarker/js/ に vision_bundle.js としてコピー
cp $SOURCE_DIR/vision_bundle.mjs face-landmarker/js/vision_bundle.js
cp $SOURCE_DIR/vision_bundle.mjs hands-landmarker/js/vision_bundle.js
cp $SOURCE_DIR/vision_bundle.mjs hands-landmarker-gesture-recognition/js/vision_bundle.js
cp $SOURCE_DIR/vision_bundle.mjs image-classification/js/vision_bundle.js
#cp $SOURCE_DIR/vision_bundle.mjs image-segmentation/js/vision_bundle.js
cp $SOURCE_DIR/vision_bundle.mjs object-detection/js/vision_bundle.js
cp $SOURCE_DIR/vision_bundle.mjs object-detection-mobile-web-app-template/js/vision_bundle.js
cp $SOURCE_DIR/vision_bundle.mjs pose-landmarker/js/vision_bundle.js

# SOURCE_DIR/wasm ディレクトリを face-landmarker/ 以下にコピー（上書き）
cp -r $SOURCE_DIR/wasm face-landmarker/
cp -r $SOURCE_DIR/wasm hands-landmarker/
cp -r $SOURCE_DIR/wasm hands-landmarker-gesture-recognition/
cp -r $SOURCE_DIR/wasm pose-landmarker/
cp -r $SOURCE_DIR/wasm image-classification/
# segmentはwasm入れ替えても問題ないがい，vision_bundle.jsとの整合性を踏まえてコピーしない
# cp -r $SOURCE_DIR/wasm image-segmentation/
cp -r $SOURCE_DIR/wasm object-detection/
cp -r $SOURCE_DIR/wasm object-detection-mobile-web-app-template/

