import { H4, View } from "@rur/ui";
import { FC } from "react";
import { StyleSheet } from "react-native";

type UserWelcomeType = {
    name: string;
};

const UserWelcome: FC<UserWelcomeType> = ({ name }) => {
    return <View style={styles.welcome}>
        <H4>Hi, {name}</H4>
    </View>
}

const styles = StyleSheet.create({
    welcome: {
        padding: 16,
        alignItems: 'center',
    }
});

export default UserWelcome;