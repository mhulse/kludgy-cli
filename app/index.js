#!/usr/bin/env node

import colors from 'colors';
import pkg from '../package.json';

module.exports = (() => {

  class Kludgy {

    constructor () {

      this._options = {};

      this._icons = {
        success: '✔',
        warning: '⚠',
        error: '❌',
      };

    }

    getOptions () {

      const argv = require('yargs/yargs')(process.argv.slice(2))
        .version(pkg.version)
        .usage(`Usage: $0 -k <Google Maps API key>`)
        .option('key', {
          alias: [
            'k',
          ],
          description: 'Your Google Maps API key',
          type: 'string',
          demand: true,
        })
        .option('directory', {
          alias: [
            'd',
          ],
          description: 'Output directory?',
          type: 'string'
        })
        .option('fisheye', {
          alias: [
            'f',
          ],
          description: 'Fisheye? Choose one: `both`, `big-sky`, `tiny-planet` or `random`',
          type: 'string',
        })
        .option('debug', {
          description: 'Debug? Choose one: `0`, `1` or `2`',
          type: 'number',
        })
        .alias('h', 'help')
        .help('h', 'Show help.')
        .argv;

      this._options.key = argv.key;
      this._options.directory = (argv.directory ? argv.directory.replace(/\/+$/, '') : '');
      this._options.fisheye = argv.fisheye;
      this._options.debug = argv.debug;

      return this;

    }

    checkOptions () {

      //   utilities.o('log', `Google API key: ${ICONS.success.green}`);

      //   utilities.o('log');

      //   if (OPTIONS.output && utilities.dirExists(OPTIONS.output)) {

      //     OPTIONS.output = fs.realpathSync(OPTIONS.output);

      //     utilities.o('log', `${ICONS.success} Chosen output directory:`.green, OPTIONS.output);

      //   } else {

      //     if (OPTIONS.output) {

      //       utilities.o('error', `${ICONS.error} Chosen output directory does not exist:`.toUpperCase().red, OPTIONS.output);

      //     }

      //     OPTIONS.output = fs.realpathSync('./app/panos/');

      //     utilities.o('log', `${ICONS.success} Using default output directory:`.yellow, OPTIONS.output);

      //   }

      //   if (OPTIONS.planet) {

      //     utilities.o('log');

      //     utilities.o('log', `${ICONS.success} Tiny planet mode enabled!`.green);

      //   }

      // }

      return this;

    }

  }

  const kludgy = new Kludgy();

  console.log('Starting …');

  kludgy
    .getOptions()
    .checkOptions();

  console.log('Done!');

})();
