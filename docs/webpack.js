const path = require("path");

module.exports = function (context, options) {
  return {
    name: 'custom-docusaurus-plugin',
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          alias: {
            "@egjs/infinitegrid": path.resolve(__dirname, '../dist/infinitegrid.esm.js'),
          },
        }
      };
    },
  };
};
