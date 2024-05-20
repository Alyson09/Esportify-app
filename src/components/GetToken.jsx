import AsyncStorage from '@react-native-async-storage/async-storage';

export default GetToken = async () => {
    try {
        const token = await AsyncStorage.getItem('@user_token');
        return token;
    } catch (e) {
        console.error(e);
        return null;
    }
};

