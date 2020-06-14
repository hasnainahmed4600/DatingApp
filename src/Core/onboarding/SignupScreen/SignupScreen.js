import React, { useState } from 'react';
import { Text, TextInput, View, Alert, Image, TouchableOpacity, Picker } from 'react-native';
import Button from 'react-native-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import dynamicStyles from './styles';
import TNActivityIndicator from '../../truly-native/TNActivityIndicator';
import TNProfilePictureSelector from '../../truly-native/TNProfilePictureSelector/TNProfilePictureSelector';
import { IMLocalized } from '../../localization/IMLocalization';
import { setUserData } from '../redux/auth';
import { connect } from 'react-redux';
import authManager from '../utils/authManager';
import { localizedErrorMessage } from '../utils/ErrorCode';

const SignupScreen = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [school, setSchool] = useState('');
  const [profilePhoto, setProfilePictureURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [age, setAge] = useState('');
  const [zodiac, setZodiac] = useState('');

  const appConfig = (props.navigation.state.params.appConfig || props.navigation.getParam('appConfig'));
  const appStyles = (props.navigation.state.params.appStyles || props.navigation.getParam('appStyles'));
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));

  const onRegister = () => {
    setLoading(true);

    const userDetails = {
      firstName,
      lastName,
      email,
      school,
      password,
      birthday,
      photoURI: profilePhoto,
      age,
      zodiac,
      appIdentifier: appConfig.appIdentifier
    };

    if (email.substring(email.length - 3, email.length) == 'edu' || email.substring(email.length - 3, email.length) == "org") {
    authManager
      .createAccountWithEmailAndPassword(userDetails, appConfig.appIdentifier)
      .then(response => {
        const user = response.user;
        if (user) {
          props.setUserData({ user: user });
          props.navigation.navigate('MainStack', { user: user });
        } else {
          Alert.alert('', localizedErrorMessage(response.error), [{ text: IMLocalized('OK') }], {
            cancelable: false,
          });
        }
        setLoading(false);
      })
     } else {
     alert("plase add only .edu or .org email");
     setLoading(false);
     }

  };
  const _onExpirationDateChanged = (value) => {
    value = value.replace(/\D/g, '');
    switch (value.length) {
      case 0:
        setBirthday("");
        break;
      case 1:
        setBirthday(value);
        break;
      case 2:

        setBirthday(value);
        break;
      case 3:

        setBirthday(value.substring(0, 2) + "/" + value.substring(2))
        break;
      case 4:

        setBirthday(value.substring(0, 2) + "/" + value.substring(2, 4));
        break;
      case 5:

        setBirthday(value.substring(0, 2) + "/" + value.substring(2, 4) + "/" + value.substring(4));
        break;
      case 6:

        setBirthday(value.substring(0, 2) + "/" + value.substring(2, 4) + "/" + value.substring(4, 8));
        break;
      case 7:

        setBirthday(value.substring(0, 2) + "/" + value.substring(2, 4) + "/" + value.substring(4, 8));
        break;
      case 8:

        setBirthday(value.substring(0, 2) + "/" + value.substring(2, 4) + "/" + value.substring(4, 8));

        break;
    }
    if (value.length > 8) {
      setBirthday(value.substring(0, 2) + "/" + value.substring(2, 4) + "/" + value.substring(4, 8));
    }
  }

  const caculateAgeAndZodiac = (value) => {
    var dob = value.replace(/\D/g, '');
    if (dob.length <= 8) {
      console.log(dob);
      var year = Number(dob.substr(4, 8));
      var month = Number(dob.substr(2, 2));
      var day = Number(dob.substr(0, 2));
      console.log("year" + year);
      console.log("month" + month);
      console.log("day" + day);
      var today = new Date();
      var myAge = today.getFullYear() - year;
      if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
        myAge--;
      }
      setAge(myAge);

      if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
        setZodiac("capricon");
      } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
        setZodiac("aquarius");
      } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
        setZodiac("pisces");
      } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
        setZodiac("aries");
      } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
        setZodiac("taurus");
      } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
        setZodiac("gemini");
      } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
        setZodiac("cancer");
      } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
        setZodiac("leo");
      } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
        setZodiac("virgo");
      } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
        setZodiac("libra");
      } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
        setZodiac("scorpio");
      } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
        setZodiac("sagittarius");
      }
    }
  }



  const renderSignupWithEmail = () => {

    return (
      <>
        <TextInput
          style={styles.InputContainer}
          placeholder={IMLocalized('First Name')}
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setFirstName(text)}
          value={firstName}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.InputContainer}
          placeholder={IMLocalized('Last Name')}
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setLastName(text)}
          value={lastName}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.InputContainer}
          placeholder={IMLocalized('E-mail Address')}
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize='none'
        />
        <TextInput
          style={styles.InputContainer}
          placeholder={IMLocalized('Password')}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.InputContainer}
          placeholder={"DD/MM/YY"}
          placeholderTextColor="#aaaaaa"
          onChangeText={text => {
            caculateAgeAndZodiac(text);
            _onExpirationDateChanged(text);

          }}
          value={birthday}
          underlineColorAndroid="transparent"
        />
        <Text style={styles.orTextStyle}> {IMLocalized('Select an School')}</Text>
        <Picker
          style={styles.PickerContainer}
          itemStyle={styles.PickerItemContainer}
          selectedValue={school}
          onValueChange={itemValue => setSchool(itemValue)}>
          {/* "Duke University", "UNC-Chapel Hill", "Brown Univeristy", "Yale University", "New York University", "LREI" */}
          <Picker.Item label="Duke University" value="Duke" />
          <Picker.Item label="UNC-Chapel Hill" value="UNC-Chapel Hill" />
          <Picker.Item label="Brown Univeristy" value="Brown" />
          <Picker.Item label="Yale University" value="Yale" />
          <Picker.Item label="New York University" value="NYU" />
          <Picker.Item label="LREI" value="LREI" />
        </Picker>
        <Button
          containerStyle={styles.signupContainer}
          style={styles.signupText}
          onPress={() => onRegister()}
        >
          {IMLocalized('Sign Up')}
        </Button>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps='always'>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image style={appStyles.styleSet.backArrowStyle} source={appStyles.iconSet.backArrow} />
        </TouchableOpacity>
        <Text style={styles.title}>{IMLocalized('Create new account')}</Text>
        <TNProfilePictureSelector
          setProfilePictureURL={setProfilePictureURL}
          appStyles={appStyles}
        />
        {renderSignupWithEmail()}
        {appConfig.isSMSAuthEnabled && (
          <>
            <Text style={styles.orTextStyle}>{IMLocalized('OR')}</Text>
            <Button
              containerStyle={styles.PhoneNumberContainer}
              onPress={() => props.navigation.goBack()}
            >
              {IMLocalized('Sign up with phone number')}
            </Button>
          </>
        )}
      </KeyboardAwareScrollView>
      {loading && <TNActivityIndicator appStyles={appStyles} />}
    </View>
  );
};

export default connect(null, {
  setUserData
})(SignupScreen);

