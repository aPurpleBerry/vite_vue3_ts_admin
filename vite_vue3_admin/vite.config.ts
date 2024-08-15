import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
//node提供的模块，可以获取某个文件或者文件夹的路径
import path from 'path'
// SVG需要用的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
//mock需要的
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({command, mode})=>{
  //获取各种环境下对应的变量
  let env = loadEnv(mode, process.cwd()); // 加载某环境的文件，以及文件的位置 process.cwd()是vite提供的
  //mode默认是开发环境
  console.log(env.VITE_APP_BASE_API);
  

  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      // viteMockServe({
      //   // default
      //   mockPath: 'mock',
      //   localEnabled: command === 'serve', //保证开发阶段可以使用mock接口
      // })
    ],
    resolve: {
      alias: {
          '@': path.resolve('./src') // 相对路径别名配置，使用 @ 代替 src
      }
    },
    //scss全局变量的配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    //代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE, //获取数据的服务器地址设置
          changeOrigin: true, //需要代理跨域
          rewrite:(path)=>path.replace(/^\/api/,''),// 路径重写 不要api的意思
          bypass(req, res, options) {
            //@ts-ignore
            const proxyUrl = new URL(options.rewrite(req.url) || '',(options.target)as string)?.href || '';
            console.log(proxyUrl);
            req.headers['x-req-proxyUrl'] = proxyUrl
            res.setHeader('x-res-proxyUrl',proxyUrl)
          },
        }
      }
    }
  }
})
