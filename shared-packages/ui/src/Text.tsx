import { FC } from "react";
import { AccessibilityRole, Platform, StyleProp, TextProps, Text as TextRN, TextStyle } from "react-native";

const textWrapper = (tag: string, style?: StyleProp<TextStyle>) => {
    const extraProps = Platform.OS == 'web' ? { accessibilityRole: tag as AccessibilityRole } : undefined
    return (props: TextProps) => {
        return (
            <TextRN
                {...props}
                style={[style, props.style]}
                {...extraProps}
            >
                {props.children}
            </TextRN>
        );
    }
}

export const H1: FC<TextProps> = textWrapper('h1', { fontSize: 32, fontWeight: 'bold' });
export const H2: FC<TextProps> = textWrapper('h2', { fontSize: 24, fontWeight: 'bold' });
export const H3: FC<TextProps> = textWrapper('h3', { fontSize: 20, fontWeight: 'bold' });
export const H4: FC<TextProps> = textWrapper('h4', { fontSize: 18, fontWeight: 'bold' });
export const H5: FC<TextProps> = textWrapper('h5', { fontSize: 16, fontWeight: 'bold' });
export const H6: FC<TextProps> = textWrapper('h6', { fontSize: 14, fontWeight: 'bold' });
export const P: FC<TextProps> = textWrapper('p', { fontSize: 16, fontWeight: 'normal' });
export const Text: FC<TextProps> = textWrapper('snap', { fontSize: 16, fontWeight: 'normal' });