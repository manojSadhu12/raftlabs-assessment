import { FC } from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Card, { CardProps } from './Card';

type ButtonProps = {
    children: string | string[],
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
} & CardProps;

const Button: FC<ButtonProps> = ({ children, style, onPress, ...props }) => {
    return (
        <TouchableOpacity style={style} onPress={onPress}
            accessibilityRole="button">
            <Card
                style={[styles.button, style]}
                {...props}>
                <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
                    {typeof children == 'string' ? children : children.join(' ')}
                </Text>
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 16,
        backgroundColor: 'black',
        borderRadius: 50,
        alignItems: 'center'
    }
})

export default Button;