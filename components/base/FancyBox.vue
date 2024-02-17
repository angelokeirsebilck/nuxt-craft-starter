<script setup lang="ts">
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const props = defineProps<{ options?: Fancybox["options"] }>();
const container = ref();

onMounted(() => {
  Fancybox.bind(container.value, "[data-fancybox]", {
    ...(props.options || {}),
  });
});

onUpdated(() => {
  Fancybox.unbind(container.value);
  Fancybox.close();

  Fancybox.bind(container.value, "[data-fancybox]", {
    ...(props.options || {}),
  });
});

onUnmounted(() => {
  Fancybox.destroy();
});
</script>

<template>
  <div ref="container">
    <slot />
  </div>
</template>
