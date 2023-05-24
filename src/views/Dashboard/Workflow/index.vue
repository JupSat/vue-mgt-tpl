<template>
  <div>
    This is Workflow
    <el-button @click="sendMsg">发送</el-button>
  </div>
</template>

<script>
export default {
  name: 'Workflow'
}
</script>
<script setup>
import { getCurrentInstance } from 'vue'
const { appContext } = getCurrentInstance()
const { $websocket } = appContext.config.globalProperties

$websocket.connect()

const sendMsg = () => {
  $websocket.send()
}
</script>
<style scoped lang="scss"></style>
