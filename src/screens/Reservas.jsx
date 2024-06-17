import React from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const sampleData = [
  { id: '1', image: 'https://i.imgur.com/0mpg3sp.jpeg', time: '10:00 as 11:00', date: '16/06/2024' },
];

const Card = ({ image, time, date }) => (
  <View style={styles.card}>
    <Image source={{ uri: image }} style={styles.image} />
    <View style={styles.cardContent}>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  </View>
);

const renderItem = ({ item }) => (
  <Card image={item.image} time={item.time} date={item.date} />
);

function SolicitadasScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={sampleData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

function AceitasScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={sampleData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

function NegadasScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={sampleData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
            borderRadius: 20,
            marginHorizontal: 10,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'black',
          tabBarLabelStyle: { fontWeight: 'bold' },
          tabBarIndicatorStyle: {
            backgroundColor: route.name === 'Solicitadas' ? 'orange' : route.name === 'Aceitas' ? 'green' : 'red',
            height: '100%',
            borderRadius: 20,
          },
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
  card: {
    flexDirection: 'row',
    padding: 20,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: 350
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
});
