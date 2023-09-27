import { Text, View, ScrollView, StyleSheet } from "react-native";
import { ActionButton } from "../components/ActionButton.js";
import { router } from 'expo-router';
import { TodosContext, TodosProvider } from "../context/TodosContext.js";
import { useContext, useState } from "react";
import { colors } from "../constants/colors.js";
import { useFonts, SourceCodePro_600SemiBold, SourceCodePro_400Regular_Italic, SourceCodePro_800ExtraBold } from '@expo-google-fonts/source-code-pro';
import { TodoEntry, TodosEntry } from '../components/TodoEntry.js';
import { TodoAddButton } from "../components/TodoAddButton.js";
import Animated, { FadeInRight } from "react-native-reanimated";

export default function Home() {

    const { todos } = useContext(TodosContext);

    let [fontsLoaded, fontError] = useFonts({
        SourceCodePro_600SemiBold,
        SourceCodePro_400Regular_Italic,
        SourceCodePro_800ExtraBold,
      });
    
      if (!fontsLoaded && !fontError) {
        return null;
      }

    return (
        <View style={styles.globalContainer}>
            <Animated.Text style={styles.heading} entering={FadeInRight.duration(1000)}>NOTES:</Animated.Text>
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                {todos.map((todo, index) => <TodoEntry todo={todo} key={todo.id} delay={index}/>)}
                <TodoAddButton action={() => router.push("/addtodo")} delay={todos.length}/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        width: "100%",
        height: "100%",
        paddingHorizontal: 20,
        backgroundColor: colors.bg,
        paddingTop: 50,
    },
    heading: {
        fontFamily: "SourceCodePro_800ExtraBold",
        color: colors.fg,
        fontSize: 50,
    }
})