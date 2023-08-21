import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { StackActions } from '@react-navigation/native';
import TopHeader from '../../component/topHeader';
import fontFamily from '../../constants/fontFamily';
import LinearGradient from 'react-native-linear-gradient';
import Hook from '../../lib/hook';
import images from '../../constants/images';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { postData } from '../../service/user.service';
import * as Constant from '../../service/constant';

const SignIn = ({navigation}) => {
  const [kbHeight] = Hook.useKeyboard();

  const checkIfUserAlreadyLoggedIn = async () => {
    var rus = await retrieveUserSession();
    rus = rus != null ? JSON.parse(rus) : null;

    if(rus !== null){
      if (rus.token.length > 0) {
        navigation.dispatch(
          StackActions.replace('Drawer')
        );
      }
    }

  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkIfUserAlreadyLoggedIn();
    });
  }, []);

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

  _login = async () => {
    const payload = {
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


  postData("login/", false, payload).then( async (response) => {
    
    console.log("Syed Server Response => " + JSON.stringify(response));
      
      if (response !== undefined) {
        
        if(response.access_token !== undefined && response.user_id !== undefined){
          storeUserSession(response.access_token, response.user_id);

          var rus = await retrieveUserSession();
          rus = rus != null ? JSON.parse(rus) : null;

          if (rus.token.length > 0) {
              navigation.navigate('Drawer');
          } else {
            Alert.alert("User Email or Password is incorrect.");
          }
        }else{
          Alert.alert("User Email or Password is incorrect.");
        }
      } else {
          Alert.alert("User Email or Password is incorrect.");
      }
  })

  }


  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.mainContainer}>
        {kbHeight === 0 && (
          <TopHeader subText={'Fill up below text fields to login'} />
        )}

        <View style={[styles.formView, {marginTop: kbHeight ? 80 : 0}]}>
          <TextInput style={[styles.input]} onChangeText={(text) => this.userEmail = text} placeholder="Email Address" />
          <TextInput style={[styles.input]} secureTextEntry={true} onChangeText={(text) => this.userPassword = text} placeholder="Password" />
          <Text style={styles.forgotText}>Forgot Password?</Text>
          <View style={styles.btnView}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#A884FF', '#4D4365']}
              style={styles.commonBtn}>
              <TouchableOpacity
                onPress={() => {

                  this._login();

                }}>
                <Text style={styles.signUpText}>LOGIN</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
        <View
          style={[
            styles.bottomView,
            {marginTop: kbHeight ? 40 : 50, marginBottom: kbHeight ? 20 : 0},
          ]}>
          <Text
            style={{
              fontFamily: fontFamily.Nunito_Bold,
              fontSize: 16,
              color: '#707070',
              marginBottom: 30,
            }}>
            OR Connect With
          </Text>
          <TouchableOpacity onPress={() => {Alert.alert("Unable to Process Request, Check internet connecttion"); }} style={[styles.fbBtn, styles.commonSocialBtn]}>
            <Image
              style={{position: 'absolute', left: 20}}
              source={images.fbLogo}
            />
            <Text style={styles.btnText}>FACEBOOK</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {Alert.alert("Unable to Process Request, Check internet connecttion"); }} style={[styles.googleBtn, styles.commonSocialBtn]}>
            <Image
              style={{position: 'absolute', left: 20}}
              source={images.googleLogo}
            />
            <Text style={styles.btnText}>GOOGLE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default SignIn;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 45,
    paddingRight: 45,
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
  forgotText: {
    fontFamily: fontFamily.Nunito_Bold,
    fontSize: 16,
    color: '#A884FF',
    marginBottom: 30,
    textAlign: 'center',
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
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontFamily: fontFamily.Nunito_Bold,
    fontSize: 16,
    letterSpacing: 4,
    color: '#A884FF',
    marginTop: 20,
  },
  fbBtn: {
    backgroundColor: '#4777C9',
  },
  googleBtn: {
    backgroundColor: '#FF3D00',
  },
  commonSocialBtn: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 30,
    position: 'relative',
  },
  btnText: {
    color: '#fff',
    fontFamily: fontFamily.Nunito_Regular,
    fontSize: 16,
    letterSpacing: 4,
  },
});
