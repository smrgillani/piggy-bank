import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import images from '../constants/images';
import fontFamily from '../constants/fontFamily';

const ProfileBar = props => {
  const {name, email, profilepic} = props;
  // console.log(profilepic);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.userImg}>
        { profilepic ? (<Image style={{width: 100, height: 100}} source={{uri : 'data:image/jpg;base64,' + profilepic}} />) : (<Image source={images.userImg} />)}
      </View>
      <Text style={styles.userName}>{name}</Text>
      <Text style={styles.userEmail}>{email}</Text>
    </View>
  );
};
export default ProfileBar;
const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  userImg: {
    backgroundColor: '#E1D5FF',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow:'hidden',
    borderRadius: 100,
  },
  userName: {
    fontFamily: fontFamily.Nunito_Bold,
    marginBottom: 10,
    marginTop: 10,
    color: '#000000',
    fontSize: 16,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: fontFamily.Nunito_Regular,
  },
});
