<script lang="ts" setup>
const craftStore = useCraftStore();
const { globalCompanyInfo } = storeToRefs(craftStore);
</script>

<template>
  <div class="contact-wrapper">
    <a
      v-if="globalCompanyInfo?.fieldTel?.url"
      :href="`${globalCompanyInfo?.fieldTel?.url.replace(/\s+/g, '')}`"
      class=""
      >{{ globalCompanyInfo?.fieldTel?.url.replace("tel:", "") }}</a
    >
    <a
      v-if="globalCompanyInfo?.fieldEmail?.url"
      :href="`${globalCompanyInfo?.fieldEmail?.url.replace(/\s+/g, '')}`"
      class=""
      >{{ globalCompanyInfo?.fieldEmail?.url.replace("mailto:", "") }}</a
    >
    <a
      :href="`http://maps.google.com/?q=${globalCompanyInfo?.fieldAddressLine1},${globalCompanyInfo.fieldAddressLine2}`"
      class=""
      v-if="
        globalCompanyInfo?.fieldAddressLine1 &&
        globalCompanyInfo.fieldAddressLine2
      "
    >
      {{ globalCompanyInfo?.fieldAddressLine1 }},
      {{ globalCompanyInfo.fieldAddressLine2 }}
    </a>
    <div v-if="globalCompanyInfo?.fieldVAT">
      {{ globalCompanyInfo?.fieldVAT }}
    </div>
  </div>
</template>

<style scoped>
.contact-wrapper {
  display: flex;
  row-gap: 0.5rem;
  flex-direction: column;
}
</style>
