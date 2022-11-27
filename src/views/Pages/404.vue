<template>
  <div class="page-404">
    <div class="go-home">
      <el-link href="#" :underline="false">Let's go home</el-link>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'

export default {
  setup() {
    const state = reactive({})
    onBeforeMount(() => { })
    onMounted(() => { })
    return {
      ...toRefs(state)
    }
  }
}
</script>
<style scoped lang="scss">
.page-404 {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('~@/assets/img/page404.webp');

  .go-home {
    position: absolute;
    width: 350px;
    height: 50px;
    top: calc(50% - 125px);
    right: calc(50% - 500px);

    .el-link {
      font-size: 30px;
      color: #cce7f8;
      text-decoration: underline;
      -webkit-animation: shining 0.5s alternate infinite;
      animation: shining 1.5s alternate infinite;

      &:hover {
        color: #409eff;
      }
    }
  }
}

@-webkit-keyframes shining {
  from {
    text-shadow: 0 0 10px lightblue, 0 0 20px lightblue, 0 0 30px lightblue,
      0 0 40px skyblue, 0 0 50px skyblue, 0 0 60px skyblue;
  }

  to {
    text-shadow: 0 0 5px lightblue, 0 0 10px lightblue, 0 0 15px lightblue,
      0 0 20px skyblue, 0 0 25px skyblue, 0 0 30px skyblue;
  }
}

@keyframes shining {
  from {
    text-shadow: 0 0 10px lightblue, 0 0 20px lightblue, 0 0 30px lightblue,
      0 0 40px skyblue, 0 0 50px skyblue, 0 0 60px skyblue;
  }

  to {
    text-shadow: 0 0 5px lightblue, 0 0 10px lightblue, 0 0 15px lightblue,
      0 0 20px skyblue, 0 0 25px skyblue, 0 0 30px skyblue;
  }
}
</style>
