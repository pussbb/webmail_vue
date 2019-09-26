// vue.config.js
const CompressionPlugin = require('compression-webpack-plugin')
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    "devServer": {
        "proxy": "http://mail.scalix.com/"
    },
    configureWebpack: {
        plugins: [
            new CompressionPlugin()
        ],
        optimization: {
            //minimizer: [new UglifyJsPlugin()],
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/](dayspan.*|vuetify)[\\/]/,
                        name: 'calendar',
                        chunks: 'all',
                    }
                }
            }
        }
    }
}