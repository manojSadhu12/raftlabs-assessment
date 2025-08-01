import { Button, H5, P, View } from "@rur/ui";
import { Account } from "app-configs/graphql/types";
import { FC } from "react";
import { Platform, Share, StyleSheet } from "react-native";

type AccountDetailsProps = {
    account: Account
}
const Details: FC<AccountDetailsProps> = ({ account }) => {
    return <View style={styles.container}>
        <View style={styles.accountInfo}>
            <P><H5>Account Number:</H5> {account.account_number}</P>
            <P><H5>Balance:</H5> {account.balance}</P>
        </View>
        <Button
            style={styles.shareAccount}
            onPress={() => {
                const accountDetails = `
Account Details:
Account Number: ${account.account_number}
Balance: ${account.balance}
`.trim();

                if (Platform.OS === 'web') {
                    window.navigator.clipboard.writeText(accountDetails);
                    window.alert('Account details copied to clipboard');
                } else {
                    Share.share({ message: accountDetails });
                }
            }}>
            {Platform.OS == 'web' ? 'Copy' : 'Share'} Account Details
        </Button>
    </View >

}

const styles = StyleSheet.create({
    container: {
        marginTop: 26,
        // maxWidth: 400,
        flexGrow: 1,
        alignItems: 'center'
    },
    accountInfo: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        gap: 8,
        backgroundColor: '#0000001d',
    },
    shareAccount: {
        alignSelf: 'center',
        marginTop: 16
    }
});

export default Details;