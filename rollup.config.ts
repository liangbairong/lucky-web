import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import { terser } from "rollup-plugin-terser";
import json from 'rollup-plugin-json';

const pkg = require('./package.json');

console.log(Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies }).concat(['yoga-layout-wasm/asm']))
const BASE_CONFIG = {
  input: 'src/lucky-web/index.ts',
  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies }).concat(['yoga-layout-wasm/asm']),
  watch: {
    include: 'src/lucky-web/**',
  },
  plugins: [
    terser(), //压缩、 删除 debugger 语句和函数。包括 assert.equal、console.log 等等。
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps(),
  ],
};

export default [
  BASE_CONFIG,
  {
    ...BASE_CONFIG,
    input: 'src/lucky-web/common.ts',
    output: [{ file: 'dist/lucky-web.common.js', format: 'cjs', sourcemap: true }],
  },
];
