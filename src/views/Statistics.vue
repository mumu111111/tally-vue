<template>
  <div class="layout-wrapper">
    <Layout>
      <h3>支出</h3>
      <Tabs :data-source="intervalList" :value.sync="interval" />
      <Chart :options="x" />
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import Chart from "@/components/Chart.vue";

@Component({
  components: { Tabs, Chart },
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  intervalList = [
    { text: "按天", value: "day" },
    { text: "按周", value: "week" },
    { text: "按月", value: "month" },
  ];
  get x() {
    return {
      grid: {
        left: 10,
        right: 10,
      },
      xAxis: {
        type: "category",
        data: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
        ],
        axisLabel: {
          interval: 3,
          lineStyle: { width: 1 },
          axisTick: { show: false },
        },
        axisTick: { show: false },
        axisLine: { lineStyle: { color: "#D1D1D1" } },
      },
      yAxis: {
        type: "value",
        show: false,
      },

      series: [
        {
          symbol: "circle",
          symbolSize: 10,
          itemStyle: {
            borderWidth: 1,
            color: "#666",
            shadowColor: "yellow",
          },
          data: [
            820,
            932,
            901,
            934,
            1290,
            1330,
            1320,
            820,
            932,
            932,
            820,
            932,
            901,
            934,
            1290,
            1330,
            1320,
            820,
            932,
            1330,
            820,
            932,
            901,
            934,
            1290,
            1330,
            1320,
            214,
            421,
            533,
          ],
          type: "line",
        },
      ],
      tooltip: {
        show: true,
        formatter: "{c}",
        position: "top",
      },
    };
  }
}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background: white;

  &.selected {
    background: #c4c4c4;

    &::after {
      display: none;
    }
  }
}
</style>