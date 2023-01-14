<template>
  <div class="language">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ language === 'zh' ? $t('langZh') : $t('langEn') }}
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh">{{ $t('langZh') }}</el-dropdown-item>
          <el-dropdown-item command="en">{{ $t('langEn') }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'Language'
}
</script>

<script setup>
import { reactive, toRefs, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCommonStore } from '@/pinia/modules/common'

const data = reactive({
  language: 'zh'
})

// 语言切换
const { locale } = useI18n()
const commonStore = useCommonStore()
const handleCommand = (command) => {
  data.language = command
  locale.value = data.language
  commonStore.setLanguage(data.language)
}

onMounted(() => {
  handleCommand(commonStore.language)
})

const { language } = toRefs(data)
</script>

<style scoped lang="scss">
.language {
  display: flex;

  .el-dropdown {
    font-size: 12px;
  }

  .el-dropdown-link {
    display: flex;
    align-items: center;
    color: var(--el-color-primary);
    cursor: pointer;
  }
}
</style>
