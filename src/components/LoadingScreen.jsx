import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const LoadingScreen = ({ onLoadingEnd }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingEnd();
    }, 8000);

    return () => clearTimeout(timer);
  }, [onLoadingEnd]);

  return (
    <View style={styles.container}>
      <Video
        source={require('../data/IMG/intro.mp4')} 
        style={styles.backgroundVideo}
        resizeMode="cover"
        onEnd={onLoadingEnd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
});

export default LoadingScreen;
