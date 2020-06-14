
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { IMLocalized } from '../../localization/IMLocalization';
import { setUserData } from '../../onboarding/redux/auth';
import { firebaseUser } from '../../firebase';
import IMFormComponent from './IMFormComponent/IMFormComponent';
import DynamicAppStyles from "../../../DynamicAppStyles";
import DatingConfig from "../../../DatingConfig";

class Group extends Component {
    static navigationOptions = ({ screenProps }) => {
        let appStyles = DynamicAppStyles;
        let screenTitle = IMLocalized('Flocks');
        let currentTheme = appStyles.navThemeConstants[screenProps.theme];
        return {
            headerTitle: screenTitle,
            headerStyle: {
                backgroundColor: currentTheme.backgroundColor,
            },
            headerTintColor: currentTheme.fontColor,
        };
    };

    constructor(props) {
        super(props);

        this.appStyles = DynamicAppStyles;
        this.form = DatingConfig.userGroupFields;
        this.initialValuesDict = props.user.group || {};

        this.state = {
            form: props.form,
            alteredFormDict: {}
        };

        this.didFocusSubscription = props.navigation.addListener(
            'didFocus',
            payload =>
                BackHandler.addEventListener(
                    'hardwareBackPress',
                    this.onBackButtonPressAndroid,
                ),
        );
    }

    componentDidMount() {
        this.willBlurSubscription = this.props.navigation.addListener(
            'willBlur',
            payload =>
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    this.onBackButtonPressAndroid,
                ),
        );
    }

    componentWillUnmount() {
        this.didFocusSubscription && this.didFocusSubscription.remove();
        this.willBlurSubscription && this.willBlurSubscription.remove();
    }

    onBackButtonPressAndroid = () => {
        this.props.navigation.goBack();
        return true;
    };



    onFormChange = alteredFormDict => {
        const user = this.props.user;
        var newGroups = user.group || {};
        const form = this.form;
        var groupNameObject = {};
        var groupArray = [];
        form.sections.forEach(section => {
            section.fields.forEach(field => {
                const newValue = alteredFormDict[field.key];
                if (newValue != null) {
                    newGroups[field.key] = alteredFormDict[field.key];
                }
            });
        });
        Object.keys(newGroups).forEach(function (key) {

            if (newGroups[key] == true) {
                groupNameObject[key] = newGroups[key];

            }
        });
        groupArray = Object.keys(groupNameObject).map(key => {
            return { key: key };
        });

        let newUser = { ...user, group: newGroups, flocks: groupArray };
        firebaseUser.updateUserData(user.id, newUser);
        this.props.setUserData({ user: newUser });
    };


    render() {
        return (
            <IMFormComponent
                form={this.form}
                initialValuesDict={this.initialValuesDict}
                onFormChange={this.onFormChange}
                navigation={this.props.navigation}
                appStyles={this.appStyles}

            />
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        user: auth.user,
    };
};

export default connect(mapStateToProps, { setUserData })(Group);