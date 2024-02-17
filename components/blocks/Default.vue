<script setup lang="ts">
import type { DefaultBlock } from "~~/types/craft";

const props = defineProps<{
  blockData: DefaultBlock;
}>();

const resolveBlockComponent = (typename: string) => {
  const instance = getCurrentInstance();
  let blockToResolve: any = useFirstLetterUppercase({
    text: typename
      .replace("itemColumn_type", "Default")
      .replace("_BlockType", ""),
  });

  if (
    typeof instance?.appContext.components === "object" &&
    blockToResolve in instance.appContext.components
  )
    return blockToResolve;

  throw createError({
    message: `No default block found with type: ${blockToResolve}`,
    statusMessage: "Internal Server Error",
    name: "Internal Server Error",
    statusCode: 500,
  });
};
</script>
<template>
  <BaseContainer>
    <div>
      <div v-for="(column, index) in blockData.itemDefaultColumns">
        <component
          v-for="(content, index) in column.itemColumn"
          :is="resolveBlockComponent(content.__typename)"
          :blockData="{ ...content }"
        ></component>
      </div>
    </div>
  </BaseContainer>
</template>
