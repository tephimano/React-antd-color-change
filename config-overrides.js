const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  fixBabelImports("antd", {
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        "@primary-color": "@magenta-6",
        "@info-color": "@primary-color",
        "@success-color": "@green-6",
        "@processing-color": "@magenta-6",
        "@error-color": "@red-5",
        "@highlight-color": "@red-5",
        "@warning-color": "@gold-6",
        "@normal-color": "#d9d9d9",
        "@white": "#fff",
        "@black": "#000",
        "@layout-header-background": "#001529",
      },
    },
  })
);
