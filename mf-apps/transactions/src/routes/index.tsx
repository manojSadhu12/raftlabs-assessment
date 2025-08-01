import { StackScreenProps } from '@rur/navigation/types';
import Transactions from "./Transactions";

const routes: StackScreenProps[] = [
    { path: "transactions", name: 'Transactions', element: <Transactions /> }
];

export default routes;