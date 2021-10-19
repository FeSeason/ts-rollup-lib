import replace from '@rollup/plugin-replace';
import nodeResolve from '@rollup/plugin-node-resolve';
import { liveServer } from 'rollup-plugin-live-server';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import ts from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import path from 'path';
import { version } from '../package.json';
import PKG from './pkg';

const pkgName = PKG.pkgName;
const resolve = _path => path.resolve(__dirname, '../', _path)
const isProduction = process.env.NODE_ENV === 'production';

const outputConfigs = [
  // 'commonjs': 
  {
    file: resolve(`dist/${pkgName}.cjs.js`),
    format: `cjs`
  },
  // 'esm-browser': 
  {
    file: resolve(`dist/${pkgName}.esm.js`),
    format: `es`
  },
  // umd: 
  {
    file: resolve(`dist/${pkgName}.umd.js`),
    format: `umd`
  },
  // global, 全局变量模式， 适用于 sdk 
  {
    file: resolve(`dist/${pkgName}.global.js`),
    format: `iife`
  }
]

const banner =
  `/*!
  * ${pkgName} v${version}
  * (c) ${new Date().getFullYear()} Season
  * @license MIT
  */`

const BUILD_ENV = process.env.BUILD_ENV;

const basePlugins = [
  json(),
  nodeResolve({
    browser: true,
    extensions: ['.js', '.ts'],
  }),
  commonjs(),
  ts({
    tsconfig: resolve('tsconfig.json'),
    cacheRoot: resolve('node_modules/.rts2_cache'),
  }),
  replace({
    values: { 'process.env.BUILD_ENV': JSON.stringify(BUILD_ENV) },
    preventAssignment: true,
  }),
]

const resConfig = outputConfigs.map(item => {
  const itemConfig = {
    input: resolve('src/index.ts'),
    output: {
      name: pkgName,
      format: item.format,
      file: item.file,
      banner,
    },
    plugins: basePlugins,
  }

  if (isProduction) {
    itemConfig.plugins = itemConfig.plugins.concat([
      terser()
    ])
  } else {
    // 开发 dev 模式
    if (item.format === 'iife') {
      itemConfig.watch = {
        exclude: 'node_modules/**'
      }
      itemConfig.plugins = itemConfig.plugins.concat([
        liveServer({
          port: 4001,
          host: '0.0.0.0',
          ignore: 'example/iife',
          root: 'example',
          file: 'index.html',
          mount: [
            ['/', './dist'],
            ['/build', './build'],
            ['/node_modules', './node_modules'],
          ],
          open: true,
          wait: 500,
        }),
      ])
    }
  }

  return itemConfig;
})

console.log(resConfig)

export default resConfig;