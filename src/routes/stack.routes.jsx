import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaLogin from '../components/TelaLogin';
import { TelaCadastro } from '../screens/TelaCadastro';
import { TabNavigator } from '../components/TabNavigator'; 
import { BlocksDetailScreen } from '../screens/BlocksDetailScreen'; // Importe a tela de detalhes

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={TelaLogin}
                options={{
                    title: 'Login'
                }}
            />
            <Stack.Screen
                name="Cadastro"
                component={TelaCadastro}
                options={{
                    title: 'Cadastro'
                }}
            />
            <Stack.Screen
                name="Main"
                component={TabNavigator}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="BlocksDetailScreen"
                component={BlocksDetailScreen}
                options={{
                    title: 'Detalhes da Quadra'
                }}
            />
        </Stack.Navigator>
    );
}
