<template>
  <div>
    <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[100, 200, 300, 400]"
      :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
      :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import { ref, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
export default {
  name: 'Stepper',
  setup() {
    const state = reactive({})
    onBeforeMount(() => { })
    onMounted(() => { })

    const currentPage1 = ref(5)
    const currentPage2 = ref(5)
    const currentPage3 = ref(5)
    const currentPage4 = ref(4)
    const pageSize2 = ref(100)
    const pageSize3 = ref(100)
    const pageSize4 = ref(100)
    const small = ref(false)
    const background = ref(false)
    const disabled = ref(false)

    const handleSizeChange = (val) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`)
    }
    return {
      handleCurrentChange,
      handleSizeChange,
      currentPage1,
      currentPage2,
      currentPage3,
      currentPage4,
      pageSize2,
      pageSize3,
      pageSize4,
      small,
      background,
      disabled,
      ...toRefs(state),
    }
  },
}

</script>
<style scoped lang='scss'>

</style>
