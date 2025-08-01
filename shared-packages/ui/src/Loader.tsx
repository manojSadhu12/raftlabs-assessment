import { FC } from "react";
import { ActivityIndicator } from "react-native";

const Loader: FC = () => {
    return (
        <ActivityIndicator size="large" color="black" />
    );
};

export default Loader;