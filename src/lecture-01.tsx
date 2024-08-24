import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnUI,
  withRepeat,
  SharedValue,
} from "react-native-reanimated";

const SIZE = 100;

const handleRotation = (progress: SharedValue<number>) => {
  "worklet";
  return `${progress.value * 2 * Math.PI}rad`;
};

const App = () => {
  const progress = useSharedValue(1);
  const scale = useSharedValue(1);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [{ scale: scale.value }, { rotate: handleRotation(progress) }],
    };
  }, []);

  const runAnimation = (animationFunction: () => void) => {
    runOnUI(animationFunction)();
  };

  const sizeAnimation = () => {
    "worklet";
    progress.value = withRepeat(withSpring(0.5), -1, true);
    scale.value = withRepeat(withSpring(2), -1, true);
  };

  useEffect(() => {
    runAnimation(sizeAnimation);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            width: SIZE,
            height: SIZE,
            backgroundColor: "blue",
            borderRadius: 5,
          },
          reanimatedStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
