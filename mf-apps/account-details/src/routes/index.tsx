import { StackScreenProps } from '@rur/navigation/types';
import AccountDetails from "./AccountDetails";

const routes: StackScreenProps[] = [
    { path: "/", name: 'Account Details', element: <AccountDetails /> }
];

export default routes;