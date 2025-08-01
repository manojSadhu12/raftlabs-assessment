import * as Repack from '@callstack/repack';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';

const { DefinePlugin } = webpack;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Webpack configuration enhanced with Re.Pack defaults for React Native.
 *
 * Learn about webpack configuration: https://webpack.js.org/configuration/
 * Learn about Re.Pack configuration: https://re-pack.dev/docs/guides/configuration
 */

export default {
  context: __dirname,
  entry: './index.js',
  resolve: {
    ...Repack.getResolveOptions(),
  },
  module: {
    rules: [
      {
        test: /\.[cm]?[jt]sx?$/,
        use: 'babel-loader',
        type: 'javascript/auto',
      },
      ...Repack.getAssetTransformRules(),
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.(js)?bundle(\?.*)?$/i,
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new Repack.RepackPlugin({
      extraChunks: [
        {
          test: [/^.+\.local$/, /^app-configs*$/],
          type: "local",
        }
      ]
    }),
    new DefinePlugin({
      __MF_APP__: process.env.APP_TYPE === 'MF',
    }),
  ],
};