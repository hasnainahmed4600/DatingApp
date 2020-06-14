import React, { useRef } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
  Animated,
  Easing
} from "react-native";
import { size } from "../../helpers/devices";
import AppStyles from "../../AppStyles";

const BottomTabBar = props => {
  const scaleValue2 = useRef(new Animated.Value(0));
  const scaleValue3 = useRef(new Animated.Value(0));
  const scaleValue4 = useRef(new Animated.Value(0));

  const onDislikePress = () => {
    scaleValue2.current.setValue(0);
    Animated.timing(scaleValue2.current, {
      toValue: 1,
      duration: 300,
      easing: Easing.easeOutBack
    }).start(() => { });
    props.onDislikePressed();
  };

  const onSuperLikePress = () => {
    scaleValue3.current.setValue(0);
    Animated.timing(scaleValue3.current, {
      toValue: 1,
      duration: 300,
      easing: Easing.easeOutBack
    }).start(() => { });
    props.onSuperLikePressed();
  };

  const onLikePress = () => {
    scaleValue4.current.setValue(0);
    Animated.timing(scaleValue4.current, {
      toValue: 1,
      duration: 300,
      easing: Easing.easeOutBack
    }).start(() => { });
    props.onLikePressed();
  };

  const getCardStyle2 = () => {
    const scale = scaleValue2.current.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.7, 1]
    });

    return {
      transform: [{ scale }]
    };
  };

  const getCardStyle3 = () => {
    const scale = scaleValue3.current.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.7, 1]
    });

    return {
      transform: [{ scale }]
    };
  };

  const getCardStyle4 = () => {
    const scale = scaleValue4.current.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.7, 1]
    });

    return {
      transform: [{ scale }]
    };
  };

  return (
    <View style={[styles.container, props.containerStyle]}>
      <TouchableWithoutFeedback onPress={onDislikePress}>
        <Animated.View
          style={[
            styles.button_container,
            getCardStyle2(),
            props.buttonContainerStyle
          ]}
        >
          <Image
            source={AppStyles.iconSet.crossFilled}
            style={[styles.large_icon, { tintColor: "#45710C" }]}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onSuperLikePress}>
        <Animated.View style={[styles.button_container2, getCardStyle3()]}>
          <Image
            source={AppStyles.iconSet.starFilled}
            style={styles.small_icon}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onLikePress}>
        <Animated.View style={[getCardStyle4()]}>
          <Image
            source={AppStyles.iconSet.Like}
          // style={styles.large_icon}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

BottomTabBar.propTypes = {
  containerStyle: PropTypes.any,
  onBoostPressed: PropTypes.func,
  onLikePressed: PropTypes.func,
  onSuperLikePressed: PropTypes.func,
  onDislikePressed: PropTypes.func,
  onRewindPressed: PropTypes.func,
  buttonContainerStyle: PropTypes.any
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: size(10),
    marginHorizontal: size(40),
    marginBottom: size(35)
  },
  button_container: {
    padding: size(15),
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "white",
    overflow: "hidden"
  },
  button_container2: {
    padding: size(15),
    backgroundColor: "orange",
    borderRadius: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "orange",
    overflow: "hidden"
  },
  small_icon: {
    width: size(23),
    height: size(23),
    resizeMode: "contain",
    tintColor: "white"
  },
  large_icon: {
    width: size(33),
    height: size(33),
    overflow: "hidden"
  }
});

export default BottomTabBar;
