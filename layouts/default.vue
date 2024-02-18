<script lang="ts" setup>
const siteStore = useSiteStore();
const { currentSite } = storeToRefs(siteStore);
</script>

<template>
  <div class="font-serif">
    <Html :lang="`${currentSite?.locale}`">
      <div class="wrapper">
        <LayoutTheHeader />
        <slot />
        <LayoutTheFooter />
      </div>
    </Html>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.font-serif {
  font-family: "Satoshi";
}

.border-box {
  box-sizing: border-box;
}
</style>
