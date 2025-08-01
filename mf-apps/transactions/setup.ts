import { eventBus } from '@rur/event-bus';
import { formatDateTime } from 'app-configs';
import { Transaction } from "app-configs/graphql/types";
import { Alert, Platform } from 'react-native';

eventBus.on('openTransaction', (transaction: Transaction) => {
    const transactionDetails = `
TransactionId: ${transaction.id}
Transaction Amount: $${transaction.amount}
Transaction done at: ${formatDateTime(transaction.date)}
Transaction Type: ${transaction.type}
`.trim();

    if (Platform.OS === 'web') {
        window.alert('Transaction details:\n' + transactionDetails);
    } else {
        Alert.alert('Transaction details:', transactionDetails)
    }
});