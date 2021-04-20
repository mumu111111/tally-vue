<template>
  <Layout>
    编e辑页面
    <div class="navBar">
      <!-- <Icon class="leftIcon" name="left" @click="goBack"/> -->
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <Notes
        filed-name="备注"
        :value="tag.name"
        @update:value="update"
        placeholder="请在这输入备注"
      />
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { tagListModel } from "@/models/tagListModel";
import Notes from "@/components/Money/Notes.vue";
import Button from "@/components/Button.vue";

@Component({
  components: { Notes, Button },
})
export default class EditLabel extends Vue {
  tag?: { id: string; name: string } = undefined;
  // 初始操作 获取router 判断当前的id是否存在
  created() {
    const id = this.$route.params.id;
    tagListModel.fetch(); //获取data
    // 判断tag 是否存在
    const tags = tagListModel.data;
    const tag = tags.filter((t) => (t.id = id))[0];
    if (tag) {
      console.log(tag);
      this.tag = tag;
    } else {
      this.$router.replace("/404");
    }
  }
  // 修改tag
  update(name: string) {
    if (this.tag) {
      tagListModel.update(this.tag.id, name);
    }
  }
  // 删除
  remove() {
    if (this.tag) {
      if (tagListModel.remove(this.tag.id)) {
        this.goBack();
      }
    }
  }
  // 回退页面
  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .title {
  }

  > .leftIcon {
    width: 24px;
    height: 24px;
  }

  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}

.form-wrapper {
  background: white;
  margin-top: 8px;
}
.button-wrapper {
  text-align: center;
  margin-top: 44-16px;
}
</style>