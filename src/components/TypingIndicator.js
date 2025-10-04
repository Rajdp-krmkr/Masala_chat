import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';

const TypingIndicator = ({ phoneNumber }) => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = (dot, delay) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animation1 = animateDot(dot1, 0);
    const animation2 = animateDot(dot2, 200);
    const animation3 = animateDot(dot3, 400);

    animation1.start();
    animation2.start();
    animation3.start();

    return () => {
      animation1.stop();
      animation2.stop();
      animation3.stop();
    };
  }, []);

  const getDotStyle = (animatedValue) => ({
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    }),
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1.2],
        }),
      },
    ],
  });

  return (
    <View className="px-4 py-1 items-start">
      <View className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm flex-row items-center shadow-sm">
        <Text className="text-gray-500 text-sm italic mr-2">typing</Text>
        <View className="flex-row items-center">
          <Animated.View 
            style={[{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#667eea', marginHorizontal: 1 }, getDotStyle(dot1)]} 
          />
          <Animated.View 
            style={[{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#667eea', marginHorizontal: 1 }, getDotStyle(dot2)]} 
          />
          <Animated.View 
            style={[{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#667eea', marginHorizontal: 1 }, getDotStyle(dot3)]} 
          />
        </View>
      </View>
    </View>
  );
};

export default TypingIndicator;