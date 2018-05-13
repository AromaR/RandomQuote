const name = 'scotchPWA-v7'
module.exports = {
  staticFileGlobs: [
    './index.html',
    './images/*.{png,svg,gif,jpg}',
    './fonts/**/*.{woff,woff2}',
    './js/*.js',
    './css/*.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
  ],
  stripPrefix: './',
  runtimeCaching: [{
    urlPattern: /https:\/\/talaikis.com\/api\/quotes/,
    handler: 'networkFirst',
    options: {
      cache: {
        name: name
      }
    }
  }]
};