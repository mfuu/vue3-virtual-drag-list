import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonJs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import { uglify } from 'rollup-plugin-uglify'

const packageJson = require('./package.json')
const version = packageJson.version
const homepage = packageJson.homepage
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const banner = `
/*!
 * vue-virtual-draglist v${version}
 * open source under the MIT license
 * ${homepage}
 */
`

export default [
  {
    external: ['vue'],
    input: 'src/index.tsx',
    output: [
      {
        format: 'umd',
        file: 'dist/draglist.js',
        name: 'VirtualDragList',
        sourcemap: false,
        globals: {
          vue: 'Vue'
        },
        banner: banner.replace(/\n/, '')
      },
      {
        format: 'umd',
        file: 'dist/draglist.min.js',
        name: 'VirtualDragList',
        sourcemap: false,
        globals: {
          vue: 'Vue'
        },
        banner: banner.replace(/\n/, ''),
        plugins: [uglify()]
      }
    ],
    plugins: [
      resolve(),
      commonJs(),
      typescript(),
      babel({ extensions, babelHelpers: "bundled" })
    ]
  }
]

