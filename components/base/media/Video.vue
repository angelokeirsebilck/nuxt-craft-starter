<script lang="ts" setup>
import type { CraftVideo } from "~/types/craft";
import PlayIcon from "/src/svg/play-icon.svg?component";

defineProps<{
  video: CraftVideo;
  sizes: string;
}>();

const videoUrl = (video: CraftVideo) => {
  if (video.embeddedAsset) return video.embeddedAsset.url;
  return video.url;
};
</script>

<template>
  <div v-if="video.fieldThumbnail && video.fieldThumbnail[0]">
    <BaseFancyBox>
      <a class="fancyLink" :href="videoUrl(video)" data-fancybox>
        <div class="play">
          <PlayIcon class="" />
        </div>

        <NuxtPicture
          format="avif, webp"
          :sizes="sizes"
          :src="video.fieldThumbnail[0].url"
        />
      </a>
    </BaseFancyBox>
  </div>
  <div v-else>
    <div
      class="iframe-video"
      :style="`aspect-ratio: ${video.embeddedAsset?.width}/${video.embeddedAsset.height}`"
      v-if="video.embeddedAsset"
      v-html="video.embeddedAsset.html"
    />
    <video class="video" v-else playsinline autoplay loop muted>
      <source :src="video.url" type="video/mp4" />
    </video>
  </div>
</template>

<style scoped>
.play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
  border-radius: 100%;
  background: beige;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.fancyLink {
  position: relative;
  display: inline-block;
}

.video {
  aspect-ratio: 16/9;
  width: 100%;
}
</style>

<style>
iframe {
  height: 100%;
  width: 100%;
}
</style>
