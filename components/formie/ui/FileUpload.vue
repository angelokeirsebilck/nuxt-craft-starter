<script lang="ts" setup>
interface IProps {
  fieldData: any;
}

const props = defineProps<IProps>();

const inputValue = ref(null);
const inputRef = ref(null);

const multiple = computed(() => {
  if (props.fieldData.limitFiles > 1) return true;

  return false;
});

const acceptValue = computed(() => {
  let acceptValue: string = "";
  props.fieldData.allowedKinds.forEach((kind: string) => {
    switch (kind) {
      case "image":
        acceptValue += ",image/*";
        break;
      case "audio":
        acceptValue += ",audio/*";
        break;
      case "video":
        acceptValue += ",video/*";
        break;
      case "pdf":
        acceptValue += ",.pdf";
        break;
      case "powerpoint":
        acceptValue += ",.ppt, .pptx, application/vnd.ms-powerpoint";
        break;
      case "text":
        acceptValue += ",text/plain";
        break;
      case "word":
        acceptValue += ",.doc,.docx, application/msword";
        break;
      case "javascript":
        acceptValue += ",.js, .ts";
        break;
      case "json":
        acceptValue += ",.json";
        break;
      case "compressed":
        acceptValue +=
          ",.zip, .rar,application/zip,application/x-zip,application/x-zip-compressed,. 7zip";
        break;
      case "excel":
        acceptValue += ",.xls, .xlsx, application/vnd.ms-excel";
        break;
      case "captionsSubtitles":
        acceptValue += ",.srt, .scc, .vtt, .xml, .dfxp, .ITT, .smi, .txt, .sbv";
    }
  });

  return acceptValue;
});
</script>

<template>
  <FormKit
    ref="inputRef"
    type="file"
    :multiple="multiple"
    :accept="acceptValue"
  >
  </FormKit>
</template>
