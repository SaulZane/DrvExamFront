<template>
    <v-chart class="chart" :option="option" />
  </template>
  
  <script setup>
  import { use } from "echarts/core";
  import { CanvasRenderer } from "echarts/renderers";
  import { PieChart } from "echarts/charts";
  import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
  } from "echarts/components";
  import VChart  from "vue-echarts";
  import { ref, } from "vue";
  
  use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent
  ]);
  
  
  const option = ref({
    title: {
      text: "重点关注人员统计",
      left: "center"
    },
    tooltip: {
      trigger: "item",
      formatter: "{b} : {c} ({d}%)"
    },
    
    series: [
      {
        type: "pie",
        radius: "55%",
        center: ["50%", "50%"],
        data: [
          { value: 335, name: "市所" },
          { value: 310, name: "东所" },
          { value: 234, name: "南所" },
          { value: 135, name: "西所" },
          { value: 1548, name: "北所" },
          { value: 982, name: "滨海所"}
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  });

  </script>
  
  <style scoped>
  .chart {
    height: 400px;
    width: 50%;
  }
  </style>