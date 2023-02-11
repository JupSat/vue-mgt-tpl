<!--
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-02 12:16:58
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-11 11:16:09
-->
<template>
  <div class="vendor" :style="{ width: isCollapse ? '96.5vw' : '81.5vw' }">
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="vendorName" placeholder="请输入供应商名称" clearable></el-input>
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
      :max-height="450"
      stripe
    >
      <el-table-column type="index" width="60" label="序号" :align="align" />
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
          <h4>{{ title }}</h4>
        </template>

        <el-form ref="addEditForm" :model="formData" :rules="rules" :inline="true" label-width="100px">
          <el-form-item v-for="item in tableFields" :key="item.prop" :label="item.label" :prop="item.prop">
            <el-input
              v-model="formData[item.prop]"
              autocomplete="on"
              :disabled="oprType === 'query'"
              style="width: 46vw !important"
              :placeholder="'请输入' + item.label"
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
  name: 'Vendor'
}
</script>
<script setup>
import { reactive, ref, toRefs, computed } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useCommonStore } from '@/pinia/modules/common'
import { getVendors, addVendor, editVendor, delVendor } from '@/api/purchase/vendor'
import { message } from '@/utils/message'
import { getValidator, regPhone } from '@/utils/validate'
import { useI18n } from 'vue-i18n'

const commonStore = useCommonStore()
const isCollapse = computed(() => commonStore.isCollapse)

const data = reactive({
  dialogVisible: false,
  vendorName: '',
  loading: false,
  tableFields: [
    {
      prop: 'name',
      label: '供应商名称'
    },
    {
      prop: 'address',
      label: '供应商地址'
    },
    {
      prop: 'contact',
      label: '联系人'
    },
    {
      prop: 'phone',
      label: '联系人电话'
    },
    {
      prop: 'email',
      label: '邮箱'
    },
    {
      prop: 'remarks',
      label: '备注'
    }
  ],
  tableData: [],
  pagination: {
    currentPage: 1,
    pageSize: 20,
    pageSizes: [10, 20, 50, 100],
    total: 0
  },
  selection: [],
  title: '',
  oprType: '',
  formData: {
    id: null,
    name: '',
    address: '',
    contact: '',
    phone: '',
    email: '',
    remarks: ''
  }
})

const { t } = useI18n()
const rules = ref({
  name: [getValidator()],
  contact: [getValidator()],
  phone: [{ validator: regPhone, trigger: 'blur' }],
  email: [
    getValidator('plzEnterEmail'),
    {
      type: 'email',
      message: t('plzEnterCorrectEmail'),
      trigger: ['blur', 'change']
    }
  ]
})

const getTableData = () => {
  data.loading = true
  const params = {
    name: data.vendorName.trim()
    // page: data.currentPage,
    // pageSize: data.pageSize
  }
  getVendors(params)
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
  Object.keys(data.formData).forEach((key) => {
    data.formData[key] = row[key]
  })
}

const addEdit = (row) => {
  if (!row || !row.id) {
    data.oprType = 'add'
    data.title = '新增供应商'
    Object.keys(data.formData).forEach((key) => {
      data.formData[key] = null
    })
  } else {
    data.oprType = 'edit'
    data.title = '修改供应商'
    Object.keys(data.formData).forEach((key) => {
      data.formData[key] = row[key]
    })
  }
  data.dialogVisible = true
}

const deleteCatalog = (row) => {
  ElMessageBox.confirm(`确定删除${row.name}这个供应商吗? `, 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      delVendor({ id: row.id })
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

const addEditForm = ref(null)

const closeDialog = () => {
  data.dialogVisible = false
  addEditForm.value.clearValidate()
}

const submit = async () => {
  addEditForm.value.validate(async (valid) => {
    if (valid) {
      const doFunction = data.oprType === 'add' ? addVendor : editVendor
      const res = await doFunction(data.formData)
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

const align = 'center'
const { vendorName, loading, tableFields, tableData, pagination, dialogVisible, formData, title, oprType } =
  toRefs(data)
</script>
<style scoped lang="scss">
.vendor {
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
