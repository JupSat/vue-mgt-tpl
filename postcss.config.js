module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 1500, // the width of the viewport
      viewportHeight: 1334, // the height of the viewport
      unitPrecision: 3, // the decimal places of the rem value
      viewportUnit: 'vw', // the unit to convert to
      fontViewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines', 'van'], // the selectors to ignore
      minPixelValue: 1, // the minimum pixel value to replace
      mediaQuery: false // allow px to be converted in media queries
    }
  }
}
