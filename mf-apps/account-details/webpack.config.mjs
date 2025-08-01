import * as Repack from '@callstack/repack';
import pkg from '@platform/mobile/package.json' with { type: 'json' };
import baseConfig from '@platform/mobile/webpack.base.config.mjs';
import appPkg from 'app/package.json' with { type: 'json' };
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

const sharedDependencies = { ...pkg.dependencies, ...appPkg.dependencies };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isMF = process.env.APP_TYPE === 'MF';

const config = merge(baseConfig, {
    context: __dirname,
    plugins: [
        new Repack.plugins.ModuleFederationPluginV2({
            name: 'Account',
            filename: 'Account.container.bundle',
            dts: false,
            exposes: {
                './routes': './src/routes/index.tsx',
                './setup': './setup.ts',
            },
            remotes: {
                app: 'app@http://localhost:3000/app.container.bundle'
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
        isMF && new webpack.IgnorePlugin({
            resourceRegExp: /setUpReactDevTools/,
        }),
    ]
});

export default config;