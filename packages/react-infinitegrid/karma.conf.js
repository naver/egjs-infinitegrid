module.exports = function (config) {
    const karmaConfig = {
        frameworks: ["mocha", "chai", "karma-typescript"],
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },
        client: {
            mocha: {
                opts: "./mocha.opts",
            },
        },
        files: [
            "src/**/*.ts",
            "src/**/*.tsx",
            "./test/**/*.ts",
            "./test/**/*.tsx",
        ],
        preprocessors: {
            "src/**/*.ts": ["karma-typescript"],
            "src/**/*.tsx": ["karma-typescript"],
            "test/**/*.ts": ["karma-typescript"],
            "test/**/*.tsx": ["karma-typescript"],
        },
        karmaTypescriptConfig: {
			tsconfig: "./tsconfig.test.json",
            reports: {
                html: {
                    "directory": "coverage",
                    "subdirectory": "./"
                },
                lcovonly: {
                    "directory": "coverage",
                    "filename": "lcov.info",
                    "subdirectory": "."
                },
            },
            coverageOptions: {
                instrumentation: true,
                exclude: /test/i,
            },
        },
        browsers: [],
        customLaunchers: {
            CustomChromeHeadless: {
                base: "ChromeHeadless",
                flags: ["--window-size=400,300", "--no-sandbox", "--disable-setuid-sandbox"],
            },
        },
        reporters: ["mocha"],
    };
    const preprocessors = {};
    const files = [
        "./src/demo/**/*.ts",
        "./src/demo/**/*.tsx",
        "./src/react-infinitegrid/**/*.ts",
        "./src/react-infinitegrid/**/*.tsx",
        "./test/**/*.ts",
        "./test/**/*.tsx",
    ];
    files.forEach(file => {
        preprocessors[file] = ["karma-typescript"];
    });
    karmaConfig.files = files;
    karmaConfig.preprocessors = preprocessors;
    karmaConfig.browsers.push(config.chrome ? "Chrome" : "CustomChromeHeadless");

    if (config.coverage) {
        karmaConfig.reporters.push("karma-typescript");
        karmaConfig.singleRun = true;
    }

    config.set(karmaConfig);
};
