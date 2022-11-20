<template>
  <div class="bread-crumb">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index" :to="{ path: item.path }">{{
          $t(translate(item))
      }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { toRefs, reactive, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'

export default {
  name: "Breadcrumb",
  setup() {
    const dataList = reactive({
      breadcrumbs: []
    })

    const route = useRoute()
    const getBreadcrumb = () => {
      const matched = route.matched.filter((item) => item.meta.title)
      dataList.breadcrumbs = matched.filter((item) => item.meta && item.meta.title)
    }

    const translate = (item) => {
      let name = item.name
      return name.replace(name[0], name[0].toLowerCase());
    }

    onMounted(() => {
      getBreadcrumb()
    })

    watch(route, () => {
      getBreadcrumb()
    })

    return {
      ArrowRight,
      ...toRefs(dataList),
      translate
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/switchTheme.scss";

.bread-crumb {
  width: 30px;
  height: 100px;
  padding: 25px 0 0px 34px;

  :deep(.el-breadcrumb__inner) {
    @include font_color("fontColor");
    font-size: 14px;
  }

  :deep(.el-breadcrumb__inner.is-link:hover) {
    @include font_color("hoverColor");
    color: #409EFF;
  }
}
</style>
