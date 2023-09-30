export default function parseMarkdown(text) {
    const lines = text.split('\n');
    const parsedComponents = [];
  
    let inCodeBlock = false;
    let codeBlock = '';
    let codeBlockLanguage = '';  // Variable to store the code block language
  
    for (const line of lines) {
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          parsedComponents.push({ type: 'code', content: codeBlock, language: codeBlockLanguage });
          codeBlock = '';
          codeBlockLanguage = '';  // Reset the code block language
        } else {
          // Extract the language from the code block delimiter
          const languageMatch = line.match(/^```(.+)$/);
          if (languageMatch) {
            codeBlockLanguage = languageMatch[1].trim();
          }
        }
        inCodeBlock = !inCodeBlock;
      } else if (line.trim().startsWith('# ') && !inCodeBlock) {
        parsedComponents.push({ type: 'heading', content: line.substring(2) });
      } else if (line.trim().startsWith('- ') && !inCodeBlock) {
        parsedComponents.push({ type: 'bullet', content: line.substring(2) });
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
      parsedComponents.push({ type: 'code', content: codeBlock, language: codeBlockLanguage });
    }
  
    return parsedComponents;
  }
  