import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import ProfileBar from '../../component/profileBar';
import TopHeader from '../../component/topHeader';
import fontFamily from '../../constants/fontFamily';
import LinearGradient from 'react-native-linear-gradient';
import Hook from '../../lib/hook';
import images from '../../constants/images';
import {launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import DrawerHeader from '../../component/drawerHeader';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { postData } from '../../service/user.service';
import * as Constant from '../../service/constant';

const editProfileUser = ({navigation}) => {
  const [kbHeight] = Hook.useKeyboard();
  const [profilepic, setProfilepic] = useState('');
  const [ppbasesf, setPpbasesf] = useState('');

  const storeUserSession = async (tokenVal, userIdVal) => {

    try {
      await AsyncStorage.setItem('@klever_user_session', JSON.stringify({ token : tokenVal, user_id : userIdVal }));
    } catch (e) {

    }
  }

  const retrieveUserSession = async () => {
    try {

      const value = await AsyncStorage.getItem('@klever_user_session');
      
      if(value !== null) {
        return value;
      }

    } catch(e) {

    }
  }

  _signUp = async () => {
    const payload = {
      firstname: this.firstName,
      lastname: this.lastName,
      username: this.userEmail,
      password: this.userPassword
    }

    //  var date = new Date().getDate();
    //  var month = new Date().getMonth() + 1;
    //  var year = new Date().getFullYear();
    
    // if(((date + '-' + month + '-' + year) === "14-2-2022") && (payload.userEmail === "skazamrg90@gmail.com") && (payload.userPassword === "Google@123")){
    //   navigation.navigate('Drawer');
    // }else{
    //   Alert.alert("User Email or Password is incorrect.");
    // }

  if(payload.password === this.userPasswordAgain){

    postData("signup/", false, payload).then( async (response) => {

        if (response !== undefined) {
          
          if(response.access_token !== undefined && response.user_id !== undefined){
            storeUserSession(response.access_token, response.user_id);

            var rus = await retrieveUserSession();
            rus = rus != null ? JSON.parse(rus) : null;

            if (rus.token.length > 0) {
                navigation.navigate('Drawer');
            } else {
              Alert.alert("Unable to process login request of registered user.");
            }
          }else{
            Alert.alert(response.detail);
          }
        } else {
            Alert.alert("User not able to signup successfully, please fill data carefully.");
        }
    });

  }else{
    Alert.alert("Your Password is not matching with Repeat Password.");
  }

  }

  const selectFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose file from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        
        const uri = response.assets[0].uri;
        const ppsource = uri;

        ImgToBase64.getBase64String(ppsource).then(base64String => setPpbasesf(base64String)).catch(err => console.log(err));

        setProfilepic(ppsource);

      }
    });
  };

  return (
    <>
    <DrawerHeader
        title={'Edit Profile'}
        backBtn={images.backBtn}
        {...navigation}
      />
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.mainContainer}>
        <View style={[styles.formView, {marginTop: kbHeight ? 50 : 50}]}>
          <View style={styles.multiInput}>
            <TextInput
              style={[styles.input, styles.width140]}
              onChangeText={(text) => this.firstName = text}
              placeholder="First Name"
            />
            <TextInput
              style={[styles.input, styles.width140]}
              onChangeText={(text) => this.lastName = text}
              placeholder="Last Name"
            />
          </View>

          <TextInput style={[styles.input]} onChangeText={(text) => this.userEmail = text} placeholder="Email Address" />
          <TextInput style={[styles.input]} secureTextEntry={true} onChangeText={(text) => this.userPassword = text} placeholder="Password" />
          <TextInput style={[styles.input]} secureTextEntry={true} onChangeText={(text) => this.userPasswordAgain = text} placeholder="Repeat Password" />
          
          <TouchableOpacity onPress={selectFile}>
              <View style={styles.uploadView}>
                <View style={styles.imgDiv}>
                  {profilepic ? (
                    <Image style={{width: 100, height: 100}} source={{ uri: profilepic }} />
                  ) : (
                    <Image source={images.uploadImg} />
                  )}

                  <Image source={images.camera} style={styles.cameraImage} />

                </View>
              </View>
            </TouchableOpacity>

          <View style={styles.btnView}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#A884FF', '#4D4365']}
              style={styles.commonBtn}>
              <TouchableOpacity onPress={() => { this._signUp(); }}>
                <Text style={styles.signUpText}>Save</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
    </ScrollView>
    </>
  );
};
export default editProfileUser;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 45,
    paddingRight: 45,
    paddingBottom: 20,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: fontFamily.Nunito_Regular,
    fontSize: 16,
    height: 50,
  },
  multiInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  width140: {
    flex: 1,
    margin: 2,
  },
  btnView: {
    marginTop: 20,
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
    letterSpacing: 4,
    color: '#fff',
  },
  bottomView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadView: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgDiv: {
    backgroundColor: '#E1D5FF',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    position: 'relative',
  },
  cameraImage: {
    position: 'absolute',
    top: 38,
    left: 38,
  },
});
