<template>
  <layout>
    {{ recordList }}
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
    <TagList
      class-prefix="money"
      :selected-tag.sync="record.tags"
      class="tag-list"
    />
    <Notes
      filed-name="备注"
      placeholder="在这里输入备注"
      :value.sync="record.notes"
    />
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
import { recordListModel } from "@/models/recordListModel";
import { tagListModel } from "@/models/tagListModel";
import TagList from "@/components/Money/TagsList.vue";

const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();
@Component({
  components: { Types, Notes, Tags, NumberPad, TagList },
})
export default class Money extends Vue {
  // tags = ["衣", "食", "住", "行"];
  record: RecordItem = {
    tags: { name: "food", value: "餐饮" },
    type: "-",
    notes: "",
    amount: 0,
  };

  tags = tagList;
  recordList: RecordItem[] = recordList;

  onUpdateTags(value: string[]) {
    // this.record.tags = value;
  }
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  saveRecord() {
    const record2 = recordListModel.clone(this.record);
    record2.createdAt = new Date(); // 加入时间
    this.recordList.push(record2);
  }
  // 监听 当变化时 存入localS
  @Watch("recordList")
  onRecordListChange() {
    recordListModel.save(this.recordList);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
</style>