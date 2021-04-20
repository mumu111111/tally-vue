<template>
  <ol class="tabs">
    <li
      v-for="item in dataSource"
      :class="{ selected: item.value == value }"
      :key="item.value"
      @click="selectItem(item)"
    >
      {{ item.text }}
    </li>
  </ol>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

type DataSourceItem = {
  text: string;
  value: string;
};

@Component
export default class Tabs extends Vue {
  @Prop(String) readonly value!: string;
  @Prop({ required: true, type: Array }) dataSource!: DataSourceItem[];
  selectItem(item: DataSourceItem) {
    this.$emit("update:value", item.value);
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  background: #c4c4c4;
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