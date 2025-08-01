import { useQuery } from "@apollo/client";
import { eventBus } from '@rur/event-bus';
import { useNavigation } from "@rur/navigation";
import { H5, Loader, P, Text, View } from "@rur/ui";
import { formatDateTime } from "app-configs";
import { Transaction, TransactionsQueryData } from "app-configs/graphql/types";
import { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { QUERY_GET_LATEST_TRANSACTIONS } from "../../graphql/queries";

type TransactionsProps = {
    accountId: string;
};
const Transactions: FC<TransactionsProps> = ({ accountId }) => {
    const navigation = useNavigation();

    const { data, loading, error } = useQuery<TransactionsQueryData>(QUERY_GET_LATEST_TRANSACTIONS, {
        variables: { account_id: accountId },
    });

    if (loading) return <Loader />;
    if (error) return <Text>Failed to fetch latest transactions</Text>;

    if (data && data.allTransactions) return <View style={styles.transactions}>
        {
            data.allTransactions.map((transaction) => (
                <TransactionDetails key={transaction.id} transaction={transaction} />
            ))
        }
        <TouchableOpacity style={styles.allTransactions}
            onPress={() => navigation.push('Transactions', { accountId })}>
            <H5>View All Transactions {'>>>'}</H5>
        </TouchableOpacity>
    </View>

    return <Text>No transactions details found</Text>;
};

type TransactionDetailsProps = {
    transaction: Transaction;
}
const TransactionDetails: FC<TransactionDetailsProps> = ({ transaction }) => {
    return (
        <TouchableOpacity
            style={styles.transaction}
            onPress={() => eventBus.emit('openTransaction', transaction)}>
            <View style={styles.transactionDetails}>
                <P>{formatDateTime(transaction.date)}</P>
                <View style={styles.amount}>
                    <Text>${transaction.amount}</Text>
                    <Text style={[styles.transactionType, { color: transaction.type == 'DEBIT' ? 'red' : 'green' }]}>
                        {transaction.type == 'DEBIT' ? 'Dr' : 'Cr'}
                    </Text>
                </View>
            </View>
            <P style={styles.description} numberOfLines={1} ellipsizeMode="tail">{transaction.description}</P>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    transactions: {
        padding: 16,
        flexGrow: 1,
    },
    transaction: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 8,
    },
    transactionDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    amount: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    transactionType: {
        fontSize: 10,
        marginLeft: 8,
    },
    description: {
        fontSize: 12,
        fontStyle: 'italic',
        color: '#666',
        marginTop: 4,
    },
    allTransactions: {
        marginTop: 16,
        alignSelf: 'center'
    }
});

export default Transactions;