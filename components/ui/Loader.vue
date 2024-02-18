<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color?: "white" | "black";
    loading: boolean;
    size?: `${string}px`;
  }>(),
  {
    color: "white",
    size: "20px",
  }
);

const hexColor = computed(() => {
  if (props.color == "white") return "#FFF";
  if (props.color == "black") return "#404040";
});
</script>
<template>
  <div :style="{ height: size }" class="wrapper" :class="{ active: loading }">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: 0;
  transform: translate(-50, -50%);

  &.active {
    opacity: 100;
  }
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 30px;
  height: 30px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: v-bind(size);
  height: v-bind(size);
  border: 2px solid v-bind(hexColor);
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: v-bind(hexColor) transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
