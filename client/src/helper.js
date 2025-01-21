import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel"; // For JavaScript and TypeScript
import beautify from "js-beautify";

export const base_url = "http://localhost:3000";

export const beautifyCode = (code, language) => {
  console.log(language)
  try {
    switch (language.toLowerCase()) {
      case "javascript":
      case "java":
      case "c":
      case "c++":
        return beautify(code, {
          indent_size: 2, // Customize indent size
          indent_char: " ",
          max_preserve_newlines: 2,
        });

      default:
        console.warn("Language not supported for beautification");
        return code; // Return original code for unsupported languages
    }
  } catch (error) {
    console.error(`Error formatting ${language} code:`, error);
    return code; // Return unformatted code in case of errors
  }
};
