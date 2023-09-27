import { createContext, useState } from "react";
import * as Crypto from 'expo-crypto';

const defaultTodos = [
    {
        title: "Note 1",
        description: "This is a much longer description that will end up needing to be shortened for display!",
        id: Crypto.randomUUID(),
    }, {
        title: "Second Todo!",
        description: "You really need to get this done!",
        id: Crypto.randomUUID(),
    }, {
        title: "Third Todo!",
        description: "You really need to get this done!",
        id: Crypto.randomUUID(),
    }
]

const TodosContext = createContext(defaultTodos);

const TodosProvider = ({ children }) => {
    const [todos, setTodos] = useState(defaultTodos)

    return (
        <TodosContext.Provider value={{ todos }}>
            {children}
        </TodosContext.Provider>
    );
};

export { TodosContext, TodosProvider };