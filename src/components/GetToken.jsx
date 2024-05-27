import AsyncStorage from '@react-native-async-storage/async-storage';

const GetToken = async () => {
    try {
        const token = await AsyncStorage.getItem('@user_token');
        return token;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export default GetToken;
