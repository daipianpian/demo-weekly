const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const path = require("path")
const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    outputDir: process.env.VUE_APP_OUTPUT_DIR,
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
                target: 'http://localhost:3002', // 接口域名
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
    configureWebpack: config => {
        if (process.env.NODE_ENV !== 'production') return;
        return {
            //警告 webpack 的性能提示
            performance: {
                hints:'warning',
                //入口起点的最大体积
                maxEntrypointSize: 5000000000,
                //生成文件的最大体积
                maxAssetSize: 3000000000,
                //只给出 js 文件的性能提示
                assetFilter: function(assetFilename) {
                    return assetFilename.endsWith('.js');
                }
            },
            plugins: [
                new PrerenderSPAPlugin({
                    staticDir: path.join(__dirname, process.env.VUE_APP_OUTPUT_DIR),
                    // 需要进行预渲染的路由路径 我这里做的是首页
                    routes: ['/', '/home/user', '/home/weekly', '/home/weeklydetail'],
                    // html文件压缩
                    minify: {
                        minifyCSS: true, // css压缩
                        removeComments: true // 移除注释
                    },
                    renderer: new Renderer({
                        // Optional - The name of the property to add to the window object with the contents of `inject`.
                        injectProperty: '__PRERENDER_INJECTED',
                        // Optional - Any values you'd like your app to have access to via `window.injectProperty`.
                        inject: {},
                        // 在 main.js 中 new Vue({ mounted () {document.dispatchEvent(new Event('render-event'))}})，两者的事件名称要对应上。
                        renderAfterDocumentEvent: 'render-event'
                    })
                })
            ],
        };
    },
    // 构建时开启多进程处理 babel 编译
    parallel: require('os').cpus().length > 1,
    // 第三方插件配置
    pluginOptions: {}
}