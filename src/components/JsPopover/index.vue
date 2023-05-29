<template>
  <el-popover trigger="hover" placement="top" width="auto">
    <template #default>
      <div>
        <el-image style="height: 120px" :src="src" :fit="'contain'" />
      </div>
    </template>
    <template #reference>
      <el-button type="text" class="underline">{{ text }}</el-button>
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
  text: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
.underline {
  text-decoration: underline;
}
</style>
