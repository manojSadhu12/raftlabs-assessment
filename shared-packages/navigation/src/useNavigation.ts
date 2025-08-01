import { StackActions, useNavigation as useNativeNavigation, useRoute } from '@react-navigation/native';
import { NavigationContextType, Params } from '../types';

export function useNavigation(): NavigationContextType {
    const navigation = useNativeNavigation();
    const route = useRoute();

    return {
        push: (...args) => navigation.dispatch(StackActions.push(...args)),
        replace: (...args) => navigation.dispatch(StackActions.replace(...args)),
        goBack: () => navigation.dispatch(StackActions.pop(1)),
        canGoBack: navigation.canGoBack(),
        path: route.path || '',
        name: route.name,
        params: (route.params || {}) as Params
    };
}