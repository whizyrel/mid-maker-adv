/**
 * contains character sets
 * @class
 * @name CharList
 * @type {Class}
 */
class CharList {
  /**
   * @function getUpperCase
   * @return {Array} contains Upper Case characters
   */
  getUpperCaseChars() {
    return [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];
  }

  /**
   * @function getLowerCaseChars
   * @return {Array} An array
   */
  getLowerCaseChars() {
    return [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ];
  }

  /**
   * @function getSpecialChars
   * @return {Array} contains Upper Case characters
   */
  getSpecialChars() {
    return [
      ' ',
      '-',
      '_',
      '?',
      '!',
      '{',
      '}',
      '[',
      ']',
      '|',
      '(',
      '<',
      '>',
      ',',
      '.',
      ')',
      '=',
      '+',
      '/',
      '\\',
      '@',
      '#',
      '$',
      '%',
      '^',
      '&',
      '*',
    ];
  }

  /**
   * @function getNumberChars
   * @return {Array} An array
   */
  getNumberChars() {
    return [
      '0', '1', '2', '3', '4', '5', '6', '7',
      '8', '9',
    ];
  }

  /**
   * @function getAllChars
   * @return {Object} An Object
   */
  getAllChars() {
    return {
      'a': '', 'b': '', 'c': '', 'd': '', 'e': '', 'f': '', 'g': '', 'h': '',
      'i': '', 'j': '', 'k': '', 'l': '', 'm': '', 'n': '', 'o': '', 'p': '',
      'q': '', 'r': '', 's': '', 't': '', 'u': '', 'v': '', 'w': '', 'x': '',
      'y': '', 'z': '',
      'A': '', 'B': '', 'C': '', 'D': '', 'E': '', 'F': '', 'G': '', 'H': '',
      'I': '', 'J': '', 'K': '', 'L': '', 'M': '', 'N': '', 'O': '', 'P': '',
      'Q': '', 'R': '', 'S': '', 'T': '', 'U': '', 'V': '', 'W': '', 'X': '',
      'Y': '', 'Z': '',
      '0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '',
      '8': '', '9': '',
    };
  }
}

/**
 * @module test / charList
 * @see module: test / charList
  */
module.exports = {
  encodePool: new CharList().getAllChars(),
  upperCasePool: new CharList().getUpperCaseChars(),
  lowerCasePool: new CharList().getLowerCaseChars(),
  specialCharPool: new CharList().getSpecialChars(),
  numberCharPool: new CharList().getNumberChars(),
};
