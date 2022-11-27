<template>
  <div>This is Workflow</div>
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
      ...toRefs(state)
    }
  }
}
</script>
<style scoped lang="scss">

</style>
