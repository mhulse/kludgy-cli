import fs from 'fs-extra';
import path from 'path';
import untildify from 'untildify';

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
