import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import fontFamily from '../../constants/fontFamily';
import images from '../../constants/images';
import Slider from '@react-native-community/slider';

const CARD_WIDTH = Dimensions.get('window').width * 0.8;
const CARD_HEIGHT = Dimensions.get('window').height * 0.7;
const Video = ({navigation}) => {
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.mainContainer}>
        <View
          style={{
            marginTop: 100,
            height: 500,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={images.video} />
        </View>
        <View style={{marginHorizontal: 25}}>
          <Slider
            style={{width: '100%', height: 40}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#F3EEFF"
            maximumTrackTintColor="#F3EEFF"
            thumbTintColor="#A884FF"
          />
        </View>
        <View style={styles.btnView}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#A884FF', '#4D4365']}
            style={styles.commonBtn}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}>
              <Text style={styles.signUpText}>SKIP</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </ScrollView>
  );
};
export default Video;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  btnView: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 30,
  },
  commonBtn: {
    elevation: 5,
    height: 50,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  signUpText: {
    fontFamily: fontFamily.Nunito_Regular,
    fontSize: 16,
    color: '#fff',
  },
});
