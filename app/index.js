#!/usr/bin/env node

import colors from 'colors';
import pkg from '../package.json';
import util from './util.js';

module.exports = (() => {

  class Kludgy {

    constructor () {

      this._options = {};

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
        ]
      }

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
          description: `Fisheye? Choose one: ${this._allowed.fisheye.join(', ')}`,
          type: 'string',
        })
        .option('debug', {
          description: `Debug? Choose one: ${this._allowed.debug.join(', ')}`,
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

    async checkOptions () {

      const o = this._options;
      const a = this._allowed;
      const results = {
        key: 'loaded'.green,
        directory: 'default'.yellow,
        fisheye: 'disabled'.yellow,
        debug: 'off'.yellow,
      };

      if (o.directory && (await util.dirExists(o.directory))) {

        results.directory = o.directory.green;

      }

      if (o.fisheye && a.fisheye.includes(o.fisheye)) {

        results.fisheye = o.fisheye.green;

      }

      if (o.debug && a.debug.includes(o.debug)) {

        results.debug = o.debug.green;

      }

      for (const [key, value] of Object.entries(results)) {
        console.log(`${key.bold.gray}: ${value}`);
      }

      return this;

    }

  }

  (async () => {

    const kludgy = new Kludgy();

    await kludgy
      .getOptions()
      .checkOptions();

  })();

})();
