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
        "@primary-color": "@magenta-6", //Color of buttons and selected menu items
        "@info-color": "@primary-color",
        "@success-color": "@green-6",
        "@processing-color": "@magenta-6",
        "@error-color": "@red-5",
        "@highlight-color": "@red-5",
        "@warning-color": "@gold-6",
        "@normal-color": "#d9d9d9",
        "@white": "#fff",
        "@black": "#000",
        "@layout-header-background": "#180018", //Layout header and sider color
        "@layout-body-background": "#f5f2f5", //content background
        "@background-color-light": "#291321",
        "@layout-trigger-background": "#240024", // for the collapse button on the sider
        "@input-bg": "#fcf0fb",
      },
    },
  })
);
