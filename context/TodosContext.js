import { createContext, useEffect, useState } from "react";
import * as Crypto from 'expo-crypto';
import { colors } from "../constants/colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import getCurrentTimestamp from "../app/helper/getTimestamp";

const defaultTodos = [
    {
      title: "Example Note",
      description: `# Introduction\nThis is an example note to show the capabilities of Dev Cache!\n\n# Headings\n- use "# <heading>"\n\n# Code Blocks\n- use \`\`\`code\`\`\`\n\`\`\`\n# Here is some python code\n\nfor i in range(10):\n    print("Hello, World!)\n\`\`\`\n\n# Lists\n- use "- <text>"\n\nExample:\n- List item one\n- List item two\n- ...`,
      id: Crypto.randomUUID(),
      color: colors.light.titleBackgrounds[0],
      timestamp: getCurrentTimestamp(),
      isExample: true // Add a flag for the example note
    }
];  

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

    const [todos, setTodos] = useState(defaultTodos)

    const loadNotes = async () => {
        try {
          const loadedNotes = await getData("notes");
          if (loadedNotes !== null) {
            setTodos(loadedNotes);
          } else {
            // Check if it's the user's first time and add the example note
            const isFirstTime = await AsyncStorage.getItem("isFirstTime");
            if (isFirstTime === null) {
              await AsyncStorage.setItem("isFirstTime", "false");
              setTodos([...defaultTodos, ...loadedNotes]);
            } else {
              setTodos(loadedNotes);
            }
          }
        } catch (error) {
          console.error('Error loading notes:', error);
        }
    };
      

    useEffect(() => {
        loadNotes()
        setTodos(todos.filter(todo => todo !== null))
    }, [])

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

    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const loadThemePreference = async () => {
            try {
                const colorPreference = await getData("theme");
                setIsDarkMode(colorPreference === "dark");
            } catch (error) {
                console.error('Error loading theme preference:', error);
            }
        };

        loadThemePreference();
    }, []);

    useEffect(() => {
        const saveThemePreference = async () => {
            try {
                await storeData("theme", isDarkMode ? "dark" : "light");
            } catch (error) {
                console.error('Error saving theme preference:', error);
            }
        };

        saveThemePreference();
    }, [isDarkMode]);

    return (
        <TodosContext.Provider value={{ todos, addNote, removeNote, updateNote, setIsDarkMode, isDarkMode, colors: isDarkMode ? colors.dark : colors.light }}>
            {children}
        </TodosContext.Provider>
    );
};

export { TodosContext, TodosProvider };