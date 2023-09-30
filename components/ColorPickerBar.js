import { StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TodosContext } from '../context/TodosContext'

const ColorPickerBar = ({ colorOptions, onChange, defaultColor, enforced }) => {

    const { colors } = useContext(TodosContext);

    let startingSelectionColor = "";
    if (defaultColor === "random") {
        startingSelectionColor = colorOptions[Math.floor(Math.random() * colorOptions.length)]
    } else if (defaultColor !== null) {
        startingSelectionColor = defaultColor
    } else {
        startingSelectionColor = null
    }
    const [selection, setSelection] = useState(startingSelectionColor || null)

    useEffect(() => {
        onChange(selection)
    }, [selection])

    const styles = StyleSheet.create({
        colorPickerList: { 
            backgroundColor: colors.mg, 
            borderRadius: 5, 
            marginTop: 5, 
            marginBottom: 15, 
            padding: 5, 
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        }
    })

    return (
        <View style={styles.colorPickerList}>
            {colorOptions.map(((color, idx) => {
                return (
                    <TouchableOpacity key={idx} onPress={() => {
                        if (color !== selection) {
                            setSelection(color)
                        } else if (!enforced && color === selection) {
                            setSelection(null)
                        }
                    }}>
                        <View style={{ borderWidth: selection == color ? 2 : 0, borderColor: colors.fg, padding: 3, borderRadius: 10 }}>
                            <View style={{ backgroundColor: color, width: 30, height: 30, borderRadius: 5}}>
                            </View>
                        </View>
                    </TouchableOpacity>   
                )   
            }))}
        </View>
    )
}

export default ColorPickerBar