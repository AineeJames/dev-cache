import { Text, View, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import Checkbox from 'expo-checkbox';
import { useFonts, SourceCodePro_600SemiBold, SourceCodePro_400Regular_Italic, SourceCodePro_800ExtraBold } from '@expo-google-fonts/source-code-pro';
import { useState } from "react";
import { Entypo } from '@expo/vector-icons'; 
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { FadeInRight } from "react-native-reanimated";
import { delays } from "../constants/delays";

const TodoAddButton = ({ action, delay }) => {

    let [fontsLoaded, fontError] = useFonts({
        SourceCodePro_600SemiBold,
        SourceCodePro_400Regular_Italic,
        SourceCodePro_800ExtraBold,
    });
    
    if (!fontsLoaded && !fontError) {
        return null;
    }


    return (
        <TouchableOpacity onPress={action}>
            <Animated.View style={styles.contentContainer} entering={FadeInRight.duration(1000).delay(delay * delays.todoEntryDelay)}>
                <View style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: colors.fg, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={styles.todoTitle}>New Note</Text>
                    <Entypo name="add-to-list" size={24} color={colors.bg} />
                </View>
                <View style={{paddingLeft: 10, paddingVertical: 5}}>
                    <Text style={styles.todoDescription}>Click here to add a new note...</Text>
                </View>
                <View style={{ width: "90%", height: 5, backgroundColor: colors.fg, marginTop: 5 }}></View>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        marginBottom: 15,
        paddingHorizonatal: 5,
        backgroundColor: colors.mg,
    },
    todoTitle: {
        fontSize: 28,
        color: colors.bg,
        fontFamily: "SourceCodePro_600SemiBold",
    },
    todoDescription: {
        fontSize: 18,
        color: colors.fg,
        fontFamily: "SourceCodePro_400Regular_Italic",
    }
})

export { TodoAddButton };