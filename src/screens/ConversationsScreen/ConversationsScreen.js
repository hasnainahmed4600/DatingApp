import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    ScrollView,
    View
} from "react-native";
import { useSelector } from "react-redux";
import CardDetailsView from "../../components/swipe/CardDetailsView/CardDetailsView";
import ConversationsHomeComponent from './ConversationsHomeComponent';
import DynamicAppStyles from '../../DynamicAppStyles';
import { TNTouchableIcon } from '../../Core/truly-native';
import { IMLocalized } from '../../Core/localization/IMLocalization';

const ConversationsScreen = props => {
    const matches = useSelector(state => state.dating.matches);
    const currentUser = useSelector(state => state.auth.user);

    const [selectedUser, setSelectedUser] = useState({});
    const [isUserProfileDetailVisible, setIsUserProfileDetailVisible] = useState(
        false
    );

    useEffect(() => {
    }, [currentUser, matches]);

    const renderCardDetailModal = () => {
        const {
            profilePhoto,
            firstName,
            lastName,
            age,
            school,
            distance,
            bio,
            featuredPhoto,
        } = selectedUser;

        return (
            <CardDetailsView
                profilePhoto={profilePhoto}
                firstName={firstName}
                lastName={lastName}
                age={age}
                school={school}
                distance={distance}
                bio={bio}
                instagramPhotos={featuredPhoto ? featuredPhoto : []}
                setShowMode={() => setIsUserProfileDetailVisible(true)}
            />
        );
    };

    const onEmptyStatePress = () => {
        props.navigation.pop();
    }

    const onMatchUserItemPress = (otherUser) => {
        const id1 = currentUser.id || currentUser.userID;
        const id2 = otherUser.id || otherUser.userID;
        const channel = {
            id: id1 < id2 ? id1 + id2 : id2 + id1,
            participants: [otherUser]
        }
        props.navigation.navigate('PersonalChat', { channel, appStyles: DynamicAppStyles });
    }

    const emptyStateConfig = {
        title: IMLocalized("No Conversations"),
        description: IMLocalized("Tap to start chatting with the people you matched with above. Your conversations will show up here."),
        buttonName: IMLocalized("Keep Chirping!"),
        onPress: onEmptyStatePress,
    };

    return (
        <ConversationsHomeComponent
            matches={matches}
            onMatchUserItemPress={onMatchUserItemPress}
            navigation={props.navigation}
            appStyles={DynamicAppStyles}
            emptyStateConfig={emptyStateConfig}
        />
    );

    // {/* <View style={styles.container}>
    //            <Modal visible={isUserProfileDetailVisible} animationType={"slide"}>
    //                 <View style={styles.cardDetailContainer}>
    //                     <View style={styles.cardDetailL}>{renderCardDetailModal()}</View>
    //                 </View>
    //             </Modal>
    //         </View> */} 
};

ConversationsScreen.navigationOptions = ({ screenProps, navigation }) => {
    let currentTheme = DynamicAppStyles.navThemeConstants[screenProps.theme];
    return {
        headerTitle: (
            <TNTouchableIcon
                imageStyle={{ tintColor: '#d1d7df' }}
                iconSource={DynamicAppStyles.iconSet.fireIcon}
                onPress={() => navigation.pop()}
                appStyles={DynamicAppStyles}
            />
        ),
        headerRight: (
            <View style={{ flexDirection: 'row' }}>
                <TNTouchableIcon
                    imageStyle={{ tintColor: '#d1d7df' }}
                    iconSource={DynamicAppStyles.iconSet.search}

                    onPress={() => {
                        navigation.pop();
                        navigation.navigate('Search', { appStyles: DynamicAppStyles })
                    }}
                    appStyles={DynamicAppStyles}
                />
                <TNTouchableIcon
                    imageStyle={{ tintColor: DynamicAppStyles.colorSet.mainThemeForegroundColor }}
                    iconSource={DynamicAppStyles.iconSet.conversations}
                    appStyles={DynamicAppStyles}
                />
            </View>

        ),
        headerLeft: (
            <TNTouchableIcon
                imageStyle={{ tintColor: '#d1d7df' }}
                iconSource={DynamicAppStyles.iconSet.userProfile}
                onPress={() => {
                    navigation.pop();
                    navigation.navigate('MyProfileStack', { appStyles: DynamicAppStyles });
                }}
                appStyles={DynamicAppStyles}
            />
        ),
        headerStyle: {
            backgroundColor: currentTheme.backgroundColor,
            borderBottomWidth: 0,
        },
        headerTintColor: currentTheme.fontColor,
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#efeff4"
    },
    cardDetailContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    cardDetailL: {
        position: 'absolute',
        // bottom: 0,
        // width: Statics.DEVICE_WIDTH,
        // height: Statics.DEVICE_HEIGHT * 0.95,
        // paddingBottom: size(100),
        backgroundColor: "white"
    }
});

export default ConversationsScreen;
