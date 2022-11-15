<template>
  <el-container>
    <el-main class="main-layout">
      <el-scrollbar>
        <div class="main-body">
        </div>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Main",
  setup() { },
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
  }
}
</style>
