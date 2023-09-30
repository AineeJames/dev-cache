import { View, ScrollView, StyleSheet, Text } from "react-native";
import { router } from 'expo-router';
import { TodosContext } from "../context/TodosContext.js";
import { useContext, useEffect, useState } from "react";
import { useFonts, SourceCodePro_600SemiBold, SourceCodePro_400Regular_Italic, SourceCodePro_800ExtraBold } from '@expo-google-fonts/source-code-pro';
import { TodoEntry } from '../components/TodoEntry.js';
import { TodoAddButton } from "../components/TodoAddButton.js";
import Animated, { FadeInRight } from "react-native-reanimated";
import ColorPickerBar from "../components/ColorPickerBar.js";

export default function Home() {

    const [filter, setFilter] = useState(null);

    const { todos, colors } = useContext(TodosContext);

    const uniqueColors = [];
    todos.forEach(todo => {
        const color = todo.color;
        if (!uniqueColors.includes(color)) {
            uniqueColors.push(color);
        }
    });

    let [fontsLoaded, fontError] = useFonts({
        SourceCodePro_600SemiBold,
        SourceCodePro_400Regular_Italic,
        SourceCodePro_800ExtraBold,
      });
    
    if (!fontsLoaded && !fontError) {
        return null;
    }

    const showNote = (noteId) => {
        router.push(`/notes/${noteId}`)
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

    return (
        <View style={styles.globalContainer}>
            <Animated.Text style={styles.heading} entering={FadeInRight.duration(1000)}>NOTES:</Animated.Text>
            <Text style={{ color: colors.fg, fontFamily: "SourceCodePro_600SemiBold" }}>Filter:</Text>
            <ColorPickerBar colorOptions={uniqueColors} onChange={(color) => setFilter(color)}/>
            <View style={{ backgroundColor: colors.mg, height: 5, marginBottom: 10 }}></View>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {todos.filter(todo => todo.color === filter || filter === null).map((todo, index) => <TodoEntry onNotePress={showNote} todo={todo} key={todo.id} delay={index}/>)}
                <TodoAddButton action={() => router.push("/edit/new")} delay={todos.length}/>
            </ScrollView>
        </View>
    )
}