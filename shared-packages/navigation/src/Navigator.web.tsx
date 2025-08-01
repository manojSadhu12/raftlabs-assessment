import { createContext, ReactNode, use, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import type { NavigationContainerProps, StackNavigatorProps, StackScreenProps } from '../types';

const WebRouteNameContext = createContext<{ name: string, setName: (name: string) => void } | undefined>(undefined);

function Page({ title, children }) {
    const setName = use(WebRouteNameContext)?.setName;

    useEffect(() => {
        if (title) document.title = title;
        setName?.(title);
    }, [title]);

    return children;
}
export function NavigationContainer({ children }: NavigationContainerProps) {
    const [name, setName] = useState('');
    return <WebRouteNameContext value={{ name, setName }}><BrowserRouter>{children}</BrowserRouter></WebRouteNameContext>;
}

export function StackNavigator({ children }: StackNavigatorProps) {
    return <Routes>{children}</Routes >;
}

export function stackScreen({ path, name, element }: StackScreenProps) {
    return <Route path={path ?? name} element={<Page title={name}>{element}</Page>} />;
}

export function layout(element: ReactNode, children: ReactNode) {
    return <Route element={element} children={children} />;
}

export function webRouteName() {
    return use(WebRouteNameContext)?.name;
}

export { Outlet, Route as StackScreen } from 'react-router-dom';
