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
      <button @click="create">新增标签</button>
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
  // 点击选中取消
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    // if (index >= 0) {
    //   this.selectedTags.splice(index, 1);
    // } else {
    //   this.selectedTags.push(tag);
    // }
    if (index >= 0) {
      this.selectedTags = this.selectedTags.filter((item) => item !== tag);
    } else {
      this.selectedTags = [tag];
    }
    this.$emit("update:value", this.selectedTags);
  }
  // 添加新标签
  create() {
    const name = window.prompt("请输入标签名");
    if (name === "") {
      window.alert("标签名不能为空");
    } else if (this.dataSource) {
      // sync 子传父数据
      this.$emit("update:dataSource", [...this.dataSource, name]);
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