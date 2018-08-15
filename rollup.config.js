import typescript from 'rollup-plugin-typescript2';

export default {
  entry: './src/index.ts',

  output: {
    format: 'umd',
    name: 'timing2',
    file: './lib/timing2.js'
  },

  plugins: [
    typescript()
  ]
}
