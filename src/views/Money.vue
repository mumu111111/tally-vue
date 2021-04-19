<template>
  <layout>
    <Tags :data-source.sync="tags" />
    <Notes />
    <Types />
    <NumberPad />
  </layout>
</template>

<script>
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import NumberPad from "@/components/Money/NumberPad.vue";

export default {
  name: "Money",
  data() {
    return {
      tags: ["衣", "食", "住", "行"],
    };
  },
  components: { Types, Notes, Tags, NumberPad },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
</style>