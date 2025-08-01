import { useLocation, useSearchParams, useNavigate as useWebNavigate } from 'react-router-dom';
import { NavigationContextType } from '../types';
import { webRouteName } from './Navigator.web';
import { objectToQueryString } from './utils';


export function useNavigation(): NavigationContextType {
    const navigate = useWebNavigate();
    const location = useLocation();
    const name = webRouteName();

    const [searchParams] = useSearchParams();

    const params = {};
    for (const [key, value] of searchParams.entries()) {
        params[key] = value;
    }

    return {
        push: (to, params) => navigate(to + (params && '?' + objectToQueryString(params))),
        replace: (to, params) => navigate(to + (params && '?' + objectToQueryString(params)), { replace: true }),
        goBack: () => navigate(-1),
        canGoBack: location.pathname != '/',
        path: location.pathname,
        name: name || '',
        params
    };
}