<template>
  <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2"
    text-color="#fff" router>
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <EditPen />
        </el-icon>
        <span>写入数据</span>
      </template>
      <el-menu-item index="/ksk"><el-icon>
          <Finished />
        </el-icon>考试科统计</el-menu-item>
      <el-menu-item index="/ywbm"><el-icon>
          <Edit />
        </el-icon>考试部门写入</el-menu-item>
      <el-menu-item index="/jdk"><el-icon>
          <Crop />
        </el-icon>监督科建模</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/">
      <span><el-icon>
          <Odometer />
        </el-icon>大屏监控面板</span>
    </el-menu-item>
    <el-menu-item index="/about">
      <span><el-icon>
          <WarningFilled />
        </el-icon>关于</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>




</script>

<style>
.el-menu-vertical-demo {
  border-right: none;
  width: 200px;
  /*设置min-height为浏览器窗口大小高度-头部高度*/
  min-height: calc(100vh - 60px);
}
</style>