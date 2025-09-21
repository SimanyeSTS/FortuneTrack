const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: [],
  chainWebpack: config => {
    config.plugins.delete('case-sensitive-paths');
  },
  pwa: {
    iconPaths: {
       favicon32: 'img/icons/myFavicon.png',
       favicon16: 'img/icons/myFavicon.png',
    }
  },
});
  