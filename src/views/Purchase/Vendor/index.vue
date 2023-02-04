<!--
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-02 12:16:58
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-04 12:18:33
-->
<template>
  <div class="vendor" :style="{ width: isCollapse ? '96.5vw' : '81.5vw' }">
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="vendorName" placeholder="请输入供应商名称"></el-input>
        <el-button :color="'#626aef'" @click="query" class="query">查询</el-button>
        <el-button :color="'#626aef'" @click="addEdit()">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="vendorRef" v-loading="loading" :data="tableData" max-height="510px" stripe>
      <el-table-column :align="align" label="供应商名称" prop="vendorName" />
      <!-- <el-table-column :align="align" label="供应商地址" prop="vendorAddress" /> -->
      <el-table-column :align="align" label="联系人" prop="contact" />
      <!-- <el-table-column :align="align" label="联系人电话" prop="phone" /> -->
      <!-- <el-table-column :align="align" label="邮箱" prop="email" />
      <el-table-column :align="align" label="备注" prop="note" /> -->
      <el-table-column :align="align" label="操作" width="180" fixed="right">
        <template v-slot="{ row }">
          <el-button type="success" size="small" @click="viewDetail(row)">查看</el-button>
          <el-button type="primary" size="small" plain @click="addEdit(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteCatalog(row)">删除</el-button>
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
          <el-form-item label="供应商名称" prop="vendorName">
            <el-input v-model="formData.vendorName" autocomplete="on" :disabled="oprType === 'query'" />
          </el-form-item>
          <el-form-item label="供应商地址" prop="vendorAddress">
            <el-input v-model="formData.vendorAddress" autocomplete="on" :disabled="oprType === 'query'" />
          </el-form-item>
          <el-form-item label="联系人" prop="contact">
            <el-input v-model="formData.contact" autocomplete="on" :disabled="oprType === 'query'" />
          </el-form-item>
          <el-form-item label="联系人电话" prop="phone">
            <el-input v-model="formData.phone" autocomplete="on" :disabled="oprType === 'query'" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="formData.email" autocomplete="on" :disabled="oprType === 'query'" />
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
  name: 'Vendor'
}
</script>
<script setup>
import { reactive, ref, toRefs, computed } from 'vue'
import { ElMessageBox } from 'element-plus'

import { useCommonStore } from '@/pinia/modules/common'
import { getVendors, addVendor, editVendor, delVendor } from '@/api/purchase/vendor'

import { message } from '@/utils/message'
const commonStore = useCommonStore()
const isCollapse = computed(() => commonStore.isCollapse)

const data = reactive({
  dialogVisible: false,
  vendorName: '',
  loading: false,
  tableData: [],
  selection: [],
  currentPage: 1,
  pageSize: 50,
  total: 0,
  title: '',
  oprType: '',
  formData: {
    vendorName: '',
    vendorAddress: '',
    contact: '',
    phone: '',
    email: '',
    note: ''
  },
  foodsFormData: {
    vendorName: '',
    foodName: '',
    img: '',
    desc: ''
  },
  foodsLoading: false,
  foodsTableData: []
})

const rules = ref({
  vendorName: [{ required: true, message: '请输入供应商', trigger: 'blur' }],
  contact: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入联系人电话', trigger: 'blur' }]
})

const query = () => {
  data.loading = true
  const params = {
    catalog: data.catalog,
    page: data.currentPage,
    pageSize: data.pageSize
  }
  getVendors(params)
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
  data.formData.vendorName = row.vendorName
  data.formData.vendorAddress = row.vendorAddress
  data.formData.contact = row.contact
  data.formData.phone = row.phone
  data.formData.email = row.email
  data.formData.note = row.note
}

const addEdit = (row) => {
  if (!row || !row.id) {
    data.oprType = 'add'
    data.title = '新增供应商'
  } else {
    data.oprType = 'edit'
    data.title = '修改供应商'
    data.formData.catalog = row.catalog
    data.formData.code = row.code
  }
  data.dialogVisible = true
}

const deleteCatalog = (row) => {
  ElMessageBox.confirm(`确定删除${row.vendorName}这个供应商吗? `, 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      delVendor(row.id)
        .then((res) => {
          if (res) {
            message('删除供应商成功！')
          }
        })
        .catch(() => {
          message('删除供应商失败！', 'warning')
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
    vendorName: '供应商名称' + (i + 1),
    vendorAddress: '供应商地址' + (i + 1),
    contact: '联系人' + (i + 1),
    phone: '联系人电话' + (i + 1),
    email: '邮箱' + (i + 1),
    note: '备注' + (i + 1)
  })
}
const submit = async () => {
  addEditForm.value.validate(async (valid) => {
    if (valid) {
      if (data.operate === 'add') {
        const res = await addVendor(data.formData)
        if (res.code === 0) {
          message('添加成功！')
        }
      } else {
        const params = {
          foodName: '',
          catalogId: ''
        }
        const res = await editVendor(params)
        if (res.code === 0) {
          message('修改成功！')
        }
      }
    }
  })
}

const align = 'center'
const {
  vendorName,
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
</style>
