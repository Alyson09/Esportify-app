import React, { useState } from "react";
import { Animated, StyleSheet, Text, View, Pressable, Button, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-web";

function HorarioSelector({dia, horarios}) {
  const [opened, setOpened] = useState(false);
  const [animation] = useState(new Animated.Value(0));


  function toggleAccordion() {
    const toValue = opened ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 100,
      useNativeDriver: false
    }).start();
    setOpened(!opened);
  }

  const heightAnimationInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, horarios.length * 20] 
  });

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleAccordion}>
        <View style={styles.header}>
            <Text style={styles.details}>{dia}</Text>
          <AntDesign name={opened ? 'caretup' : 'caretdown'} size={16} />
        </View>
      </Pressable>

      {opened && (
        <Animated.View style={[styles.content, { height: heightAnimationInterpolation }]}>
            {horarios.map((horario, index) => (
            <Text key={index} style={styles.details}>{horario}
            <TouchableOpacity
            style={styles.button}
            onPress={()=>console.log("Quadra alugada!")}>
            <Text>Alugar</Text>
            </TouchableOpacity>
            </Text>
            ))}
        </Animated.View>
      )}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 6,
    borderWidth: 2
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  content: {
    marginTop: 8,
    overflow: 'hidden', 
    flex: 1,
    justifyContent: 'space-between',
  },
  details: {
    fontWeight: 'regular',
    opacity: 0.65,
    height: 20,
    
  },
  button:{
    borderRadius: 3,
    backgroundColor: '#FE2020',
  }
});

export default HorarioSelector;
