const path = require("path")
const myConfig = require("./my.config")

module.exports = {
  devServer: {
    port: myConfig.client.port,
  },
  configureWebpack: {
    devtool: "source-map",
    resolve: {
      alias: {
        "@a":      path.resolve(__dirname, "src/assets"),
        "@c":      path.resolve(__dirname, "src/components"),
        "@v":      path.resolve(__dirname, "src/views"),
      },
    },
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `
                    @import "@a/styles/_components-vars.scss";
                    @import "@a/styles/_theme-vars.scss";
                `,
      },
    },
  },
};
