import baseConfig from '@platform/web/webpack.base.config.mjs';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

import { fileURLToPath } from 'node:url';
import path from 'path';

import pkg from '@platform/web/package.json' with { type: 'json' };
import appPkg from 'app/package.json' with { type: 'json' };

const sharedDependencies = { ...pkg.dependencies, ...appPkg.dependencies };

const { ModuleFederationPlugin } = webpack.container;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const federationConfig = {
    name: 'Account',
    filename: 'remoteEntry.js',
    exposes: {
        './routes': './src/routes/index.tsx',
        './setup': './setup.ts',
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
};

export default merge(baseConfig, {
    entry: './index.web.js',
    devServer: {
        port: 3001,
    },
    output: {
        path: path.resolve(__dirname, 'build/web'),
    },
    plugins: [
        new ModuleFederationPlugin(federationConfig),
    ]
});