<template>
  <Layout> 编辑页面 </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { tagListModel } from "@/models/tagListModel";

@Component
export default class EditLabel extends Vue {
  created() {
    // 获取router id
    const id = this.$route.params.id;
    tagListModel.fetch(); //获取data
    // 判断tag 是否存在
    const tags = tagListModel.data;
    const tag = tags.filter((t) => (t.id = id))[0];
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace("/404");
    }
  }
}
</script>

<style lang="scss" scoped>
</style>