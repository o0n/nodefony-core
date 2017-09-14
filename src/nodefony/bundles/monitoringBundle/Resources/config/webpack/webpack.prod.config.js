const path = require("path");
const webpack = require('webpack');
const ExtractTextPluginCss = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const public = path.resolve(__dirname, "..", ".." ,"public");
const bundleName = path.basename( path.resolve( __dirname, "..", "..", "..") );
const commonConfig = require("./webpack.common.js");
const UglifyEsPlugin = require('uglify-es-webpack-plugin');

module.exports = webpackMerge( {
    watch       : false,
    plugins     :[
        new OptimizeCssAssetsPlugin(  {
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: true
        }),
        new UglifyEsPlugin({
           warnings: true,
           compress: true
        })
        /*new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                parallel:true,
                exclude:new RegExp("stage6.js")
        })*/
    ]
}, commonConfig );