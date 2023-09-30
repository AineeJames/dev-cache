import { createContext, useEffect, useState } from "react";
import * as Crypto from 'expo-crypto';
import { colors } from "../constants/colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import getCurrentTimestamp from "../app/helper/getTimestamp";

const defaultTodos = [
    {
        title: "Example Note",
        description: `# Introduction
This is an example note to show the capabilities of Dev Cache!

# Headings
- use "# <heading>"

# Code Blocks
- use \`\`\`code\`\`\`
\`\`\`
# Here is some python code

for i in range(10):
    print("Hello, World!)
\`\`\`

# Lists
- use "- <text>"

Example:
- List item one
- List item two
- ...
`,
        id: Crypto.randomUUID(),
        color: colors.light.titleBackgrounds[0],
        timestamp: getCurrentTimestamp()
    }
]

const TodosContext = createContext(defaultTodos);

const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };  

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

const TodosProvider = ({ children }) => {

    const loadNotes = async () => {
        setTodos(await getData("notes"))
    }

    useEffect(() => {
        loadNotes()
    }, [])

    const [todos, setTodos] = useState(defaultTodos)

    const storeNotes = async () => {
        await storeData("notes", todos);
    }
    useEffect(() => {
        storeNotes()
    }, [todos])

    const addNote = (note) => {
        const newNotes = [...todos, note]
        setTodos(newNotes)
    }

    const removeNote = (noteId) => {
        const newNotes = todos.filter(todo => todo.id !== noteId)
        setTodos(newNotes)
    }

    const updateNote = (noteId, note) => {
        let newNote = todos.filter(todo => todo.id === noteId)[0]
        const removedIdNotes = todos.filter(todo => todo.id !== noteId)
        newNote.title = note.title
        newNote.timestamp = note.timestamp
        newNote.id = note.id
        newNote.description = note.description
        newNote.color = note.color
        setTodos([...removedIdNotes, newNote])
    }

    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <TodosContext.Provider value={{ todos, addNote, removeNote, updateNote, setIsDarkMode, isDarkMode, colors: isDarkMode ? colors.dark : colors.light }}>
            {children}
        </TodosContext.Provider>
    );
};

export { TodosContext, TodosProvider };