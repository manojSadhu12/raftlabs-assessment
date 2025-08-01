import { FC } from "react";
import { StyleSheet, View } from "react-native";
import Loader from "./Loader";

const FullScreenLoader: FC = () => {
    return (
        <View style={styles.container}>
            <Loader />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default FullScreenLoader;