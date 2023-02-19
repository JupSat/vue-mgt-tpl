<!--
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-01-10 19:48:03
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-19 11:14:45
-->
<template>
  <div class="bread-crumb">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index" :to="{ path: item.path }">
        {{ $t(firstCharChange(item)) }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb'
}
</script>

<script setup>
import { toRefs, reactive, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'

const dataList = reactive({
  breadcrumbs: []
})

const route = useRoute()
const getBreadcrumb = () => {
  const matched = route.matched.filter((item) => item.meta.title)
  dataList.breadcrumbs = matched.filter((item) => item.meta && item.meta.title)
}

const firstCharChange = (item) => {
  if (item.name === 'SKU') return item.name.toLowerCase()
  const [char] = item.name
  return item.name.replace(char, char.toLowerCase())
}

onMounted(() => {
  getBreadcrumb()
})

watch(route, () => {
  getBreadcrumb()
})

const { breadcrumbs } = toRefs(dataList)
</script>

<style scoped lang="scss">
@import '@/styles/switchTheme.scss';

.bread-crumb {
  display: flex;
  padding: 10px 0 3px 0;

  :deep(.el-breadcrumb__inner) {
    @include font_color('fontColor');
    font-size: 14px;
  }

  :deep(.el-breadcrumb__inner.is-link:hover) {
    @include font_color('hoverColor');
    color: #409eff;
  }
}
</style>
