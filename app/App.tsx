import { layout, NavigationContainer, StackNavigator, stackScreen } from '@rur/navigation';
import { FullScreenLoader } from '@rur/ui';
import { GraphqlProvider } from 'app-configs';
import { FC } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import useRemoteRoutes from './hooks/useRemoteRoutes';
import MainLayout from './layouts/MainLayout';

import('Account/setup');
import('Transactions/setup');


const App: FC = () => {
    return (
        <View style={styles.container}>
            <StatusBar />
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <GraphqlProvider>
                        <Navigation />
                    </GraphqlProvider>
                </SafeAreaView>
            </SafeAreaProvider>
        </View>
    );
}

const Navigation: FC = () => {
    const accountRoutes = useRemoteRoutes(import('Account/routes'));
    const transactionsRoutes = useRemoteRoutes(import('Transactions/routes'));

    if (!accountRoutes || !transactionsRoutes) {
        return <FullScreenLoader />;
    }

    return (
        <NavigationContainer>
            <StackNavigator>
                {layout(<MainLayout />, [...accountRoutes, ...transactionsRoutes].map(stackScreen))}
            </StackNavigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
