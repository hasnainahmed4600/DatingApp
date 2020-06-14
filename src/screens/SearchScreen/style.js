import { DynamicStyleSheet } from 'react-native-dark-mode';
import DynamicAppStyles from "../../DynamicAppStyles";
import { DEVICE_HEIGHT } from "../../helpers/statics";
import { size } from "../../helpers/devices";
import { DynamicValue } from 'react-native-dark-mode';

const dynamicStyle = new DynamicStyleSheet({
    container: {
        // width: Platform.OS === 'ios' ? '120%' : '100%',    
        width: '95%',
        alignSelf: 'center',
        marginBottom: 4,
    },
    cancelButtonText: {
        color: DynamicAppStyles.colorSet.mainTextColor,
        fontSize: 16,
        marginBottom: 5,
    },
    searchInput: {
        fontSize: 16,
        color: DynamicAppStyles.colorSet.mainTextColor,
        backgroundColor: DynamicAppStyles.colorSet.whiteSmoke,
    },
    body: {
        flex: 1,
        backgroundColor: '#000000'
    },
    photoView: {
        width: "100%",
        height: DEVICE_HEIGHT * 0.50,
        backgroundColor: "skyblue",
    },
    profilePhoto: {
        width: "100%",
        height: "100%"
    },
    backView: {
        position: "absolute",
        top: DEVICE_HEIGHT * 0.46,
        right: 20,
        width: 55,
        height: 55,
        borderRadius: 27.5,
        backgroundColor: "#8CC63F",
        justifyContent: "center",
        alignItems: "center"
    },
    backIcon: {
        width: 30,
        height: 30,
        resizeMode: "contain",
        tintColor: "white"
    },
    titleView: {
        width: "100%",
        paddingHorizontal: 12,
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end"
    },
    nameText: {
        fontSize: 30,
        fontWeight: "bold",
        marginRight: 10,
        color: '#000000'
    },
    ageText: {
        bottom: 1,
        fontSize: 25,
        color: '#000000'
    },
    captionView: {
        width: "100%",
        paddingHorizontal: 12
    },
    itemView: {
        width: "100%",
        paddingVertical: 2,
        marginVertical: 2,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end"
    },
    icon: {
        width: size(20),
        height: size(20),

    },
    text: {
        width: "100%",
        paddingLeft: size(10),
        fontSize: size(17),
        color: '#000000',
        backgroundColor: "transparent",
    },
    lineView: {
        marginTop: 4,
        width: "100%",
        height: 1,
        backgroundColor: DynamicAppStyles.colorSet.hairlineColor
    },
    bioView: {
        width: "100%",
        paddingHorizontal: 12,
        marginVertical: 15
    },
    label: {
        fontSize: size(17),
        color: '#000000'
    },
    bioText: {
        fontSize: size(17),
        color: '#000000'
    },
    instagramView: {
        width: "100%",
        height: 270,
        paddingHorizontal: 12
    },
    slide: {
        flex: 1,
        justifyContent: "center"
    },
    myphotosItemView: {
        width: 200,
        height: "90%",
        marginHorizontal: 8,
        marginVertical: 8,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey",

    },
    inlineActionsContainer: {
        flex: 1,
        width: "100%",
        backgroundColor: new DynamicValue("#ffffffee", "#00000066"),
        alignSelf: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 0
    },
    closeButton: {
        alignSelf: "flex-end",
        height: 35,
        width: 35,
        borderRadius: 12,
        backgroundColor: "rgba(0,0,0,0.2)",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginRight: 15
    },
    closeButton__text: {
        backgroundColor: "transparent",
        fontSize: 35,
        lineHeight: 35,
        color: "#FFF",
        textAlign: "center"
    },
    GridViewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        margin: 5,
        backgroundColor: '#8CC63F',
        borderRadius: 5
    },
    GridViewTextLayout: {
        fontSize: 16,
        fontWeight: 'bold',
        justifyContent: 'center',
        color: '#fff',
        padding: 1,
    }
});

export default dynamicStyle;
