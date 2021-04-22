<template>
  <div>
    <ul class="types">
      <li :class="'-' === value && 'selected'" @click="selectType('-')">
        支出
      </li>
      <li :class="'+' === value && 'selected'" @click="selectType('+')">
        收入
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Types extends Vue {
  // 外面数据管理内部
  @Prop() value!: string;
  selectType(type: string) {
    if ("-" != type && "+" != type) {
      throw new Error("type is unknown");
    }
    this.$emit("update:value", type);
  }
}
</script>

<style lang="scss" scoped>
.types {
  background: #44c67e;
  display: flex;
  text-align: center;
  font-size: 24px;

  > li {
    flex-grow: 1;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex-direction: column;

    &.selected::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      height: 4px;
      width: 100%;
      background: #333;
    }
  }
}
</style>