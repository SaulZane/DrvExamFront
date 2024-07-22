<template>
  <div>
    <div :style="{ backgroundColor: randomColor, height: '5px' }" class="color-transition"></div>
    <el-header style="background-color: #545c64; display: flex; justify-content: space-between; align-items: center;">
      <div style="font-size: x-large; color:azure; margin-left: 30px; line-height: 60px; vertical-align:middle;">
        车管所考试监管系统（一期）</div>
      <div style="display: flex; align-items: center;">
        <el-icon style="color:yellow;line-height: 60px; vertical-align:middle;">
          <Microphone />
        </el-icon>
        <div style="overflow: hidden; flex-grow: 1; width: 500px; padding: 10px ">
          <div class="marquee">
            <div class="marquee-content" style="color: yellow; line-height: 60px; vertical-align:middle;">
              {{ bourdInfomation }}</div>
          </div>
        </div>
      </div>
    </el-header>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineEmits, watch } from 'vue';
import { getData } from '../plugins/index.js';
import { bourdInfo } from '../stores/base.js';
const emit = defineEmits(['ColorChange']);
const randomColor = ref('#545c64');

let intervalId;
let bourdInfomation = ref('');

const updateColor = () => {
  randomColor.value = '#' + ((1 << 24) * Math.random() | 0).toString(16);
};

onMounted(() => {
  intervalId = setInterval(updateColor, 6000);
  getData('/bourdinfo').then(response => {
    bourdInfomation.value = response;

  })
}
);

const bourdinfo = bourdInfo();
watch(bourdinfo, () => {
  bourdInfomation.value = bourdinfo.info;
});

onUnmounted(() => {
  clearInterval(intervalId);
});

//添加watch监听，颜色变化发送事件
watch(randomColor, (newVal) => {
  emit('ColorChange', newVal);
});

</script>

<style>
.color-transition {
  transition: background-color 3.0s;
}

.marquee {
  white-space: nowrap;
  overflow: hidden;
}

.marquee-content {
  display: inline-block;
  padding-left: 100%;
  animation: marquee 10s linear infinite;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-100%);
  }
}

* {
  margin: 0;
  padding: 0;
}
</style>