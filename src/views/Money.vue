<template>
  <layout>
    {{ record }}
    <!-- <Tags :data-source.sync="tags" @update:value="onUpdateTags" /> -->
    <TagList
      class-prefix="money"
      :selected-tag.sync="record.tags"
      :tag-list.sync="tagList"
      class="tag-list"
      :disabled="true"
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
import clone from "@/lib/clone";

// const recordList = recordListModel.fetch();
// const tagList = tagListModel.fetch();
@Component({
  components: { Types, Notes, Tags, NumberPad, TagList },
})
export default class Money extends Vue {
  // record 初始化数据 默认选中餐饮
  record: RecordItem = this.initRecord();
  // store获取标签列表
  get tagList(): TagItem {
    console.log(this.$store.state.tagList);

    return this.$store.state.tagList;
  }
  initRecord(): RecordItem {
    return {
      tags: { name: "food", value: "餐饮" },
      type: "-",
      notes: "",
      amount: 0,
      // createdAt: new Date(),
    };
  }

  // tags = tagList;
  // recordList: RecordItem[] = recordList;

  onUpdateTags(value: string[]) {
    // this.record.tags = value;
  }
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  // 保存
  saveRecord() {
    this.$store.commit("insertRecord", clone<RecordItem>(this.record));
    this.record = this.initRecord();
    this.$router.replace("/bill");
    // const record2 = recordListModel.clone(this.record);
    // record2.createdAt = new Date(); // 加入时间
    // this.recordList.push(record2);
  }
  // 监听 当变化时 存入localS
  @Watch("record")
  onRecordListChange() {
    this.saveRecord();
    // recordListModel.save(this.recordList);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
</style>