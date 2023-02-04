<!--
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-02 12:16:58
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-04 20:41:26
-->
<template>
  <div class="purchase-records" :style="{ width: isCollapse ? '96.5vw' : '81.5vw' }">
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="foodName" placeholder="请输入食材名"></el-input>
        <el-date-picker v-model="purchaseDate" type="date" placeholder="请选择日期" class="purchase-date" />
        <el-button :color="'#626aef'" @click="query" class="query">查询</el-button>
        <el-button :color="'#626aef'" @click="addEdit()">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table ref="purchaseRecordsRef" v-loading="loading" :data="tableData" max-height="510px" stripe>
      <el-table-column :align="align" label="食材名" prop="foodName" />
      <el-table-column :align="align" label="数量" prop="num" />
      <el-table-column :align="align" label="花费" prop="cost" />
      <el-table-column :align="align" label="操作" width="175" fixed="right">
        <template v-slot="{ row }">
          <el-button type="success" size="small" @click="viewDetail(row)">查看</el-button>
          <el-button type="primary" size="small" plain @click="addEdit(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteRow(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-separate">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[50, 100, 150, 200]"
        :small="'small'"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
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
          <el-divider />
        </template>

        <el-form
          ref="addEditForm"
          :model="formData"
          :rules="rules"
          :inline="true"
          label-width="100px"
          v-loading="foodsLoading"
        >
          <!-- 日期、食材名称、食材分类、单位、数量、单价、预算、采购量、采购价、花费、备注摘要、毛利、采购人 -->
          <el-form-item label="日期" prop="purchaseDate">
            <el-input v-model="formData.purchaseDate" autocomplete="on" :disabled="oprType === 'query'" />
          </el-form-item>
          <el-form-item label="食材" prop="foodName">
            <el-input v-model="formData.foodName" autocomplete="on" :disabled="oprType === 'query'" />
          </el-form-item>
          <el-form-item label="分类" prop="foodCatalog">
            <el-input v-model="formData.foodCatalog" autocomplete="on" :disabled="oprType === 'query'" />
          </el-form-item>
          <el-form-item label="单位" prop="unit">
            <el-input v-model="formData.unit" autocomplete="on" :disabled="oprType === 'query'" />
          </el-form-item>
          <el-form-item label="数量" prop="num">
            <el-input v-model="formData.num" autocomplete="on" :disabled="oprType === 'query'" />
          </el-form-item>
          <el-form-item label="预算" prop="budget">
            <el-input v-model="formData.budget" autocomplete="on" :disabled="oprType === 'query'" />
          </el-form-item>
          <el-form-item label="采购量" prop="purchaseVolume">
            <el-input v-model="formData.purchaseVolume" autocomplete="on" :disabled="oprType === 'query'" />
          </el-form-item>
          <el-form-item label="采购价" prop="purchasePrice">
            <el-input v-model="formData.purchasePrice" autocomplete="on" :disabled="oprType === 'query'" />
          </el-form-item>

          <el-form-item label="花费" prop="cost">
            <el-input v-model="formData.cost" autocomplete="on" :disabled="oprType === 'query'" />
          </el-form-item>

          <el-form-item label="毛利" prop="grossProfit">
            <el-input v-model="formData.grossProfit" autocomplete="on" :disabled="oprType === 'query'" />
          </el-form-item>

          <el-form-item label="采购人" prop="purchaser">
            <el-input v-model="formData.purchaser" autocomplete="on" :disabled="oprType === 'query'" />
          </el-form-item>

          <el-form-item label="备注" prop="note">
            <el-input v-model="formData.note" autocomplete="on" :disabled="oprType === 'query'" />
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
  name: 'PurchaseRecords'
}
</script>
<script setup>
import { reactive, ref, toRefs, computed } from 'vue'
import { ElMessageBox } from 'element-plus'

import { useCommonStore } from '@/pinia/modules/common'
import { getSkuInfo, addSkuInfo, editSkuInfo, delSkuInfo } from '@/api/purchase/sku'

import { message } from '@/utils/message'
const commonStore = useCommonStore()
const isCollapse = computed(() => commonStore.isCollapse)

const data = reactive({
  dialogVisible: false,
  foodName: '',
  purchaseDate: '',
  loading: false,
  tableData: [],
  selection: [],
  currentPage: 1,
  pageSize: 50,
  total: 0,
  title: '',
  oprType: '',
  formData: {
    purchaseDate: '',
    foodName: '',
    foodCatalog: '',
    unit: '',
    num: '',
    budget: '',
    purchaseVolume: '',
    purchasePrice: '',
    cost: '',
    grossProfit: '',
    purchaser: '',
    note: ''
  }
})

const rules = ref({
  skuName: [{ required: true, message: '请输入sku名称', trigger: 'blur' }]
})

const query = () => {
  data.loading = true
  const params = {
    catalog: data.catalog,
    page: data.currentPage,
    pageSize: data.pageSize
  }
  getSkuInfo(params)
    .then((res) => {
      data.tableData = res.records || []
      data.total = res.total
    })
    .finally(() => {
      data.total = 100
      data.loading = false
    })
}
const sizeChange = (size) => {
  data.pageSize = size
  query()
}
const currentChange = (page) => {
  data.currentPage = page
  query()
}

const viewDetail = (row) => {
  data.dialogVisible = true
  data.oprType = 'query'
  data.title = '查看'
  data.formData.skuName = row.skuName
  data.formData.price = row.price
  data.formData.img = row.img
  data.formData.note = row.note
}

const addEdit = (row) => {
  if (!row || !row.id) {
    data.oprType = 'add'
    data.title = '新增Sku信息'
  } else {
    data.oprType = 'edit'
    data.title = '修改Sku信息'
    data.formData.catalog = row.catalog
    data.formData.code = row.code
  }
  data.dialogVisible = true
}

const deleteRow = (row) => {
  ElMessageBox.confirm(`确定删除${row.skuName}这个Sku信息吗? `, 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      delSkuInfo(row.id)
        .then((res) => {
          if (res) {
            message('删除Sku信息成功！')
          }
        })
        .catch(() => {
          message('删除Sku信息失败！', 'warning')
        })
    })
    .catch(() => {})
}

const addEditForm = ref(null)

const closeDialog = () => {
  data.dialogVisible = false
  data.formData.catalogEditable = true
  addEditForm.value.clearValidate()
}

for (let i = 0; i < 100; i++) {
  data.tableData.push({
    id: i + 1,
    purchaseDate: '日期' + (i + 1),
    foodName: '食材' + (i + 1),
    num: i + 1,
    cost: i + 1
  })
}
const submit = async () => {
  addEditForm.value.validate(async (valid) => {
    if (valid) {
      if (data.operate === 'add') {
        const res = await addSkuInfo(data.formData)
        if (res.code === 0) {
          message('添加成功！')
        }
      } else {
        const params = {
          foodName: '',
          catalogId: ''
        }
        const res = await editSkuInfo(params)
        if (res.code === 0) {
          message('修改成功！')
        }
      }
    }
  })
}

const align = 'center'
const {
  foodName,
  purchaseDate,
  loading,
  tableData,
  currentPage,
  pageSize,
  dialogVisible,
  formData,
  total,
  title,
  oprType,
  foodsLoading
} = toRefs(data)
</script>
<style scoped lang="scss">
.purchase-records {
  .query {
    margin-left: 10px;
  }
  .el-input {
    width: 110px;
  }
  .purchase-date {
    ::v-deep(.el-date-editor.el-input__wrapper) {
      width: 115px !important;
    }
  }
}

// ::v-deep(.el-date-editor.el-input__wrapper) {
//   width: 115px;
// }

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
</style>
