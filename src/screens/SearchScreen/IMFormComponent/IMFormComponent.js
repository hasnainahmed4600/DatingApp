import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch } from 'react-native';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import dynamicStyles from './styles';


function IMFormComponent(props) {
  const { form, initialValuesDict, onFormChange, appStyles } = props;
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));

  const [alteredFormDict, setAlteredFormDict] = useState({});

  const onFormFieldValueChange = (formField, value) => {
    var newFieldsDict = alteredFormDict;
    newFieldsDict[formField.key] = value;
    setAlteredFormDict(newFieldsDict);
    onFormChange(newFieldsDict);

  };

  const renderSwitchField = (switchField) => {
    return (
      <View
        style={[styles.settingsTypeContainer, styles.appSettingsTypeContainer]}>
        <Text style={styles.text}>{switchField.displayName}</Text>
        <Switch
          value={computeValue(switchField)}
          onValueChange={value => onFormFieldValueChange(switchField, value)}
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
        />
      </View>
    );
  };


  const renderField = (formField, index, totalLen) => {

    const type = formField.type;
    if (type == 'switch') {
      return renderSwitchField(formField);
    }
    return null;
  };

  const renderSection = section => {
    return (
      <View>
        <View style={styles.settingsTitleContainer}>
          <Text style={styles.settingsTitle}>{section.title}</Text>
        </View>
        <View style={styles.contentContainer}>
          {section.fields.map((field, index) => renderField(field, index, section.fields.length))}
        </View>
      </View>
    );
  };

  const displayValue = (field, value) => {
    if (!field.displayOptions || !field.options) {
      return value;
    }
    for (var i = 0; i < field.options.length; ++i) {
      if (i < field.displayOptions.length && field.options[i] == value) {
        return field.displayOptions[i];
      }
    }
    return value;
  }

  const computeValue = field => {
    if (alteredFormDict[field.key] != null) {
      return displayValue(field, alteredFormDict[field.key]);
    }
    if (initialValuesDict[field.key] != null) {
      return displayValue(field, initialValuesDict[field.key]);
    }
    return displayValue(field, field.value);
  }

  return (
    <View style={styles.container}>
      {form.sections.map(section => renderSection(section))}
    </View>
  );
}

// IMFormComponent.propTypes = {
//   onFormChange: PropTypes.func,
// };

export default IMFormComponent;
