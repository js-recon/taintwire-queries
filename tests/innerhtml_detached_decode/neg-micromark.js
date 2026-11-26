// micromark decode-named-character-reference (browser build): the name comes from the tokenizer, not a source.
const element = document.createElement("i");
export function decodeNamedCharacterReference(value) {
  const characterReference = "&" + value + ";";
  element.innerHTML = characterReference;
  const char = element.textContent;
  if (char.charCodeAt(char.length - 1) === 59 && value !== "semi") return false;
  return char === characterReference ? false : char;
}
