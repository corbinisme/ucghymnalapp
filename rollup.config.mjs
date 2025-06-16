import path from 'path';

export default {
  input: 'node_modules/@dragdroptouch/drag-drop-touch/dist/drag-drop-touch.esm.js', // Adjust path if you downloaded manually
  output: {
    file: './www/js/drag-drop-touch.min.js', // Output file
    format: 'iife', // Immediately Invoked Function Expression - good for global scripts
    name: 'DragDropTouch', // The global variable it will expose (optional, but good for polyfills)
    sourcemap: false, // Optional: set to true for debugging
  }
};
