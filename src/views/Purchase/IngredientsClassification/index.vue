<!--
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-02 12:16:58
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-02 22:44:00
-->
<template>
  <div class="ingredients" :style="{ width: isCollapse ? '96.5vw' : '81.5vw' }">
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="catalog" placeholder="请输入分类"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :color="'#626aef'" @click="query">查询</el-button>
        <el-button :color="'#626aef'" @click="addEdit()">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="ingredientsRef"
      v-loading="loading"
      :data="tableData"
      max-height="520px"
      @selection-change="selectChange"
      border
    >
      <!-- <el-table-column :align="align" type="selection" width="50" /> -->
      <el-table-column :align="align" label="序号" prop="id" width="60" />
      <el-table-column :align="align" label="分类" prop="catalog" />
      <el-table-column :align="align" label="码值" prop="code" />
      <el-table-column :align="align" label="操作" width="180">
        <template v-slot="{ row }">
          <el-button type="success" size="small" @click="viewDetail(row.id)">查看</el-button>
          <el-button type="primary" size="small" plain @click="addEdit(row.id)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteRow(row.id)">删除</el-button>
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
        :fullscreen="false"
        draggable
        :append-to-body="true"
      >
        <template #header>
          <div>
            <h4>{{ title }}</h4>
          </div>
        </template>
        <el-form ref="addEditForm" :model="formData" :rules="rules" :inline="true" label-width="80px">
          <el-form-item label="分类" prop="catalog">
            <el-input v-model="formData.catalog" autocomplete="on" :disabled="oprType === 'edit'" />
          </el-form-item>
          <el-form-item label="码值" prop="label">
            <el-input v-model="formData.code" autocomplete="on" :disabled="oprType === 'edit'" />
          </el-form-item>
          <el-divider />
          <div class="foods-info">
            <el-form :inline="true" :model="foodsFormData" :rules="foodsRules">
              <el-form-item>
                <el-input v-model="foodName" placeholder="请输入食材名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button :color="'#626aef'" @click="addEditFoods()">添加</el-button>
              </el-form-item>
            </el-form>
            <el-table ref="foodsRef" v-loading="foodsLoading" :data="foodsTableData" max-height="380px" border>
              <el-table-column :align="align" label="序号" prop="id" width="60" />
              <el-table-column :align="align" label="食材名称" prop="foodName" />
              <el-table-column :align="align" label="分类" prop="catalogId" />
              <el-table-column :align="align" label="图片" prop="img" />
              <el-table-column :align="align" label="描述" prop="desc" />
              <el-table-column :align="align" label="操作" width="150">
                <template v-slot="{ row }">
                  <el-button type="primary" size="small" plain @click="addEditFoods(row.id)">编辑</el-button>
                  <el-button type="danger" size="small" @click="deleteFood(row.id)">删除</el-button>
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
          </div>
        </el-form>
        <template #footer>
          <div class="dialog-footer" v-if="oprType === 'add'">
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
  name: 'IngredientsClassification'
}
</script>
<script setup>
import { reactive, ref, toRefs, computed } from 'vue'
import { useCommonStore } from '@/pinia/modules/common'
import { getCatalog, addCatalog, editCatalog } from '@/api/purchase'

import { message } from '@/utils/message'
const commonStore = useCommonStore()
const isCollapse = computed(() => commonStore.isCollapse)

const data = reactive({
  dialogVisible: false,
  catalog: '',
  loading: false,
  tableData: [],
  selection: [],
  currentPage: 1,
  pageSize: 50,
  total: 0,
  title: '',
  oprType: '',
  formData: {
    catalog: '',
    code: ''
  },
  foodsFormData: {
    foodName: '',
    catalog: '',
    img: '',
    desc: ''
  },
  foodsLoading: false,
  foodsTableData: []
})

const rules = ref({
  catalog: [{ required: true, message: '请输入分类', trigger: 'blur' }],
  code: [{ required: true, message: '请输入码值', trigger: 'blur' }]
})

const selectChange = () => {}

const query = () => {
  data.loading = true
  const params = {
    catalog: data.catalog,
    page: data.currentPage,
    pageSize: data.pageSize
  }
  getCatalog(params)
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

const viewDetail = (id) => {}
const addEdit = (id) => {
  if (!id) {
    data.oprType = 'add'
    data.title = '新增分类'
  } else {
    data.oprType = 'edit'
    data.title = '修改分类'
  }
  data.dialogVisible = true
}
const deleteRow = (id) => {}

const closeDialog = () => {
  data.dialogVisible = false
}

for (let i = 0; i < 100; i++) {
  data.tableData.push({ id: i + 1, catalog: '分类' + (i + 1), code: i + 1 })
}

const addEditForm = ref(null)
const submit = async () => {
  addEditForm.value.validate(async (valid) => {
    if (valid) {
      if (data.operate === 'add') {
        const res = await addCatalog(data.formData)
        if (res.code === 0) {
          message('添加成功！')
        }
      } else {
        const params = {
          foodName: '',
          catalogId: ''
        }
        const res = await editCatalog(params)
        if (res.code === 0) {
          message('修改成功！')
        }
      }
    }
  })
}

const foodsRef = ref(null)
const addEditFoods = (id) => {}
const deleteFood = (id) => {}

for (let i = 0; i < 100; i++) {
  data.foodsTableData.push({ id: i + 1, foodName: '食材' + (i + 1), catalogId: '分类' + (i + 1), code: i + 1 })
}

const foodsRules = ref({
  foodName: [{ required: true, message: '请输入食材名称', trigger: 'blur' }]
})

const align = 'center'
const {
  catalog,
  loading,
  tableData,
  currentPage,
  pageSize,
  dialogVisible,
  formData,
  total,
  title,
  oprType,
  foodsTableData
} = toRefs(data)
</script>
<style scoped lang="scss">
.ingredients {
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
  .foods-info {
  }
  .el-divider--horizontal {
    margin: 10px 0;
  }
}
</style>
