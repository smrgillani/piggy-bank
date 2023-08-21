import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import fontFamily from '../../constants/fontFamily';
import LinearGradient from 'react-native-linear-gradient';
import Hook from '../../lib/hook';
import images from '../../constants/images';
import ProfileBar from '../../component/profileBar';
import DrawerHeader from '../../component/drawerHeader';

const CARD_WIDTH = Dimensions.get('window').width * 0.8;
const CARD_HEIGHT = Dimensions.get('window').height * 0.7;
const SavingAccount = ({navigation}) => {
  const [kbHeight] = Hook.useKeyboard();

  return (
    <>
      <DrawerHeader
        title={'Saving Account'}
        backBtn={images.backBtn}
        {...navigation}
      />
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.mainContainer}>
          <ProfileBar name={'Caleb Mark'} email={'12-12-2007'} />
          <View style={styles.listView}>
            <View style={styles.addSavingView}>
              <Text
                style={{
                  fontFamily: fontFamily.Nunito_Bold,
                  color: '#A884FF',
                  fontSize: 20,
                  textAlign: 'center',
                  marginBottom: 20,
                }}>
                Savings
              </Text>
              <TouchableOpacity
                style={{position: 'absolute', right: 10, top: 8}}>
                <Image source={images.addBtn} />
              </TouchableOpacity>
            </View>
            <View style={styles.listMulti}>
              <View style={styles.listCard}>
                <Image
                  style={{width: 20, height: 20, marginRight: 20}}
                  source={images.aeroPlane}
                />
                <Text style={styles.listText}>Klever Vault Amount</Text>
                <Text style={styles.priceText}>$120</Text>
              </View>
              <View style={styles.listCard}>
                <Image
                  style={{width: 20, height: 20, marginRight: 20}}
                  source={images.moneyBank}
                />
                <Text style={styles.listText}>Bank Account Balance</Text>
                <Text style={styles.priceText}>$400</Text>
              </View>
              <View style={styles.listCard}>
                <Image
                  style={{width: 20, height: 20, marginRight: 20}}
                  source={images.couple}
                />
                <Text style={styles.listText}>Mom and Dad Balnce</Text>
                <Text style={styles.priceText}>$140</Text>
              </View>
              <View style={styles.listCard}>
                <Image
                  style={{width: 20, height: 20, marginRight: 20}}
                  source={images.user}
                />
                <Text style={styles.listText}>Uncle Steve Balence</Text>
                <Text style={styles.priceText}>$70</Text>
              </View>
            </View>
            <LinearGradient
              style={styles.cardView}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#F9D9FF', '#FFF3CC']}>
              <View>
                <Text
                  style={{
                    fontSize: 30,
                    fontFamily: fontFamily.Nunito_Bold,
                    color: '#A884FF',
                    textAlign: 'center',
                    marginBottom: 17,
                  }}>
                  $426.46
                </Text>
                <Text style={styles.titleText}>Vault Title</Text>
              </View>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default SavingAccount;
const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    paddingLeft: 45,
    paddingRight: 45,
  },
  addSavingView: {
    position: 'relative',
  },
  commonBtn: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F5FF',
    borderRadius: 15,
  },
  listCard: {
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    display: 'flex',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    position: 'relative',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lineBar: {
    width: 3,
    height: 20,
    borderRadius: 15,
    marginRight: 15,
  },
  priceText: {
    fontSize: 14,
    fontFamily: fontFamily.Nunito_Regular,
    color: '#707070',
    position: 'absolute',
    right: 15,
    top: 15,
  },
  listText: {
    fontSize: 16,
    fontFamily: fontFamily.Nunito_Regular,
    color: '#707070',
  },

  cardView: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    width: CARD_WIDTH,
    resizeMode: 'center',
  },
  titleText: {
    fontSize: 16,
    fontFamily: fontFamily.Nunito_Regular,
    color: '#707070',
    textAlign: 'center',
  },
});
