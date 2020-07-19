module.exports = {
  // 给路径起别名
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
        'network': '@/network',
      }
    }
  },
  //设置跨域
  devServer: {
    proxy: {
      //获取热搜词接口
      '/api': {
        target: 'https://api.qq.jsososo.com', //对应自己的接口
        changeOrigin: true,
        ws: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      },
      //音乐接口
      '/index': {
        target: 'https://api.itooi.cn/tencent', //对应自己的接口
        changeOrigin: true,
        ws: true,
        secure: false,
        pathRewrite: {
          '^/index': ''
        }
      }
    }
  },
  //audio配置
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options =>
        Object.assign(options, {
          transformAssetUrls: {
            audio: "src"
          }
        })
      );
  }
}