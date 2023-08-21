import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import TopHeader from '../component/topHeader';
import images from '../constants/images';

const ScanBarCode = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <TopHeader subText={'Scan your QR code to connect with Vault'} />

      <View style={styles.mainImage}>
        <Image source={images.barCode} />
      </View>
    </View>
  );
};
export default ScanBarCode;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 45,
    paddingRight: 45,
  },
  mainImage: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
