<!--
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-02 12:16:58
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-15 23:59:25
-->
<template>
  <div class="purchase-records" :style="{ width: isCollapse ? '96.5vw' : '81.5vw' }">
    <el-form :inline="true">
      <el-form-item>
        <el-select
          v-model="ingredientId"
          placeholder="请选择食材名"
          :disabled="oprType === 'query'"
          clearable
          filterable
        >
          <el-option
            v-for="item in selectList.ingredientIdList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-date-picker
          v-model="purchaseDate"
          type="date"
          placeholder="请选择日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
        <el-button :color="'#626aef'" @click="getTableData" class="query">查询</el-button>
        <el-button :color="'#626aef'" @click="addEdit()" class="query">添加</el-button>
        <!-- <el-button @click="importData" class="query">导入</el-button> -->
        <el-upload
          class="upload"
          action="#"
          :show-file-list="false"
          :on-change="importData"
          accept="'.xlsx'"
          :auto-upload="false"
          :headers="headers"
        >
          <el-button class="query">导入</el-button>
        </el-upload>
        <el-button @click="exportData" class="query">导出</el-button>
      </el-form-item>
    </el-form>

    <el-table
      ref="purchaseRecordsRef"
      v-loading="loading"
      :data="tableData"
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
      >
        <template v-slot="{ row }">
          <span v-if="['ingredientId', 'ingredientCatalogId', 'vendor', 'unit', 'purchaser'].includes(item.prop)">
            {{ translateParam(data.selectList[item.prop + 'List'], row[item.prop]) }}
          </span>
          <span v-else>{{ row[item.prop] }}</span>
        </template>
      </el-table-column>

      <el-table-column :align="'center'" label="操作" :width="colWidth" fixed="right">
        <template v-slot="{ row }">
          <el-button type="success" :size="btSize" :text="isText" @click="viewDetail(row)">明细</el-button>
          <el-button type="primary" :size="btSize" :text="isText" plain @click="addEdit(row)">编辑</el-button>
          <el-button type="danger" :size="btSize" :text="isText" @click="deleteRow(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination @page-size-change="sizeChange" @current-change="currentChange" :pagination="pagination"></Pagination>

    <div class="add-edit-form" v-if="dialogVisible">
      <AddPurchaseRecord
        :selectList="selectList"
        :dialogVisible="dialogVisible"
        :oprType="oprType"
        :title="title"
        :rowData="rowData"
        @on-close-dialog="closeDialog"
      ></AddPurchaseRecord>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PurchaseRecords'
}
</script>
<script setup>
import { reactive, toRefs, computed } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useCommonStore } from '@/pinia/modules/common'
import {
  getPurchaseRecords,
  delPurchaseRecord,
  importPurchaseRecord,
  exportPurchaseRecord
} from '@/api/purchase/purchaseRecords'
import { getIngredientList } from '@/api/purchase/ingredientList'
import { getVendors } from '@/api/purchase/vendor'
import { message } from '@/utils/message'
import { getCatalog } from '@/api/purchase/ingredientsCatalog'
import { getPurchasers } from '@/api/purchase/purchaser'
import { isMobileTerminal, translateParam } from '@/utils/common'
import Pagination from '@/components/Pagination'
import AddPurchaseRecord from './Widgets/AddPurchaseRecord'

const commonStore = useCommonStore()
const isCollapse = computed(() => commonStore.isCollapse)

const data = reactive({
  dialogVisible: false,
  ingredientId: null,
  purchaseDate: '',
  size: 'small',
  loading: false,
  tableData: [],
  tableFields: [
    {
      prop: 'purchaseDate',
      label: '日期',
      width: 115
    },
    {
      prop: 'ingredientId',
      label: '食材名'
    },
    {
      prop: 'ingredientCatalogId',
      label: '分类'
    },
    {
      prop: 'unit',
      label: '单位'
    },
    {
      prop: 'num',
      label: '数量'
    },
    {
      prop: 'unitPrice',
      label: '单价'
    },
    {
      prop: 'budgetary',
      label: '预算'
    },
    {
      prop: 'purchaseNum',
      label: '采购量'
    },
    {
      prop: 'purchasePrice',
      label: '采购价'
    },
    {
      prop: 'purchaseCost',
      label: '花费'
    },
    {
      prop: 'grossProfit',
      label: '毛利'
    },
    {
      prop: 'vendor',
      label: '供应商'
    },
    {
      prop: 'purchaser',
      label: '采购人'
    },
    {
      prop: 'note',
      label: '备注'
    }
  ],
  selection: [],
  pagination: {
    currentPage: 1,
    pageSize: 20,
    pageSizes: [10, 20, 50, 100],
    total: 0
  },
  title: '',
  oprType: '',
  selectList: {
    ingredientIdList: [],
    ingredientCatalogIdList: [],
    unitList: [
      { label: 'KG/公斤', value: 'kg' },
      { label: 'Box/盒', value: 'box' },
      { label: '无', value: '' }
    ],
    vendorList: [],
    purchaserList: []
  },
  formData: {
    purchaseDate: '',
    ingredientId: '',
    ingredientCatalogId: '',
    unit: '',
    num: 0,
    unitPrice: 0,
    budgetary: 0,
    purchaseNum: 0,
    purchasePrice: 0,
    purchaseCost: 0,
    grossProfit: 0,
    vendor: '',
    purchaser: '',
    note: ''
  },
  rowData: null,
  headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' }
})

const btSize = computed(() => (isMobileTerminal() ? 'small' : 'default'))
const isText = computed(() => !isMobileTerminal())
const colWidth = computed(() => (isMobileTerminal() ? '175' : '200'))

const getTableData = () => {
  data.loading = true
  const params = {
    ingredientId: data.ingredientId,
    purchaseDate: data.purchaseDate,
    pageNum: data.pagination.currentPage,
    pageSize: data.pagination.pageSize
  }
  getPurchaseRecords(params)
    .then((res) => {
      const { records = [], total = 0 } = res.result || []
      data.tableData = records
      data.pagination.total = total
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
  data.rowData = row
}

const addEdit = (row) => {
  if (!row || !row.id) {
    data.oprType = 'add'
    data.title = '新增采购记录'
    data.rowData = null
  } else {
    data.oprType = 'edit'
    data.title = '修改采购记录'
    data.rowData = row
  }
  data.dialogVisible = true
}
const deleteRow = (row) => {
  ElMessageBox.confirm(`确定删除${row.ingredientId}这条采购记录吗? `, 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const res = await delPurchaseRecord({ id: row.id })
      if (res && res.status === 200) {
        getTableData()
        message(res.msg)
      } else {
        message(res.msg)
      }
    })
    .catch(() => {})
}
const getAllIngredient = () => {
  getIngredientList({ ingredientName: '', catalogId: '' })
    .then((res) => {
      const records = res.result || []
      data.selectList.ingredientIdList = records.map((item) => {
        const option = {
          label: item.ingredientName,
          value: item.id,
          catalogId: item.catalogId
        }
        return option
      })
    })
    .catch(() => {
      message('获取食材下拉参数失败！', 'warning')
    })
}

const getSummaries = (param) => {
  const { columns, data } = param
  const sums = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '合计'
      return
    }
    if (!['budgetary', 'purchaseCost', 'grossProfit'].includes(column.property)) {
      sums[index] = ''
      return
    }
    const values = data.map((item) => Number(item[column.property]))
    if (!values.every((value) => Number.isNaN(value))) {
      const tempTotal = `${values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!Number.isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)}`
      sums[index] = Number(tempTotal).toFixed(2)
    } else {
      sums[index] = ''
    }
  })

  return sums
}

const closeDialog = () => {
  data.dialogVisible = false
  getTableData()
}

const getAllCatalog = () => {
  getCatalog({ ingredientCategory: '' })
    .then((res) => {
      const records = res.result || []
      data.selectList.ingredientCatalogIdList = records.map((item) => {
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

const getAllVendor = () => {
  getVendors({ name: '' })
    .then((res) => {
      const records = res.result || []
      data.selectList.vendorList = records.map((item) => {
        const option = {
          label: item.name,
          value: item.id
        }
        return option
      })
    })
    .catch(() => {
      message('获取供应商下拉参数失败！', 'warning')
    })
}

const getAllPurchaserInfo = () => {
  getPurchasers()
    .then((res) => {
      const records = res.result || []
      data.selectList.purchaserList = records.map((item) => {
        const option = {
          label: item.purchaserName,
          value: item.purchaserId
        }
        return option
      })
    })
    .catch(() => {
      message('获取采购人下拉参数失败！', 'warning')
    })
}

getAllIngredient()
getAllCatalog()
getAllVendor()
getAllPurchaserInfo()

const importData = (file) => {
  let formData = new FormData()
  formData.append('file', file.raw)
  importPurchaseRecord(formData)
    .then((res) => {
      if (res && res.status === 200) {
        message('导入成功')
        getTableData()
      } else {
        message('导入失败', 'warning')
      }
    })
    .catch(() => {
      message('导入失败', 'warning')
    })
}

const exportData = () => {
  exportPurchaseRecord()
}

const {
  ingredientId,
  purchaseDate,
  selectList,
  loading,
  tableData,
  tableFields,
  pagination,
  dialogVisible,
  oprType,
  rowData,
  title,
  headers
} = toRefs(data)
</script>
<style scoped lang="scss">
.purchase-records {
  .query {
    margin-left: 10px;
  }
  .el-input {
    width: 115px;
  }
  .el-select {
    width: 128px;
    margin-left: 2px;
  }
}

::v-deep(.el-date-editor) {
  width: 130px;
  margin-left: 1px;
}

.el-table {
  .el-button + .el-button {
    margin-left: 1px;
  }
}

.el-button.is-circle {
  border-radius: 50%;
}

.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
