import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function SolicitadasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Quadras Solicitadas</Text>
    </View>
  );
}

function AceitasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Quadras Aceitas</Text>
    </View>
  );
}

function NegadasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Quadras Negadas</Text>
    </View>
  );
}

export function Reservas() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Minhas Solicitações</Text>
      </View>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: 'white',
            borderRadius:20,
            marginLeft: 10,
            marginRight: 10
          },
          tabBarActiveTintColor:
            route.name === 'Solicitadas'
              ? 'orange'
              : route.name === 'Aceitas'
              ? 'green'
              : 'red',
          tabBarInactiveTintColor: 'black',
          tabBarLabelStyle: { fontWeight: 'bold' },
          tabBarIndicatorStyle: { backgroundColor: 'white' },
        })}
      >
        <Tab.Screen name="Solicitadas" component={SolicitadasScreen} />
        <Tab.Screen name="Aceitas" component={AceitasScreen} />
        <Tab.Screen name="Negadas" component={NegadasScreen} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: 'black',
  },
  header: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: '15%',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
