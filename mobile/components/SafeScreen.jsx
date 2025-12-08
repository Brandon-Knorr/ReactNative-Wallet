import { COLORS } from "@/constants/colors";
import { View } from "react-native";
import React, { useSafeAreaInsets } from "react-native-safe-area-context";

const SafeScreen = ({ children }) => {
    const insets = useSafeAreaInsets();
    return (
        <View
            style={{
                flex: 1,
                paddingTop: insets.top,
                backgroundColor: COLORS.background,
            }}
        >
            {children}
        </View>
    );
};

export default SafeScreen;
