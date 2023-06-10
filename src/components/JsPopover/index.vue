<template>
  <el-popover trigger="hover" placement="top" width="auto">
    <template #default>
      <el-image style="height: 120px" :src="src" :fit="fit" />
    </template>
    <template #reference>
      <span type="text" class="underline">{{ text }}</span>
    </template>
  </el-popover>
</template>

<script>
export default {
  name: 'JsPopover'
}
</script>

<script setup>
import { defineProps } from 'vue'
defineProps({
  src: {
    type: String,
    default: ''
  },
  fit: {
    type: String,
    default: 'contain'
  },
  text: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
.underline {
  color: #409eff;
  cursor: pointer;
  text-decoration: underline;
}
</style>
