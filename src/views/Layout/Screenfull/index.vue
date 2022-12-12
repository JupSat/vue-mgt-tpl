<template>
  <div @click="triggerFullScreen" class="full-screen">
    <el-tooltip
      :content="showFullScreen ? $t('openFullScreen') : $t('closeFullScreen')"
      placement="top"
      effect="light"
    >
      <el-icon :size="23" color="#8f9bb3"><FullScreen /></el-icon>
    </el-tooltip>
  </div>
</template>

<script>
import { reactive, toRefs, onUnmounted, onMounted } from 'vue'
import screenfull from 'screenfull'

export default {
  name: 'Screenfull',
  setup() {
    const state = reactive({
      showFullScreen: true
    })

    onMounted(() => {
      if (screenfull.isEnabled) {
        screenfull.on('change', changeFullScreen)
      }
    })

    onUnmounted(() => {
      screenfull.off('change')
    })

    const triggerFullScreen = () => {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    }

    const changeFullScreen = () => {
      state.showFullScreen = !screenfull.isFullscreen
    }
    return {
      ...toRefs(state),
      triggerFullScreen
    }
  }
}
</script>
<style scoped lang="scss">
.full-screen {
  display: flex;
  &:hover {
    padding: 4px;
    border-radius: 50px;
    background: rgba(2, 123, 190, 0.2);
    cursor: pointer;
    .el-icon {
      &:hover {
        color: #598bff;
      }
    }
  }
}
</style>
