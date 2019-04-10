const {tenerator, getPool} = require('./pool');

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
  * @param {Number} endPosition range: index of string to end encoding.
  * @param {Boolean} random specify if start position is to be selected randomly.
  * @return {Object}
  */
  configure(
      string, key, obj = {},
      length = obj.hasOwnProperty('length') ? obj.length : string.length,
      encodingType = obj.hasOwnProperty('encodingType') ?
      obj.encodingType : 'hex',
      startPosition = obj.hasOwnProperty('start') ? obj.start : 0,
      endPosition = obj.hasOwnProperty('end') ? obj.end : -1,
      random = obj.hasOwnProperty('random') ? obj.random : true) {
    this.string = string;
    this.key = key;
    this.length = length;
    this.encodingType = encodingType;
    this.random = random;
    this.startPosition = startPosition;
    this.endPosition = endPosition;
    this.strLength = string.length;
    return this;
  }

  /**
   * @function encodePool
   * @param {Object} cl this
   * @return {Object} An Object
   */
  static encodePool(cl) {
    return (
      tenerator()
          .then((res) => {
            return res;
          })
          .catch((err) => {
            throw err;
          })
    );
  }

  /**
   * Pool
   * @param {Object} cl this
   * @return {Object}
   */
  static decodePool() {
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
          cl.startPosition + cl.length)
    );
  }

  /**
   * @function transcribe
   * @param {Object} pool to transcribe from
   * @param {String} string string to br transcribed
   */
  static transcribe(pool, string) {

  }

  /**
   * encodes the already specified string
   * @function encode
   */
  encode() {
    MIDMaker.setStart(this);
    MIDMaker.encodePool()
        .then((res) => {
          if (res) {
            const encodePool = res;
            this.real = MIDMaker.str2BEncoded(this);
            getPool()
                .then((res) => {
                  if (res) {
                    // encode and return encoded string only
                    const str = MIDMaker.transcribe(this.real);
                  }
                })
                .catch((err) => {
                  throw err;
                });
          }
          // return;
        })
        .catch((err) => {
          throw err;
        });
    /* this.encoded =
      CryptoJS.AES.encrypt(JSON.stringify(this.real), this.key).toString();
    this.encoded = Buffer.from(this.encoded).toString(this.encodingType); */
  }

  /**
   * @function
   * @name decode
   * @param {String} string
   * @param {String} key
   */
  decode(string, key) {
    MIDMaker.decodePool()
        .then((res) => {
          this.decodePool = JSON.parse(res);
          const decodePool = {};
          for (const key in this.decodePool) {
            if (key) {
              decodePool[this.decodePool[key]] = key;
            }
          }
          // console.log(decodePool);
        })
        .catch((err) => {
          throw err;
        });
    /* const debuffed = Buffer.from(string, this.encodingType).toString();
    // console.log(debuffed);
    return CryptoJS.AES.decrypt(debuffed, key) */
    /* .toString(CryptoJS.enc.Utf8); */
  }
}

module.exports = new MIDMaker();

const Maker = new MIDMaker();

Maker.configure(
    '5c586dc16c24e9130db256da',
    'app-ent-tech', {length: 5, random: true});
// Maker.encode();
Maker.decode();

// const hi = Maker.encode();
// console.log(hi);
/* console.log(
Maker.decode(hi.encrypted, 'app-ent-tech')
  .toString(CryptoJS.enc.Utf8)); */
