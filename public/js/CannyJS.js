/*********************************************************
 * CannyEdgeDetectionJS v 1.0
 * Developed By:- Ahmed Moussa <moussa.ahmed95@gmail.com>
 * Copyright (c) 2018 Ahmed Moussa. All rights reserved.
 * License:-
 * This software is provided 'as-is', without any express or implied warranty.
 * In no event will the authors be held liable for any damages arising from the use of this software.
 * Permission is granted to anyone to use this software for any non commercial purpose and to alter it and redistribute it freely, subject to the following restrictions:
 * - The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation is required.
 * - Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
 * - This notice may not be removed or altered from any source or binary distribution.
 * - Redistributions of any form whatsoever must retain the following acknowledgment: 'This product includes software developed by the "Ahmed Moussa" <moussa.ahmed95@gmail.com>.'
 ********************************************************/

/**
  * class that represents Utility
  */
class Util {
  static generateMatrix(w, h, initialValue) {
    let matrix = [];
    for (let x = 0, _w = w - 1; x <= _w; x++) {
      matrix[x] = [];
      for (let y = 0, _h = h - 1; y <= _h; y++) {
        matrix[x][y] = initialValue;
      }
    }
    return matrix;
  }
}

/**
 * Class that represents gray-scaled image data
 */
class GrayImageData {
  /**
   * set the image data
   * @param {array} data
   */
  setData(data) {
    this.data = data;
  }

  /**
   * construct a new image data
   * @param {number} width of the image
   * @param {number} height of the image
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.data = Util.generateMatrix(this.width, this.height, 0);
  }

  /**
   * load image from canvas sent data and store it as a matrix of gray-scaled pixels
   * @param rawData
   */
  loadCanvasFromData(rawData) {
    let x = 0;
    let y = 0;
    for (let i = 0, _len = rawData.length; i < _len; i+= 4) {
      let r = rawData[i];
      let g = rawData[i + 1];
      let b = rawData[i + 2];
      this.data[x][y] = Math.round((0.298 * r) + (0.586 * g) + (0.114 * b));
      if (x === (this.width - 1)) {
        x = 0;
        y += 1;
      } else {
        x += 1;
      }
    }
  }

  /**
  * load image data from canvas and store it as a matrix of gray-scaled pixels
  * @param {object} canvas object
  */
  loadCanvas(canvas) {
    let ctx = canvas.getContext("2d", { willReadFrequently: true });
    let rawData = ctx.getImageData(0, 0, canvas.width, canvas.height, { willReadFrequently: true }).data;
    let x = 0;
    let y = 0;
    for (let i = 0, _len = rawData.length; i < _len; i+= 4) {
      let r = rawData[i];
      let g = rawData[i + 1];
      let b = rawData[i + 2];
      this.data[x][y] = Math.round((0.298 * r) + (0.586 * g) + (0.114 * b));
      if (x === (this.width - 1)) {
        x = 0;
        y += 1;
      } else {
        x += 1;
      }
    }
   }

  /**
  * get the neighbor of a given point
  * @param {number} x coordinate of the point
  * @param {number} y coordinate of the point
  * @param {number} size of the neighbors
  * @return {array} matrix of the neighbor of the point
  */
  getNeighbors(x, y, size) {
    let neighbors = Util.generateMatrix(size, size, 0);
    for (let i = 0, _size1 = size - 1; i <= _size1; i++) {
      neighbors[i] = [];
      for (let j = 0; j <= _size1; j++) {
        let trnsX = x-(size-1)/2+i;
        let trnsY = y-(size-1)/2+j;
        if (this.data[trnsX] && this.data[trnsX][trnsY]) {
          neighbors[i][j] = this.data[trnsX][trnsY];
        } else {
          neighbors[i][j] = 0;
        }
      }
    }
    return neighbors;
   }

  /**
   * iterate all the pixel in the image data
   * @param neighborSize
   * @param func
   */
  eachPixel(neighborSize, func) {
    for (let x = 0, _w = this.width - 1; x <= _w; x++) {
      for (let y = 0, _y = this.height - 1; y <= _y; y++) {
        let current = this.data[x][y];
        let neighbors = this.getNeighbors(x, y, neighborSize);
        func(x, y, current, neighbors);
      }
    }
  }

  /**
  * return linear array of the image data
  * @return {array} array of the pixel color data
  */
  toImageDataArray() {
    let ary = [];
    for (let y = 0, _h = this.height - 1; y <= _h; y++) {
      for (let x = 0, _w = this.width - 1; x <= _w; x++) {
        //ary.push()
        for (let i = 0; i <= 2; i++) {
          ary.push(this.data[x][y]);
        }
        ary.push(255);
      }
    }
    return ary;
  }

  /**
  * return a deep copy of this object
  * @return {object} the copy of this object
  */
  copy() {
    let copied = new GrayImageData(this.width, this.height);
    for (let x = 0, _w = this.width - 1; x <= _w; x++) {
      for (let y = 0, _h = this.height - 1; y <= _h; y++) {
        copied.data[x][y] = this.data[x][y];
      }
    }
    copied.width = this.width;
    copied.height = this.height;
    return copied;
  }

  /**
  * draw the image on a given canvas
  * @param {object} canvas canvas object
  */
  drawOn(canvas) {
    let ctx = canvas.getContext("2d", { willReadFrequently: true });
    let imgData = ctx.createImageData(canvas.width, canvas.height);
    let colors = this.toImageDataArray();
    for (let i = 0, _len = colors.length; i < _len; i++) {
      imgData.data[i] = colors[i];
    }
    ctx.putImageData(imgData, 0, 0);
  }

  /**
  * fill the image with given color
  * @param {number} color to fill
  */
  fill(color) {
    for (let y = 0, _h = this.height - 1; y <= _h; y++) {
      for (let x = 0, _w = this.width - 1; x <= _w; x++) {
        this.data[x][y] = color;
      }
    }
  }

}
/**
 * Class that represents Canny edge detection
 */
class CannyEdgeDetection {
  /**
   * apply gaussian blur to the image data
   * @param imgData
   * @param {number} [sigmma=1.4] value of sigmma of gauss function
   * @param {number} [size=3] size of the kernel (must be an odd number)
   * @return {object} GrayImageData object
   */
  gaussianBlur(imgData, sigmma = 1.4, size = 3) {
    let kernel = this.generateKernel(sigmma, size);
    let copy = imgData.copy();
    copy.fill(0);
    imgData.eachPixel(size, function(x, y, current, neighbors) {
      let i = 0;
      let _size = size - 1;
      while (i <= _size) {
        let j = 0;
        while (j <= _size) {
          copy.data[x][y] += neighbors[i][j] * kernel[i][j];
          j++;
        }
        i++;
      }
    });
    return copy;
  }

  /**
   * generate kernel matrix
   * @param {number} [sigmma] value of sigmma of gauss function
   * @param {number} [size] size of the kernel (must be an odd number)
   * @return {array} kernel matrix
   */
  generateKernel(sigmma, size) {
    let s = sigmma;
    let e = 2.718;
    let kernel = Util.generateMatrix(size, size, 0);
    let sum = 0;
    for (let i = 0, _size = size - 1; i < _size; i++) {
      let x = -(size-1)/2 + i; // calculate the local x coordinate of neighbor
      for (let j = 0; j < _size; j++) {
        let y = -(size-1)/2 + j; // calculate the local y coordinate of neighbor
        let gaussian = (1 / (2 * Math.PI * s * s)) * Math.pow(e, -(x * x + y * y) / (2 * s * s));
        kernel[i][j] = gaussian;
        sum += gaussian;
      }
    }
    // normalization
    for (let i = 0, _size = size - 1; i < _size; i++) {
      for (let j = 0; j < _size; j++) {
        kernel[i][j] = (kernel[i][j] / sum).toFixed(3);
      }
    }
    return kernel;
  }

  /**
   * apply sobel filter to image data
   * @return {object} GrayImageData object
   * @param imgData
   */
  sobel(imgData) {
    let yFiler = [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1]
    ];
    let xFiler = [
      [-1, -2, -1],
      [ 0,  0,  0],
      [1, 2, 1]
    ];
    let copy = imgData.copy();
    copy.fill(0);
    imgData.eachPixel(3, function(x, y, current, neighbors) {
      let ghs = 0;
      let gvs = 0;
      for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
          ghs += yFiler[i][j]*neighbors[i][j];
          gvs += xFiler[i][j]*neighbors[i][j];
        }
      }
      copy.data[x][y] = Math.sqrt(ghs * ghs + gvs * gvs);
    });
    return copy;
  }

  /**
   * apply non-maximum suppression to image data
   * @return {object} GrayImageData object
   * @param imgData
   */
  nonMaximumSuppression(imgData) {
    let copy = imgData.copy();
    copy.fill(0);
    // discard non-local maximum
    imgData.eachPixel(3, function(x, y, c, n) {
      if (n[1][1] > n[0][1] && n[1][1] > n[2][1]) {
        copy.data[x][y] = n[1][1];
      } else {
        copy.data[x][y] = 0;
      }
      if (n[1][1] > n[0][2] && n[1][1] > n[2][0]) {
        copy.data[x][y] = n[1][1];
      } else {
        copy.data[x][y] = 0;
      }
      if (n[1][1] > n[1][0] && n[1][1] > n[1][2]) {
        copy.data[x][y] = n[1][1];
      } else {
        copy.data[x][y] = 0;
      }
      if (n[1][1] > n[0][0] && n[1][1] > n[2][2]) {
        return copy.data[x][y] = n[1][1];
      } else {
        return copy.data[x][y] = 0;
      }
    });
    return copy;
  }

  /**
   * Apply hysteresis threshold to image data
   * @param imgData
   * @param {number} [ht=150] value of high threshold
   * @param {number} [lt=100] value of low threshold
   * @return {object} GrayImageData object
   */
  hysteresis(imgData, ht, lt) {
    let copy = imgData.copy();
    let isStrong = function(edge) {
      return edge > ht;
    };
    let isCandidate = function(edge) {
      return edge <= ht && edge >= lt;
    };
    let isWeak = function(edge) {
      return edge < lt;
    };
    imgData.eachPixel(3, function(x, y, current, neighbors) {
      if (isStrong(current)) {
        return copy.data[x][y] = 255;
      } else if (isWeak(current) || isCandidate(current)) {
        return copy.data[x][y] = 0;
      }
    });
    let traverseEdge = function(x, y) {
      if (x === 0 || y === 0 || x === imgData.width - 1 || y === imgData.height - 1) {
        return;
      }
      if (isStrong(copy.data[x][y])) {
        let neighbors = copy.getNeighbors(x, y, 3);
        for (let i = 0; i <= 2; i++) {
          for (let j = 0; j <= 2; j++) {
            if (isCandidate(neighbors[i][j])) {
              copy.data[x-1+i][y-1+j] = 255;
              traverseEdge(x-1+i,y-1+j);
            }
          }
        }
      }
    };
    copy.eachPixel(3, function(x, y) {
      return traverseEdge(x, y);
    });
    copy.eachPixel(1, function(x, y, current) {
      if (!isStrong(current)) {
        return copy.data[x][y] = 0;
      }
    });
    return copy;
  }

  /**
   * apply canny edge detection algorithm to canvas
   * @param {object} canvas object
   * @param {number} [ht=100] value of high threshold
   * @param {number} [lt=50] value of low threshold
   * @param {number} [sigmma=1.4] value of sigmma of gauss function
   * @param kernelSize
   * @return {object} GrayImageData object
   */
  canny(canvas, ht, lt, sigmma, kernelSize) {
    let imgData = new GrayImageData(canvas.width, canvas.height);
    imgData.loadCanvas(canvas);
    let blur = this.gaussianBlur(imgData, sigmma, kernelSize);
    let sobel = this.sobel(blur);
    let nms = this.nonMaximumSuppression(sobel);
    return this.hysteresis(nms, ht, lt);
  }

  /**
   * apply canny edge detection algorithm to canvas raw data
   * @param {number} canvasWidth
   * @param {number} canvasHeight
   * @param {array} canvasRawDate
   * @param {number} [ht=100] value of high threshold
   * @param {number} [lt=50] value of low threshold
   * @param {number} [sigmma=1.4] value of sigmma of gauss function
   * @param kernelSize
   * @return {object} GrayImageData object
   */
  cannyWorker(canvasWidth, canvasHeight, canvasRawDate, ht, lt, sigmma, kernelSize) {
    let imgData = new GrayImageData(canvasWidth, canvasHeight);
    imgData.loadCanvasFromData(canvasRawDate);
    let blur = this.gaussianBlur(imgData, sigmma, kernelSize);
    let sobel = this.sobel(blur);
    let nms = this.nonMaximumSuppression(sobel);
    return this.hysteresis(nms, ht, lt);
  }
}
