import { useQuery } from "@apollo/client";
import { eventBus } from "@rur/event-bus";
import { useNavigation } from "@rur/navigation";
import { FullScreenLoader, P, Text, View } from "@rur/ui";
import { formatDateTime } from "app-configs";
import { Transaction, TransactionsQueryData } from "app-configs/graphql/types";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { QUERY_GET_TRANSACTIONS } from "../../graphql/queries";

const PAGE_END_OFFSET = 100;

const Transactions: FC = () => {
    const { params } = useNavigation();
    const currentTransactionsPage = useRef(0);
    const currentTransactionsPageLoatedTill = useRef(0);

    const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const accountId = params.accountId || 1;

    const { data, loading, error, fetchMore } = useQuery<TransactionsQueryData>(QUERY_GET_TRANSACTIONS, {
        variables: { account_id: accountId, page: currentTransactionsPage.current },
    });

    useEffect(() => {
        if (data?.allTransactions) {
            setAllTransactions((prev) => [...prev, ...data.allTransactions]);
        }
    }, [data]);

    const loadMoreTransactions = useCallback(() => {
        fetchMore({
            variables: {
                account_id: accountId,
                page: currentTransactionsPage.current
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult.allTransactions.length) {
                    setHasMore(false);
                    return prev;
                }
                currentTransactionsPageLoatedTill.current++
                return {
                    allTransactions: fetchMoreResult.allTransactions,
                };
            },
        });
    }, [fetchMore]);

    if (loading && !currentTransactionsPage.current) return <FullScreenLoader />;
    if (error) return <Text>Failed to fetch transactions</Text>;

    if (allTransactions.length) return <View style={styles.container}>
        <FlatList
            style={styles.transaction}
            data={allTransactions}
            keyExtractor={(it) => it.id}
            renderItem={(it) => <TransactionDetails transaction={it.item} />}
            onScroll={hasMore ? (e) => {
                if (currentTransactionsPage.current == currentTransactionsPageLoatedTill.current) {
                    const scrollHeight = e.nativeEvent.contentOffset.y;
                    const remainingBottomSize = e.nativeEvent.contentSize.height - (e.nativeEvent.layoutMeasurement.height + scrollHeight);

                    if (remainingBottomSize < PAGE_END_OFFSET) {
                        currentTransactionsPage.current++;
                        loadMoreTransactions();
                    }
                }
            } : undefined} />

    </View >

    return <Text>No transactions details found</Text>;
}

type TransactionDetailsProps = {
    transaction: Transaction;
}
const TransactionDetails: FC<TransactionDetailsProps> = ({ transaction }) => {
    return (
        <TouchableOpacity style={styles.transaction}
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
            <P style={styles.description}>{transaction.description}</P>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    transactions: {
        padding: 16,
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