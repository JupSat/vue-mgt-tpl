<template>
  <div class="toggle-settings">
    <el-button @click="drawer = true">
      <el-icon :size="20">
        <Setting />
      </el-icon>
    </el-button>
    <el-drawer v-model="drawer" :direction="direction" title="设置">
      <template #default>
        <div>
          <el-radio v-model="radio1" label="Option 1" size="large">功能待完善</el-radio>
          <el-radio v-model="radio1" label="Option 2" size="large">功能待完善</el-radio>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">cancel</el-button>
          <el-button type="primary" @click="confirmClick">confirm</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
export default {
  name: 'Settings',
  setup() {
    const drawer = ref(false)
    const direction = ref('rtl')
    const radio1 = ref('Option 1')

    const cancelClick = () => {
      drawer.value = false
    }
    const confirmClick = () => {
      ElMessageBox.confirm(`Are you confirm to chose ${radio1.value} ?`)
        .then(() => {
          drawer.value = false
        })
        .catch(() => {
          // catch error
        })
    }
    return {
      drawer,
      direction,
      cancelClick,
      confirmClick,
      radio1
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/switchTheme.scss';

.toggle-settings {
  position: fixed;
  top: 50%;
  right: 0;
  border-radius: 0.25rem;
  box-shadow: none;
  transition: transform 0.3s ease;
  z-index: 998;

  >.el-button {
    @include bg_color('secondaryColor');
    box-shadow: none;
    border: none;
    height: 3rem;
    width: 3rem;
    padding: 0;
    text-align: center;
  }

  :deep(.el-overlay) {
    .el-drawer {
      @include bg_color('mainBodyColor');
    }
  }
}
</style>
