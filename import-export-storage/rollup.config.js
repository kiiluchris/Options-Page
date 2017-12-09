import babel from 'rollup-plugin-babel';
import {readFileSync} from 'fs';

const babelrc = JSON.parse(readFileSync('./.babelrc'));
babelrc.presets[0][1].modules = false;

export default {
  input: 'src/merge-json.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      ...babelrc
    })
  ],
  output: {
    file: 'build/bundle.js',
    format: 'iife',
    name: 'mergeJson'
  },
  external: ['path'],
};