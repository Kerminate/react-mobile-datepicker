import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import memory from 'rollup-plugin-memory';
import postcss from 'rollup-plugin-postcss';
import fs from 'fs';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';

var babelRc = JSON.parse(fs.readFileSync('.babelrc','utf8')); // eslint-disable-line

export default {
    entry: 'lib/index.js',
    exports: 'default',
    plugins: [
        postcss({
            plugins: [
                nested(),
                cssnext({ warnForDuplicates: false }),
            ],
            extensions: ['.css'],
        }),
        json(),
        memory({
            path: 'lib/index',
            contents: "export { default } from './index'",
        }),
        babel({
            babelrc: false,
            presets: ['es2015-minimal-rollup'].concat(babelRc.presets.slice(1)),
            plugins: babelRc.plugins,
            exclude: 'node_modules/**',
        }),
    ],
};
