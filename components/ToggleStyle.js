import { useContext } from "react";
import { TodosContext } from "../context/TodosContext";
import { View, TouchableOpacity, Dimensions } from 'react-native'
import { Feather } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ToggleStyle = () => {

    const { isDarkMode, setIsDarkMode, colors } = useContext(TodosContext)

    return (
        <View style={{ padding: 2, borderRadius: "50%", borderColor: colors.fg, borderWidth: 2, position: "absolute", zIndex: 10000, top: screenHeight - 75, left: screenWidth - 75 }}>
            <TouchableOpacity style={{ borderRadius: "50%", padding: 15, backgroundColor: colors.mg }} onPress={() => setIsDarkMode(!isDarkMode)}>
                <Feather name={isDarkMode ? "moon" : "sun"} size={24} color={colors.fg} />
            </TouchableOpacity>
        </View>
    )
}

export { ToggleStyle }