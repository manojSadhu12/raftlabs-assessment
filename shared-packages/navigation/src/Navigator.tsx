import { NavigationContainer as NativeNavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createContext, ReactNode, use } from 'react';
import type { NavigationContainerProps, StackNavigatorProps, StackScreenProps } from '../types';

const Stack = createNativeStackNavigator();

const OutletContext = createContext<ReactNode>(undefined)

export function NavigationContainer({ children }: NavigationContainerProps) {
    return <NativeNavigationContainer>{children}</NativeNavigationContainer>;
}

export function StackNavigator({ children }: StackNavigatorProps) {
    return <Stack.Navigator screenOptions={{ headerShown: false }}>
        {children}
    </Stack.Navigator>;
}

export function stackScreen({ name, element }: StackScreenProps) {
    const Compoment = () => element;
    return <Stack.Screen name={name} component={Compoment} />;
}

export function layout(element: ReactNode, children: ReactNode) {
    return <Stack.Group
        screenLayout={({ children }) => (
            <OutletContext value={children}>
                {element}
            </OutletContext>
        )}
    >
        {children}
    </Stack.Group>
}

export function Outlet() {
    return use(OutletContext);
}