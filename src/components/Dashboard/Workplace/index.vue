<template>
  <div>This is Workplace</div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
export default {
  name: 'Workplace',
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
