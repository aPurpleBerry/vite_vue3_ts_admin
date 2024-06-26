import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//node提供的模块，可以获取某个文件或者文件夹的路径
import path from 'path'
// SVG需要用的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
        '@': path.resolve('./src') // 相对路径别名配置，使用 @ 代替 src
    }
  }
})
