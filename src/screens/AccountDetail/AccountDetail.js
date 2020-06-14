import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import TextButton from 'react-native-button';
import { firebaseUser } from '../../Core/firebase';
import IMFormComponent from '../../Core/profile/ui/IMFormComponent/IMFormComponent';
import { setUserData } from '../../Core/onboarding/redux/auth';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import DynamicAppStyles from "../../DynamicAppStyles";
import firebase from "react-native-firebase";

class AccountDetail extends Component {
    static navigationOptions = ({ screenProps, navigation }) => {
        let appStyles = navigation.state.params.appStyles;
        let screenTitle = navigation.state.params.screenTitle;
        let currentTheme = appStyles.navThemeConstants[screenProps.theme];
        const { params = {} } = navigation.state;

        return {
            headerTitle: screenTitle,
            headerRight: (
                <TextButton style={{ marginRight: 12 }} onPress={params.onFormSubmit}>
                    Done
        </TextButton>
            ),
            headerStyle: {
                backgroundColor: currentTheme.backgroundColor,
            },
            headerTintColor: currentTheme.fontColor,
        };
    };

    constructor(props) {
        super(props);
        this.appStyles = props.navigation.getParam('appStyles') || props.appStyles;
        this.form = props.navigation.getParam('form') || props.form;
        this.updateUser = props.navigation.getParam('updateUser');
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
        this.props.navigation.setParams({
            onFormSubmit: this.onFormSubmit,
        });
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

    isInvalid = (value, regex) => {
        const regexResult = regex.test(value);

        if (value.length > 0 && !regexResult) {
            return true;
        }
        if (value.length > 0 && regexResult) {
            return false;
        }
    };

    onFormSubmit = () => {

        var newUser = this.updateUser;
        const form = this.form;
        const alteredFormDict = this.state.alteredFormDict;
        var allFieldsAreValid = true;

        form.sections.forEach(section => {
            section.fields.forEach(field => {
                const newValue = alteredFormDict[field.key];
                if (newValue != null) {
                    console.log(newValue);
                    if (field.regex && this.isInvalid(newValue, field.regex)) {
                        allFieldsAreValid = false;
                    } else {
                        newUser[field.key] = alteredFormDict[field.key];
                    }
                }
            });
        });

        if (allFieldsAreValid) {
            firebaseUser.updateUserData(this.updateUser.id, newUser);
            this.props.setUserData({ user: newUser });
            console.log(this.props);
            this.props.navigation.navigate('Swipe', { appStyles: DynamicAppStyles });
        } else {
            alert(
                IMLocalized('An error occured while trying to update your account. Please make sure all fields are valid.'),
            );
        }
    };

    onFormChange = alteredFormDict => {
        this.setState({ alteredFormDict });
    };
    onFormButtonPress = buttonField => {
        this.props.navigation.navigate("Groups");
    }

    render() {
        return (
            <IMFormComponent
                form={this.form}
                initialValuesDict={this.updateUser}
                onFormChange={this.onFormChange}
                navigation={this.props.navigation}
                appStyles={this.appStyles}
                onFormButtonPress={this.onFormButtonPress}
            />
        );
    }
}

AccountDetail.propTypes = {
    user: PropTypes.object,
    setUserData: PropTypes.func,
};

const mapStateToProps = ({ auth }) => {
    return {
        user: auth.user,
    };
};

export default connect(mapStateToProps, { setUserData })(AccountDetail);
