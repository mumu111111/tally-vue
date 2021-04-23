<template>
  <div>
    <div class="top-content">
      <TabBar
        :bars="[
          { name: '支出', value: '-' },
          { name: '收入', value: '+' },
        ]"
        :c-bar.sync="record.type"
        class="top-bars"
      />
      <button class="cancel" @click="cancel()">取消</button>
      <TagList
        v-if="record.type == '-'"
        class-prefix="money"
        :selected-tag.sync="record.tags"
        :tag-list.sync="tagList"
        class="tag-list"
        :disabled="true"
      />
      <TagList
        v-else-if="record.type === '+'"
        class-prefix="money"
        :selected-tag.sync="record.tags"
        :tag-list.sync="incomeTags"
        class="tag-list"
      />
    </div>

    <div class="calculator">
      <Notes
        filed-name="备注"
        placeholder="在这里输入备注"
        :value.sync="record.notes"
      />
      <NumberPad
        :value.sync="record.amount"
        @update:value="onUpdateAmount"
        @submit="saveRecord"
      />
    </div>
  </div>
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
import { defaultIncomeTags } from "@/constants/defaultTags";
import TabBar from "@/components/TabBar.vue";
@Component({
  components: { Types, Notes, Tags, NumberPad, TagList, TabBar },
})
export default class Money extends Vue {
  // record 初始化数据 默认选中餐饮
  record: RecordItem = this.initRecord();
  // 收入tags数据
  incomeTags = defaultIncomeTags;
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
  cancel() {
    this.$router.replace("/bill");
  }
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  // 保存
  saveRecord() {
    this.$store.commit("insertRecord", clone<RecordItem>(this.record));
    this.record = this.initRecord();
    this.$router.replace("/bill");
  }
  // 监听type 支出还是收入对应的 默认选中状态不一样
  @Watch("record.type")
  onTypeChange(type: string) {
    if (type === "+") {
      this.record.tags = { name: "wages", value: "工资" };
    } else if (type === "-") {
      this.record.tags = { name: "food", value: "餐饮" };
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.top-content {
  padding-bottom: 600px;
  .top-bars {
    position: relative;
  }
  .cancel {
    position: absolute;
    top: 5%;
    right: 0;
    transform: translateY(-50%);
    font-size: 14px;
    padding: 24px 16px 8px 16px;
  }
}
.calculator {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
}
</style>