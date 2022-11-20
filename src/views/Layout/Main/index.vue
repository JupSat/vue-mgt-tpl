<template>
  <el-container>
    <el-main class="main-layout">
      <el-scrollbar>
        <div class="main-body">
          <Breadcrumb class="main-breadcrumb"></Breadcrumb>
          <div class="main-container">
            <div class="main-content">
              <router-view />
            </div>
          </div>
        </div>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script>
import { useRouter } from 'vue-router'
import Breadcrumb from "@/views/Layout/Breadcrumb";

export default {
  name: "Main",
  components: {
    Breadcrumb
  },
  setup() {
    const router = useRouter()
    const switchView = (name) => {
      router.push({ name })
    }
    return {
      switchView,
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/switchTheme.scss";

.main-layout {
  padding: 0;

  .main-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;
    @include bg_color("mainBodyColor");
    @include font_color("fontColor");
    font-family: Open Sans, sans-serif;
    font-size: 0.9375rem;
    font-weight: 400;
    line-height: 1.25rem;
    min-height: 100vh;

    .main-breadcrumb {
      width: 100%;
      height: 30px;
    }

    .main-container {
      display: flex;
      flex: 1;
      flex-direction: row;
      width: 100%;

      .main-content {
        order: 1;
        flex: 1 0;
        min-width: 0;
        padding: 2.25rem 2.25rem 0.75rem;
      }
    }
  }

  :deep(.el-input__wrapper) {
    padding: 0;

    .el-input__inner {
      border-radius: 3px;
      border-color: #101426;
      @include font_color("fontColor");
      @include bg_color("mainColor");
      font-size: 14px;
      font-weight: 400;
    }
  }
}
</style>
