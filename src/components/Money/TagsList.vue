<template>
  <ul class="tags">
    <li v-for="(tag, index) in tagList" :key="index" @click="select(tag)">
      <div class="icon" :class="{ selected: tag.name === selectedTag.name }">
        <Icon :name="tag.name" />
      </div>
      <span>{{ tag.value }}</span>
    </li>
    <li v-if="disabled">
      <div class="icon" @click="add"><Icon name="add" /></div>
      <span>添加</span>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Icon from "@/components/Icon.vue";
@Component({
  components: { Icon },
})
export default class TagList extends Vue {
  @Prop({ required: true, type: Object }) selectedTag!: TagItem;
  @Prop({ required: true, type: Array }) tagList!: TagItem[];
  @Prop({ type: Boolean, default: false }) disabled!: boolean;

  //   get tagList(): TagItem[] {
  //     return this.$store.state.tagList;
  //   }
  select(tag: TagItem) {
    this.$emit("update:selectedTag", tag);
  }
  add() {
    this.$router.replace("/outlabel");
  }
}
</script>
<style lang="scss" scopeed>
.tags {
  padding: 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: auto;

  > li {
    width: 25%;
    padding: 12px 0;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      width: 48px;
      height: 48px;
      padding: 4px;
      border-radius: 50%;
      background: #f5f5f5;
      margin-bottom: 4px;
      &.selected {
        background: #44c67e;
      }
      svg {
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>