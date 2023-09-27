import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFonts, SourceCodePro_700Bold } from '@expo-google-fonts/source-code-pro';
import Animated from "react-native-reanimated";
import * as Haptics from 'expo-haptics';

const ActionButton = ({ text, action = () => {}, color, animation }) => {

    let [fontsLoaded, fontError] = useFonts({
        SourceCodePro_700Bold,
    });
    
    if (!fontsLoaded && !fontError) {
        return null;
    }

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        action();
    }

    return (
        <Animated.View style={styles.outerBorder} entering={animation}>
            <TouchableOpacity 
                style={styles.button} 
                onPress={handlePress} 
                onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
            >
                <Text style={[styles.buttonText, { color: color }]}>{text}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    outerBorder: { padding: 4, borderRadius: 16, borderWidth: 0, borderColor: "white", shadowColor: "white", shadowRadius: 3, shadowOffset: {width: 0, heigth: 0}, shadowOpacity: 1 },
    button: { padding: 10, backgroundColor: "#333", borderRadius: 10, justifyContent: "center", alignItems: "center" },
    buttonText: { fontSize: 16, fontFamily: "SourceCodePro_700Bold", fontWeight: "bold", shadowOpacity: 1, shadowOffset: {width: 0, height: 0}, shadowRadius: 5 }
})

export { ActionButton }