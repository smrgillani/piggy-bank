import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import TopHeader from '../../component/topHeader';
import images from '../../constants/images';
import LinearGradient from 'react-native-linear-gradient';
import fontFamily from '../../constants/fontFamily';

const WelcomeScreen = ({navigation}) => {
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <TopHeader
          subText={'Teach your children financial literacy in the home'}
        />
        <View style={styles.middleImg}>
          <Image source={images.aeroPlane} />
        </View>
        <View style={styles.multiTouch}>
          <TouchableOpacity>
            <Image source={images.orangeBtn} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={images.greenBtn} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={images.lightBtn} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={images.blueBtn} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomView}>
          <Text
            style={{
              marginBottom: 20,
              fontFamily: fontFamily.Nunito_Regular,
              fontSize: 16,
            }}>
            Lets get started
          </Text>
          <TouchableOpacity style={styles.commonBtn} onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#A884FF', '#4D4365']}
            style={styles.commonBtn}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpText}>SIGN UP</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </ScrollView>
  );
};
export default WelcomeScreen;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 45,
    paddingRight: 45,
  },
  middleImg: {
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  multiTouch: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    marginBottom: 50,
  },
  bottomView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  loginText: {
    fontFamily: fontFamily.Nunito_Bold,
    fontSize: 16,
    letterSpacing: 4,
    color: '#A884FF',
  },
  signUpText: {
    fontFamily: fontFamily.Nunito_Regular,
    fontSize: 16,
    letterSpacing: 4,
    color: '#fff',
  },
});
