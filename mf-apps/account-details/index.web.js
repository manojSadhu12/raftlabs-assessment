import './setup';

import { NavigationContainer, StackNavigator, stackScreen } from '@rur/navigation';
import { GraphqlProvider } from "app-configs";
import ReactDOM from "react-dom/client";
import routes from './src/routes';

const App = () => (
    <GraphqlProvider>
        <NavigationContainer>
            <StackNavigator>
                {routes.map(stackScreen)}
            </StackNavigator>
        </NavigationContainer>
    </GraphqlProvider>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);