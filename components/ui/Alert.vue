<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";

const show = ref(true);

const alert = cva("base", {
  variants: {
    intent: {
      success: "alert-success",
      danger: "alert-danger",
    },
  },
  defaultVariants: {
    intent: "danger",
  },
});

type AlertProps = VariantProps<typeof alert>;

const props = defineProps<{
  intent: AlertProps["intent"];
  autoClose: null | undefined | number | boolean;
}>();

onMounted(() => {
  show.value = true;
  if (props.autoClose && props.autoClose !== 0) {
    setTimeout(() => {
      show.value = false;
      //@ts-expect-error
    }, props.autoClose * 1000);
  }
});
</script>

<template>
  <div v-if="show" :class="alert({ intent })">
    <slot />
  </div>
</template>

<style scoped>
.base {
  padding: 2rem;
  border: 1px solid;
}

.alert-success {
  background: rgba(0, 255, 0, 0.5);
  border-color: green;
}

.alert-danger {
  background: rgba(255, 0, 0, 0.5);
  border-color: red;
}
</style>
