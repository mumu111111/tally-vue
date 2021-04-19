<template>
  <layout>
    <div class="tags">
      <ul class="current">
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
      </ul>
      <div class="new">
        <button>新增标签</button>
      </div>
    </div>
    <Notes />
    <Types />
    <div class="numberPad">
      <div class="output">100</div>
      <div class="buttons">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>删除</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>清空</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>OK</button>
        <button>0</button>
        <button>.</button>
      </div>
    </div>
  </layout>
</template>

<script>
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";

export default {
  name: "Money",
  components: { Types, Notes },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  > .output {
    @extend %clearFix;
    @extend %innerShader;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
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

.notes {
  font-size: 14px;
  padding-left: 16px;
  background: #f5f5f5;
  display: flex;
  align-items: center;

  > .name {
    padding-right: 16px;
  }

  > input {
    padding: 20px 0;
    flex-grow: 1;
    background: transparent;
    border: none;
  }
}

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
      margin-top: 4px;
      $h: 24px;
      background: #d9d9d9;
      height: $h;
      line-height: $h;
      border-radius: ($h/2);
      padding: 0 16px;
      margin-right: 12px;
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