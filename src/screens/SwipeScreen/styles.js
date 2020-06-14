import { DynamicStyleSheet } from 'react-native-dark-mode';
import DynamicAppStyles from "../../DynamicAppStyles";
import TNColor from "../../Core/truly-native/TNColor";

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
        backgroundColor: TNColor("#F4F8F3"),
        height: "100%"
    },
    safeAreaContainer: {
        flex: 1,
        backgroundColor: DynamicAppStyles.colorSet.mainThemeBackgroundColor,
    }
});

export default dynamicStyles;