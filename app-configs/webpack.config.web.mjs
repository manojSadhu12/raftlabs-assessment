import baseConfig from '@platform/web/webpack.base.config.mjs';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

import pkg from '@platform/web/package.json' with { type: 'json' };
import appPkg from 'app/package.json' with { type: 'json' };

const sharedDependencies = { ...pkg.dependencies, ...appPkg.dependencies };

const { ModuleFederationPlugin } = webpack.container;

export default merge(baseConfig, {
  plugins: [
    new ModuleFederationPlugin({
      name: 'app',
      filename: 'remoteEntry.js',
      exposes: {
        './GraphqlProvider': '../../app-configs/graphql/GraphqlProvider',
      },
      remotes: {
        Account: 'Account@http://localhost:3001/remoteEntry.js',
        Transactions: 'Transactions@http://localhost:3002/remoteEntry.js',
      },
      shared: Object.fromEntries(
        Object.entries(sharedDependencies).map(([dep, version]) => [
          dep,
          {
            singleton: true,
            eager: true,
            requiredVersion: version,
          },
        ]),
      ),
    }),
  ]
});