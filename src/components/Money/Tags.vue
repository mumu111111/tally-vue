<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in dataSource"
        :key="tag"
        @click="toggle(tag)"
        :class="{ select: selectedTags.indexOf(tag) >= 0 }"
      >
        {{ tag }}
      </li>
    </ul>
    <div class="new">
      <button>新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Tags extends Vue {
  // 接受父组件的数据
  @Prop() dataSource: string[] | undefined;
  // 被选中的tags
  selectedTags: string[] = [];
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  > .current {
    display: flex;
    flex-wrap: wrap;
    /*justify-content: center;*/
    > li {
      $bg: #d9d9d9;
      margin-top: 4px;
      $h: 24px;
      background: #d9d9d9;
      height: $h;
      line-height: $h;
      border-radius: ($h/2);
      padding: 0 16px;
      margin-right: 12px;
      &.select {
        background: darken($bg, 50%);
        color: white;
      }
    }
  }

  > .new {
    padding: 16px;

    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 3px;
    }
  }
}
</style>