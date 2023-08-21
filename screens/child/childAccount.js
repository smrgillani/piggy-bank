import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Platform,
  Alert,
  Image,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import fontFamily from '../../constants/fontFamily';
import LinearGradient from 'react-native-linear-gradient';
import Hook from '../../lib/hook';
import images from '../../constants/images';
import ProfileBar from '../../component/profileBar';
import DrawerHeader from '../../component/drawerHeader';
import { getData, postData} from '../../service/user.service';

const ChildAccount = ({route, navigation}) => {
  const [kbHeight] = Hook.useKeyboard();
  const [data, setData] = useState(undefined);
  const [childId, setChildId] = useState(undefined);
  const [showAlert, setShowAlert] = useState(false);

    React.useEffect(() => {
      try {

        getData("selectchild?childid=" + route.params.child_id , true).then( async (response) => {

          if (response !== undefined) {
            
            if(response.Id !== undefined){
              setData(response);
              setChildId(route.params.child_id);
            }else{
              Alert.alert(response.detail);
            }

          } else {
              Alert.alert("Child not able to added successfully, please fill data carefully.");
          }
        });

      } catch(e) {

      }
    }, []);

    _showAlert = () => {
      setShowAlert(true);
    };

    const retrieveUserSession = async () => {
      try {

        const value = await AsyncStorage.getItem('@klever_user_session');

        if(value !== null) {
          return value;
        }

      } catch(e) {

      }
    }

    _addTransaction = async (ts_title, ts_amount) => {

    var userId = await retrieveUserSession();

    userId = userId != null ? JSON.parse(userId) : null;

    if(userId !== null){
      if (userId.user_id.toString().length > 0) {
        userId = userId.user_id;
      }
    }

    const payload = {
      childid: childId,
      title:ts_title,
      amount: ts_amount
    }

    postData("addtransaction/", true, payload).then( async (response) => {

        if (response !== undefined) {
          
          if(response.Id !== undefined){

            // var rus = await retrieveUserSession();
            // rus = rus != null ? JSON.parse(rus) : null;

            // if (rus.token.length > 0) {
            //    navigation.navigate('ChildAccount', {child_id: response.Id});
            // } else {
            //   Alert.alert("Unable to process login request of registered user.");
            // }
            _showAlert();

          }else{
            Alert.alert(response.detail);
          }

        } else {
            Alert.alert("Transaction not able to be processed successfully, please try again.");
        }
    });

  }

  return (
    <>
      <DrawerHeader
        title={'Child Account'}
        backBtn={images.backBtn}
        {...navigation}
      />
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.mainContainer}>
          <ProfileBar name={ data ? (data.firstname + " " + data.lastname) : ("")} email={data ? (data.dateofbirth) : ("")} profilepic={data ? (data.profilepic) : ("")} />
          <View style={styles.multiBtn}>
            <TouchableOpacity
              style={styles.commonBtn}
              onPress={() => navigation.navigate('SavingAccount')}>
              <Image source={images.trading} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.commonBtn}
              onPress={() => navigation.navigate('SavingAccount')}>
              <Image source={images.board} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.commonBtn}
              onPress={() => navigation.navigate('SavingAccount')}>
              <Image source={images.moneyBank} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editText}>EDIT {data && data.firstname}'s PROFILE</Text>
          </TouchableOpacity>
          <View style={styles.listView}>
            <Text
              style={{
                fontFamily: fontFamily.Nunito_Bold,
                color: '#707070',
                fontSize: 16,
                textAlign: 'center',
                marginBottom: 20,
              }}>
              Chores List
            </Text>
            
            <View style={styles.listMulti}>

              {data && data.chorewitrewards.map((item, index) => {
                return (<TouchableOpacity onPress={() => { this._addTransaction(item.rewardtasktitle, item.rewardtaskamount); }}><View style={styles.listCard}>
                  <View style={[styles.lineBar, {backgroundColor: '#FF8181'}]}></View>
                  <Text style={styles.listText}>
                    {item.rewardtasktitle}
                  </Text>
                  <Text style={styles.priceText}>${item.rewardtaskamount}</Text>
                </View></TouchableOpacity>);
              })}

            
            </View>

            <View style={styles.btnView}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#A884FF', '#4D4365']}
                style={styles.common}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AddChoreWitReward', {child_id: childId})}>
                  <Text style={styles.signUpText}>ADD CHORE WIT REWARD</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>

          </View>
        </View>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Reward Confirmation"
          message="You have rewarded your child successfully!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={true}
          showConfirmButton={false}
          cancelText="OK, close"
          confirmText="Yes, delete it"
          cancelButtonColor="#DD6B55"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            setShowAlert(false);
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
      </ScrollView>
    </>
  );
};
export default ChildAccount;
const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    paddingLeft: 45,
    paddingRight: 45,
  },
  multiBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  commonBtn: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F5FF',
    borderRadius: 15,
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
    marginTop: 20,
    marginBottom: 20,
  },
  editText: {
    fontFamily: fontFamily.Nunito_Regular,
    fontSize: 14,
    color: '#A884FF',
  },
  listCard: {
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    display: 'flex',
    backgroundColor: '#F8F5FF',
    padding: 15,
    borderRadius: 15,
    position: 'relative',
    marginBottom: 20,
  },
  lineBar: {
    width: 3,
    height: 20,
    borderRadius: 15,
    marginRight: 15,
  },
  priceText: {
    fontSize: 14,
    fontFamily: fontFamily.Nunito_Bold,
    color: '#A884FF',
    position: 'absolute',
    right: 15,
    top: 15,
  },
  listText: {
    fontSize: 14,
    marginRight:50,
    fontFamily: fontFamily.Nunito_Regular,
    color: '#707070',
  },
  common: {
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
