const fs = require('fs-extra');
const path = require('path');
const untildify = require('untildify');

module.exports = {

  dirExists: async dir => {

    try {
      await fs.access(path.resolve(untildify(dir)));
      return true;
    } catch (err) {
      return false;
    }

  },

};
