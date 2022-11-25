<template>
  <div class="page-404">
    <div></div>
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
      ...toRefs(state),
    }
  },
}

</script>
<style scoped lang='scss'>
.page-404 {
  width: 100%;
  height: 100%;
  background: url("~@/assets/img/page404.webp");
}
</style>
