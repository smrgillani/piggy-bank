import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constant from './constant';

const getHeaders = async (auth) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    if(auth){
        try {

            var getUserSession = await AsyncStorage.getItem('@klever_user_session');
            
            getUserSession = getUserSession != null ? JSON.parse(getUserSession) : null;

            if(getUserSession !== null){
                if (getUserSession.token.length > 0) {
                    headers['Authorization'] = 'Bearer ' + getUserSession.token;
                }
            }
        
        } catch (errorr) {
           // console.log(" Error is here " + errorr);
        }
    }

    return headers;
};

export const postData = async (methodName, auth, postValue) => {
    
    // console.log(`${Constant.BASE_URL}${methodName}`);
    // console.log(JSON.stringify(postValue));

    const allHeaders = await getHeaders(auth);

    // console.log(JSON.stringify(allHeaders));
    
    return fetch(`${Constant.BASE_URL}${methodName}`, {
        method: 'POST',
        headers: allHeaders,
        body: JSON.stringify(postValue)
    }).then(response => {
        
        // console.log( " My Response => " + JSON.stringify(response));
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }else if(response.status === 403){
            return response.json();
        }

    }).then((responseJson) => {

        // console.log(" Server Response => ",JSON.stringify(responseJson));

        if (responseJson !== undefined && responseJson.code === 401) {
            // logoutDeleteCase(responseJson.message)
        }else if(responseJson !== undefined && responseJson.code === 503 || responseJson.code === 402){
             // appUpdateOrMaintanance(responseJson.message)
        } else {
            return responseJson;
        }

    }).catch((error) => {
        return error;
        console.error(error);
    });

};

export const getData = async (methodName, auth) => {
    
    // console.log(`${Constant.BASE_URL}${methodName}`);

    const allHeaders = await getHeaders(auth);

    // console.log(JSON.stringify(allHeaders));
    
    return fetch(`${Constant.BASE_URL}${methodName}`, {
        method: 'GET',
        headers: allHeaders
    }).then(response => {
        
        console.log( " My Response => " + JSON.stringify(response));
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }else if(response.status === 403){
            return response.json();
        }

    }).then((responseJson) => {

        console.log(" Server Response => ",JSON.stringify(responseJson));

        if (responseJson !== undefined && responseJson.code === 401) {
            // logoutDeleteCase(responseJson.message)
        }else if(responseJson !== undefined && responseJson.code === 503 || responseJson.code === 402){
             // appUpdateOrMaintanance(responseJson.message)
        } else {
            return responseJson;
        }

    }).catch((error) => {
        console.error(error);
        return error;
    });

};