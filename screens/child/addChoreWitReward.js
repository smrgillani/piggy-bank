import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import fontFamily from '../../constants/fontFamily';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import Hook from '../../lib/hook';
import images from '../../constants/images';
import {launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import DrawerHeader from '../../component/drawerHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postData } from '../../service/user.service';

const AddChoreWitReward = ({route, navigation}) => {

  _addRewardTask = async () => {

    const payload = {
      childid: route.params.child_id,
      title: this.rewardTitle,
      amount: this.rewardAmount
    }

    postData("addrewardtask/", true, payload).then( async (response) => {

        if (response !== undefined) {
          
          if(response.Id !== undefined){
            Alert.alert("Chore Wit Reward added successfully.");
            navigation.goBack();

          }else{
            Alert.alert(response.detail);
          }

        } else {
            Alert.alert("Chore Wit Reward not be able to added successfully, please fill data carefully.");
        }
    });

  }

  const showDatepicker = () => {
    showMode('date');
  };

  const [kbHeight] = Hook.useKeyboard();

  return (
    <>
      <DrawerHeader
        title={'Add Chore Wit Reward'}
        backBtn={images.backBtn}
        {...navigation}
      />
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={styles.mainContainer}>
          <View style={[styles.formView, {marginTop: kbHeight ? 50 : 50}]}>
            <Text
              style={{
                fontFamily: fontFamily.Nunito_Regular,
                textAlign: 'center',
                marginBottom: 30,
              }}>
              Enter Chore Wit Reward Details
            </Text>
            <View style={styles.multiInput}>
              <TextInput
                style={[styles.input, styles.width140]}
                onChangeText={(text) => this.rewardTitle = text}
                placeholder="Chore Wit Reward Title"
              />
              <TextInput
                style={[styles.input, styles.width140]}
                onChangeText={(text) => this.rewardAmount = text}
                placeholder="Chore Wit Reward Amount"
              />
            </View>

            <View style={styles.btnView}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#A884FF', '#4D4365']}
                style={styles.commonBtn}>
                <TouchableOpacity onPress={() => {

                  this._addRewardTask();

                }}>
                  <Text style={styles.signUpText}>CONFIRM ADD REWARD</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default AddChoreWitReward;
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
    justifyContent: 'center',
    alignItems: 'center',
    color: '#707070',
    position: 'relative',
  },
  multiInput: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  width140: {
    flex: 1,
    margin: 2,
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
  datePick: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  uploadView: {
    height: 300,
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
  btnView: {
    marginTop: 40,
  },
  cameraImage: {
    position: 'absolute',
    top: 38,
    left: 38,
  },
});
