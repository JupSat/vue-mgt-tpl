<!--
 * @Description: 食材分类
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-02 12:16:58
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-11 09:54:40
-->
<template>
  <div class="ingredient-catalog" :style="{ width: isCollapse ? '96.5vw' : '81.5vw' }">
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="ingredientCategory" placeholder="请输入分类" clearable></el-input>
        <el-button :color="'#626aef'" @click="getTableData" class="query">查询</el-button>
        <el-button :color="'#626aef'" @click="addEdit()">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table
      ref="ingredientsRef"
      v-loading="loading"
      :data="
        tableData.slice(
          (pagination.currentPage - 1) * pagination.pageSize,
          pagination.currentPage * pagination.pageSize
        )
      "
      :max-height="450"
      stripe
    >
      <el-table-column type="index" width="60" label="序号" :align="'center'" />
      <el-table-column
        v-for="item in tableFields"
        :key="item.prop"
        :align="'center'"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
      />

      <el-table-column :align="'center'" label="操作" width="175" fixed="right">
        <template v-slot="{ row }">
          <el-button type="success" size="small" @click="viewDetail(row)">明细</el-button>
          <el-button type="primary" size="small" plain @click="addEdit(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteCatalog(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-separate">
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

    <div class="add-edit-form">
      <el-dialog
        v-model="dialogVisible"
        :before-close="closeDialog"
        :fullscreen="true"
        draggable
        :append-to-body="true"
        align-center
      >
        <template #header>
          <div>
            <h4>{{ title }}</h4>
          </div>
        </template>
        <el-form ref="addEditForm" :model="formData" :rules="rules" :inline="true" label-width="80px">
          <el-form-item label="分类" prop="ingredientCategory">
            <el-input v-model="formData.ingredientCategory" autocomplete="on" :disabled="oprType === 'query'" />
          </el-form-item>
          <el-form-item label="码值" prop="label">
            <div class="edit-ingredient-category">
              <el-input v-model="formData.code" autocomplete="on" :disabled="oprType === 'query'" />
            </div>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer" v-if="oprType !== 'query'">
            <el-button size="small" @click="closeDialog">取 消</el-button>
            <el-button size="small" type="primary" @click="submit">确 定</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IngredientClassification'
}
</script>
<script setup>
import { reactive, ref, toRefs, computed } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useCommonStore } from '@/pinia/modules/common'
import { getCatalog, addCatalog, editCatalog, delCatalog } from '@/api/purchase/ingredientsCatalog'

import { message } from '@/utils/message'
const commonStore = useCommonStore()
const isCollapse = computed(() => commonStore.isCollapse)

const data = reactive({
  dialogVisible: false,
  ingredientCategory: '',
  loading: false,
  tableFields: [
    {
      prop: 'ingredientCategory',
      label: '分类'
    },
    {
      prop: 'code',
      label: '码值'
    }
  ],
  tableData: [],
  selection: [],
  pagination: {
    currentPage: 1,
    pageSize: 20,
    pageSizes: [10, 20, 50, 100],
    total: 0
  },
  title: '',
  oprType: '',
  formData: {
    id: 0,
    ingredientCategory: '',
    code: ''
  }
})

const rules = ref({
  ingredientCategory: [{ required: true, message: '请输入分类', trigger: 'blur' }],
  code: [{ required: true, message: '请输入码值', trigger: 'blur' }]
})

const getTableData = () => {
  data.loading = true
  const params = {
    ingredientCategory: data.ingredientCategory
  }
  getCatalog(params)
    .then((res) => {
      const records = res.result || []
      data.tableData = records
      data.pagination.total = records.length
    })
    .catch(() => {
      message('查询失败！', 'warning')
    })
    .finally(() => {
      data.loading = false
    })
}

getTableData()

const sizeChange = (size) => {
  data.pagination.currentPage = 1
  data.pagination.pageSize = size
  getTableData()
}
const currentChange = (page) => {
  data.pagination.currentPage = page
  getTableData()
}

const viewDetail = (row) => {
  data.dialogVisible = true
  data.oprType = 'query'
  data.title = '明细'
  data.formData.ingredientCategory = row.ingredientCategory
  data.formData.code = row.code
}

const addEdit = (row) => {
  if (!row || !row.id) {
    data.oprType = 'add'
    data.title = '新增分类'
  } else {
    data.oprType = 'edit'
    data.title = '修改分类'
    data.formData.id = row.id
    data.formData.ingredientCategory = row.ingredientCategory
    data.formData.code = row.code
  }
  data.dialogVisible = true
}

const deleteCatalog = (row) => {
  ElMessageBox.confirm(`确定删除${row.ingredientCategory}这个分类吗?`, 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      delCatalog({ id: row.id })
        .then((res) => {
          const { status = null } = res
          if (status === 200) {
            message(res.msg)
            getTableData()
          } else {
            message(res.msg, 'warning')
          }
        })
        .catch(() => {
          message('删除失败！', 'warning')
        })
    })
    .catch(() => {})
}

const closeDialog = () => {
  data.dialogVisible = false
  data.formData.ingredientCategory = ''
  data.formData.code = ''
}

const addEditForm = ref(null)
const submit = async () => {
  addEditForm.value.validate(async (valid) => {
    if (valid) {
      const params = {
        ingredientCategory: data.formData.ingredientCategory,
        code: data.formData.code,
        redundancy: ''
      }

      params.id = data.oprType === 'add' ? '' : data.formData.id
      const doFunction = data.oprType === 'add' ? addCatalog([params]) : editCatalog(params)
      const res = await doFunction
      const { status = null } = res
      if (status === 200) {
        message(res.msg)
        closeDialog()
        getTableData()
      } else {
        message(res.msg, 'warning')
      }
    }
  })
}

const { ingredientCategory, loading, tableFields, tableData, pagination, dialogVisible, formData, title, oprType } =
  toRefs(data)
</script>
<style scoped lang="scss">
.ingredient-catalog {
  .query {
    margin-left: 10px;
  }
  .el-input {
    width: 100px;
  }
}

.page-separate {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.el-table {
  .el-button + .el-button {
    margin-left: 1px;
  }
}

.add-edit-form {
  .el-divider--horizontal {
    margin: 10px 0;
  }
}

.edit-ingredient-category {
  display: flex;
  align-items: center;
  .el-button {
    margin-left: 1px;
  }
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
