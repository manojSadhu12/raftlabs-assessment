import * as Repack from '@callstack/repack';
import pkg from '@platform/mobile/package.json' with { type: 'json' };
import baseConfig from '@platform/mobile/webpack.base.config.mjs';
import appPkg from 'app/package.json' with { type: 'json' };
import { merge } from 'webpack-merge';

const sharedDependencies = { ...pkg.dependencies, ...appPkg.dependencies };

const config = merge(baseConfig, {
    plugins: [
        new Repack.plugins.ModuleFederationPluginV2({
            name: 'app',
            filename: 'app.container.bundle',
            dts: false,
            remotes: {
                Account: 'Account@http://localhost:8082/Account.container.bundle',
                Transactions: 'Transactions@http://localhost:8083/Transactions.container.bundle'
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

export default config;