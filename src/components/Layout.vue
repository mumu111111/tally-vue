<template>
  <div class="wrapper">
    <div class="main">
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script lang="ts">
import Nav from "@/components/Nav.vue";
export default {
  name: "Layout",
  components: { Nav },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;

  .main {
    flex: 1;
    padding-bottom: 52px;
  }
}
</style>