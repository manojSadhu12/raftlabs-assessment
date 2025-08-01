import type { StackScreenProps } from '@rur/navigation/types';
import { useEffect, useState } from 'react';

function useRemoteRoutes(importModule: Promise<any>) {
    const [routes, setRoutes] = useState<StackScreenProps[] | null>(null);

    useEffect(() => {
        let mounted = true;
        importModule.then(mod => {
            if (mounted) setRoutes(mod.default);
        });
        return () => { mounted = false; };
    }, []);

    return routes;
}

export default useRemoteRoutes;