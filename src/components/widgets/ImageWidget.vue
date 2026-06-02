<template>
  <div class="image-widget" 
    :style="style">
    <a-image
    :style="{ ...style,maxWidth: '100%' }"
    :src="src"
    :alt="alt"
  />
  </div>
</template>

<script setup lang="ts">

const props=defineProps<{
  src: string
  alt?: string
  style?: Record<string, any>
}>()

</script>

