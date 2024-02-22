<script lang="ts" setup>
const craftStore = useCraftStore();
const { mainNav } = storeToRefs(craftStore);
const siteStore = useSiteStore();
const { currentSite } = storeToRefs(siteStore);

</script>

<template>
  <header>
    <BaseContainer>
      <div class="wrapper">
        <NuxtLink
          :to="`${currentSite?.primary ? '/' : currentSite?.urlPrefix}`"
        >
          Logo
        </NuxtLink>
        <div class="right">
          <nav>
            <ul class="main-nav">
              <li :key="index" v-for="(navItem, index) in mainNav">
                <NuxtLink
                  class=""
                  :to="`${currentSite?.urlPrefix}/${navItem.nodeUri}`"
                  v-if="navItem?.nodeUri && navItem.language"
                  active-class="active"
                >
                  {{ navItem?.title }}
                </NuxtLink>
              </li>
            </ul>
          </nav>
          <UiLangSwitcher />
        </div>
      </div>
    </BaseContainer>
  </header>
</template>

<style scoped>
header {
  background: beige;
}
.wrapper {
  padding-top: 3rem;
  padding-bottom: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main-nav {
  display: flex;
  gap: 3rem;
  list-style: none;
}

.active {
  color: red;
}

.right {
  display: flex;
  gap: 4rem;
}
</style>
