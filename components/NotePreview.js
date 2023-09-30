import { View, Text, StyleSheet } from 'react-native'
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { gruvboxDark, gruvboxLight } from 'react-syntax-highlighter/styles/hljs';
import { useFonts, SourceCodePro_600SemiBold, SourceCodePro_400Regular_Italic, SourceCodePro_800ExtraBold, SourceCodePro_400Regular } from '@expo-google-fonts/source-code-pro';
import Animated, { FadeInDown as Effect, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import parseMarkdown from '../app/helper/parseMarkdown';
import { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';

const NotePreview = ({ title, content, color }) => {

    const { colors, isDarkMode } = useContext(TodosContext)

    let [fontsLoaded, fontError] = useFonts({
        SourceCodePro_600SemiBold,
        SourceCodePro_400Regular_Italic,
        SourceCodePro_800ExtraBold,
        SourceCodePro_400Regular
    });
    
    if (!fontsLoaded && !fontError) {
        return null;
    }

    const styles = StyleSheet.create({
        heading: {
            fontFamily: "SourceCodePro_600SemiBold",
            fontSize: 25,
            color: colors.fg,
            marginBottom: 5,
            textDecorationLine: "underline"
        },
        text: {
            fontFamily: "SourceCodePro_400Regular",
            color: colors.fg,
            fontSize: 18,
            marginBottom: 5,
        },
        bullet: {
            fontFamily: "SourceCodePro_400Regular",
            color: colors.fg,
            fontSize: 18,
            marginBottom: 5,
        }
    })

    let renderedJSX = [];
    parseMarkdown(content).forEach(((a, i) => {
        if (a.type === "text") {
            renderedJSX.push(
                <Animated.Text entering={Effect.delay(500 + (100 * i))} key={i} style={styles.text}>{a.content}</Animated.Text>
            )
        } else if (a.type === "heading") {
            renderedJSX.push(
                <Animated.Text entering={Effect.delay(500 + (100 * i))} key={i} style={styles.heading}>{a.content}</Animated.Text>
            )
        } else if (a.type === "bullet") {
            renderedJSX.push(
                <Animated.Text entering={Effect.delay(500 + (100 * i))} key={i} style={styles.bullet}>  • {a.content}</Animated.Text>
            )
        } else if (a.type === "code") {
            renderedJSX.push(
                <Animated.View entering={Effect.delay(500 + (100 * i))} key={i} >
                    <View style={{ backgroundColor: colors.fg, paddingLeft: 5, paddingVertical: 3, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                        <Text style={{ color: colors.bg, fontFamily: "SourceCodePro_400Regular_Italic" }}>{a.language}</Text>
                    </View>
                    <View style={{  borderBottomLeftRadius: 5, borderBottomRightRadius: 5, overflow: "hidden", marginBottom: 5, marginHorizontal: 0}}>
                        <SyntaxHighlighter
                        fontFamily={"SourceCodePro_400Regular"}
                        fontSize={12}
                        style={isDarkMode === false ? gruvboxDark : gruvboxLight}
                        language={a.language}
                        >{a.content}</SyntaxHighlighter>
                    </View>
                </Animated.View>
            )
        }
    }))

    return (
        <Animated.View entering={FadeInLeft.duration(1000)} style={{ paddingBottom: 100 }}>
            <View style={{ backgroundColor: colors.mg, borderTopRightRadius: 10 }}>
                <View style={{ backgroundColor: color, justifyContent: "center", padding: 5, marginBottom: 10, borderTopRightRadius: 10}}>
                        <Text style={{ fontFamily: "SourceCodePro_600SemiBold", fontSize: 30, color: colors.bg }}>{title}</Text>
                </View>
                <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
                    {renderedJSX}
                </View>
                <View style={{ backgroundColor: colors.fg, height: 5, width: "90%" }}></View>
            </View>
        </Animated.View>
    );
}

export { NotePreview }