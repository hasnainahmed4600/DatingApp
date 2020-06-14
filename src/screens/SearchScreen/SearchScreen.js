
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { ReactReduxContext } from "react-redux";
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import Swiper from "react-native-swiper";
import FastImage from "react-native-fast-image";
import ImageView from "react-native-image-view";
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import dynamicStyle from './style';
import DynamicAppStyles from "../../DynamicAppStyles";
import AppStyles from "../../AppStyles";
import { TNTouchableIcon } from '../../Core/truly-native';
import firebase from 'react-native-firebase';
import BottomTabBar from "../../components/swipe/bottom_tab_bar";
import { IMLocalized } from "../../Core/localization/IMLocalization";
import { DEVICE_WIDTH } from "../../helpers/statics";
import SwipeTracker from "../../firebase/tracker";

const HIT_SLOP = { top: 15, left: 15, right: 15, bottom: 15 };

const SearchScreen = props => {
    const { onChangeText, onSearchBarCancel, onSearchClear, searchRef } = props;
    const styles = useDynamicStyleSheet(dynamicStyle);
    const [appStyles, SetappStyles] = useState(DynamicAppStyles);
    // const [form, Setform] = useState(DatingConfig.userGroupFields);
    const [initialValuesDict, SetinitialValuesDict] = useState(firestoreUsers.group || {});
    const [alteredFormDict, SetalteredFormDict] = useState({});
    const [users, setUsers] = useState([]); // Initial empty array of users
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [query, setQuery] = useState('');
    const debounceQuery = useDebounce(query, 300);

    const [filterData, setFilterData] = useState([]);
    const [showMode, setshowMode] = useState('0');
    const [itemDetail, setItemDetail] = useState({});
    const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
    const [tappedImageIndex, setTappedImageIndex] = useState(null);
    const [swiperDotWidth, setSwiperDotWidth] = useState(null);
    const [myPhotos, setMyPhoto] = useState([]);
    const [instagramPhotos, setInstagramPhotos] = useState([]);
    const { state } = props.navigation;

    const { store } = useContext(ReactReduxContext);
    const swipeTracker = new SwipeTracker(store, firestoreUsers.id || firestoreUsers.userID);
    var [flockName, setFlockName] = useState(state.params.flockName);


    useEffect(() => {
        setSwiperDotWidth(Math.floor(DEVICE_WIDTH / myPhotos.length) - 4);
    }, []);

    const onSwipe = (type, item) => {
        swipeTracker.addSwipe(firestoreUsers, item, type, response => { });
        setshowMode('0');

    };

    const closeButton = () => (
        <TouchableOpacity
            hitSlop={HIT_SLOP}
            style={styles.closeButton}
            onPress={() => setIsImageViewerVisible(false)}
        >
            <Text style={styles.closeButton__text}>×</Text>
        </TouchableOpacity>
    );

    const formatViewerImages = () => {
        const myPhotos = [];

        instagramPhotos.map(featuredPhoto => {
            myPhotos.push({
                source: {
                    uri: featuredPhoto
                },
                width: Dimensions.get("window").width,
                height: Math.floor(Dimensions.get("window").height * 0.6)
            });

        });
        console.log("success");
        return myPhotos;

    };



    useEffect(() => {

        const lowerCaseQuery = debounceQuery;
        const newCustomer = users
            .filter((user) => user.firstName.includes(lowerCaseQuery))
            .map((user) => ({
                ...user,
            }))
            .sort((a, b) => a.rank - b.rank);

        setFilterData(newCustomer);
    }, [debounceQuery]);


    // On load, fetch our users and subscribe to updates
    useEffect(() => {
        const unsubscribe = firebase.firestore()
            .collection('users')
            .onSnapshot((querySnapshot) => {

                // const filter = firestoreUsers.group;
                const users = querySnapshot.docs.map((documentSnapshot) => {
                    return {
                        // ...documentSnapshot.data(),
                        firstName: documentSnapshot.data().firstName,
                        lastName: documentSnapshot.data().lastName,
                        profilePhoto: documentSnapshot.data().profilePhoto,
                        school: documentSnapshot.data().school,
                        email: documentSnapshot.data().email,
                        group: documentSnapshot.data().group,
                        userID: documentSnapshot.data().userID,
                        age: documentSnapshot.data().age,
                        zodiac: documentSnapshot.data().zodiac,
                        flocks: documentSnapshot.data().flocks,
                        igHangle: documentSnapshot.data().igHandle,
                        cohort: documentSnapshot.data().cohort,
                        featuredPhoto: documentSnapshot.data().featuredPhoto,
                        bio: documentSnapshot.data().bio,
                        id: documentSnapshot.data().id,
                        // required for FlatList
                    };
                });

                var oldEmail = "";
                var showUsers = [];
                for (i = 0; i < users.length; i++) {

                    if (users[i].group == null) {
                        users[i].group = {};
                    }
                    if (firestoreUsers.email != users[i].email) {
                        if (flockName == null) {
                            if (users[i].school == firestoreUsers.school) {
                                if (users[i].email != oldEmail) {

                                    showUsers.push(users[i]);
                                    oldEmail = users[i].email;

                                }
                            }

                        }
                        Object.keys(users[i].group).forEach(function (key) {

                            if (users[i].group[key] == true) {
                                var value = key;
                                if (value == flockName) {
                                    if (users[i].school == firestoreUsers.school) {
                                        if (users[i].email != oldEmail) {
                                            if (value == key) {
                                                // setUsers(users[i]);
                                                showUsers.push(users[i]);
                                                oldEmail = users[i].email;
                                            }
                                        }
                                    }
                                }


                            }

                        });
                    }
                    // Update state with the users array
                    setUsers(showUsers);
                }
                // As this can trigger multiple times, only update loading after the first update
                if (loading) {
                    setLoading(false);
                }
            });
        return () => unsubscribe(); // Stop listening for updates whenever the component unmounts
    }, []);

    if (loading) {
        return null; // Show a loading spinner
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    setshowMode('1');
                    setItemDetail(item);
                    setInstagramPhotos(item.featuredPhoto);
                    setMyPhoto([item.profilePhoto]);

                }}>
                <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                    <View style={{ height: 40, width: 40, paddingLeft: 10, alignItems: 'center', justifyContent: 'center', }}>
                        <Image source={{ url: item.profilePhoto }} style={{ width: 40, height: 40, borderRadius: 40 / 2, backgroundColor: '#000000' }} />
                    </View>
                    <View style={{ paddingLeft: 20 }}>
                        <Text style={{ color: '#000000' }}>{`${item.firstName} ${item.lastName}`}</Text>
                        <Text style={{ color: '#000000' }}>{item.school}</Text>
                    </View>
                    <View style={{ right: 20, position: 'absolute', }}>
                        <Image style={{ backgroundColor: '#000000' }} source={DynamicAppStyles.iconSet.share} />
                    </View>
                </View>
            </TouchableOpacity>
        );

    }

    const viewFlocks = item => {
        setshowMode('0');
        setFlockName(item);
    }


    return (
        showMode != 1 ?
            <View style={styles.container}>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 10 }}><Text style={{ fontSize: 18 }}>{flockName}</Text></View>
                <View>
                    <SearchBar
                        placeholder="Search"
                        onChangeText={setQuery}
                        value={query}
                        inputStyle={{ backgroundColor: 'white' }}
                        containerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 5 }}
                        placeholderTextColor={'#g5g5g5'}
                    />
                </View>
                {state.params.flockName ? <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}><Text style={{ fontSize: 14 }}>{users.length} members</Text></View> : null}
                <View style={{ height: "85%" }}>
                    {/* <Tabs> */}
                    {/* First tab */}
                    <View title="Users">
                        <FlatList
                            style={{ backgroundColor: '#FFFFFF', paddingTop: 10, }}
                            data={filterData.length == 0 ? users : filterData}
                            keyExtractor={item => item.userID}
                            renderItem={this.renderItem}
                        />
                    </View>
                    {/* Second tab */}
                    {/* <View title="Flocks" >
                            <IMFormComponent
                                form={DatingConfig.userGroupFields}
                                initialValuesDict={initialValuesDict}
                                onFormChange={onFormChange}
                                appStyles={appStyles}

                            />
                        </View> */}

                    {/* </Tabs> */}
                </View>
            </View>
            : <View>
                <ScrollView bounces={false}>
                    <View style={styles.photoView}>
                        <Swiper
                            style={styles.wrapper}
                            removeClippedSubviews={false}
                            showsButtons={false}
                            loop={false}
                            paginationStyle={{ top: 5, bottom: null }}

                        >
                            {myPhotos.map((featuredPhoto, i) => (
                                <FastImage
                                    key={"photos" + i}
                                    style={styles.profilePhoto}
                                    source={{ uri: featuredPhoto }}
                                />
                            ))}
                        </Swiper>
                    </View>
                    <TouchableOpacity
                        style={styles.backView}
                        onPress={() => setshowMode(0)}
                    >
                        <Image
                            style={styles.backIcon}
                            source={AppStyles.iconSet.arrowdownIcon}
                        />
                    </TouchableOpacity>
                    <View style={styles.titleView}>
                        <Text style={styles.nameText}>{itemDetail.firstName} {itemDetail.lastName}</Text>
                        <Text style={styles.ageText}>{itemDetail.age}</Text>
                    </View>
                    <View style={styles.captionView}>
                        <View style={styles.itemView}>
                            <Image style={styles.icon} source={AppStyles.iconSet[itemDetail.zodiac]} />
                            <Text style={styles.text}>{itemDetail.zodiac}</Text>
                        </View>
                        <View style={styles.itemView}>
                            <Image style={styles.icon} source={AppStyles.iconSet.schoolIcon} />
                            <Text style={styles.text}>{itemDetail.school}</Text>
                        </View>
                        <View style={styles.itemView}>
                            <Image style={styles.icon} source={AppStyles.iconSet.cohortIcon} />
                            <Text style={styles.text}>{itemDetail.cohort}</Text>
                        </View>
                        <View style={styles.itemView}>
                            <Image style={styles.icon} source={AppStyles.iconSet.igIcon} />
                            <Text style={styles.text}>{itemDetail.igHandle}</Text>
                        </View>
                        <View style={styles.itemView}>
                            <Image style={styles.icon} source={AppStyles.iconSet.groupsIcon} />
                            <FlatList
                                horizontal={true}
                                data={itemDetail.flocks}
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            viewFlocks(item.key);
                                        }}
                                        key={item.key}
                                    >
                                        <View style={styles.GridViewContainer}>
                                            <Text style={styles.GridViewTextLayout} > {item.key} </Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            // numColumns={3}
                            />
                        </View>
                    </View>
                    {/* <View style={styles.lineView} /> */}
                    <View style={styles.bioView}>
                        <Text style={styles.bioText}>{itemDetail.bio}</Text>
                    </View>
                    {instagramPhotos.length > 0 && (
                        <View style={styles.instagramView}>
                            <View style={styles.itemView}>
                                <Text style={[styles.label]}>
                                    {IMLocalized('Parrot Photos')}
                                </Text>
                            </View>
                            <Swiper
                                showsButtons={false}
                                loop={true}
                                paginationStyle={{ top: -240, left: null, right: 0 }}
                                dot={
                                    <View
                                        style={{
                                            backgroundColor: "rgba(0,0,0,.6)",
                                            width: 8,
                                            height: 8,
                                            borderRadius: 4,
                                            marginLeft: 3,
                                            marginRight: 3,
                                            marginTop: 3,
                                            marginBottom: 3
                                        }}
                                    />
                                }
                                activeDot={
                                    <View
                                        style={{
                                            backgroundColor: "#db6470",
                                            width: 8,
                                            height: 8,
                                            borderRadius: 4,
                                            marginLeft: 3,
                                            marginRight: 3,
                                            marginTop: 3,
                                            marginBottom: 3
                                        }}
                                    />
                                }
                            >

                                <View key={"photos"} style={styles.slide}>
                                    <FlatList
                                        horizontal={true}
                                        data={instagramPhotos}
                                        scrollEnabled={true}
                                        renderItem={({ item, index }) => (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setIsImageViewerVisible(true);
                                                    setTappedImageIndex(index);
                                                }}
                                                key={"item" + index}
                                                style={styles.myphotosItemView}
                                            >

                                                <FastImage
                                                    style={{ width: "100%", height: "100%" }}
                                                    source={{ uri: item }}
                                                />

                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>

                            </Swiper>
                        </View>
                    )}
                    <View style={{ height: 95 }} />
                </ScrollView>

                <View
                    style={styles.inlineActionsContainer}
                >

                    <BottomTabBar
                        onDislikePressed={() => onSwipe("dislike", itemDetail)}
                        onSuperLikePressed={() => onSwipe("superlike", itemDetail)}
                        onLikePressed={() => onSwipe("like", itemDetail)}
                        containerStyle={{ width: "99%" }}
                    />

                    <ImageView
                        isSwipeCloseEnabled={false}
                        images={formatViewerImages()}
                        isVisible={isImageViewerVisible}
                        onClose={() => setIsImageViewerVisible(false)}
                        imageIndex={tappedImageIndex}
                        controls={{ close: closeButton }}
                    />
                </View>
            </View>
    );
}

SearchScreen.propTypes = {
    onSearchBarCancel: PropTypes.func,
    onSearchClear: PropTypes.func,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    title: PropTypes.string,
    activeOpacity: PropTypes.number,
    searchRef: PropTypes.object,
};


SearchScreen.navigationOptions = ({ screenProps, navigation }) => {
    let currentTheme = DynamicAppStyles.navThemeConstants[screenProps.theme];
    return {
        headerTitle: (
            <TNTouchableIcon
                imageStyle={{ tintColor: '#d1d7df' }}
                iconSource={DynamicAppStyles.iconSet.fireIcon}
                appStyles={DynamicAppStyles}
                onPress={() => navigation.pop()}
            />
        ),

        headerRight: (
            <View style={{ flexDirection: 'row' }}>
                <TNTouchableIcon
                    imageStyle={{ tintColor: DynamicAppStyles.colorSet.mainThemeForegroundColor }}
                    iconSource={DynamicAppStyles.iconSet.search}

                    appStyles={DynamicAppStyles}
                />
                <TNTouchableIcon
                    imageStyle={{ tintColor: '#d1d7df' }}
                    iconSource={DynamicAppStyles.iconSet.conversations}
                    onPress={() => {
                        navigation.pop();
                        navigation.navigate('Conversations', { appStyles: DynamicAppStyles });
                    }}
                    appStyles={DynamicAppStyles}
                />
            </View>

        ),
        headerLeft: (
            <TNTouchableIcon
                imageStyle={{ tintColor: '#d1d7df' }}
                iconSource={DynamicAppStyles.iconSet.userProfile}
                appStyles={DynamicAppStyles}
                onPress={() => {
                    navigation.pop();
                    navigation.navigate('MyProfileStack', { appStyles: DynamicAppStyles })
                }}
            />
        ),
        headerStyle: {
            backgroundColor: currentTheme.backgroundColor,
            borderBottomWidth: 0,
        },
        headerTintColor: currentTheme.fontColor,
    };
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default SearchScreen;

const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debounceValue;
};