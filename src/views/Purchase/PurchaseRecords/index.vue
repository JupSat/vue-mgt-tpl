<!--
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-02 12:16:58
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-10 17:39:04
-->
<template>
  <div class="purchase-records" :style="{ width: isCollapse ? '96.5vw' : '81.5vw' }">
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="ingredientId" placeholder="请输入食材名" clearable></el-input>
        <el-date-picker
          v-model="purchaseDate"
          type="date"
          placeholder="请选择日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
        <el-button :color="'#626aef'" @click="getTableData" class="query">查询</el-button>
        <el-button :color="'#626aef'" @click="addEdit()" class="query">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table
      ref="purchaseRecordsRef"
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
      >
        <template v-slot="{ row }">
          <span v-if="['ingredientId', 'ingredientCatalogId', 'vendor', 'unit', 'purchaser'].includes(item.prop)">
            {{ translateParam(data.selectList[item.prop + 'List'], row[item.prop]) }}
          </span>
          <span v-else>{{ row[item.prop] }}</span>
        </template>
      </el-table-column>

      <el-table-column :align="'center'" label="操作" width="175" fixed="right">
        <template v-slot="{ row }">
          <el-button type="success" size="small" @click="viewDetail(row)">明细</el-button>
          <el-button type="primary" size="small" plain @click="addEdit(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteRow(row)">删除</el-button>
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
        class="add-edit-dialog"
      >
        <template #header>
          <h4>{{ title }}</h4>
        </template>

        <el-form
          ref="addEditForm"
          :model="formData"
          :rules="rules"
          :inline="true"
          label-width="100px"
          v-loading="purchaseRecordsLoading"
          style="margin-top: -22px"
        >
          <!-- 日期、食材名称、食材分类、单位、数量、单价、预算、采购量、采购价、花费、备注摘要、毛利、供应商、采购人 -->
          <el-form-item label="日期" prop="purchaseDate">
            <el-date-picker
              v-model="formData.purchaseDate"
              type="date"
              placeholder="请选择日期"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="oprType === 'query'"
              :size="size"
              style="width: 48vw !important"
            />
          </el-form-item>
          <el-form-item label="食材名称" prop="ingredientId">
            <el-select
              v-model="formData.ingredientId"
              placeholder="请选择食材名称"
              :disabled="oprType === 'query'"
              :size="size"
              style="width: 48vw !important"
              clearable
              filterable
              @change="changeIngredient()"
            >
              <el-option
                v-for="item in selectList.ingredientIdList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="分类" prop="ingredientCatalogId">
            <el-select
              v-model="formData.ingredientCatalogId"
              placeholder="无"
              disabled
              :size="size"
              style="width: 48vw !important"
            >
              <el-option
                v-for="item in selectList.ingredientCatalogIdList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="单位" prop="unit">
            <el-select
              v-model="formData.unit"
              placeholder="请选择单位"
              :disabled="oprType === 'query'"
              :size="size"
              style="width: 48vw !important"
              clearable
              filterable
            >
              <el-option
                v-for="item in selectList.unitList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="数量" prop="num">
            <el-input-number
              v-model="formData.num"
              :min="0"
              :disabled="oprType === 'query'"
              :size="size"
              controls-position="right"
              clearable
              style="width: 48vw !important"
            />
          </el-form-item>
          <el-form-item label="单价" prop="unitPrice">
            <el-input-number
              v-model="formData.unitPrice"
              :min="0"
              :precision="2"
              :disabled="oprType === 'query'"
              :size="size"
              controls-position="right"
              clearable
              style="width: 48vw !important"
            />
          </el-form-item>
          <el-form-item label="预算" prop="budgetary">
            <div style="width: 48vw !important">
              <el-input v-model="formData.budgetary" disabled :size="size" />
              <el-popover
                placement="top-start"
                title="提示："
                :width="200"
                trigger="hover"
                content="预算 = 数量 x 单价（输入时自动计算）"
              >
                <template #reference>
                  <el-button type="warning" circle style="width: 3px; height: 3px; position: absolute; margin-top: 8px">
                    ?
                  </el-button>
                </template>
              </el-popover>
            </div>
          </el-form-item>
          <el-form-item label="采购量" prop="purchaseNum">
            <el-input-number
              v-model="formData.purchaseNum"
              :min="0"
              :disabled="oprType === 'query'"
              :size="size"
              controls-position="right"
              clearable
              style="width: 48vw !important"
            />
          </el-form-item>
          <el-form-item label="采购价" prop="purchasePrice">
            <el-input-number
              v-model="formData.purchasePrice"
              :min="0"
              :precision="2"
              :disabled="oprType === 'query'"
              :size="size"
              controls-position="right"
              clearable
              style="width: 48vw !important"
            />
          </el-form-item>

          <el-form-item label="花费" prop="purchaseCost">
            <div class="purchaseCost" style="width: 48vw !important">
              <el-input v-model="formData.purchaseCost" autocomplete="on" disabled :size="size" clearable />
              <el-popover
                placement="top-start"
                title="提示："
                :width="200"
                trigger="hover"
                content="花费 = 采购量 x 采购价（输入时自动计算）"
              >
                <template #reference>
                  <el-button type="warning" circle style="width: 3px; height: 3px; position: absolute; margin-top: 8px">
                    ?
                  </el-button>
                </template>
              </el-popover>
            </div>
          </el-form-item>

          <el-form-item label="毛利" prop="grossProfit">
            <div class="purchaseCost" style="width: 48vw !important">
              <el-input v-model="formData.grossProfit" autocomplete="on" disabled :size="size" clearable />
              <el-popover
                placement="top-start"
                title="提示："
                :width="200"
                trigger="hover"
                content="毛利 = 预算 - 花费（输入时自动计算）"
              >
                <template #reference>
                  <el-button type="warning" circle style="width: 3px; height: 3px; position: absolute; margin-top: 8px">
                    ?
                  </el-button>
                </template>
              </el-popover>
            </div>
          </el-form-item>
          <el-form-item label="供应商" prop="vendor">
            <el-select
              v-model="formData.vendor"
              placeholder="请选择供应商"
              :disabled="oprType === 'query'"
              :size="size"
              style="width: 48vw !important"
              clearable
              filterable
            >
              <el-option
                v-for="item in selectList.vendorList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="采购人" prop="purchaser">
            <el-select
              v-model="formData.purchaser"
              placeholder="请选择采购人"
              :disabled="oprType === 'query'"
              :size="size"
              style="width: 48vw !important"
              clearable
              filterable
            >
              <el-option
                v-for="item in selectList.purchaserList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="备注" prop="note">
            <el-input
              v-model="formData.note"
              autocomplete="on"
              :disabled="oprType === 'query'"
              :size="size"
              clearable
              style="width: 48vw"
            />
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
import {
  getPurchaseRecords,
  addPurchaseRecord,
  editPurchaseRecord,
  delPurchaseRecord
} from '@/api/purchase/purchaseRecords'
import { getIngredientList } from '@/api/purchase/ingredientList'
import { getVendors } from '@/api/purchase/vendor'
import { message } from '@/utils/message'
import { getCatalog } from '@/api/purchase/ingredientsCatalog'
import { getPurchasers } from '@/api/purchase/purchaser'
import { translateParam } from '@/utils/common'

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
    purchaser: '', // 采购人为登录者
    note: ''
  }
})

data.formData.budgetary = computed(() => data.formData.unitPrice * data.formData.num)
data.formData.purchaseCost = computed(() => data.formData.purchasePrice * data.formData.purchaseNum)
data.formData.grossProfit = computed(() => data.formData.budgetary - data.formData.purchaseCost)

const rules = ref({
  purchaseDate: [{ required: true, message: '请选择采购日期', trigger: 'change' }],
  ingredientId: [{ required: true, message: '请选择食材名', trigger: 'change' }],
  num: [{ required: true, message: '请输入数量', trigger: 'blur' }],
  unitPrice: [{ required: true, message: '请输入单价', trigger: 'blur' }],
  purchaseNum: [{ required: true, message: '请输入采购量', trigger: 'blur' }],
  purchasePrice: [{ required: true, message: '请输入采购价', trigger: 'blur' }],
  vendor: [{ required: true, message: '请选择供应商', trigger: 'change' }]
})

const getTableData = () => {
  data.loading = true
  const params = {
    ingredientId: data.ingredientId,
    purchaseDate: data.purchaseDate
    // page: data.pagination.currentPage,
    // pageSize: data.pagination.pageSize
  }
  getPurchaseRecords(params)
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
  setFormData(row)
}

const addEdit = (row) => {
  if (!row || !row.id) {
    data.oprType = 'add'
    data.title = '新增采购记录'
  } else {
    data.oprType = 'edit'
    data.title = '修改采购记录'
    setFormData(row)
  }
  data.dialogVisible = true
}

const setFormData = (row) => {
  Object.keys(row).forEach((key) => {
    // 'budgetary', 'purchaseCost', 'grossProfit' 是由computed计算，赋值会报错
    if (!['budgetary', 'purchaseCost', 'grossProfit'].includes(key)) {
      data.formData[key] = row[key]
    }
  })
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

const addEditForm = ref(null)

const closeDialog = () => {
  data.dialogVisible = false
  data.formData.catalogEditable = true
  addEditForm.value.clearValidate()
}

const submit = async () => {
  addEditForm.value.validate(async (valid) => {
    if (valid) {
      if (data.oprType === 'add') {
        const res = await addPurchaseRecord([data.formData])
        if (res && res.status === 200) {
          message(res.msg)
          closeDialog()
          getTableData()
        }
      } else {
        const res = await editPurchaseRecord(data.formData)
        if (res && res.status === 200) {
          message(res.msg)
          closeDialog()
          getTableData()
        }
      }
    }
  })
}

const changeIngredient = () => {
  const ingredientId = data.formData.ingredientId
  const ll = data.selectList.ingredientIdList
  const el = data.selectList.ingredientIdList.find((item) => item.value === ingredientId)
  data.formData.ingredientCatalogId = el ? el.catalogId : null
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
    if (
      ['purchaseDate', 'ingredientId', 'ingredientCatalogId', 'unit', 'vendor', 'purchaser', 'note'].includes(
        column.property
      )
    ) {
      sums[index] = ''
      return
    }
    const values = data.map((item) => Number(item[column.property]))
    if (!values.every((value) => Number.isNaN(value))) {
      sums[index] = `${values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!Number.isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)}`
    } else {
      sums[index] = ''
    }
  })

  return sums
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

const {
  ingredientId,
  purchaseDate,
  selectList,
  loading,
  tableData,
  tableFields,
  pagination,
  size,
  dialogVisible,
  formData,
  title,
  oprType,
  purchaseRecordsLoading
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
}

::v-deep(.el-date-editor) {
  width: 130px;
  margin-left: 1px;
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

.el-button.is-circle {
  border-radius: 50%;
}

.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
