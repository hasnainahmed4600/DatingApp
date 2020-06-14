import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Alert
} from "react-native";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import FastImage from "react-native-fast-image";
import ImageView from "react-native-image-view";
import AppStyles from "../../../AppStyles";
import DynamicAppStyles from "../../../DynamicAppStyles";
import { DEVICE_WIDTH } from "../../../helpers/statics";
import BottomTabBar from "../bottom_tab_bar";
import dynamicStyles from './styles';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import { IMLocalized } from "../../../Core/localization/IMLocalization";

const HIT_SLOP = { top: 15, left: 15, right: 15, bottom: 15 };

const CardDetailsView = props => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const [firstName] = useState(props.firstName || "");
  const [lastName] = useState(props.lastName || "");
  const [age] = useState(props.age || "");
  const [zodiac] = useState(props.zodiac || "");
  const [school] = useState(props.school || "");
  const [flocks] = useState(props.flocks || []);
  const [cohort] = useState(props.cohort || "");
  const [igHandle] = useState(props.igHandle || "");
  const [distance] = useState(props.distance || "");
  const [bio] = useState(props.bio || "");
  console.log(flocks);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [tappedImageIndex, setTappedImageIndex] = useState(null);
  const [photosUpdated, setPhotosUpdated] = useState(false);
  const [swiperDotWidth, setSwiperDotWidth] = useState(null);
  const [myPhotos] = useState(
    props.featuredPhoto || [props.profilePhoto]
  );
  const [instagramPhotos, setInstagramPhotos] = useState(
    props.instagramPhotos || []
  );

  console.log(props.navigation);
  const updatePhotos = featuredPhoto => {
    let myphotos = [];
    let temp = [];

    if (featuredPhoto.length > 0) {
      featuredPhoto.map((item, index) => {
        temp.push(item);

        if (index % 6 == 5) {
          myphotos.push(temp);
          temp = [];
        }
      });

      myphotos.push(temp);
      setInstagramPhotos(myphotos);
      setPhotosUpdated(true);
    }
  };

  useEffect(() => {
    updatePhotos(instagramPhotos);
    setSwiperDotWidth(Math.floor(DEVICE_WIDTH / myPhotos.length) - 4);
  }, []);

  const onSwipe = direction => {
    props.onSwipe(direction);
    props.setShowMode(0);
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

    if (photosUpdated) {
      instagramPhotos.map(featuredPhoto => {
        featuredPhoto.map(featuredPhoto => {
          myPhotos.push({
            source: {
              uri: featuredPhoto
            },
            width: Dimensions.get("window").width,
            height: Math.floor(Dimensions.get("window").height * 0.6)
          });
        });
      });

      return myPhotos;
    } else {
      return [];
    }
  };

  const viewFlocks = item => {
    props.setShowMode(0);
    props.navigation.navigate('Search', { flockName: item });
  }

  return (
    <View style={{ flex: 1, }}>
      <ScrollView style={styles.body} bounces={false}>
        <View style={styles.photoView}>
          <Swiper
            style={styles.wrapper}
            removeClippedSubviews={false}
            showsButtons={false}
            loop={false}
            paginationStyle={{ top: 5, bottom: null }}
            dot={
              <View
                style={{
                  backgroundColor: "rgba(0,0,0,.2)",
                  width: swiperDotWidth,
                  height: 4,
                  borderRadius: 4,
                  margin: 2
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: "black",
                  width: swiperDotWidth,
                  height: 4,
                  borderRadius: 4,
                  margin: 2
                }}
              />
            }
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
          onPress={() => props.setShowMode(0)}
        >
          <Image
            style={styles.backIcon}
            source={AppStyles.iconSet.arrowdownIcon}
          />
        </TouchableOpacity>
        <View style={styles.titleView}>
          <Text style={styles.nameText}>{firstName} {lastName}</Text>
          <Text style={styles.ageText}>{age}</Text>
        </View>
        <View style={styles.captionView}>
          {zodiac != "" && (<View style={styles.itemView}>
            <Image style={styles.icon} source={AppStyles.iconSet[zodiac]} />
            <Text style={styles.text}>{zodiac}</Text>
          </View>)}
          {school != "" && (<View style={styles.itemView}>
            <Image style={styles.icon} source={AppStyles.iconSet.schoolIcon} />
            <Text style={styles.text}>{school}</Text>
          </View>)}
          {cohort != "" && (<View style={styles.itemView}>
            <Image style={styles.icon} source={AppStyles.iconSet.cohortIcon} />
            <Text style={styles.text}>{cohort}</Text>
          </View>)}
          {igHandle != "" && (<View style={styles.itemView}>
            <Image style={styles.icon} source={AppStyles.iconSet.igIcon} />
            <Text style={styles.text}>{igHandle}</Text>
          </View>)}
          {flocks.length != 0 && (<View style={styles.itemView}>
            <Image style={styles.icon} source={AppStyles.iconSet.groupsIcon} />
            <FlatList
              horizontal={true}
              data={flocks}
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
          </View>)}
          {props.distance != undefined && (
            <View style={styles.itemView}>
              <Image
                style={styles.icon}
                source={AppStyles.iconSet.markerIcon}
              />

              <Text style={[styles.text, { marginLeft: 2 }]}>
                {`${Math.round(distance)}${
                  distance > 1.9 ? " " + IMLocalized('miles') : " " + IMLocalized('mile')
                  } ${IMLocalized('away')}`}
              </Text>
            </View>
          )}
        </View>
        {/* <View style={styles.lineView} /> */}
        <View style={styles.bioView}>
          <Text style={styles.bioText}>{bio}</Text>
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
              {instagramPhotos.map((featuredPhoto, i) => (
                <View key={"photos" + i} style={styles.slide}>
                  <FlatList
                    horizontal={true}
                    data={featuredPhoto}
                    scrollEnabled={true}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        onPress={() => {
                          setIsImageViewerVisible(true);
                          setTappedImageIndex(6 * i + index);
                        }}
                        key={"item" + index}
                        style={styles.myphotosItemView}
                      >
                        {photosUpdated && (
                          <FastImage
                            style={{ width: "100%", height: "100%" }}
                            source={{ uri: item }}
                          />
                        )}
                      </TouchableOpacity>
                    )}
                  />
                </View>
              ))}
            </Swiper>
          </View>
        )}
        <View style={{ height: 95 }} />
      </ScrollView>
      <View
        style={styles.inlineActionsContainer}
      >

        <BottomTabBar
          isDone={props.isDone}
          onDislikePressed={() => onSwipe("left")}
          onSuperLikePressed={() => onSwipe("superlike")}
          onLikePressed={() => onSwipe("right")}
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
    </View >
  );
};

CardDetailsView.propTypes = {
  firstName: PropTypes.string,
  age: PropTypes.string,
  cohort: PropTypes.string,
  igHandle: PropTypes.string,
  school: PropTypes.string,
  flocks: PropTypes.array,
  distance: PropTypes.string,
  profilePhoto: PropTypes.string,
  featuredPhoto: PropTypes.array,
  instagramPhotos: PropTypes.array,
  bio: PropTypes.string,
  isDone: PropTypes.bool,
  setShowMode: PropTypes.func,
  onSwipe: PropTypes.func,
  bottomTabBar: PropTypes.bool
};

export default CardDetailsView;
