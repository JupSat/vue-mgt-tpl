<!--
 * @Description: 食材列表
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-08 10:16:58
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-09 21:39:27
-->
<template>
  <div class="ingredient-list" :style="{ width: isCollapse ? '96.5vw' : '81.5vw' }">
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="ingredientName" placeholder="请输入食材名" clearable></el-input>
        <el-select v-model="catalogId" placeholder="请选择分类" clearable filterable>
          <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
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
      <el-table-column :align="align" label="序号" prop="id" width="60" />
      <el-table-column :align="align" label="食材名称" prop="ingredientName" />
      <el-table-column :align="align" label="食材分类" prop="catalogId">
        <template #default="scope">
          <span>{{ translateParam(data.categoryList, scope.row.catalogId) }}</span>
        </template>
      </el-table-column>

      <el-table-column :align="align" label="图片" prop="ingredientImg">
        <template #default="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.ingredientImg"
            :fit="'cover'"
            :preview-src-list="[scope.row.ingredientImg]"
            :preview-teleported="true"
            :hide-on-click-modal="true"
          />
        </template>
      </el-table-column>
      <el-table-column :align="align" label="描述" prop="ingredientDesc" />
      <el-table-column :align="'center'" label="操作" width="175" fixed="right">
        <template v-slot="{ row }">
          <el-button type="success" size="small" @click="viewDetail(row)">明细</el-button>
          <el-button type="primary" size="small" plain @click="addEdit(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteIngredient(row)">删除</el-button>
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
          <h4>{{ title }}</h4>
        </template>
        <el-form ref="addEditForm" :model="formData" :rules="rules" :inline="true" label-width="80px">
          <el-form-item label="食材名称" prop="ingredientName">
            <el-input v-model="formData.ingredientName" autocomplete="on" :disabled="oprType === 'query'" clearable />
          </el-form-item>
          <el-form-item label="食材分类" prop="catalogId">
            <el-select
              v-model="formData.catalogId"
              placeholder="请选择分类"
              :size="size"
              clearable
              filterable
              style="width: 46vw !important"
            >
              <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="图片url" prop="ingredientImg">
            <el-input v-model="formData.ingredientImg" autocomplete="on" :disabled="oprType === 'query'" clearable />
          </el-form-item>
          <el-form-item label="描述" prop="ingredientDesc">
            <el-input v-model="formData.ingredientDesc" autocomplete="on" :disabled="oprType === 'query'" clearable />
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
  name: 'IngredientList'
}
</script>
<script setup>
import { reactive, ref, toRefs, computed } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useCommonStore } from '@/pinia/modules/common'
import { getIngredientList, addIngredient, editIngredient, delIngredient } from '@/api/purchase/ingredientList'
import { getCatalog } from '@/api/purchase/ingredientsCatalog'
import { message } from '@/utils/message'
import { translateParam } from '@/utils/common'

const commonStore = useCommonStore()
const isCollapse = computed(() => commonStore.isCollapse)

const data = reactive({
  dialogVisible: false,
  ingredientName: '',
  catalogId: null,
  categoryList: [],
  loading: false,
  align: 'center',
  tableFields: [
    {
      prop: 'id',
      label: '序号',
      width: 60
    },
    {
      prop: 'catalogId',
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
    ingredientName: '',
    catalogId: '',
    ingredientImg: '',
    ingredientDesc: ''
  }
})

const rules = ref({
  ingredientName: [{ required: true, message: '请输入食材名称', trigger: 'blur' }],
  catalogId: [{ required: true, message: '请输入分类', trigger: 'blur' }]
})

const getTableData = () => {
  data.loading = true
  const params = {
    ingredientName: data.ingredientName,
    catalogId: data.catalogId
  }
  getIngredientList(params)
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
  data.formData.ingredientName = row.ingredientName
  data.formData.catalogId = row.catalogId
  data.formData.id = row.id
  data.formData.ingredientImg = row.ingredientImg
  data.formData.ingredientDesc = row.ingredientDesc
}

const addEdit = (row) => {
  if (!row || !row.id) {
    data.oprType = 'add'
    data.title = '新增食材'
  } else {
    data.oprType = 'edit'
    data.title = '修改食材'
    data.formData.ingredientName = row.ingredientName
    data.formData.catalogId = row.catalogId
    data.formData.id = row.id
    data.formData.ingredientImg = row.ingredientImg
    data.formData.ingredientDesc = row.ingredientDesc
  }
  data.dialogVisible = true
}

const deleteIngredient = (row) => {
  ElMessageBox.confirm(`确定删除${row.ingredientName}这个食材吗?`, 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      delIngredient({ id: row.id })
        .then((res) => {
          if (res && res.status === 200) {
            message(res.msg)
            getTableData()
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
  data.formData.ingredientName = ''
  data.formData.catalogId = ''
}

const addEditForm = ref(null)
const submit = async () => {
  addEditForm.value.validate(async (valid) => {
    if (valid) {
      if (!data.formData.ingredientName) {
        message('食材名称不能为空！', 'warning')
        return
      }
      if (!data.formData.catalogId) {
        message('食材分类不能为空！', 'warning')
        return
      }
      const params = {
        catalogId: data.formData.catalogId,
        ingredientName: data.formData.ingredientName,
        ingredientImg: data.formData.ingredientImg,
        ingredientDesc: data.formData.ingredientDesc
      }
      if (data.oprType === 'add') {
        const res = await addIngredient([params])
        if (res && res.status === 200) {
          message(res.msg)
          closeDialog()
          getTableData()
        }
      } else {
        params.id = data.formData.id
        const res = await editIngredient(params)
        if (res && res.status === 200) {
          message(res.msg)
          closeDialog()
          getTableData()
        }
      }
    }
  })
}

const getAllCatalog = () => {
  getCatalog({ ingredientCategory: '' })
    .then((res) => {
      const records = res.result || []
      data.categoryList = records.map((item) => {
        const option = {
          label: item.ingredientCategory,
          value: item.id
        }
        return option
      })
    })
    .catch(() => {
      message('获取分类下拉参数失败！', 'warning')
    })
}
getAllCatalog()

const {
  ingredientName,
  catalogId,
  categoryList,
  loading,
  align,
  tableData,
  pagination,
  dialogVisible,
  formData,
  title,
  oprType
} = toRefs(data)
</script>
<style scoped lang="scss">
.ingredient-list {
  .query {
    margin-left: 10px;
  }
  .el-input {
    width: 110px;
  }

  .el-select {
    width: 120px;
    margin-left: 2px;
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

.edit-catalogId {
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
