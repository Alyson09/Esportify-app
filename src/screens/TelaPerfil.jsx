import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export function TelaPerfil() {
    const navigation = useNavigation();
    const route = useRoute();
    const { email, nome } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.text}>{nome}</Text>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.text}>{email}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('TelaLogin')}>
                <Text style={styles.buttonText}>Voltar ao Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
