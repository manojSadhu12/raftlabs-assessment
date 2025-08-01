import type { ReactNode } from 'react';

export type Params = Readonly<Record<string, number | string | boolean | undefined | null>>
export type NavigateTo = (to: string, params?: Params) => void;

export type NavigationContextType = {
    push: NavigateTo;
    replace: NavigateTo;
    goBack: () => void;
    canGoBack: boolean;
    path: string;
    name: string;
    params: Params;
};

export interface NavigationContainerProps {
    children: ReactNode;
}

export interface StackNavigatorProps {
    children: ReactNode;
}

export interface StackScreenProps {
    path: string;
    name: string;
    element: ReactNode;
}
export interface StackLayoutProps {
    element: ReactNode;
    children: ReactNode;
}