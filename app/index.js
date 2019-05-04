#!/usr/bin/env node

import colors from 'colors';
import pkg from '../package.json';
import util from './util.js';
const Kludgy = require('kludgy');

module.exports = (() => {

  class KludgyCLI {

    constructor () {

      this._argv = {};

      this._allowed = {
        fisheye: [
          'both',
          'big-sky',
          'tiny-planet',
          'random',
        ],
        debug: [
          0,
          1,
          2,
        ],
      };

      this._options = {};

    }

    getOptions () {

      this._argv = require('yargs/yargs')(process.argv.slice(2))
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
          description: `Fisheye? Choose one: ${this._allowed.fisheye.join(', ')}`,
          type: 'string',
        })
        .option('debug', {
          description: `Debug? Choose one: ${this._allowed.debug.join(', ')}`,
          type: 'number',
        })
        .alias('h', 'help')
        .help('h', 'Show help.')
        .strict()
        .argv;

    }

    async checkOptions () {

      const results = {
        key: 'loaded'.green,
        directory: 'default'.yellow,
        fisheye: 'disabled'.yellow,
        debug: 'off'.yellow,
      };

      this._options.key = this._argv.key;

      if (
        this._argv.directory
        &&
        (typeof this._argv.directory === 'string')
        &&
        (await util.dirExists(this._argv.directory))
      ) {

        this._options.directory = this._argv.directory;
        results.directory = this._argv.directory.green;

      }

      if (
        this._argv.fisheye
        &&
        (typeof this._argv.fisheye === 'string')
        &&
        this._allowed.fisheye.includes(this._argv.fisheye)
      ) {

        this._options.fisheye = this._argv.fisheye;
        results.fisheye = this._argv.fisheye.green;

      }

      if (
        this._argv.debug
        &&
        (typeof this._argv.debug === 'number')
        &&
        this._argv.debug.includes(this._allowed.debug)
      ) {

        this._options.debug = this._argv.debug;
        results.debug = this._argv.debug.green;

      }

      for (const [key, value] of Object.entries(results)) {
        console.log(`${key.bold.gray}: ${value}`);
      }

    }

    async callKludgy () {

      const kludgy = new Kludgy(
        this._options
      );

      console.log('before');

      console.log(kludgy);

      // try {
      //   await kludgy.init();
      // } catch (err) {
      //   console.error(err);
      // }

      console.log('after');

    }

  }

  (async () => {

    const kludgyCLI = new KludgyCLI();

    kludgyCLI.getOptions();
    kludgyCLI.checkOptions();
    kludgyCLI.callKludgy();

  })();

})();
