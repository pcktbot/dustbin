const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = [
  {
    entry: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/server.js')
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    mode: 'production',
    devtool: '#source-map',
    target: 'node',
    module: {
      rules: [
        {
          test: /\.js/,
          include: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'test'),
            path.resolve(__dirname, 'public/js')
          ],
          use: [
            {
              loader: 'eslint-loader',
              options: {
                formatter: require('eslint-friendly-formatter')
              }
            }
          ]
        }
      ]
    },
    externals: [nodeExternals()],
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
  }
]
