import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import {
  useFonts,
  SourceCodePro_600SemiBold,
  SourceCodePro_400Regular_Italic,
  SourceCodePro_800ExtraBold,
  SourceCodePro_400Regular,
} from "@expo-google-fonts/source-code-pro";
import { useContext, useEffect, useState } from "react";
import { NotePreview } from "../../components/NotePreview";
import { Keyboard } from "react-native";
import { ActionButton } from "../../components/ActionButton";
import { TodosContext } from "../../context/TodosContext";
import * as Crypto from "expo-crypto";
import { router, useLocalSearchParams } from "expo-router";
import { Octicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import ColorPickerBar from "../../components/ColorPickerBar";
import getCurrentTimestamp from "../helper/getTimestamp";
import Animated, { FadeIn } from "react-native-reanimated";

export default function AddTodo() {

  const { todos, addNote, updateNote, colors } = useContext(TodosContext);

  const { noteId } = useLocalSearchParams();

  const [title, setTitle] = useState(noteId === "new" ? "" : todos.filter(todo => todo.id === noteId)[0].title);
  const [content, setContent] = useState(noteId === "new" ? "" : todos.filter(todo => todo.id === noteId)[0].description);
  const [cursor, setCursor] = useState(0);
  const [color, setColor] = useState(noteId === "new" ? colors.titleBackgrounds[0] : todos.filter(todo => todo.id === noteId)[0].color);
  const [previewVisible, setPreviewVisible] = useState(false)

  let [fontsLoaded, fontError] = useFonts({
    SourceCodePro_600SemiBold,
    SourceCodePro_400Regular_Italic,
    SourceCodePro_800ExtraBold,
    SourceCodePro_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const insertTextAtCursor = (text) => {
    let newContent = content;
    newContent = newContent.slice(0, cursor) + text + newContent.slice(cursor);
    setContent(newContent)
  }

  const styles = StyleSheet.create({
    heading: {
      fontFamily: "SourceCodePro_800ExtraBold",
      color: colors.fg,
      fontSize: 50,
    },
    inputLabel: {
      color: colors.fg,
      fontSize: 20,
      fontFamily: "SourceCodePro_600SemiBold",
      marginRight: 5,
    },
    textInput: {
      backgroundColor: colors.mg,
      color: colors.fg,
      fontSize: 16,
      fontFamily: "SourceCodePro_400Regular",
      padding: 10,
      borderRadius: 5,
    },
    helperButtonList: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 5,
    },
    helperButton: {
      alignItems: "center",
      padding: 5,
      borderRadius: 5,
      marginRight: 5,
      backgroundColor: colors.mg,
      flexDirection: "row",
    },
    helperButtonText: {
      color: colors.fg,
      fontSize: 16,
      fontFamily: "SourceCodePro_600SemiBold",
      marginLeft: 5
    }
  });
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Animated.ScrollView
        style={{
          width: "100%",
          paddingTop: 50,
          paddingHorizontal: 20,
        }}
        entering={FadeIn.duration(1000)}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={styles.heading}>{noteId === "new" ? "Add Note" : "Edit Note"}</Text>
          <TouchableOpacity style={{ padding: 5, backgroundColor: colors.mg, borderRadius: 5 }} onPress={() => router.back()}>
            <AntDesign name="closesquareo" size={30} color={colors.fg} />
          </TouchableOpacity>
        </View>
        <View
          style={{ backgroundColor: colors.fg, height: 5, marginBottom: 20 }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={styles.inputLabel}>Title:</Text>
          <TextInput
            onChangeText={(newText) => setTitle(newText)}
            value={title}
            placeholder="New Note"
            placeholderTextColor={"#555"}
            style={[styles.textInput, { flex: 1 }]}
          />
        </View>
        <Text style={styles.inputLabel}>Color:</Text>
        <ColorPickerBar colorOptions={colors.titleBackgrounds} onChange={(color) => setColor(color)} defaultColor={noteId === "new" ? "random" : color} enforced/>
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.inputLabel, { marginBottom: 5 }]}>Content:</Text>
          <View style={styles.helperButtonList}>
            <TouchableOpacity style={styles.helperButton} onPress={() => insertTextAtCursor("```\n\n```")}>
                <Octicons name="code-square" size={20} color={colors.fg} />
                <Text style={styles.helperButtonText}>Code Block</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.helperButton} onPress={() => insertTextAtCursor("# ")}>
                <FontAwesome5 name="hashtag" size={20} color={colors.fg} />
                <Text style={styles.helperButtonText}>Heading</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.helperButton} onPress={() => insertTextAtCursor("- ")}>
            <MaterialIcons name="format-list-bulleted" size={20} color={colors.fg} />
                <Text style={styles.helperButtonText}>Bullet</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            onChangeText={(newText) => setContent(newText)}
            value={content}
            placeholder="Put your description here..."
            placeholderTextColor={"#555"}
            style={[styles.textInput, { maxHeight: 200 }]}
            editable
            multiline
            autoCapitalize="none"
            onSelectionChange={(event) => setCursor(event.nativeEvent.selection.start)}
          />
        </View>
        <ActionButton
          text={noteId === "new" ? "Create Note" : "Confirm Changes"}
          action={() => {
            if (noteId === "new") {
              addNote({
                title: title || "Empty Title",
                description: content || "empty descrition...",
                id: Crypto.randomUUID(),
                color: color,
                timestamp: getCurrentTimestamp()
              });
            } else {
              updateNote(noteId, {
                title: title || "Empty Title",
                description: content || "empty descrition...",
                id: noteId,
                color: color,
                timestamp: getCurrentTimestamp()
              })
            }
            router.push("/home");
          }}
          color={colors.fg}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
          <Text style={[styles.heading, {fontSize: 30}]}>Preview</Text>
          <TouchableOpacity onPress={() => setPreviewVisible(!previewVisible)}>
            {previewVisible === false ? <AntDesign name="up" size={30} color={colors.fg} /> : <AntDesign name="down" size={30} color={colors.fg} />}
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: colors.fg, height: 5, marginBottom: 20 }}></View>
        {previewVisible && <NotePreview title={title} content={content} color={color} />}
      </Animated.ScrollView>
    </TouchableWithoutFeedback>
  );
}