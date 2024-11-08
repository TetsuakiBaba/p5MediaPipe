# p5MediaPipe
Easy to go mediapipe samples with p5.js!!

![](./teaser.png)

> [!NOTE] 
> 従来のvideoタグにp5jsキャンバスを重畳する方式から、createCaptureでp5jsでのカメラキャプチャを行う方式に変更しました。この方式により、mediapipeのタスクをp5jsで簡単に実装できるようになりました。もし以前の方式を使いたい場合は、[v0.10.13](https://github.com/TetsuakiBaba/p5MediaPipe/tree/v0.10.13)を利用してください。The method of overlaying a p5js canvas on the conventional video tag has been changed to the method of capturing a camera with p5js using createCapture. This method makes it easy to implement mediapipe tasks with p5js. If you want to use the previous method, please use [v0.10.13](https://github.com/TetsuakiBaba/p5MediaPipe/tree/v0.10.13).


To make it easier to handle mediapipe with p5, I have downloaded the necessary asm and js files for each example. p5MediaPipe branches are created for each version of mediapipe.

p5MediaPipe stores all necessary libraries in the project file for implementation in standalone applications.

## Version
* mediapipe@v0.10.18
* https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/

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

## Experimental
* LLM Inference: <a href="https://tetsuakibaba.github.io/p5MediaPipe/LLM/" target="_blank">DEMO</a>
  * This example is an experimental implementation of LLM Inference. The model such as gemma-1.1-2b-it-gpu-int4.bin (https://www.kaggle.com/models/google/gemma/tfLite/gemma-1.1-2b-it-gpu-int4),  is not included in the project file, so you need to download the model from the official site and load it.
![](./LLM/sample.png)

## How to update mediapipe version
If a newer version of mediapipe has been released, you can update the mediapipe version for each project with the following command. If necessary, replace "update" with "install" in npm.
```
npm update @mediapipe/tasks-vision
sh copy_files.sh
```

check installed mediapipe version
```
npm list @mediapipe/tasks-vision
```


## Reference
* mediapipe by Google: https://developers.google.com/mediapipe
* p5.js by processing foundation: https://p5js.org/

## thanks
* fauxelsによる動画: https://www.pexels.com/ja-jp/video/3253739/