<template>
  <div class="page-separation">
    <el-pagination
      v-model:current-page="pagination.currentPage"
      v-model:page-size="pagination.pageSize"
      :page-sizes="pagination.pageSizes"
      :small="'small'"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      @size-change="sizeChange"
      @current-change="currentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination'
}
</script>

<script setup>
import { defineProps, toRefs, defineEmits } from 'vue'

const props = defineProps({
  pagination: {
    type: Object,
    default() {
      return {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50, 100],
        total: 0
      }
    }
  }
})

const emit = defineEmits(['currentChange', 'pageSizeChange'])

const sizeChange = (size) => {
  emit('pageSizeChange', size)
}
const currentChange = (page) => {
  emit('currentChange', page)
}

const { pagination } = toRefs(props)
</script>

<style scoped lang="scss">
.page-separation {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
