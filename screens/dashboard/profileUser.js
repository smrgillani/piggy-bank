import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  Image,
} from 'react-native';
import ProfileBar from '../../component/profileBar';
import fontFamily from '../../constants/fontFamily';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import images from '../../constants/images';
import DrawerHeader from '../../component/drawerHeader';
import { getData } from '../../service/user.service';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const ProfileUser = ({navigation}) => {
  
  const [firstItem, setFirstItem] = useState(0);
  const [data, setData] = useState(undefined);

  React.useEffect(() => {
      try {

        getData("selectuser/", true).then( async (response) => {

          if (response !== undefined) {

            if(response.Id !== undefined){
              setData(response);
            }else{
              Alert.alert(response.detail);
            }

          } else {
              Alert.alert("Unable to load User data, please check internet connecttion.");
          }
        });

      } catch(e) {

      }
    }, []);

  const cards = [
    {price: '$426.46', title: 'Vault Title'},
    {price: '$426.45', title: 'Vault Title'},
    {price: '$426.47', title: 'Vault Title'},
  ];
  const _renderItem = ({item, index}) => {
    return (
      <View key={index}>
        <LinearGradient
          style={styles.cardView}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#F9D9FF', '#FFF3CC']}>
          <View>
            <Text style={styles.priceText}>{item.price}</Text>
            <Text style={styles.titleText}>{item.title}</Text>
          </View>
        </LinearGradient>
      </View>
    );
  };
  const moveNext = () => {
    const length = cards.length;
    if (firstItem <= length) {
      setFirstItem(firstItem + 1);
      console.log(firstItem);
    }
  };
  const moveBack = () => {
    const length = cards.length;
    if (firstItem >= length) {
      setFirstItem(firstItem - 1);
      console.log(firstItem);
    } else {
      setFirstItem(firstItem - 1);
    }
  };
  return (
    <>
      <DrawerHeader
        title={'Dashboard'}
        backBtn={images.backBtn}
        {...navigation}
      />
      <ScrollView>
        <View style={styles.mainContainer}>
          <ProfileBar name={data ? (data.firstname + " " + data.lastname) : ("")} email={data ? (data.username) : ("")} />
          <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('EditProfileUser')}>
            <Text style={styles.editText}>EDIT {data && data.firstname}'s PROFILE</Text>
          </TouchableOpacity>
          <View style={styles.sliderView}>
            <Text
              style={{
                fontFamily: fontFamily.Nunito_Bold,
                fontSize: 16,
                color: '#707070',
                textAlign: 'center',
              }}>
              My Connected Vaults
            </Text>
            <View style={styles.sliderDiv}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  left: '5%',
                  top: '45%',
                  zIndex: 9999999,
                }}
                resizeMode="cover"
                onPress={() => moveBack()}>
                <Image source={images.leftArrow} />
              </TouchableOpacity>
              <Carousel
                layout={'default'}
                data={cards}
                renderItem={_renderItem}
                sliderWidth={310}
                itemWidth={310}
                firstItem={firstItem}
                inactiveSlideScale={0.94}
                inactiveSlideOpacity={0.7}
                hasParallaxImages={true}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: '5%',
                  top: '45%',
                  zIndex: 9999999,
                }}
                resizeMode="cover"
                onPress={() => moveNext()}>
                <Image source={images.rightArrow} />
              </TouchableOpacity>
            </View>

            <View style={styles.btnView}>
              <TouchableOpacity
                style={[styles.commonBtn, {backgroundColor: '#F1EBFF'}]}>
                <Text style={styles.addVault}>ADD NEW VAULT</Text>
              </TouchableOpacity>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#A884FF', '#4D4365']}
                style={styles.commonBtn}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AddChild')}>
                  <Text style={styles.addChild}>ADD A CHILD</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default ProfileUser;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 45,
    paddingRight: 45,
  },
  editBtn: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  editText: {
    fontFamily: fontFamily.Nunito_Regular,
    fontSize: 14,
    color: '#A884FF',
    letterSpacing: 4,
  },
  sliderView: {
    marginTop: 50,
  },
  cardView: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    width: 305,
  },
  priceText: {
    fontSize: 30,
    fontFamily: fontFamily.Nunito_Bold,
    color: '#A884FF',
    textAlign: 'center',
    marginBottom: 17,
  },
  titleText: {
    fontSize: 16,
    fontFamily: fontFamily.Nunito_Regular,
    color: '#707070',
    textAlign: 'center',
  },
  btnView: {
    marginBottom: 20,
    marginTop: 20,
  },
  commonBtn: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addChild: {
    fontSize: 16,
    fontFamily: fontFamily.Nunito_Regular,
    color: '#fff',
    textAlign: 'center',
  },
  addVault: {
    fontSize: 16,
    fontFamily: fontFamily.Nunito_Regular,
    color: '#A884FF',
    textAlign: 'center',
  },
  sliderDiv: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
