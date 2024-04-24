import React, { useState } from "react";
import { Animated, StyleSheet, Text, View, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { DAYS } from "../data/mock-data";

function HorarioSelector({dia}) {
  const [opened, setOpened] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const horarios = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"]


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
    outputRange: [0, 100] 
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
            <Text key={index} style={styles.details}>{horario}</Text>
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
  },
  details: {
    fontWeight: 'regular',
    opacity: 0.65,
    height: 20, 
  },
});

export default HorarioSelector;
