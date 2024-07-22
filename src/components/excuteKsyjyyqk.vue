<template>
  <div class="demo-date-picker">
    <div class="block">
      <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="统计（约考）起始"
        end-placeholder="统计（约考）结束" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
      <el-button type="primary" style="margin: 20px;" @click="excuteclickwebsocket"
        :loading="progressshow">执行KSYJ_YYQK表</el-button>
      
      <el-button type="primary" @click="exportsfzmhmexcel">去重导出身份证号码</el-button>
      <el-progress :percentage="progresspercentage" v-show="progressshow" :format="format"></el-progress>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElNotification } from 'element-plus';
import { downloadExcel } from '../plugins/downlaodExcel';


let value1 = ref(['', '']); // 初始化为两个空字符串，表示未选择日期

const format = (percentage) => (percentage >= 100 ? '完成' : `${percentage}%`)

let progressshow = ref(false);
let progresspercentage = ref(0);

const excuteclickwebsocket = async () => {
  if (!checkDateSelection()) {
    ElNotification({
      title: '错误',
      message: '请选择统计日期',
      type: 'error',
    });
    return;
  }

  progressshow.value = true;
  const socket = new WebSocket('ws://localhost:8000/ws');
  socket.onopen = function () {
    const data = { startdate: value1.value[0], enddate: value1.value[1] };
    socket.send(JSON.stringify(data));
    progresspercentage.value = 25;
  };
  // 每1秒progress+1
  let timer = setInterval(() => {
    progresspercentage.value += 1;
    if (progresspercentage.value >= 90) {
      clearInterval(timer);
    }
  }, 1000);
  socket.onmessage = (event) => {
    const result = JSON.parse(event.data);
    if (result.error) {
      ElNotification({
        title: '错误',
        message: result.error,
        type: 'error',
      });
      progressshow.value = false;
      progresspercentage.value = 0;
      return;
    }
    else if ((result.success)||(result.success ==0)) {
      ElNotification({
        title: '执行成功！',
        message: "KSYJ_YYQK最新数据量：" + result.success + "条。",
        type: 'success',
      });
      progresspercentage.value = 99;
      setTimeout(() => {
        progressshow.value = false;
        progresspercentage.value = 0;
      }, 1000);
    };
  };
};

const checkDateSelection = () => {
  // 检查value1的两个值是否都已选择
  return value1.value[0] && value1.value[1];
};

const exportsfzmhmexcel=()=>{
  console.log("导出身份证号码");
  try {
    downloadExcel("http://localhost:8000/getyyqksfzmhm", "身份证号码.xlsx");
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;

}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>