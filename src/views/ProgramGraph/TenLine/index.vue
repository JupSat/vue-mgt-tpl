<template>
  <div class="cart" :style="{ width: isCollapse ? '96.5vw' : '81.5vw' }">
    <div id="chartFlow" ref="chartRef" class="flow-chart">
      <!-- 段标 -->
      <div class="container" v-for="(ele, idx) in wellList" :key="idx">
        <div class="row-container">
          <span class="row-label">{{ ele.wellName }}</span>
          <div class="row-node-container">
            <div v-for="(nodeItem, nodeIdx) in ele.nodeInfoList" v-bind:key="nodeIdx">
              <!-- 节点 -->
              <div class="node-container">
                <!-- 点击事件绑定 -->
                <div
                  :class="['node-cell', `color-${statusMap[nodeItem.nodeState]}`]"
                  @click="nodeClick(ele, nodeItem, nodeIdx)"
                >
                  <div class="node-info">
                    <div>#{{ nodeIdx + 1 }}</div>
                    <div>{{ nodeItem.nodeName || '--' }}</div>
                  </div>
                </div>
                <div class="connection-line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 编辑弹窗 -->
      <el-dialog
        v-model="dialogVisible"
        :title="`修改${currentNode.wellName}#${currentNode.nodeNum}-节点信息`"
        width="80%"
        @close="onModalClose"
      >
        <el-form :model="detailForm" ref="detailForm" label-width="120px" class="detail-form" :rules="detailFormRules">
          <el-form-item label="节点名称" prop="nodeName">
            <el-input v-model="detailForm.nodeName" clearable style="max-width: 850px"></el-input>
          </el-form-item>
          <el-form-item label="节点状态" prop="nodeState">
            <el-radio-group v-model="detailForm.nodeState">
              <el-radio :label="0">未建</el-radio>
              <el-radio :label="2">建设中</el-radio>
              <el-radio :label="1">建设完成</el-radio>
              <el-radio :label="3">问题井</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注信息" prop="nodeRemark">
            <el-input type="textarea" v-model="detailForm.nodeRemark" style="max-width: 1200px"></el-input>
          </el-form-item>
          <!-- 上传图片 -->
          <el-form-item label="图片" prop="fileList">
            <el-upload
              v-model:file-list="fileList"
              list-type="picture"
              accept="jpeg,png,jpg"
              class="img-uploader"
              :on-preview="onPreview"
              :auto-upload="false"
            >
              <el-button type="primary">上传图片</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="onModalClose">取消</el-button>
            <el-button type="primary" @click="submitForm('detailForm')">确认</el-button>
          </span>
        </template>
      </el-dialog>

      <el-dialog v-model="imgPreview">
        <img w-full :src="imgPreviewUrl" alt="Preview Image" />
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCommonStore } from '@/pinia/modules/common'
const commonStore = useCommonStore()
const isCollapse = computed(() => commonStore.isCollapse)

</script>
<script>
import { apiCodeMap, getWellListApi, nodeAddApi, nodeUpdateApi, nodeFindApi } from './services'
import { getImgUrlList, showCodeTip } from './utils'

const statusMap = {
  0: 'empty',
  1: 'complete',
  2: 'in-progress',
  3: 'error'
}

export default {
  name: 'TenLine',
  data() {
    return {
      wellList: [],
      detailForm: {
        nodeState: 0,
        nodeName: undefined,
        nodeRemark: undefined
      },
      currentNode: {
        nodeItem: undefined,
        nodeNum: undefined,
        wellId: undefined
      },
      dialogVisible: false,
      statusMap,
      fileList: [],
      extraUploadData: undefined,
      imgPreview: false,
      imgPreviewUrl: '',
      detailFormRules: {
        nodeName: [{ required: true, message: '请输入节点名称' }]
      }
    }
  },
  async created() {
    // 节点列表信息
    await this.updateWellList()
  },
  methods: {
    async updateWellList() {
      const data = await getWellListApi()
      this.wellList = data || []
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        const { wellId, wellName } = this.currentNode
        const { nodeId, nodeNum } = this.currentNode.nodeItem
        if (!nodeId) {
          Promise.all(await getImgUrlList(this.fileList))
            .then(async (urlList) => {
              const nodePicture = urlList.filter((url) => url).join(',')
              // 把urlList作为参数保存
              const addRes = await nodeAddApi({ ...this.detailForm, nodePicture, wellId, wellName, nodeNum })
              showCodeTip(addRes)
              if (addRes?.code === apiCodeMap.SUCCESS) {
                this.onModalClose()
              }
            })
            .catch((err) => {
              console.log('getImgUrlListErr', err)
            })
        } else {
          const hasUploadedFileList = this.fileList.filter(({ hasUploaded }) => hasUploaded)
          Promise.all(await getImgUrlList(this.fileList.filter(({ hasUploaded }) => !hasUploaded)))
            .then(async (urlList) => {
              const nodePicture = [...hasUploadedFileList.map(({ url }) => url), ...urlList]
                .filter((url) => url)
                .join(',')
              // 把urlList作为参数保存
              const updateRes = await nodeUpdateApi({
                ...this.detailForm,
                nodeNum,
                wellId,
                wellName,
                nodeId,
                nodePicture
              })
              showCodeTip(updateRes)
              if (updateRes?.code === apiCodeMap.SUCCESS) {
                this.onModalClose()
              }
            })
            .catch((err) => {
              console.log('getImgUrlListErr', err)
            })
        }
      })
    },

    async nodeClick(wellItem, nodeItem, nodeIdx) {
      const nodeNum = nodeIdx + 1
      this.currentNode = {
        nodeItem,
        nodeNum,
        wellId: wellItem.wellId,
        wellName: wellItem.wellName
      }
      const { nodeName, nodeState } = nodeItem
      if (nodeItem?.nodeId) {
        const nodeDetail = await nodeFindApi(nodeItem.nodeId)
        const { nodeRemark, nodeName, nodeState, fileList } = nodeDetail
        this.detailForm = {
          nodeName,
          nodeState,
          nodeRemark
        }
        this.fileList = fileList
      } else {
        this.detailForm = {
          nodeName,
          nodeState
        }
      }
      this.dialogVisible = true
    },

    async onModalClose() {
      this.dialogVisible = false
      this.detailForm = {}
      this.fileList = []
      await this.updateWellList()
    },

    onPreview(uploadFile) {
      this.imgPreviewUrl = uploadFile.url
      this.imgPreview = true
    }
  }
}
</script>

<style scoped lang="scss">
.cart {
  width: 1240px;
  height: 800px;
}

.flow-chart {
  width: 100%;
  height: calc(100% - 150px);
}

.colort-empty {
  color: #222;
  background-color: #fff !important;
}
.color-complete {
  color: #222;
  background-color: rgba(0, 128, 0, 0.5) !important;
}

.color-in-progress {
  background-color: yellow !important;
}

.color-error {
  background-color: red !important;
}

.row-container {
  height: 300px;

  .row-label {
    flex: 1;
  }

  .row-node-container {
    flex: 18;
    display: flex;
    flex-wrap: wrap;
    height: 260px;
    padding-left: 20px;
    overflow-x: scroll;

    .node-container {
      position: relative;
      width: 90px;
      height: 50px;
      margin-bottom: 4px;

      // node单元
      .node-cell {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 50%;
        height: 50px;
        background-color: #fff;
        border: 1px solid #f7f7f7;
        cursor: pointer;

        .node-info {
          flex: 1;
          font-size: 12px;
          text-align: center;
        }
      }

      // 连接线
      .connection-line {
        position: absolute;
        top: calc(50% + 0.75px);
        left: 50%;
        width: 50%;
        height: 1.5px;
        background-color: #222;
      }
    }
  }
}

.img-uploader {
  width: 90%;
}
</style>
