# p5MediaPipe
Easy to go mediapipe samples with p5.js!!

![](./teaser.png)

To make it easier to handle mediapipe with p5, I have downloaded the necessary asm and js files for each example. p5MediaPipe branches are created for each version of mediapipe.

## Version
* mediapipe@v0.10.14
* https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/

## Examples
* hands-landmarker : <a href="https://tetsuakibaba.github.io/p5MediaPipe/hands-landmarker/" target="_blank">DEMO</a>
* object-detection : <a href="https://tetsuakibaba.github.io/p5MediaPipe/object-detection/" 
target="_blank">DEMO</a>
* object-detection-mobile-web-app-template : <a href="https://tetsuakibaba.github.io/p5MediaPipe/object-detection-mobile-web-app-template/" 
target="_blank">DEMO</a>
* gesture-recognition : <a href="https://tetsuakibaba.github.io/p5MediaPipe/hands-landmarker-gesture-recognition/" target="_blank">DEMO</a>
* image classification: <a href="https://tetsuakibaba.github.io/p5MediaPipe/image-classification/" 
target="_blank">DEMO</a>
* image segmentation: <a href="https://tetsuakibaba.github.io/p5MediaPipe/image-segmentation/" target="_blank">DEMO</a>
  * Only this example uses vision_bundle.js of v0.10.2 because vision_bundle.js of latest version causes an error.
* face landmark detection: <a href="https://tetsuakibaba.github.io/p5MediaPipe/face-landmarker/" target="_blank">DEMO</a>
* pose landmark detection: <a href="https://tetsuakibaba.github.io/p5MediaPipe/pose-landmarker/" target="_blank">DEMO</a>

## How to update mediapipe version
```
npm update @mediapipe/tasks-vision
sh copy_files.sh
```


## Reference
* mediapipe by Google: https://developers.google.com/mediapipe
* p5.js by processing foundation: https://p5js.org/

## thanks
* fauxelsによる動画: https://www.pexels.com/ja-jp/video/3253739/