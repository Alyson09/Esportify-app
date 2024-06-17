import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaLogin from '../components/TelaLogin';
import { TelaCadastro } from '../screens/TelaCadastro';
import { TabNavigator } from './TabNavigator'; 
import { BlocksDetailScreen } from '../screens/BlocksDetailScreen';

const Stack = createNativeStackNavigator();

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
