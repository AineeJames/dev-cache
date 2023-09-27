import { Text, Image, StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, SourceCodePro_600SemiBold, SourceCodePro_400Regular_Italic } from '@expo-google-fonts/source-code-pro';
import TypeWriter from 'react-native-typewriter';
import { ActionButton } from "../components/ActionButton.js";
import Animated, { FadeIn, BounceIn, FadeOut, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withTiming, interpolate } from 'react-native-reanimated';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { colors } from '../constants/colors.js';
import { useEffect } from 'react';

export default function Page() {

  const floating = useSharedValue(0);
  useEffect(() => {
    floating.value = withRepeat(withTiming(1, {duration: 2000}), -1, true)
  }, [])
  const floatingStyle = useAnimatedStyle(() => {
    const translateY = interpolate(floating.value, [0, 1], [-20, 10]);
    return {
      transform: [{translateY}],
    };
  })

  let [fontsLoaded, fontError] = useFonts({
    SourceCodePro_600SemiBold,
    SourceCodePro_400Regular_Italic,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const goToHome = () => {
    router.push("/home");
  }

  return (
    <Animated.View style={styles.contentContainer}>
      <View style={{ position: "realative" }}>
        <Animated.View style={styles.blobContainer} entering={BounceIn}>
          <Image style={styles.blobContainer} source={require("../assets/blobs/blob-01.png")} />
        </Animated.View>
        <Animated.Text style={[styles.headingText, floatingStyle]} entering={FadeIn.duration(1000)}>Dev Cache</Animated.Text>
      </View>
      <TypeWriter
        style={styles.typewriterText}
        typing={1}
        onTyped={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
      >A simple note app for developers!</TypeWriter>
      <Animated.View style={{ paddingTop: 20, width: "50%" }} entering={FadeIn.duration(1000)}>
        <ActionButton 
          text="Continue"
          color={colors.purple}
          animation={FadeIn.duration(1000).delay(4000)}
          action={goToHome}
        />
      </Animated.View>
    </Animated.View>
  );

}

const styles = StyleSheet.create({
  contentContainer: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  headingText: {
    position: "absolute",
    top: "39%",
    left: "5%",
    fontFamily: "SourceCodePro_600SemiBold",
    fontWeight: "bold",
    fontSize: 50,
    color: colors.fg,
    textAlign: "center"
  },
  blobContainer: {
    width: 300,
    height: 300,
    shadowColor: "#FFF",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowColor: colors.purple
  },
  typewriterText: {
    color: colors.fg, 
    fontSize: 20, 
    fontFamily: "SourceCodePro_400Regular_Italic", 
    textAlign: "center", 
    marginHorizontal: 20,
    height: 100
  }
})