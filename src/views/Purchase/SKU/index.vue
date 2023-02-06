<!--
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-02 12:16:58
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-05 18:49:58
-->
<template>
  <div class="sku" :style="{ width: isCollapse ? '96.5vw' : '81.5vw' }">
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="skuName" placeholder="请输入sku名称"></el-input>
        <el-button :color="'#626aef'" @click="query" class="query">查询</el-button>
        <el-button :color="'#626aef'" @click="addEdit()">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table ref="vendorRef" v-loading="loading" :data="tableData" :max-height="450" stripe>
      <el-table-column :align="align" label="sku名称" prop="skuName" />
      <el-table-column :align="align" label="单价" prop="price" />
      <el-table-column :align="align" label="图片" prop="img" />
      <el-table-column :align="align" label="备注" prop="note" />
      <el-table-column :align="align" label="操作" width="180" fixed="right">
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
          v-loading="foodsLoading"
        >
          <el-form-item label="sku名称" prop="skuName">
            <el-input v-model="formData.skuName" autocomplete="on" :disabled="oprType === 'query'" />
          </el-form-item>
          <el-form-item label="单价" prop="price">
            <el-input v-model="formData.price" autocomplete="on" :disabled="oprType === 'query'" />
          </el-form-item>
          <el-form-item label="图片" prop="img">
            <el-input v-model="formData.img" autocomplete="on" :disabled="oprType === 'query'" />
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
  name: 'SKU'
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
  skuName: '',
  loading: false,
  tableData: [],
  selection: [],
  currentPage: 1,
  pageSize: 50,
  total: 0,
  title: '',
  oprType: '',
  formData: {
    skuName: '',
    price: '',
    img: '',
    note: ''
  }
})

const rules = ref({
  skuName: [{ required: true, message: '请输入sku名称', trigger: 'blur' }]
})

const query = () => {
  data.loading = true
  const params = {
    skuName: data.skuName,
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
  data.title = '明细'
  data.formData.skuName = row.skuName
  data.formData.price = row.price
  data.formData.img = row.img
  data.formData.note = row.note
}

const addEdit = (row) => {
  if (!row || !row.id) {
    data.oprType = 'add'
    data.title = '新增Sku信息'

    Object.keys(data.formData).forEach((key) => {
      data.formData[key] = ''
    })
  } else {
    data.oprType = 'edit'
    data.title = '修改Sku信息'
    Object.keys(data.formData).forEach((key) => {
      data.formData[key] = row[key]
    })
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
  addEditForm.value.clearValidate()
}

for (let i = 0; i < 100; i++) {
  data.tableData.push({
    id: i + 1,
    skuName: 'sku名称' + (i + 1),
    price: '单价' + (i + 1),
    img: '图片' + (i + 1),
    note: '备注' + (i + 1)
  })
}
const submit = async () => {
  addEditForm.value.validate(async (valid) => {
    if (valid) {
      if (data.oprType === 'add') {
        const res = await addSkuInfo(data.formData)
        if (res.code === 0) {
          message('添加成功！')
        }
      } else {
        const res = await editSkuInfo(data.formData)
        if (res.code === 0) {
          message('修改成功！')
        }
      }
    }
  })
}

const align = 'center'
const {
  skuName,
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
</style>
