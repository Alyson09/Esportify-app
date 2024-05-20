import React, {useState} from "react";
import { View, KeyboardAvoidingView, 
    TextInput, TouchableOpacity, 
    Text, StyleSheet, Animated } from "react-native";
import axios from 'axios';


export default function TelaLogin() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://seu-endpoint-de-login.com/api/login', {
                email: email,
                senha: senha,
            });
            if (response.status === 200) {
                const token = response.data.token;
                await AsyncStorage.setItem('token', token);
                Alert.alert('Login bem-sucedido!');
            } else {
                Alert.alert('Erro de login', response.data.message || 'Algo deu errado!');
            }
        } catch (error) {
            if (error.response) {
                Alert.alert('Erro de login', error.response.data.message || 'Algo deu errado!');
            } else {
                Alert.alert('Erro de rede', 'Não foi possível conectar ao servidor');
            }
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
                    source={require('../data/IMG/Tlogin.png')}
                />
            </View>

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
                    onChangeText={setSenha}
                    value={senha}
                />

                <TouchableOpacity style={styles.submit} onPress={handleLogin}>
                    <Text style={styles.sText}>Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.register}>
                    <Text style={styles.rText}>Cadastrar</Text>
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
        backgroundColor: '#83e636',
        width: "90%",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7
    },
    sText: {
        color: '#000',
        fontSize: 18
    },
    register: {
        marginTop: 15,
    },
});
