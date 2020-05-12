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

const toSnakeCase = (string) => {
  const split = string.split('');
  const charArray = [];

  split.forEach((char) => {
    if (char.match(/[A-Z]/)) {
      charArray.push('_');
      charArray.push(char.toLowerCase());
    } else {
      charArray.push(char);
    }
  });

  return charArray.toString().split(',').join('');
}

export default {
  toCamelCase,
  toSnakeCase,
};