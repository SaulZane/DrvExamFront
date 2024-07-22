import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueEslint from 'eslint-plugin-vue'; // 导入 ESLint Vue 插件


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
});

