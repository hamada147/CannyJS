/*global CannyEdgeDetection*/
importScripts("CannyJS.js");
onmessage = function(e) {
  let CannyJS = new CannyEdgeDetection();
  // canvasWidth, canvasHeight, canvasRawDate, ht, lt, sigmma, kernelSize
  let workerResult = CannyJS.cannyWorker(e.data[0], e.data[1], e.data[2], e.data[3], e.data[4], e.data[5], e.data[6]);
  // console.log("Posting message back to main script");
  postMessage(workerResult);
};
