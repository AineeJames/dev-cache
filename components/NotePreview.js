import { View, Text, StyleSheet } from 'react-native'
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { gruvboxDark } from 'react-syntax-highlighter/styles/hljs';
import { useFonts, SourceCodePro_600SemiBold, SourceCodePro_400Regular_Italic, SourceCodePro_800ExtraBold, SourceCodePro_400Regular } from '@expo-google-fonts/source-code-pro';
import { colors } from '../constants/colors';
import { useEffect, useState } from 'react';

const NotePreview = ({ title, content }) => {

    function parseMarkdown(text) {
        const lines = text.split('\n');
        const parsedComponents = [];
      
        let inCodeBlock = false;
        let codeBlock = '';
      
        for (const line of lines) {
          if (line.trim().startsWith('```')) {
            if (inCodeBlock) {
              parsedComponents.push({ type: 'code', content: codeBlock });
              codeBlock = '';
            }
            inCodeBlock = !inCodeBlock;
          } else if (line.trim().startsWith('# ')) {
            parsedComponents.push({ type: 'heading', content: line.substring(2) });
          } else {
            if (inCodeBlock) {
              codeBlock += line + '\n';
            } else {
              parsedComponents.push({ type: 'text', content: line });
            }
          }
        }
      
        // Check for any remaining code block
        if (inCodeBlock && codeBlock.length > 0) {
          parsedComponents.push({ type: 'code', content: codeBlock });
        }
      
        return parsedComponents;
      }      

    const [valid, setValid] = useState(true);

    let [fontsLoaded, fontError] = useFonts({
        SourceCodePro_600SemiBold,
        SourceCodePro_400Regular_Italic,
        SourceCodePro_800ExtraBold,
        SourceCodePro_400Regular
    });
    
    if (!fontsLoaded && !fontError) {
        return null;
    }

    let renderedJSX = [];
    parseMarkdown(content).forEach((a => {
        if (a.type === "text") {
            renderedJSX.push(
                <Text style={styles.text}>{a.content}</Text>
            )
        } else if (a.type === "heading") {
            renderedJSX.push(
                <Text style={styles.heading}>{a.content}</Text>
            )
        } else if (a.type === "code") {
            renderedJSX.push(
                <View style={{ borderRadius: 5, overflow: "hidden", marginBottom: 5, marginHorizontal: 10}}>
                    <SyntaxHighlighter
                    fontFamily={"SourceCodePro_400Regular"}
                    fontSize={12}
                    style={gruvboxDark}
                    >{a.content}</SyntaxHighlighter>
                </View>
            )
        }
    }))

    return (
        <View>
            <View style={{ backgroundColor: "#333" }}>
                <View style={{ backgroundColor: colors.fg, justifyContent: "center", padding: 5, marginBottom: 10}}>
                        <Text style={{ fontFamily: "SourceCodePro_600SemiBold", fontSize: 30 }}>{title}</Text>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                    {renderedJSX}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontFamily: "SourceCodePro_600SemiBold",

        fontSize: 25,
        color: colors.fg,
        marginBottom: 5,
    },
    text: {
        fontFamily: "SourceCodePro_400Regular",
        color: colors.fg,
        fontSize: 18,
        marginBottom: 5,
    }
})

export { NotePreview }