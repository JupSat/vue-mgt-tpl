<template>
  <div class="add-edit-form">
    <el-dialog
      :model-value="dialogVisible"
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
        v-loading="loading"
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
            :disabled="operationType === 'query'"
            :size="size"
            style="width: 48vw !important"
          />
        </el-form-item>
        <el-form-item label="食材名称" prop="ingredientId">
          <el-select
            v-model="formData.ingredientId"
            placeholder="请选择食材名称"
            :disabled="operationType === 'query'"
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
            :disabled="operationType === 'query'"
            :size="size"
            style="width: 48vw !important"
            clearable
            filterable
          >
            <el-option v-for="item in selectList.unitList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="num">
          <el-input-number
            v-model="formData.num"
            :min="0"
            :precision="2"
            :disabled="operationType === 'query'"
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
            :disabled="operationType === 'query'"
            :size="size"
            controls-position="right"
            clearable
            style="width: 48vw !important"
          />
        </el-form-item>
        <el-form-item label="预算" prop="budgetary">
          <div style="width: 48vw !important">
            <el-input-number
              v-model="formData.budgetary"
              :min="0"
              :precision="2"
              disabled
              :size="size"
              controls-position="right"
              clearable
              style="width: 48vw !important"
            />
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
            :disabled="operationType === 'query'"
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
            :disabled="operationType === 'query'"
            :size="size"
            controls-position="right"
            clearable
            style="width: 48vw !important"
          />
        </el-form-item>

        <el-form-item label="花费" prop="purchaseCost">
          <div class="purchaseCost" style="width: 48vw !important">
            <el-input-number
              v-model="formData.purchaseCost"
              :min="0"
              :precision="2"
              disabled
              :size="size"
              controls-position="right"
              clearable
              style="width: 48vw !important"
            />
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
            <el-input-number
              v-model="formData.grossProfit"
              :min="0"
              :precision="2"
              disabled
              :size="size"
              controls-position="right"
              clearable
              style="width: 48vw !important"
            />

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
            :disabled="operationType === 'query'"
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
            :disabled="operationType === 'query'"
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
            :disabled="operationType === 'query'"
            :size="size"
            clearable
            style="width: 48vw"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer" v-if="operationType !== 'query'">
          <el-button size="small" @click="closeDialog">取 消</el-button>
          <el-button size="small" type="primary" @click="submit">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddPurchaseRecord'
}
</script>
<script setup>
import { reactive, ref, toRefs, computed, defineProps, defineEmits } from 'vue'
import { addPurchaseRecord, editPurchaseRecord } from '@/api/purchase/purchaseRecords'
import { message } from '@/utils/message'

const props = defineProps({
  selectList: {
    type: Object,
    default() {
      return {
        ingredientIdList: []
      }
    }
  },
  dialogVisible: {
    type: Boolean,
    default: false
  },
  rowData: {
    type: Object,
    default() {
      return null
    }
  },
  oprType: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
})

const { selectList, oprType, dialogVisible, title, rowData } = toRefs(props)

const data = reactive({
  rowData,
  operationType: oprType,
  ingredientId: null,
  purchaseDate: '',
  size: 'small',
  loading: false,
  selectList,
  formData: {
    id: null,
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
  }
})

data.formData.budgetary = computed(() => Number((data.formData.unitPrice * data.formData.num).toFixed(2)))
data.formData.purchaseCost = computed(() =>
  Number((data.formData.purchasePrice * data.formData.purchaseNum).toFixed(2))
)
data.formData.grossProfit = computed(() => Number((data.formData.budgetary - data.formData.purchaseCost).toFixed(2)))

const rules = ref({
  purchaseDate: [{ required: true, message: '请选择采购日期', trigger: 'change' }],
  ingredientId: [{ required: true, message: '请选择食材名', trigger: 'change' }],
  num: [{ required: true, message: '请输入数量', trigger: 'blur' }],
  unitPrice: [{ required: true, message: '请输入单价', trigger: 'blur' }],
  purchaseNum: [{ required: true, message: '请输入采购量', trigger: 'blur' }],
  purchasePrice: [{ required: true, message: '请输入采购价', trigger: 'blur' }],
  vendor: [{ required: true, message: '请选择供应商', trigger: 'change' }]
})

const addEditForm = ref(null)

const formatData = (params) => {
  Object.keys(data.formData).forEach((key) => {
    // 'budgetary', 'purchaseCost', 'grossProfit' 是由computed计算，赋值会报错
    if (!['budgetary', 'purchaseCost', 'grossProfit'].includes(key)) {
      data.formData[key] = params ? params[key] : null
    }
  })
}

const copyFormData = JSON.parse(JSON.stringify(data.formData))
data.operationType === 'add' ? formatData(copyFormData) : formatData(data.rowData)

const emit = defineEmits(['on-close-dialog'])
const closeDialog = () => {
  emit('on-close-dialog', false)
  addEditForm.value.clearValidate()
}

const submit = async () => {
  addEditForm.value.validate(async (valid) => {
    if (valid) {
      if (data.operationType === 'add') {
        const res = await addPurchaseRecord([data.formData])
        if (res && res.status === 200) {
          closeDialog()
          message(res.msg)
        }
      } else {
        const res = await editPurchaseRecord(data.formData)
        if (res && res.status === 200) {
          closeDialog()
          message(res.msg)
        }
      }
    }
  })
}

const changeIngredient = () => {
  const ingredientId = data.formData.ingredientId
  const el = data.selectList.ingredientIdList.find((item) => item.value === ingredientId)
  data.formData.ingredientCatalogId = el ? el.catalogId : null
}

const { size, loading, formData, operationType } = toRefs(data)
</script>
<style scoped lang="scss">
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
