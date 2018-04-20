// 常见的`webpack`配置文件
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');     //生成HTML文件插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');  // 抽离css插件

module.exports = {
  entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件,
  // `__dirname`是 一个全局变量，它指向当前执行脚本所在的目录。
  output: {
    path: __dirname + "/build",
    filename: "bundle-[hash].js"
  },
  devtool: 'none',  //Source Maps
  module: {
    rules: [{
      test: /(\.jsx|\.js)$/,
      use: {
        loader: "babel-loader"
      },
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [{
          loader: "css-loader",
          options: {
            modules: true,
            localIdentName: '[name]__[local]--[hash:base64:5]'
          }
        }, {
          loader: "postcss-loader"
        }],
      })
    }]
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("style.css"),


    new webpack.LoaderOptionsPlugin({  //热更新
      options: {
        devServer: {
          contentBase: "./public", //本地服务器所加载的页面所在的目录
          colors: true, //终端中输出结果为彩色
          historyApiFallback: true, //不跳转
          inline: true //实时刷新
        }
      }
    })
  ]
};