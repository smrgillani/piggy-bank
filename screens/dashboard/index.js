import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import ProfileBar from '../../component/profileBar';
import LinearGradient from 'react-native-linear-gradient';
import fontFamily from '../../constants/fontFamily';
import Carousel from 'react-native-snap-carousel';
import images from '../../constants/images';
import DrawerHeader from '../../component/drawerHeader';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

import { getData } from '../../service/user.service';

const Dashboard = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(0);
  const [data, setData] = useState(undefined);
  const snapCarouselRef = useRef(null);
    React.useEffect(() => {
    
      // const unsubscribe = navigation.addListener('focus', () => {
      //   console.log('=> google google ');
      // });

      try {

        getData("allchildren/", true).then( async (response) => {

          if (response !== undefined) {

            if(response.Id !== undefined){
              //console.log(response);
              setData(response);
              setSelectedId(response[0].Id);
            }else{
              // Alert.alert(Array.isArray(response));
            }

          } else {
            Alert.alert("Unable to load User data, please check internet connection.");
          }

        });

      } catch(e) {

      }

    }, []);
  
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ChildAccount', {child_id: item.Id})}>
        <View key={index} style={styles.sliderCard}>
          <ProfileBar name={item.firstname + " " + item.lastname} email={item.dateofbirth} profilepic={item.profilepic} />
          <LinearGradient
            style={styles.cardView}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#F9D9FF', '#FFF3CC']}>
            <View>
              <Text style={styles.priceText}>${item.sumoftransactions}</Text>
              <Text style={styles.titleText}>Klever Vault</Text>
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  };

  const listRender = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => { setSelectedId(item.Id); this.snapCarouselRef.snapToItem(index); }}>
      <View style={styles.listCard}>
        <View style={{
            ...styles.imgView,
            borderColor: (selectedId == item.Id ? '#A884FF' : '#fff'),
          }}>
          <Image style={{width: 55, height: 55}} source={{uri : 'data:image/jpg;base64,' + item.profilepic}} />
        </View>
        <Text style={{fontFamily: fontFamily.Nunito_Regular}}>{item.firstname}</Text>
      </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.mainContainer}>
        <DrawerHeader title={'Children'} {...navigation} search={true} />
        <View style={styles.sliderView}>
          {data && (<Carousel
            layout={'default'}
            data={data}
            renderItem={renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            hasParallaxImages={true}
            useScrollView={true}
            loop={true}
            ref= {(c) => { this.snapCarouselRef = c; }}
            onSnapToItem = {(index) => { setSelectedId(data[index].Id); }}
          />) }
        </View>
        <View style={styles.flatSliderView}>
          <FlatList
            data={data}
            renderItem={listRender}
            key={item => item.Id}
            keyExtractor={item => item.Id}
            horizontal={true}
          />
        </View>
        <View style={styles.btnView}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#A884FF', '#4D4365']}
            style={styles.commonBtn}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('VideoScreen');
              }}>
              <Text style={styles.signUpText}>ADD A CHILD</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </ScrollView>
  );
};
export default Dashboard;
const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
  },

  sliderView: {
    marginTop: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardView: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    resizeMode: 'center',
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
  sliderCard: {
    backgroundColor: '#F3EEFF',
    padding: 20,
    borderRadius: 30,
    width: ITEM_WIDTH,
    height: 400,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  imgView: {
    width: 60,
    height: 60,
    borderWidth: 5,
    borderColor: "#FFF",
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow:'hidden'
  },
  flatSliderView: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listCard: {
    marginLeft: 10,
    marginRight: 10,
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
