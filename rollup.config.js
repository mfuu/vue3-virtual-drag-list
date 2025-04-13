import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonJs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

const packageJson = require('./package.json');
const version = packageJson.version;
const homepage = packageJson.homepage;
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const banner = `
/*!
 * vue-virtual-sortable v${version}
 * open source under the MIT license
 * ${homepage}
 */
`;

export default [
  {
    external: ['vue'],
    input: 'src/index.tsx',
    output: [
      {
        format: 'umd',
        file: 'dist/virtual-list.js',
        name: 'VirtualList',
        sourcemap: false,
        globals: {
          vue: 'Vue',
        },
        banner: banner.replace(/\n/, ''),
      },
      {
        format: 'umd',
        file: 'dist/virtual-list.min.js',
        name: 'VirtualList',
        sourcemap: false,
        globals: {
          vue: 'Vue',
        },
        banner: banner.replace(/\n/, ''),
        plugins: [terser()],
      },
    ],
    plugins: [resolve(), commonJs(), typescript(), babel({ extensions, babelHelpers: 'bundled' })],
  },
  {
    input: 'src/index.tsx',
    output: {
      file: 'types/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
];
