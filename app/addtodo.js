import { Text, View, ScrollView, TextInput, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { useFonts, SourceCodePro_600SemiBold, SourceCodePro_400Regular_Italic, SourceCodePro_800ExtraBold, SourceCodePro_400Regular } from '@expo-google-fonts/source-code-pro';
import { useState } from "react";
import { colors } from "../constants/colors";
import { NotePreview } from '../components/NotePreview';
import {Keyboard} from 'react-native'

export default function AddTodo() {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    let [fontsLoaded, fontError] = useFonts({
        SourceCodePro_600SemiBold,
        SourceCodePro_400Regular_Italic,
        SourceCodePro_800ExtraBold,
        SourceCodePro_400Regular
    });
    
    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={{ height: "100%", width: "100%", paddingTop: 50, paddingHorizontal: 20, display: "flex" }}>
            <Text style={styles.heading}>Add Note</Text>
            <View style={{ backgroundColor: colors.fg, height: 5, marginBottom: 20 }}></View>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                <Text style={styles.inputLabel}>Title:</Text>
                <TextInput 
                    onChangeText={(newText) => setTitle(newText)}
                    value={title}
                    placeholder="New Note"
                    placeholderTextColor={"#555"}
                    style={[styles.textInput, { flex: 1 }]}
                />
            </View>
            <View style={{marginBottom: 20}}>
                <Text style={[styles.inputLabel, { marginBottom: 5 }]}>Content:</Text>
                <TextInput 
                    onChangeText={(newText) => setContent(newText)}
                    value={content}
                    placeholder="Put your description here..."
                    placeholderTextColor={"#555"}
                    style={styles.textInput}
                    editable
                    multiline
                    autoCapitalize="none"
                />
            </View>
            <Text style={styles.heading}>Preview</Text>
            <View style={{ backgroundColor: colors.fg, height: 5, marginBottom: 20 }}></View>
            <NotePreview
                title={title}
                content={content}
            />
        </ScrollView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontFamily: "SourceCodePro_800ExtraBold",
        color: colors.fg,
        fontSize: 50,
    },
    inputLabel: { color: colors.fg, fontSize: 20, fontFamily: "SourceCodePro_600SemiBold", marginRight: 5 },
    textInput: {
        backgroundColor: colors.mg,
        color: colors.fg,
        fontSize: 20,
        fontFamily: "SourceCodePro_400Regular",
        padding: 10,
        borderRadius: 5,
    }
})