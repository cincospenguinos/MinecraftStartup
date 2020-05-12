const toCamelCase = (string) => {
  const split = string.split('_');

  let camelCaseWord = split[0];

  for (let i = 1; i < split.length; i++) {
    const splitWord = split[i];
    const upperCaseCharacter = splitWord.slice(0, 1).toUpperCase();
    const upperCaseWord = `${upperCaseCharacter}${splitWord.slice(1, splitWord.length)}`;

    camelCaseWord = `${camelCaseWord}${upperCaseWord}`;
  }

  return camelCaseWord;
}

export default {
  toCamelCase,
};