<template>
  <div class="wrapper" ref="wrapper">jjj</div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Watch, Prop } from "vue-property-decorator";
import echarts from "echarts";
// type Options = {};
@Component
export default class Chart extends Vue {
  // @Prop() options?: Options;
  // mounted() {
  //   if (!this.options) {
  //     return console.error("options为空");
  //   }
  //   // const chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
  //   const chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
  //   // 使用刚指定的配置项和数据显示图表。
  //   chart.setOption(this.options);
  // }
}
</script>
<style lang="scss" scoped>
.wrapper {
  height: 400px;
}
</style>