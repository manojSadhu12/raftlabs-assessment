import './setup';

import { name as appName } from '@platform/mobile/app.json';
import { NavigationContainer, StackNavigator, stackScreen } from '@rur/navigation';
import { GraphqlProvider } from "app-configs";
import { AppRegistry } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import routes from './src/routes';

const App = () => (
    <GraphqlProvider>
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <NavigationContainer>
                    <StackNavigator>
                        {routes.map(stackScreen)}
                    </StackNavigator>
                </NavigationContainer>
            </SafeAreaView>
        </SafeAreaProvider>
    </GraphqlProvider>
)
AppRegistry.registerComponent(appName, () => App);
