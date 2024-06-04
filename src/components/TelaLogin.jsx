import React, {useState} from "react";
import { View, KeyboardAvoidingView, 
    TextInput, TouchableOpacity, 
    Text, StyleSheet, Animated } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function TelaLogin() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://espority-backend.onrender.com/jogador/login', {
                email: email.trim(), 
                senha: senha.trim(),
            });
            if (response.status === 200) {
                const token = response.data.token;
                await AsyncStorage.setItem('@user_token', token);
                console.log('Login bem-sucedido!');
                navigation.navigate('Main');
            } else {
                console.log('Erro de login', response.data.message);
            }
        } catch (error) {
            console.error('Erro no servidor:', error);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.containerLogo}>
                <Animated.Image
                    style={
                        styles.logo
                        }
                    resizeMode="cover"
                    source={require('../data/IMG/login.png')}
                />
            </View>
            <Text>Quase pronto para começar a partida!</Text>
            <Animated.View 
                style={styles.container}> 
                <TextInput 
                    style={styles.input}
                    placeholder="Email"
                    autoCorrect={false}
                    onChangeText={setEmail}
                    value={email}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Senha"
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={setSenha}
                    value={senha}
                />
                <TouchableOpacity style={styles.submit} onPress={handleLogin}>
                    <Text style={styles.sText}>Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.register} onPress={() => navigation.navigate('Cadastro')}>
                    <Text style={styles.rText}>Cadastrar uma conta</Text>
                </TouchableOpacity>
            </Animated.View>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#fff'
    },
    containerLogo: {
        height: '40%',
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    logo: {
        width: '100vp',
        height: '100vp',
        padding:'35%'
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        paddingBottom: 50
    },
    input: {
        width: "90%",
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#222',
        fontSize: 17,
        borderRadius: 7,
        padding: 10,
    },
    submit: {
        backgroundColor: '#fff',
        width: "90%",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#222',
    },
    sText: {
        color: '#000',
        fontSize: 18
    },
    register: {
        marginTop: 15,
    },
});
