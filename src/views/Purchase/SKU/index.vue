<!--
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-02 12:16:58
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-20 12:34:39
-->
<template>
  <div class="sku" :style="{ width: isCollapse ? '96.5vw' : '81.5vw' }">
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="skuName" placeholder="请输入sku名称" clearable></el-input>
        <el-button :color="'#626aef'" @click="getTableData" class="query">查询</el-button>
        <el-button :color="'#626aef'" @click="addEdit()">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table
      ref="vendorRef"
      v-loading="loading"
      :data="
        tableData.slice(
          (pagination.currentPage - 1) * pagination.pageSize,
          pagination.currentPage * pagination.pageSize
        )
      "
      :summary-method="getSummaries"
      show-summary
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
      <el-table-column :align="align" label="操作" width="180" fixed="right">
        <template v-slot="{ row }">
          <el-button type="success" :size="'small'" @click="viewDetail(row)">明细</el-button>
          <el-button type="primary" :size="'small'" plain @click="addEdit(row)">编辑</el-button>
          <el-button type="danger" :size="'small'" @click="deleteRow(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination @page-size-change="sizeChange" @current-change="currentChange" :pagination="pagination"></Pagination>

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

        <el-form ref="addEditForm" :model="formData" :rules="rules" :inline="true" label-width="100px">
          <el-form-item label="名称" prop="skuName">
            <el-input
              v-model="formData.skuName"
              autocomplete="on"
              :disabled="oprType === 'query'"
              style="width: 46vw !important"
            />
          </el-form-item>
          <el-form-item label="数量" prop="skuNum">
            <el-input-number
              v-model="formData.skuNum"
              :min="0"
              :precision="0"
              :size="'small'"
              controls-position="right"
              clearable
              style="width: 46vw !important"
            />
          </el-form-item>
          <el-form-item label="单位" prop="skuUnit">
            <el-select
              v-model="formData.skuUnit"
              placeholder="请选择单位"
              :disabled="oprType === 'query'"
              :size="'small'"
              clearable
              filterable
              style="width: 46vw !important"
            >
              <el-option
                v-for="item in selectList.unitList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="转化率" prop="conversionRate">
            <el-input-number
              v-model="formData.conversionRate"
              :min="0"
              :precision="2"
              :disabled="oprType === 'query'"
              :size="'small'"
              controls-position="right"
              clearable
              style="width: 46vw !important"
            />
          </el-form-item>
          <el-form-item label="可选价格" prop="optionalPrice">
            <el-input-number
              v-model="formData.optionalPrice"
              :min="0"
              :precision="2"
              :disabled="oprType === 'query'"
              :size="'small'"
              controls-position="right"
              clearable
              style="width: 46vw !important"
            />
          </el-form-item>
          <el-form-item label="含税单价" prop="unitPrice">
            <el-input-number
              v-model="formData.unitPrice"
              :min="0"
              :precision="2"
              :disabled="oprType === 'query'"
              :size="'small'"
              controls-position="right"
              clearable
              style="width: 46vw !important"
            />
          </el-form-item>
          <el-form-item label="含税金额" prop="amount">
            <el-input-number
              v-model="formData.amount"
              :min="0"
              :precision="2"
              :disabled="oprType === 'query'"
              :size="'small'"
              controls-position="right"
              clearable
              style="width: 46vw !important"
            />
          </el-form-item>
          <el-form-item label="备注" prop="note">
            <el-input
              v-model="formData.note"
              autocomplete="on"
              :disabled="oprType === 'query'"
              style="width: 46vw !important"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer" v-if="oprType !== 'query'">
            <el-button :size="'small'" @click="closeDialog">取 消</el-button>
            <el-button :size="'small'" type="primary" @click="submit">确 定</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SKU'
}
</script>
<script setup>
import { reactive, ref, toRefs, computed } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useCommonStore } from '@/pinia/modules/common'
import { getSkuInfo, addSkuInfo, editSkuInfo, delSkuInfo } from '@/api/purchase/sku'
import { message } from '@/utils/message'
import Pagination from '@/components/Pagination'
import { doSummaries } from '@/utils/common'

const commonStore = useCommonStore()
const isCollapse = computed(() => commonStore.isCollapse)

const data = reactive({
  dialogVisible: false,
  skuName: '',
  loading: false,
  tableFields: [
    {
      prop: 'skuName',
      label: '名称'
    },
    {
      prop: 'skuNum',
      label: '数量'
    },
    {
      prop: 'skuUnit',
      label: '单位'
    },
    {
      prop: 'conversionRate',
      label: '转化率'
    },
    {
      prop: 'optionalPrice',
      label: '可选价格'
    },
    {
      prop: 'unitPrice',
      label: '含税单价'
    },
    {
      prop: 'amount',
      label: '含税金额'
    },
    {
      prop: 'note',
      label: '备注'
    }
  ],
  tableData: [],
  selectList: {
    unitList: [
      { label: 'KG/公斤', value: 'kg' },
      { label: 'Box/盒', value: 'box' },
      { label: '无', value: '' }
    ]
  },
  pagination: {
    currentPage: 1,
    pageSize: 20,
    pageSizes: [10, 20, 50, 100],
    total: 0
  },
  title: '',
  oprType: '',
  formData: {
    id: null,
    skuName: '',
    skuNum: null,
    skuUnit: '',
    conversionRate: null,
    optionalPrice: null,
    unitPrice: null,
    amount: null,
    note: ''
  },
  align: 'center'
})

const rules = ref({
  skuName: [{ required: true, message: '请输入sku名称', trigger: 'blur' }]
})

const getTableData = () => {
  data.loading = true
  const params = {
    skuName: data.skuName,
    page: data.currentPage,
    pageSize: data.pageSize
  }
  getSkuInfo(params)
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

const setFormData = (row) => {
  Object.keys(data.formData).forEach((key) => {
    data.formData[key] = row[key]
  })
}

const viewDetail = (row) => {
  data.dialogVisible = true
  data.oprType = 'query'
  data.title = '明细'
  setFormData(row)
}

const addEdit = (row) => {
  if (!row || !row.id) {
    data.oprType = 'add'
    data.title = '新增Sku信息'

    Object.keys(data.formData).forEach((key) => {
      data.formData[key] = null
    })
  } else {
    data.oprType = 'edit'
    data.title = '修改Sku信息'
    setFormData(row)
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
      delSkuInfo({ id: row.id })
        .then((res) => {
          if (res && res.status === 200) {
            getTableData()
            message(res.msg)
          } else {
            message(res.msg)
          }
        })
        .catch(() => {
          message('删除失败！', 'warning')
        })
    })
    .catch(() => {})
}

const addEditForm = ref(null)

const closeDialog = () => {
  data.dialogVisible = false
  addEditForm.value.clearValidate()
}

const submit = async () => {
  addEditForm.value.validate(async (valid) => {
    if (valid) {
      if (data.oprType === 'add') {
        const res = await addSkuInfo([data.formData])
        if (res && res.status === 200) {
          message(res.msg)
          closeDialog()
          getTableData()
        }
      } else {
        const res = await editSkuInfo(data.formData)
        if (res && res.status === 200) {
          message(res.msg)
          closeDialog()
          getTableData()
        }
      }
    }
  })
}

const getSummaries = (param) => {
  const excludes = ['amount']
  return doSummaries(param, excludes)
}

const {
  skuName,
  loading,
  tableFields,
  selectList,
  tableData,
  pagination,
  dialogVisible,
  formData,
  title,
  oprType,
  align
} = toRefs(data)
</script>
<style scoped lang="scss">
.sku {
  .query {
    margin-left: 10px;
  }
  .el-input {
    width: 120px;
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
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
