<template>
  <div>这是一个IoT Dashboard测试界面</div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
export default {
  name: 'Workflow',
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

</style>
