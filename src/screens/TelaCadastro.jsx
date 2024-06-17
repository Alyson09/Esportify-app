import { useState } from 'react';
import { View, ImageBackground, StyleSheet, TextInput, TouchableOpacity, Text, Image, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export function TelaCadastro() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [csenha, setCsenha] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [loading, setLoading] = useState(false); // Estado de carregamento
    const navigation = useNavigation();

    const handleCadastro = async () => {
        if (senha !== csenha) {
            console.error('As senhas não coincidem.');
            return;
        }

        setLoading(true); // Mostrar o indicador de carregamento

        try {
            const response = await axios.post('https://espority-backend.onrender.com/jogador/singup', {
                email: email.trim(), 
                senha: senha.trim(),
                nome: nome.trim(),
                telefone: telefone.trim(),
            });
            if (response.status === 201) {
                const token = response.data.token;
                await AsyncStorage.setItem('@user_token', token);
                console.log('Cadastro bem-sucedido!');
                navigation.navigate('Main');
            } else {
                console.log('Erro de cadastro', response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Erro no servidor:', error.response.data);
            }
        } finally {
            setLoading(false); // Esconder o indicador de carregamento
        }
    };

    return (
        <ImageBackground source={require('../data/IMG/CDT.png')} style={styles.img}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.containerLogo}>
                        <Image source={require('../data/IMG/Jogador.png')} style={styles.jogadorImage} />
                    </View>
                    <View style={styles.info}>
                        <Text>Bem-vindo, Atleta!</Text>
                        <Text style={styles.TV}>Vamos começar inserindo seus dados</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={setEmail}
                            value={email}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Senha"
                            secureTextEntry={true}
                            onChangeText={setSenha}
                            value={senha}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirme sua Senha"
                            secureTextEntry={true}
                            onChangeText={setCsenha}
                            value={csenha}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nome"
                            onChangeText={setNome}
                            value={nome}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="N° de Telefone"
                            onChangeText={setTelefone}
                            value={telefone}
                        />
                        <TouchableOpacity style={styles.submit} onPress={handleCadastro} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator size="small" color="#FFF" />
                            ) : (
                                <Text style={styles.sText}>Criar Conta</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {loading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#000" />
                    </View>
                )}
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: '100%',
        height: '100%',
    },
    containerLogo: {
        alignItems: 'center',
        marginBottom: 0,
    },
    jogadorImage: {
        width: 150,
        height: 100,
    },
    info: {
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 50,
        borderRadius: 10,
    },
    input: {
        width: '90%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
    },
    submit: {
        backgroundColor: '#404040',
        width: "60%",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
        borderWidth: 0,
        marginTop: 20,
    },
    sText: {
        color: '#fff',
        fontSize: 18,
    },
    TV: {
        fontSize: 16,
        marginBottom: 15,
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
