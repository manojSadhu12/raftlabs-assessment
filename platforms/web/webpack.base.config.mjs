import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const { DefinePlugin } = webpack;

const transpileModules = [
  'react-native',
  'react-native-web',
  'react-native-worklets',
].join('|');

export default {
  entry: './index.js',
  mode: 'development',
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  output: {
    publicPath: 'auto',
    clean: true,
  },
  resolve: {
    extensions: ['.web.js', '.js', '.web.jsx', '.jsx', '.web.ts', '.ts', '.web.tsx', '.tsx'],
    alias: {
      'react-native$': 'react-native-web'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        // test: /\.[cm]?[jt]sx?$/,
        exclude: new RegExp(`node_modules/(?!(${transpileModules})/)`),
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset/resource'
      },
    ]
  },
  plugins: [
    new DefinePlugin({
      __DEV__: JSON.stringify(true),
    }),
    new DefinePlugin({
      __MF_APP__: process.env.APP_TYPE === 'MF',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  ignoreWarnings: [
    {
      module: /react-native-worklets/,
      message: /require function is used in a way/
    }
  ]
};
