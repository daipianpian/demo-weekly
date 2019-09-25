const path = require("path")
const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/vue/week/' : '/week/',
    assetsDir: 'static',
    lintOnSave: true,
    productionSourceMap: false,
    css:{
        extract: true,
        sourceMap: false,
        loaderOptions: {}
    },
    devServer:{
        port:8080,
        open:true,
        https:false,
        overlay: {
            warnings: true,
            errors: true
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
    }
}