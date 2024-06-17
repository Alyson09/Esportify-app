import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaLogin from '../components/TelaLogin';
import { TelaCadastro } from '../screens/TelaCadastro';
import { TabNavigator } from './TabNavigator';
import { BlocksDetailScreen } from '../screens/BlocksDetailScreen';

const Stack = createNativeStackNavigator();

const quadras = [
    {
        id: 1,
        nome: 'Quadra do seu Zé',
        endereco: 'Rua Deusa Bertona, 10 - Recanto Verde, Muriaé - MG',
        preco: '50,00',
        image: require('../data/IMG/bola.png'),
    },
];

export default function StackRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={TelaLogin}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Cadastro"
                component={TelaCadastro}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Main"
                options={{
                    headerShown: false
                }}
            >
                {props => <TabNavigator {...props} quadras={quadras} />}
            </Stack.Screen>
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
