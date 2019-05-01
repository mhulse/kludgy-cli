import fs from 'fs-extra';

module.exports = {

  dirExists: async dir => {

    try {
      await fs.access(dir);
      return true;
    } catch (err) {
      return false;
    }

  },

};
