const {
  getPool,
} = require('./pool');

/**
 * @see module:./MIDMaker
 * @module test/MIDMaker
 * @name MIDMaker
 */

/**
 * @class
 * @name MIDMaker
 * @type {Class}
 * Encodes and Decodes characters
 */
class MIDMaker {
  /**
   * MIDMaker Encryption of String.
   * @type {function}
   * @function configure
   * @param {String} string string to be encoded.
   * @param {String} key  string to be encoded.
   * @param {Object} obj configuration preference passed as an object.
   * @param {Number} length length of encryption
   * @param {String} encodingType encoding type
   * @param {Number} startPosition range: index of string to begin encoding.
   * @param {Boolean} random specify start position randomliness.
   * @return {Object}
   */
  configure(
      string, key, obj = {},
      length = obj.hasOwnProperty('length') ? obj.length : string.length,
      encodingType = obj.hasOwnProperty('encodingType') ?
    obj.encodingType : 'hex',
      startPosition = obj.hasOwnProperty('start') ? obj.start : 0,
      random = obj.hasOwnProperty('random') ? obj.random : true) {
    this.string = string;
    this.key = key;
    this.length = length;
    this.encodingType = encodingType;
    this.random = random;
    this.startPosition = startPosition;
    this.endPosition = this.startPosition + length;
    this.strLength = string.length;
    return this;
  }

  /**
   * Pool
   * @param {Object} cl this
   * @return {Object}
   */
  static getPool() {
    return (
      getPool()
          .then((res) => {
            return res;
          })
          .catch((err) => {
            throw err;
          })
    );
  }

  /**
   * sets start position to begin string selection
   * @function setStart
   * @param {Object} cl this
   * @return {Object}
   */
  static setStart(cl) {
    const condition = (
      cl.random === false &&
        (cl.length - cl.startPosition) < cl.length) ||
      (cl.random === true);

    if (condition) {
      let startPosition = Math.floor(Math.random() * cl.strLength);
      // 10 - 9 = random - this.strLength
      let difference = cl.strLength - cl.startPosition;
      // console.log(`difference => ${difference}`);
      // console.log(`initial start position => ${cl.startPosition}`);

      // if diff is less than cl.length, pick random number
      // until the diff of random num and length is < cl.length

      while (difference < cl.length) {
        startPosition = Math.floor(Math.random() * cl.strLength);
        difference = cl.strLength - startPosition;
        /* console.log(
        `difference => ${difference} startPosition => ${startPosition}`
        ); */
      }
      cl.startPosition = startPosition;
      cl.endPosition = startPosition + cl.length;
    }
    return this;
  }

  /**
   * @function str2BEncoded
   * @param {Object} cl this
   * @return {String} returns a string
   * extracts string to be encoded
   */
  static str2BEncoded(cl) {
    return (
      cl.string.substring(
          cl.startPosition,
          cl.startPosition + cl.length
      )
    );
  }

  /**
   * @function transcribe
   * @param {Object} pool to transcribe from
   * @param {String} string string to be transcribed
   * @return {String}
   */
  static transcribe(pool, string) {
    return (
      (string
          .split('').map(
              (el, i) => {
                return pool[el];
              }
          )).join('')
    );
  }

  /**
   * encodes the already specified string
   * @function encode
   * @return {Promise} Promise Object
   */
  encode() {
    MIDMaker.setStart(this);
    return MIDMaker.getPool()
        .then((res) => {
          if (res) {
            const encodePool = JSON.parse(res);
            this.real = MIDMaker.str2BEncoded(this);
            // encode and return encoded string only
            const str = MIDMaker.transcribe(encodePool, this.real);
            console.log(this.real, str);
            return str;
          }
        })
        .catch((err) => {
          throw err;
        });
  }

  /**
   * @function
   * @name decode
   * @param {String} string
   * @param {String} key
   * @return {Promise}
   */
  decode(string) {
    return MIDMaker.getPool()
        .then((res) => {
          this.decodePool = JSON.parse(res);
          const decodePool = {};
          for (const key in this.decodePool) {
            if (key) {
              decodePool[this.decodePool[key]] = key;
            }
          }
          // encode and return encoded string only
          const str = MIDMaker.transcribe(decodePool, string);
          console.log(string, str);
          return str;
        })
        .catch((err) => {
          throw err;
        });
  }
}

module.exports = new MIDMaker();
