import { Text, View, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import { delays } from "../constants/delays";
import Checkbox from 'expo-checkbox';
import { useFonts, SourceCodePro_600SemiBold, SourceCodePro_400Regular_Italic, SourceCodePro_800ExtraBold } from '@expo-google-fonts/source-code-pro';
import { useState } from "react";
import Animated, { FadeInRight } from "react-native-reanimated";

const TodoEntry = ({ todo, delay }) => {
    
    const [isChecked, setIsChecked] = useState(false);

    let [fontsLoaded, fontError] = useFonts({
        SourceCodePro_600SemiBold,
        SourceCodePro_400Regular_Italic,
        SourceCodePro_800ExtraBold,
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

    return (
        <Animated.View style={styles.contentContainer} entering={FadeInRight.duration(1000).delay(delay * delays.todoEntryDelay)}>
            <View style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: colors.purple, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={styles.todoTitle}>{todo.title}</Text>
                <Checkbox 
                    color={colors.bg}
                    value={isChecked}
                    onValueChange={setIsChecked}
                    style={{ width: 30, height: 30 }}
                />
            </View>
            <View style={{paddingLeft: 10, paddingVertical: 5}}>
                <Text style={styles.todoDescription}>{getShortDescription()}</Text>
            </View>
            <View style={{ width: "90%", height: 5, backgroundColor: colors.fg, marginTop: 5 }}></View>
        </Animated.View>
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
        width: "90%"
    },
    todoDescription: {
        fontSize: 18,
        color: colors.fg,
        fontFamily: "SourceCodePro_400Regular_Italic",
    }
})

export { TodoEntry };