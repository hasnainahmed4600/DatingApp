
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, BackHandler, FlatList, Image, TouchableOpacity } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import CardDetailsView from "../../components/swipe/CardDetailsView/CardDetailsView";
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import dynamicStyle from './style';
import DynamicAppStyles from "../../DynamicAppStyles";
import { TNTouchableIcon } from '../../Core/truly-native';
import Tabs from './tabs';
import firebase from 'react-native-firebase';
import IMFormComponent from './IMFormComponent/IMFormComponent';
import { firebaseUser } from '../../Core/firebase';
import DatingConfig from "../../DatingConfig";


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

    useEffect(() => {
        onFormChange = (alteredFormDict) => {

            SetalteredFormDict(alteredFormDict);
            const user = firestoreUsers;
            var newGroups = user.group || {};
            var groupNameArray = [];
            DatingConfig.userGroupFields.sections.forEach(section => {
                section.fields.forEach(field => {
                    const newValue = alteredFormDict[field.key];

                    if (newValue != null) {
                        newGroups[field.key] = alteredFormDict[field.key];
                    }
                });
            });

            Object.keys(newGroups).forEach(function (key) {

                if (newGroups[key] == true) {
                    groupNameArray.push(key);
                }
            });
            var groupName = '';
            for (i in groupNameArray) {
                groupName += groupNameArray[i] + ', ';
            }

            let newUser = { ...user, group: newGroups, groups: groupName };
            firebaseUser.updateUserData(user.id, newUser);
        }



    });

    useEffect(() => {

        const lowerCaseQuery = debounceQuery.toLowerCase();
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

                const filter = firestoreUsers.group;
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
                        school: documentSnapshot.data().school,
                        groups: documentSnapshot.data().groups,
                        igHangle: documentSnapshot.data().igHandle,
                        cohort: documentSnapshot.data().cohort,
                        // distance={item.distance}
                        bio: documentSnapshot.data().bio,
                        instagramPhotos: documentSnapshot.data().featuredPhoto ? documentSnapshot.data().featuredPhoto : []
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
                        Object.keys(users[i].group).forEach(function (key) {

                            if (users[i].group[key] == true) {
                                var value = key;
                                Object.keys(filter).forEach(function (key) {
                                    if (filter[key] == true) {
                                        if (users[i].email != oldEmail) {
                                            if (value == key) {
                                                // setUsers(users[i]);

                                                showUsers.push(users[i]);
                                                oldEmail = users[i].firstName;
                                            }
                                        }

                                    }

                                });
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

                }}>
                <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                    <View style={{ height: 40, width: 40, paddingLeft: 10, alignItems: 'center', justifyContent: 'center', }}>
                        <Image source={item.profilePhoto} style={{ width: 40, height: 40, borderRadius: 40 / 2, backgroundColor: '#000000' }} />
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

    const renderCardDetail = (itemDetail) => {
        console.log(itemDetail);
        return (
            <CardDetailsView
                key={"CardDetail" + itemDetail.userID}
                profilePhoto={itemDetail.profilePhoto}
                firstName={itemDetail.firstName}
                lastName={itemDetail.lastName}
                age={itemDetail.age}
                zodiac={itemDetail.zodiac}
                school={itemDetail.school}
                groups={itemDetail.groups}
                igHangle={itemDetail.igHandle}
                cohort={itemDetail.cohort}
                distance={0}
                bio={itemDetail.bio}
                instagramPhotos={itemDetail.featuredPhoto ? itemDetail.featuredPhoto : []}

            />
        );
    };


    return (
        showMode != 1 ?
            <View style={styles.container}>
                <View>
                    <SearchBar
                        placeholder="Search"
                        onChangeText={setQuery}
                        value={query}
                    />
                </View>

                <View style={{ height: "85%" }}>
                    <Tabs>
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
                        <View title="Flocks" >
                            <IMFormComponent
                                form={DatingConfig.userGroupFields}
                                initialValuesDict={initialValuesDict}
                                onFormChange={onFormChange}
                                appStyles={appStyles}

                            />
                        </View>

                    </Tabs>
                </View>
            </View>
            : <View>
                {renderCardDetail(itemDetail)}
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