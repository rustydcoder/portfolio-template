const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
   entry: './src/js/index.js',
   output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name].[hash].js"
   },

   plugins: [


      new CopyPlugin({
         patterns: [
            {
               from: 'src/js/mixitup.js',
               to: 'js/[name].[ext]',
            }
         ]
      }),

      new HtmlWebpackPlugin({
         filename: "index.html",
         template: path.resolve(__dirname, 'src', 'index.html'),
      }),

      new MiniCssExtractPlugin({
         filename: "css/style.[contenthash].css"
      }),

      new HtmlWebpackTagsPlugin({
         append: false,
         tags: ['js/mixitup.js']
      })
   ],

   module: {
      rules: [
         {
            test: /\.(sa|sc|c)ss$/,
            use: [
               {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                     publicPath: '../'
                  }
               },
               'css-loader',
               'resolve-url-loader',
               {
                  loader: 'sass-loader',
                  options: {
                     implementation: require('sass'),
                     sassOptions: {
                        outputStyle: 'compressed'
                     }
                  }
               }
            ]
         },
         {
            test: /\.(png|jpg|gif)$/,
            exclude: /node_modules/,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     name: '[path][name]_[contenthash:8].[ext]',
                     context: path.resolve(__dirname, 'src/'),
                     useRelativePaths: true,
                  },
               }
            ],
         },
         {
            test: /\.html$/,
            loader: 'html-loader',
            options: {
               attributes: {
                  list: [
                     {
                        tag: 'img',
                        attribute: 'src',
                        type: 'src',
                     },
                  ],
                  root: path.resolve(__dirname, 'src/')
               }
            },
         }
      ]
   }
}