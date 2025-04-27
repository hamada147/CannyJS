# CannyJS

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/37c86e1246bc4f6ab38897acf8551c2d)](https://www.codacy.com/gh/hamada147/CannyJS/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=hamada147/CannyJS&amp;utm_campaign=Badge_Grade)

A modern implementation of the Canny Edge Detection algorithm in ES6 JavaScript. This project provides a powerful and
efficient way to detect edges in images directly in the browser.

## 🌟 Features

- **Modern JavaScript** - Built with ES6+ features for better code organization and performance
- **Web Worker Support** - Processes images in a separate thread to maintain UI responsiveness
- **Service Worker Integration** - Enables offline functionality and faster loading times
- **Real-time Processing** - See edge detection results immediately as you adjust parameters
- **Mobile-Friendly** - Responsive design that works across different devices and screen sizes

## 🚀 Demo

Experience the edge detection in action: [Live Demo](https://hamada147.github.io/CannyJS/)

### Demo Features

- **Interactive Controls**
  - Adjust high and low thresholds
  - Fine-tune Gaussian blur sigma
  - Modify kernel size
  - Real-time parameter updates

- **Multiple Input Options**
  - File upload support for custom images
  - Pre-loaded demo images (car.jpg, nishida_2.jpeg, ukiyo-e.png)
  - Drag and drop support

- **Progressive Web App Features**
  - Offline functionality via Service Worker
  - Cached resources for faster loading
  - Installable on supported devices

## 💻 Technical Implementation

### Performance Optimizations

- **Web Worker Implementation**
  - Processes edge detection in a separate thread
  - Prevents UI freezing during computation
  - Maintains responsive user experience

- **Service Worker Caching**
  - Caches demo images for offline access
  - Improves loading performance
  - Reduces server requests

### User Experience

- **Visual Feedback**
  - Loading indicators during processing
  - Real-time parameter value display
  - Side-by-side comparison view

## 🛠️ Getting Started

1. Clone the repository
2. Open `index.html` in a modern web browser
3. Upload an image or use one of the demo images
4. Adjust parameters to see different edge detection results

## 📱 Browser Support

Works in all modern browsers that support:

- ES6+ JavaScript
- Web Workers
- Service Workers
- Canvas API

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.~~
