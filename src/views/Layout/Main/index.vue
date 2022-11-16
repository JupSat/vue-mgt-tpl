<template>
  <el-container>
    <el-main class="main-layout">
      <el-scrollbar>
        <div class="main-body">
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
export default {
  name: "Main",
  setup() {
    const router = useRouter()
    const switchView = (path) => {
      router.push({ path: path })
    }
    return {
      switchView
    };
  },
};
</script>

<style scoped lang="scss">
.main-layout {
  padding: 0;

  .main-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;

    background-color: #151a30;
    color: #fff;
    font-family: Open Sans, sans-serif;
    font-size: 0.9375rem;
    font-weight: 400;
    line-height: 1.25rem;
    min-height: 100vh;

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
      color: #fff;
      background-color: #192038;
      font-size: 0.9375rem;
      font-weight: 600;
      line-height: 1.5rem;
    }
  }
}
</style>
