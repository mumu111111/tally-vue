<template>
  <layout>
    {{ recordList }}
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
    <Notes :value.sync="record.notes" />
    <Types :value.sync="record.type" />
    <NumberPad
      :value.sync="record.amount"
      @update:value="onUpdateAmount"
      @submit="saveRecord"
    />
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import { Component, Watch } from "vue-property-decorator";

type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date; // 加入时间字段
};
@Component({
  components: { Types, Notes, Tags, NumberPad },
})
export default class Money extends Vue {
  tags = ["衣", "食", "住", "行"];
  record: Record = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  recordList: Record[] = [];
  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  saveRecord() {
    const record2 = JSON.parse(JSON.stringify(this.record));
    record2.createdAt = new Date(); // 加入时间
    this.recordList.push(record2);
  }
  // 监听 当变化时 存入localS
  @Watch("recordList")
  onRecordListChange() {
    window.localStorage.setItem("recordList", JSON.stringify(this.recordList)); // 存入字符串
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
</style>