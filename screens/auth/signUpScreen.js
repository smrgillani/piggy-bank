import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import TopHeader from '../../component/topHeader';
import fontFamily from '../../constants/fontFamily';
import LinearGradient from 'react-native-linear-gradient';
import Hook from '../../lib/hook';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { postData } from '../../service/user.service';
import * as Constant from '../../service/constant';

const SignUp = ({navigation}) => {
  const [kbHeight] = Hook.useKeyboard();

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

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.mainContainer}>
        {kbHeight === 0 && (
          <TopHeader subText={'Fill up below text fields to register'} />
        )}

        <View style={[styles.formView, {marginTop: kbHeight ? 80 : 0}]}>
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
          <View style={styles.btnView}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#A884FF', '#4D4365']}
              style={styles.commonBtn}>
              <TouchableOpacity onPress={() => { this._signUp(); }}>
                <Text style={styles.signUpText}>SIGN UP</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
        <View style={[styles.bottomView, {marginTop: kbHeight ? 50 : 50}]}>
          <Text
            style={{
              fontFamily: fontFamily.Nunito_Bold,
              fontSize: 16,
              color: '#707070',
            }}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default SignUp;
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
    marginTop: 80,
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
  loginText: {
    fontFamily: fontFamily.Nunito_Bold,
    fontSize: 16,
    letterSpacing: 4,
    color: '#A884FF',
    marginTop: 20,
  },
});
