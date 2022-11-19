<template>
  <div class="bread-crumb">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index" :to="{ path: item.path }">{{ $t(item.name)
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
      breadcrumbs: [{
        name: "eCommerce",
        path: "/eCommerce"
      }, {
        name: "测试路径一",
        path: "/test1"
      }, {
        name: "测试路径二",
        path: "/test2"
      }]
    })

    const route = useRoute()
    const getBreadcrumb = () => {

    }

    onMounted(() => {
      getBreadcrumb()
    })

    watch(route, () => {
      getBreadcrumb()
    })

    return {
      ArrowRight,
      ...toRefs(dataList)
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
