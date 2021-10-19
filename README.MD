# Rollup (ts) 类库开发 `start kit` 

开发模式：`port: 4001`

```
npm run dev
```

打包模式：支持三个环境 `npm run test/uat/pro`

# Feature 

- typescript开发 (eslint 支持)
- 配置 commonjs,esm,umd,iife 输出方式
- 开发模式可以调试 iife 输出的包，会挂载 dist 目录
- 生产环境使用 terser 压缩
- process.env.BUILD_ENV 作为打包环境变量，可直接在项目代码中使用


# 注意

package.json 中写死了默认包名 `seTools`, 需要自行修改.

其他功能完善中...


