import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlockListScreen } from '../screens/BlockListScreen';
import { TelaPerfil } from '../screens/TelaPerfil';
import { TelaBusca } from '../screens/TelaBusca';
import { Reservas } from '../screens/Reservas';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export function TabNavigator({ quadras }) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'BlockListScreen') {
                        iconName = 'home';
                    } else if (route.name === 'TelaBusca') {
                        iconName = 'search';
                    } else if (route.name === 'Reservas') {
                        iconName = 'basketball';
                    } else if (route.name === 'TelaPerfil') {
                        iconName = 'person';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: [
                    {
                        display: 'flex'
                    },
                    null
                ]
            })}
        >
            <Tab.Screen
                name="BlockListScreen"
                component={BlockListScreen}
                options={{ title: 'Home' }}
            />
            <Tab.Screen
                name="TelaBusca"
                options={{ title: 'Pesquisa' }}
            >
                {props => <TelaBusca {...props} quadras={quadras} />}
            </Tab.Screen>
            <Tab.Screen
                name="Reservas"
                component={Reservas}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="TelaPerfil"
                component={TelaPerfil}
                options={{ title: 'Perfil' }}
            />
        </Tab.Navigator>
    );
}
