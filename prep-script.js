const {tenerator} = require('./pool');

(() => {
  tenerator()
      .then((res) => {
        if (res) return;
      })
      .catch((err) => {
        throw err;
      });
})();
