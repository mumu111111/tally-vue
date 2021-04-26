<template>
  <div class="numberPad">
    <div class="output">{{ value }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button class="ok" @click="ok">完成</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class NumberPad extends Vue {
  @Prop() value!: string;
  output = "0";

  inputContent(event: MouseEvent) {
    const Button = event.target as HTMLButtonElement;
    const input = Button.textContent!;
    if (Button === null) return; // 加判断这句 否则报错
    if (this.output.length === 6) {
      return;
    }
    if (this.output === "0") {
      if ("0123456789".indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf(".") >= 0 && input === ".") {
      return;
    }
    this.output += input;
  }
  // 监听变化
  @Watch("output")
  onOutputChange(output: string) {
    this.$emit("update:value", this.output);
  }
  remove() {
    if (this.output.length === 1) {
      this.output = "0";
    } else {
      this.output = this.output.slice(0, -1);
    }
    this.$emit("update:value", this.output);
  }

  clear() {
    this.output = "0";
    this.$emit("update:value", this.output);
  }

  ok() {
    if (this.output == "0") {
      alert("别忘了加入金额哦");
      return;
    }
    this.$emit("update:value", this.output);
    this.$emit("submit", this.output);
    this.output = "0"; //清空之前 保存 的数据
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  > .output {
    @extend %clearFix;
    @extend %innerShader;
    background: #f5f5f5;
    padding: 6px 12px;
    font-size: 24px;
    line-height: 24px;
    font-family: Consolas, monospace;
    text-align: right;
  }

  > .buttons {
    @extend %clearFix;

    > button {
      float: left;
      width: 25%;
      height: 64px;
      background: transparent;
      border: none;
      font-size: 16px;
      &.ok {
        float: right;
        height: 64 * 2px;
      }

      &.zero {
        width: 25 * 2%;
      }

      $bg: #f2f2f2;

      &:nth-child(1) {
        background: $bg;
      }

      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 4%);
      }

      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 4 * 2%);
      }

      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($bg, 4 * 3%);
      }

      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($bg, 4 * 4%);
      }

      &:nth-child(14) {
        background: darken($bg, 4 * 5%);
      }

      &:nth-child(12) {
        background: darken($bg, 4 * 6%);
      }
    }
  }
}
</style>