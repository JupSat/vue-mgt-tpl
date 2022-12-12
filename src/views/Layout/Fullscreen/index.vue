<template>
  <div @click="triggerFullscreen" class="full-screen">
    <el-tooltip
      :content="showFullscreen ? $t('openFullScreen') : $t('closeFullScreen')"
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
  name: 'Fullscreen',
  setup() {
    const state = reactive({
      showFullscreen: true
    })

    onMounted(() => {
      if (screenfull.isEnabled) {
        screenfull.on('change', changeFullscreen)
      }
    })

    onUnmounted(() => {
      screenfull.off('change')
    })

    const triggerFullscreen = () => {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    }

    const changeFullscreen = () => {
      state.showFullscreen = !screenfull.isFullscreen
    }
    return {
      ...toRefs(state),
      triggerFullscreen
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
