<template>
  <div>
    <label class="notes">
      <span class="name">{{ this.filedName }}</span>
      <input
        type="text"
        :value="value"
        @input="onValueChanged($event.target.value)"
        :placeholder="this.placeholder"
      />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch, Prop } from "vue-property-decorator";

@Component
export default class Notes extends Vue {
  // value = "";
  // 将私有数据转换成prop
  @Prop({ default: "" }) value!: string;
  @Prop({ required: true }) filedName!: string;
  @Prop() placeholder?: string;
  @Watch("value")
  onValueChanged(value: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  font-size: 14px;
  border-top: 1px solid #f5f5f5;
  background: #fff;

  > .name {
    padding-right: 16px;
  }

  > input {
    flex-grow: 1;
    margin-left: 8px;
    height: 32px;
    border: none;
    background: inherit;
  }
}
</style>