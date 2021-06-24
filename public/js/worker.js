onmessage = function(e) {
  importScripts("CannyJS.js");
  // console.log("Message received from main script");
  let CannyJS = new CannyEdgeDetection();
  // canvasWidth, canvasHeight, canvasRawDate, ht, lt, sigmma, kernelSize
  let image = CannyJS.cannyWorker(e.data[0], e.data[1], e.data[2], e.data[3], e.data[4], e.data[5], e.data[6]);
  let workerResult = image;
  // console.log("Posting message back to main script");
  postMessage(workerResult);
};
