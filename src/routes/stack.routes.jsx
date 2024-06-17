import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BlocksDetailScreen } from '../screens/BlocksDetailScreen';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
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
