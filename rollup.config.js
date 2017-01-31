import babel from 'rollup-plugin-babel'
import globals from 'rollup-plugin-node-globals'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import simplevars from 'postcss-simple-vars'
import nested from 'postcss-nested'
import cssnext from 'postcss-cssnext'

export default {
  entry: 'src/renderer.ts',
  dest: 'dist/renderer.js',
  format: 'iife',
  plugins: [
    postcss({
      extensions: ['.css', '.scss'],
      plugins: [
        simplevars(),
        nested(),
        cssnext({ warnForDuplicates: false, }),
      ],
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        ['es2015', { modules: false }],
        'react',
      ],
      plugins: ['external-helpers'],
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports : {
       'node_modules/react/react.js' : ['Component', 'Children', 'createElement', 'PropTypes'],
       'node_modules/react-dom/index.js' : ['render'],
     },
    }),
    typescript({
      jsx: 'react',
      typescript: require('typescript'),
    }),
    globals(),
    resolve({
      jsnext: true,
      browser: true,
      main: true,
    }),
  ]
}
