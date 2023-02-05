<!--
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-02 12:16:58
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-05 18:18:18
-->
<template>
  <div class="ingredients-catalog" :style="{ width: isCollapse ? '96.5vw' : '81.5vw' }">
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="catalog" placeholder="请输入分类"></el-input>
        <el-button :color="'#626aef'" @click="query" class="query">查询</el-button>
        <el-button :color="'#626aef'" @click="addEdit()">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="ingredientsRef"
      v-loading="loading"
      :data="tableData"
      max-height="510px"
      @selection-change="selectChange"
      stripe
    >
      <!-- <el-table-column :align="align" type="selection" width="50" /> -->
      <!-- <el-table-column :align="align" label="序号" prop="id" width="60" /> -->
      <el-table-column :align="align" label="分类" prop="catalog" />
      <el-table-column :align="align" label="码值" prop="code" />
      <el-table-column :align="align" label="操作" width="180">
        <template v-slot="{ row }">
          <el-button type="success" size="small" @click="viewDetail(row)">明细</el-button>
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
        </template>
        <el-form
          ref="addEditForm"
          :model="formData"
          :rules="rules"
          :inline="true"
          label-width="80px"
          v-loading="foodsLoading"
        >
          <el-form-item label="分类" prop="catalog">
            <el-input
              v-model="formData.catalog"
              autocomplete="on"
              :disabled="oprType !== 'add' && (formData.catalogEditable || oprType === 'query')"
            />
          </el-form-item>
          <el-form-item label="码值" prop="label">
            <div class="edit-catalog">
              <el-input
                v-model="formData.code"
                autocomplete="on"
                :disabled="oprType !== 'add' && (formData.catalogEditable || oprType === 'query')"
              />
              <el-button
                type="primary"
                size="small"
                plain
                @click="formData.catalogEditable = false"
                v-if="oprType === 'edit' && formData.catalogEditable"
              >
                编辑
              </el-button>
              <el-button
                type="primary"
                size="small"
                @click="modifyCatalog()"
                v-if="oprType === 'edit' && !formData.catalogEditable"
              >
                确定
              </el-button>
            </div>
          </el-form-item>

          <el-divider v-if="oprType !== 'add'" />
          <div class="foods-info" v-if="oprType !== 'add'">
            <el-form :inline="true" :model="foodsFormData" ref="foodsRef" :rules="foodsRules" label-width="80px">
              <el-form-item label="食材名" prop="foodName">
                <el-input v-model="foodsFormData.foodName" placeholder="请输入食材名称"></el-input>
              </el-form-item>
              <el-form-item label="图片url" prop="img">
                <el-input v-model="foodsFormData.img" placeholder="请输入图片url"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button :color="'#626aef'" size="small" @click="queryFoods()" v-if="oprType === 'query'">
                  查询
                </el-button>
                <el-button :color="'#626aef'" size="small" @click="addEditFood('add', null)" v-if="oprType !== 'query'">
                  添加
                </el-button>
              </el-form-item>
            </el-form>
            <el-table :data="foodsTableData" max-height="380px">
              <!-- <el-table-column :align="align" label="序号" prop="id" width="60" /> -->
              <el-table-column :align="align" label="食材名称" prop="foodName">
                <template #default="scope">
                  <el-input v-model="scope.row.foodName" :disabled="scope.row.disabled"></el-input>
                </template>
              </el-table-column>
              <!-- <el-table-column :align="align" label="分类" prop="catalogId" /> -->
              <el-table-column :align="align" label="图片" prop="img">
                <template #default="scope">
                  <el-image
                    style="width: 50px; height: 50px"
                    :src="scope.row.img"
                    :fit="'cover'"
                    :preview-src-list="[scope.row.img]"
                    :preview-teleported="true"
                    :hide-on-click-modal="true"
                  />
                </template>
              </el-table-column>
              <el-table-column :align="align" label="描述" prop="desc">
                <template #default="scope">
                  <el-input v-model="scope.row.desc" :disabled="scope.row.disabled"></el-input>
                </template>
              </el-table-column>

              <el-table-column :align="align" label="操作" width="150" v-if="oprType !== 'query'">
                <template #default="scope">
                  <el-button
                    type="primary"
                    size="small"
                    plain
                    @click="setRowEditable(scope.row)"
                    v-if="scope.row.disabled"
                  >
                    编辑
                  </el-button>
                  <el-button type="primary" size="small" @click="addEditFood('edit', scope.row)" v-else>确定</el-button>
                  <el-button type="danger" size="small" @click="deleteFood(scope.row)">删除</el-button>
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
import { ElMessageBox } from 'element-plus'

import { useCommonStore } from '@/pinia/modules/common'
import {
  getCatalog,
  addCatalog,
  editCatalog,
  delCatalog,
  getFoodsCatalogId,
  addFood,
  editFood,
  delFood
} from '@/api/purchase/ingredientsCatalog'

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
    code: '',
    catalogEditable: true,
    catalogEditing: false
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

const getFoodsByCatalogId = (id) => {
  getFoodsCatalogId(id)
    .then((res) => {})
    .finally(() => {
      for (let i = 0; i < 100; i++) {
        data.foodsTableData.push({
          id: i + 1,
          foodName: '食材' + (i + 1),
          catalogId: '分类' + (i + 1),
          img: 'https://img1.baidu.com/it/u=3836050191,1338865719&fm=253&fmt=auto&app=138&f=JPEG?w=762&h=500',
          desc: '描述' + (i + 1),
          disabled: true
        })
      }
    })
}

const viewDetail = (row) => {
  data.dialogVisible = true
  data.oprType = 'query'
  data.title = '明细'
  data.formData.catalog = row.catalog
  data.formData.code = row.code
  getFoodsByCatalogId(row.id)
}

const addEdit = (row) => {
  if (!row || !row.id) {
    data.oprType = 'add'
    data.title = '新增分类'
  } else {
    data.oprType = 'edit'
    data.title = '修改分类'
    data.formData.catalog = row.catalog
    data.formData.code = row.code
    getFoodsByCatalogId(row.id)
  }
  data.dialogVisible = true
}

const modifyCatalog = () => {
  const params = {
    id: '',
    catalog: data.formData.catalog,
    code: data.formData.code
  }
  editCatalog(params).then((res) => {
    if (res.code) {
      data.formData.catalogEditable = false
    }
  })
}
const deleteCatalog = (row) => {
  ElMessageBox.confirm(`确定删除${row.catalog}这个分类吗?(警告，删除分类，此分类下所有食材也将被删除！)`, 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      delCatalog(row.id)
        .then((res) => {
          if (res) {
            message('删除分类成功！')
          }
        })
        .catch(() => {
          message('删除分类失败！', 'warning')
        })
    })
    .catch(() => {})
}

const closeDialog = () => {
  data.dialogVisible = false
  data.formData.catalogEditable = true
  data.formData.catalog = ''
  data.formData.code = ''
}

for (let i = 0; i < 100; i++) {
  data.tableData.push({ id: i + 1, catalog: '分类' + (i + 1), code: i + 1 })
}

const addEditForm = ref(null)
const submit = async () => {
  addEditForm.value.validate(async (valid) => {
    if (valid) {
      if (data.oprType === 'add') {
        const params = {
          catalog: data.formData.catalog,
          code: data.formData.code
        }
        const res = await addCatalog(params)
        if (res.code === 0) {
          message('添加成功！')
        }
      }
    }
  })
}

const queryFoods = () => {}

const setRowEditable = (row) => {
  data.foodsTableData.map((item) => {
    item.disabled = row.id !== item.id
    return item
  })
}

const foodsRef = ref(null)
const addEditFood = (type, row) => {
  if (type === 'add') {
    foodsRef.value.validate(async (valid) => {
      if (valid) {
        const params = {
          foodName: data.foodsFormData.foodName,
          img: data.foodsFormData.img,
          desc: data.foodsFormData.desc
        }
        addFood(params)
          .then((res) => {
            if (res) {
              message('新增食材成功！')
            }
          })
          .catch(() => {
            message('新增食材失败！', 'warning')
          })
      }
    })
  } else {
    if (!row.foodName) {
      message('食材名称不能为空！', 'warning')
      return
    }
    const params = {
      id: row.id,
      foodName: row.foodName,
      img: row.img,
      desc: row.desc
    }
    editFood(params)
      .then((res) => {
        if (res) {
          message('修改食材成功！')
        }
      })
      .catch(() => {
        message('修改食材失败！', 'warning')
      })
  }
}

const deleteFood = (row) => {
  ElMessageBox.confirm(`确定删除${row.foodName}这个食材吗?`, 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      delFood(row.id)
        .then((res) => {
          if (res) {
            message('删除食材成功！')
          }
        })
        .catch(() => {
          message('删除食材失败！', 'warning')
        })
    })
    .catch(() => {})
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
  foodsTableData,
  foodsFormData,
  foodsLoading
} = toRefs(data)
</script>
<style scoped lang="scss">
.ingredients-catalog {
  .query {
    margin-left: 10px;
  }
  .el-input {
    width: 100px;
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

.edit-catalog {
  display: flex;
  align-items: center;
  .el-button {
    margin-left: 1px;
  }
}
</style>
