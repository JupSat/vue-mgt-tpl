<template>
  <div class="toggle-settings">
    <el-button>
      <el-icon :size="20">
        <Setting />
      </el-icon>
    </el-button>
  </div>
</template>

<script>
export default {
  name: "Settings",
  setup() { },
};
</script>

<style scoped lang="scss">
.toggle-settings {
  position: fixed;
  top: 50%;
  right: 0;
  border-radius: 0.25rem;
  box-shadow: none;
  transition: transform .3s ease;
  z-index: 998;

  >.el-button {
    background: #fff;
    box-shadow: none;
    border: none;
    height: 3rem;
    width: 3rem;
    padding: 0;
    text-align: center;
  }
}
</style>
