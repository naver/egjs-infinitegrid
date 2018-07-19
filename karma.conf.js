module.exports = function(config) {
  var karmaConfig = {
    frameworks: ["mocha", "chai", "sinon"],

    // list of files / patterns to load in the browser
    files: [
			"./node_modules/babel-polyfill/dist/polyfill.js",
      "./node_modules/lite-fixture/index.js",
      "./test/unit/**/*.spec.js",
      'test/unit/image/*.jpg',
    ],
    client: {
      mocha: {
        opts: "./mocha.opts" 
      }
    },

    webpack: {
      devtool: "inline-source-map",
      module: {
          rules: [
              {
                  test: /\.js$/,
                  exclude: /node_modules/,
                  loader: "babel-loader",
              }
          ]
      }
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "./test/**/*.spec.js": config.coverage ? ["webpack"] : ["webpack", "sourcemap"]
    },

    browsers: [],

    // you can define custom flags
    customLaunchers: {
      CustomChromeHeadless: {
        base: 'ChromeHeadless',
        flags: ['--window-size=600,300', '--no-sandbox', '--disable-setuid-sandbox']
      }
    },

    reporters: ["mocha"],
    webpackMiddleware: {
        noInfo: true
    }
  };
  
  karmaConfig.browsers.push(config.chrome ? "Chrome" : "CustomChromeHeadless");

  if(config.coverage) {
    karmaConfig.reporters.push("coverage-istanbul");
    karmaConfig.coverageIstanbulReporter = {
      reports: ["text-summary", "html", "lcovonly"],
      dir: "./coverage"
    };
    karmaConfig.webpack.module.rules.unshift({
        test: /\.js$/,
        exclude: /(node_modules|test)/,
        loader: "istanbul-instrumenter-loader"
    });
    karmaConfig.singleRun = true;
  }

  config.set(karmaConfig);
};