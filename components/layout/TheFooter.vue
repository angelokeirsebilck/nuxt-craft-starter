<script lang="ts" setup>
const craftStore = useCraftStore();
const { footerNav } = storeToRefs(craftStore);
const siteStore = useSiteStore();
const { currentSite } = storeToRefs(siteStore);
</script>

<template>
  <footer class="">
    <BaseContainer>
      <div class="wrapper">
        <nav>
          <ul>
            <li :key="index" v-for="(navItem, index) in footerNav">
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
        <BaseContactInfo />
      </div>
    </BaseContainer>
  </footer>
</template>

<style scoped>
footer {
  background-color: beige;
  margin-top: auto;
}

.wrapper {
  padding-top: 3rem;
  padding-bottom: 3rem;

  display: flex;
  justify-content: space-between;
}
.active {
  color: red;
}
</style>
