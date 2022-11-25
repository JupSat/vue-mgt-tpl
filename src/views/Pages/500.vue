<template>
  <div>这是500</div>
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

</style>
