import { StyleSheet, View, Alert } from 'react-native'
import React, { useContext } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { NotePreview } from '../../components/NotePreview'
import { TodosContext } from '../../context/TodosContext'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

const Notes = () => {

  const { noteId } = useLocalSearchParams();

  const { todos, removeNote, colors } = useContext(TodosContext);
  const note = todos.filter((todo) => todo.id === noteId)[0]

  const handleDelete = () => {
    Alert.alert(
        "Confirm Deletion",
        `Are you sure you want to delete your note titled "${note.title}"?`,
        [
            { text: "No" },
            { text: "Yes", onPress: () => {
                removeNote(note.id)
                router.back()
            }}
        ],
        { cancelable: false }
    )
  }

  const styles = StyleSheet.create({
    globalContainer: {
        paddingTop: 50,
        paddingHorizontal: 20
    }
    })

  return note ? (
    <View style={styles.globalContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom:10 }}>
            <TouchableOpacity style={{ padding: 5, backgroundColor: colors.mg, borderRadius: 10, width: 100, alignItems: "center" }} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={25} color={colors.fg} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 5, backgroundColor: colors.mg, borderRadius: 10, width: 100, alignItems: "center" }} onPress={() => router.push(`/edit/${note.id}`)}>
                <AntDesign name="edit" size={25} color={colors.fg} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 5, backgroundColor: colors.mg, borderRadius: 10, width: 100, alignItems: "center" }} onPress={() => handleDelete()}>
                <Foundation name="trash" size={25} color={colors.fg} />
            </TouchableOpacity>
        </View>
        <ScrollView style={{ height: "100%" }}>
            <NotePreview
                title={note.title}
                content={note.description}
                color={note.color}
            />
        </ScrollView>
    </View>
  ) : null
}

export default Notes