const fs = require('fs');
// const path = require('path');

const {
  encodePool,
  upperCasePool,
  lowerCasePool,
  numberCharPool,
} = require('./charList');

// randomly fills poolArr with chars
const poolArr = [];
const dirPath =
  `${
    process.cwd()
  }/node_modules/mid-maker-adv/${
    'resources'
        .split('')
        .reverse()
        .join('')
  }`;

/* const dirPath =
  `test/mid-maker-adv/${'resources'.split('').reverse().join('')}`; */

const filePath =
  `${
    dirPath
  }/${
    'chaRpool'
        .split('')
        .reverse()
        .join('')
  }.json`;

const fillPoolArr = () => {
  const ranNoPool = [];

  ;[
    upperCasePool,
    lowerCasePool,
    numberCharPool,
  ]
      .forEach(
          (el, i) => {
            let ranNo = Math.floor(
                Math.random() * [
                  upperCasePool,
                  lowerCasePool,
                  numberCharPool,
                ]
                    .length
            );

            while (ranNoPool.includes(ranNo)) {
              ranNo = Math.floor(
                  Math.random() * [
                    upperCasePool,
                    lowerCasePool,
                    numberCharPool,
                  ]
                      .length
              );
            }

            ranNoPool.push(ranNo);

            // pick random array and destructure
            poolArr.push(
                ...(
                  [
                    upperCasePool,
                    lowerCasePool,
                    numberCharPool,
                  ][ranNo]
                )
            );
          }
      );
};

const writeJSON = (data) => {
  return (
    new Promise(
        (resolve, reject) => {
          fs.mkdir(
              `${
                dirPath
              }`, {
                recursive: true,
              }, (err) => {
                if (err) throw err;
                fs.writeFile(
                    `${filePath}`,
                    JSON.stringify(data),
                    (err) => {
                      if (!err) return resolve(true);
                      return reject(new Error(`${err}`));
                    }
                );
              });
        })
  );
};

module.exports = {
  tenerator: () => {
    fillPoolArr(
        encodePool, lowerCasePool, numberCharPool
    );

    return (
      new Promise(
          (resolve, reject) => {
            const ranElPool = [];

            Object.keys(encodePool)
                .forEach(
                    (key) => {
                      if (key) {
                        let ranElInd = Math.floor(
                            Math.random() * poolArr.length
                        );

                        while (ranElPool.includes(ranElInd)) {
                          ranElInd = Math.floor(
                              Math.random() * poolArr.length
                          );
                        }
                        encodePool[key] = `${poolArr[ranElInd]}`;
                        ranElPool.push(ranElInd);
                      }
                    }
                );

            // check for repetition
            const status = Object.keys(encodePool)
                .every((el, i) => {
                  return el === Object.keys(encodePool)[i - 1];
                });

            // write encodePool to JSON file
            writeJSON(encodePool)
                .then((res) => {
                  if (res) {
                    return resolve({
                      pool: fs.readFile(
                          filePath,
                          (err, data) => {
                            if (err) throw err;
                            return JSON.parse(data);
                          }),
                      status: status,
                    });
                  }
                  return reject(new Error('Something went wrong!'));
                })
                .catch((err) => {
                  throw new Error(`Something went wrong! => ${err}`);
                });
          }
      )
    );
  },
  getPool: () => {
    console.log(filePath, dirPath);
    return (
      new Promise(
          (resolve, reject) => {
            fs.readFile(
                `${
                  filePath
                }`,
                'utf8',
                (err, data) => {
                  if (err) reject(err);
                  console.log(data);
                  resolve(data.toString());
                }
            );
          })
    );
  },
};
