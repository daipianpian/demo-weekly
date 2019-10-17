const path = require("path")
const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: '/dome/week/',
    assetsDir: 'static',
    lintOnSave: true,
    productionSourceMap: false,
    css:{
        extract: true,
        sourceMap: false,
        loaderOptions: {
            sass: {
                data: `@import "./src/assets/styles/globals.scss";`
            }
        },
        modules: false
    },
    devServer:{
        port:8002,
        open:true,
        https:false,
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            '/api': {
                target: 'http://localhost:3002/', // 域名
                ws: true, // 是否启用websockets
                changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: {
                    '^/api': '' // 修改路径
                }
            }
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("./src"))
    },
    configureWebpack: {
        performance: {
            hints:false
        }
    },
    // 构建时开启多进程处理 babel 编译
    parallel: require('os').cpus().length > 1,
    // 第三方插件配置
    pluginOptions: {}
}