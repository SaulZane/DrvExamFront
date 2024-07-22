<template>
  <div style="min-width: 1000px;">
    <el-container>
      <el-header>
        <headerBanner @ColorChange="handleColorChange" />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <userMenu></userMenu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view />
          </el-main>
          <el-footer class="footer" :style="mainStyle"></el-footer>
        </el-container>
      </el-container>
    </el-container>
    <el-dialog :visible.sync="dialogVisible" title="Error">
      <p>{{ errorMessage }}</p>
    </el-dialog>
  </div>

</template>

<script lang="ts" setup>
import upload from './components/upload.vue'
import inputSearch from './components/inputSearch.vue'
import inputPeople from './components/inputPeople.vue';
import userMenu from './components/userMenu.vue';
import headerBanner from './components/headerBanner.vue';
import { defineProps, ref, watch, onMounted, onUnmounted } from 'vue';
import { ElDialog } from 'element-plus';
import emitter from './plugins/Bus.js';


//当前子组件生成的随机颜色
let currentcolor = ref('#545c64');

const handleColorChange = (color: string) => {
  currentcolor.value = color;
};

const mainStyle = ref({
  height: '10px',
  background: currentcolor.value
});

watch(() => currentcolor.value, (newColor) => {
  mainStyle.value.background = newColor;
});
let dialogVisible = ref(false);
let errorMessage = ref('');

onMounted(() => {
  const showErrorDialog = (err) => {
    errorMessage.value = err.toString();
    dialogVisible.value = true;
  };

  emitter.on('error', showErrorDialog);

  onUnmounted(() => {
    emitter.off('error', showErrorDialog);
  });
});
</script>

<style scoped>
.footer {
  transition: background 3s;
}

.el-header {
  margin: 0;
  padding: 0;

}
</style>