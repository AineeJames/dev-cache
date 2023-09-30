import { Text, View, StyleSheet } from "react-native";
import { delays } from "../constants/delays";
import Checkbox from 'expo-checkbox';
import { useFonts, SourceCodePro_600SemiBold, SourceCodePro_400Regular_Italic, SourceCodePro_800ExtraBold, SourceCodePro_500Medium } from '@expo-google-fonts/source-code-pro';
import { useContext, useState } from "react";
import Animated, { FadeInRight } from "react-native-reanimated";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActionButton } from "./ActionButton";
import { router } from "expo-router";
import { TodosContext } from "../context/TodosContext";

const TodoEntry = ({ todo, delay, onNotePress }) => {

    const { colors } = useContext(TodosContext);

    let [fontsLoaded, fontError] = useFonts({
        SourceCodePro_600SemiBold,
        SourceCodePro_400Regular_Italic,
        SourceCodePro_800ExtraBold,
        SourceCodePro_500Medium
    });
    
    if (!fontsLoaded && !fontError) {
        return null;
    }

    const getShortDescription = () => {
        if (todo.description.length > 75) {
            return todo.description.slice(0, 75) + "..."
        } else {
            return todo.description
        }
    }

    const styles = StyleSheet.create({
        contentContainer: {
            marginBottom: 15,
            paddingHorizonatal: 5,
            backgroundColor: colors.mg,
            borderTopRightRadius: 10
        },
        todoTitle: {
            fontSize: 28,
            color: colors.bg,
            fontFamily: "SourceCodePro_600SemiBold",
            width: "90%"
        },
        todoTime: {
            fontSize: 16,
            color: colors.bg,
            fontFamily: "SourceCodePro_500Medium",
            width: "90%"
        },
        todoDescription: {
            fontSize: 18,
            color: colors.fg,
            fontFamily: "SourceCodePro_400Regular_Italic",
        }
    })
    

    return (
        <TouchableOpacity onPress={() => onNotePress(todo.id)}>
            <Animated.View style={styles.contentContainer} entering={FadeInRight.duration(1000).delay(delay * delays.todoEntryDelay)}>
                <View style={{ paddingVertical: 5, paddingHorizontal: 7, backgroundColor: todo.color, borderTopRightRadius: 10 }}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={styles.todoTitle}>{todo.title}</Text>
                        <TouchableOpacity style={{ backgroundColor: colors.mg, borderRadius: 5, padding: 5 }} onPress={() => router.push(`/edit/${todo.id}`)}>
                            <AntDesign name="edit" size={25} color={colors.fg} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.todoTime}>{todo.timestamp}</Text>
                </View>
                <View style={{paddingLeft: 10, paddingVertical: 5}}>
                    <Text style={styles.todoDescription}>{getShortDescription()}</Text>
                </View>
                <View style={{ width: "90%", height: 5, backgroundColor: colors.fg, marginTop: 5 }}></View>
            </Animated.View>
        </TouchableOpacity>
    );
};

export { TodoEntry };