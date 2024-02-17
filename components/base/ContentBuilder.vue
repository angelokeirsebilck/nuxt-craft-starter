<script setup lang="ts">
import type { ContentBuilder } from "~~/types/craft";

type Props = {
  content: ContentBuilder;
};
const props = defineProps<Props>();

const resolveBlockComponent = (typename: string) => {
  const instance = getCurrentInstance();
  let blockToResolve: any = useFirstLetterUppercase({
    text: typename
      .replace("fieldContentBuilder_type", "")
      .replace("_BlockType", ""),
  });

  if (
    typeof instance?.appContext.components === "object" &&
    blockToResolve in instance.appContext.components
  )
    return blockToResolve;

  throw createError({
    message: `No block found with type: ${blockToResolve}`,
    statusMessage: "Internal Server Error",
    name: "Internal Server Error",
    statusCode: 500,
  });
};
</script>

<template>
  <div class="">
    <div :key="index" v-for="(block, index) in content">
      <component
        v-if="block?.__typename"
        :is="resolveBlockComponent(block.__typename)"
        :index="index"
        :blockData="{ ...block }"
      ></component>
    </div>
  </div>
</template>
