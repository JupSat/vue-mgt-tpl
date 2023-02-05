<!--
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-02 12:16:58
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-05 16:55:55
-->
<template>
  <div class="purchase-records" :style="{ width: isCollapse ? '96.5vw' : '81.5vw' }">
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="foodName" placeholder="请输入食材名"></el-input>
        <el-date-picker
          v-model="purchaseDate"
          type="date"
          placeholder="请选择日期"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        />
        <el-button :color="'#626aef'" @click="query" class="query">查询</el-button>
        <el-button :color="'#626aef'" @click="addEdit()">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table ref="purchaseRecordsRef" v-loading="loading" :data="tableData" max-height="510px" stripe>
      <el-table-column :align="align" label="食材名" prop="foodName" />
      <el-table-column :align="align" label="数量" prop="num" />
      <el-table-column :align="align" label="花费" prop="purchaseCost" />
      <el-table-column :align="align" label="操作" width="175" fixed="right">
        <template v-slot="{ row }">
          <el-button type="success" size="small" @click="viewDetail(row)">明细</el-button>
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
          v-loading="purchaseRecordsLoading"
        >
          <!-- 日期、食材名称、食材分类、单位、数量、单价、预算、采购量、采购价、花费、备注摘要、毛利、供应商、采购人 -->
          <el-form-item label="日期" prop="purchaseDate">
            <el-date-picker
              v-model="formData.purchaseDate"
              type="date"
              placeholder="请选择日期"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              :disabled="oprType === 'query'"
              :size="size"
              style="width: 48vw !important"
            />
          </el-form-item>
          <el-form-item label="食材名称" prop="foodName">
            <el-select
              v-model="formData.foodName"
              placeholder="请选择食材名称"
              :disabled="oprType === 'query'"
              :size="size"
              style="width: 48vw !important"
              clearable
              filterable
            >
              <el-option
                v-for="item in selectList.foodNameList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="分类" prop="foodCatalog">
            <el-select
              v-model="formData.foodCatalog"
              placeholder="无"
              disabled
              :size="size"
              style="width: 48vw !important"
            >
              <el-option
                v-for="item in selectList.foodCatalogList"
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

          <el-form-item label="采购人" prop="purchaser" v-if="oprType !== 'add'">
            <el-input
              v-model="formData.purchaser"
              autocomplete="on"
              :disabled="oprType === 'query'"
              :size="size"
              clearable
              style="width: 48vw !important"
            />
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
  addPurchaseRecords,
  editPurchaseRecords,
  delPurchaseRecords
} from '@/api/purchase/purchaseRecords'

import { message } from '@/utils/message'
const commonStore = useCommonStore()
const isCollapse = computed(() => commonStore.isCollapse)

const data = reactive({
  dialogVisible: false,
  foodName: '',
  purchaseDate: '',
  size: 'small',
  loading: false,
  tableData: [],
  selection: [],
  currentPage: 1,
  pageSize: 50,
  total: 0,
  title: '',
  oprType: '',
  selectList: {
    foodNameList: [
      { label: '猪肉', value: 'pig' },
      { label: '牛肉', value: 'beef' }
    ],
    vendorList: [
      { label: '供应商1', value: '1' },
      { label: '供应商2', value: '2' }
    ],
    unitList: [
      { label: 'KG/公斤', value: 'kg' },
      { label: '箱', value: 'box' }
    ],
    foodCatalogList: [
      { label: '肉类', value: 'meat' },
      { label: '蔬菜类', value: 'vegetable' },
      { label: '水果类', value: 'fruit' },
      { label: '冻品类', value: 'frozenProduct' },
      { label: '菌菇类', value: ' fungus' },
      { label: '豆制品类', value: 'beanProducts;' },
      { label: '米面粮油', value: 'riceFlourGrainOil' },
      { label: '调料类', value: 'seasoning' },
      { label: '禽蛋类', value: 'poultry ' }
    ]
  },
  formData: {
    purchaseDate: '',
    foodName: '',
    foodCatalog: '',
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
  foodName: [{ required: true, message: '请选择食材名', trigger: 'change' }],
  num: [{ required: true, message: '请输入数量', trigger: 'blur' }],
  unitPrice: [{ required: true, message: '请输入单价', trigger: 'blur' }],
  purchaseNum: [{ required: true, message: '请输入采购量', trigger: 'blur' }],
  purchasePrice: [{ required: true, message: '请输入采购价', trigger: 'blur' }],
  vendor: [{ required: true, message: '请选择供应商', trigger: 'change' }]
})

const query = () => {
  data.loading = true
  const params = {
    foodName: data.foodName,
    purchaseDate: data.purchaseDate,
    page: data.currentPage,
    pageSize: data.pageSize
  }
  getPurchaseRecords(params)
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
  ElMessageBox.confirm(`确定删除${row.foodName}这条采购记录吗? `, 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      delPurchaseRecords(row.id)
        .then((res) => {
          if (res) {
            message('删除采购记录成功！')
          }
        })
        .catch(() => {
          message('删除采购记录失败！', 'warning')
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
    purchaseDate: '2023-02-02',
    foodName: '食材' + (i + 1),
    num: i + 1,
    purchaseCost: i + 1,

    unit: '',
    unitPrice: i + 1,
    budgetary: i + 1,
    purchaseNum: i + 1,
    purchasePrice: i + 1,
    grossProfit: i + 1,
    vendor: '',
    purchaser: '',
    note: ''
  })
}
const submit = async () => {
  addEditForm.value.validate(async (valid) => {
    if (valid) {
      if (data.oprType === 'add') {
        const res = await addPurchaseRecords(data.formData)
        if (res.code === 0) {
          message('添加采购记录成功！')
        }
      } else {
        const res = await editPurchaseRecords(data.formData)
        if (res.code === 0) {
          message('修改采购记录成功！')
        }
      }
    }
  })
}

const align = 'center'
const {
  foodName,
  purchaseDate,
  selectList,
  loading,
  tableData,
  currentPage,
  pageSize,
  size,
  dialogVisible,
  formData,
  total,
  title,
  oprType,
  purchaseRecordsLoading
} = toRefs(data)
</script>
<style scoped lang="scss">
.purchase-records {
  .query {
    margin-left: 2px;
  }
  .el-input {
    width: 105px;
  }
}

::v-deep(.el-date-editor) {
  width: 130px !important;
}

.page-separate {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.el-button + .el-button {
  margin-left: 1px !important;
}

.el-button.is-circle {
  border-radius: 50%;
}
.add-edit-form {
  .el-divider--horizontal {
    margin: 10px 0;
  }
}
</style>
