import { FC } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

export type CardProps = {} & ViewProps;

const Card: FC<CardProps> = ({ style, ...props }) => {
    return (
        <View style={[styles.card, style]} {...props} />
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
});

export default Card;