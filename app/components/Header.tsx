import { useNavigation } from "@rur/navigation";
import { Card, H3, Text } from "@rur/ui";
import { FC } from "react";
import { TouchableOpacity } from 'react-native';

export const Header: FC = () => {
    const navigation = useNavigation();

    return (
        <Card style={{ padding: 0, flexDirection: 'row', alignItems: 'center', height: 60, paddingStart: 16 }}>
            {
                navigation.canGoBack && <TouchableOpacity style={{ height: 60, paddingRight: 16, alignItems: 'center', justifyContent: 'center' }} onPress={navigation.goBack}>
                    <Text style={{ fontSize: 24 }}>&larr;</Text>
                </TouchableOpacity>
            }

            <H3>
                {navigation.name}
            </H3>
        </Card>
    );
}
