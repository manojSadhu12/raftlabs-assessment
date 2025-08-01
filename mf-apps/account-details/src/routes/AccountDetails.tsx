import { useQuery } from "@apollo/client";
import { FullScreenLoader, Text, View } from "@rur/ui";
import { CustomerQueryData } from "app-configs/graphql/types";
import { FC } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { QUERY_GET_CUSTOMER } from "../../graphql/queries";
import Details from "../components/Details";
import Transactions from "../components/Transactions";
import UserWelcome from "../components/UserWelcome";

const AccountDetails: FC = () => {
    const { data, loading, error } = useQuery<CustomerQueryData>(QUERY_GET_CUSTOMER, {
        variables: { id: 1 },
    });

    if (loading) return <FullScreenLoader />;
    if (error) return <Text>Failed to fetch user details </Text>;

    if (data && data.Customer) return <ScrollView style={styles.container}>
        <UserWelcome name={data.Customer.name} />
        {data.Customer.Accounts && data.Customer.Accounts.length
            && <View style={styles.adaptiveRow}>
                <Details account={data.Customer.Accounts[0]} />
                <Transactions accountId={data.Customer.Accounts[0].id} />
            </View>
        }
    </ScrollView>

    return <Text>No account details found</Text>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    adaptiveRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
})

export default AccountDetails;