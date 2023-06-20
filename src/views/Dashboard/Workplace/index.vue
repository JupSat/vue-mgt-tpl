<template>
  <el-table :data="tableData" style="width: 100%" v-if="['DODO', 'dodo'].includes(username)">
    <el-table-column :prop="date" label="Date" width="180">
      <template #default="scope">
        <JsPopover
          :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
          :text="scope.row.date"
        ></JsPopover>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
  <div class="cart" v-show="!['DODO', 'dodo'].includes(username)">
    <div id="chartFlow" ref="chartRef" class="flow-chart"></div>
  </div>
  <el-dialog v-model="showDialog" align-center :title="'修改节点信息'" :fullscreen="true">
    <div class="dialog-title">
      <span>标段：{{ formData.description }}</span>
      <span>编号：{{ formData.number }}</span>
    </div>

    <el-form label-width="70px" label="label position">
      <el-form-item label="负责人">
        <el-input v-model="formData.responsiblePerson"></el-input>
      </el-form-item>
      <el-form-item label="编号">
        <el-input v-model="formData.number"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="formData.description"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload action="" :show-file-list="false" :on-success="handleUploadSuccess">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer" v-if="oprType !== 'query'">
        <el-button size="small" @click="closeDialog">取 消</el-button>
        <el-button size="small" type="primary" @click="submit">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
export default {
  name: 'Workplace'
}
</script>
<script setup>
import { ref, nextTick, onMounted, onUnmounted, shallowRef } from 'vue'
import * as echarts from 'echarts'
import { useUserStore } from '@/pinia/modules/user'
import JsPopover from '@/components/JsPopover'

const userStore = useUserStore()
const username = userStore.user.username
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
const chart = shallowRef(null)
const chartRef = ref(null)

const lineArray = Array.from({ length: 10 }, (_, index) => index + 1)
const dataArray = Array.from({ length: 100 }, (_, index) => index + 1)
const chineseList = ['一标段', '二标段', '三标段', '四标段', '五标段', '六标段', '七标段', '八标段', '九标段', '十标段']
const series = []
lineArray.forEach((el) => {
  series.push({
    name: chineseList[el - 1],
    type: 'line',
    data: dataArray.map((value, index) => ({
      value: el * 100,
      itemStyle: {
        color: (val, f) => {
          debugger
          // Define an array of colors to use
          const colors = ['#fff', 'rgba(0, 128, 0, 0.5) ', 'yellow', 'red']
          // Return the color corresponding to the index of the current point
          return colors[index % colors.length]
        }
      }
    })),
    symbol: 'rect',
    symbolSize: 15,
    itemStyle: {
      emphasis: {
        focus: 'series'
      }
    },
    label: {
      // show: true,
      // formatter: function (params) {
      //    return params.seriesName
      // }
    }
  })
})
console.log('series', series)
const setEChartsBar = () => {
  chart.value = echarts.init(chartRef.value)
  let option

  option = {
    title: {
      text: 'Lines'
    },
    tooltip: {
      // trigger: 'item',
      // formatter: function (item) {
      //   return item.marker + item.seriesName + ': ' + item.name
      // }
      trigger: 'axis',
      formatter: function (params, ticket) {
        let message = params[0].name + '<br/>'
        params.forEach(function (item) {
          message += item.marker + item.seriesName + ': ' + '数据信息' + '<br/>'
        })
        return message
      }
    },
    legend: {
      data: chineseList
    },
    grid: {
      left: '3%',
      right: '4%',
      containLabel: true
    },
    toolbox: {
      feature: {
        // saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dataArray.map((el) => '#' + el)
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: function (value, i) {
          return i === 0 ? '' : chineseList[i - 1]
        }
      },
      splitLine: {
        show: true
      },
      splitNumber: lineArray.length - 1
    },
    dataZoom: [
      {
        type: 'slider'
      }
    ],
    series
  }
  chart.value && chart.value.setOption(option, true)
  chart.value.on('click', (param) => {
    console.log(param)
    showEditDialog(param)
  })
}
const showDialog = ref(false)
const formData = ref({
  responsiblePerson: '',
  number: '',
  description: '',
  image: ''
})
const showEditDialog = (item) => {
  showDialog.value = true
  formData.value.responsiblePerson = item.name
  formData.value.number = item.name
  formData.value.description = item.seriesName
  formData.value.image = ''
}

const handleUploadSuccess = (response, file, fileList) => {
  formData.value.image = response.data.url
}

const closeDialog = () => {
  showDialog.value = false
}
onMounted(async () => {
  await nextTick()
  setEChartsBar()
})

onUnmounted(() => {
  if (!chart.value) {
    return
  }
  chart.value.dispose()
  chart.value = null
})
</script>

<style scoped lang="scss">
.cart {
  width: 1000px;
  height: 800px;
}

.flow-chart {
  width: 100%;
  height: calc(100% - 130px);
}

.dialog-title {
  display: flex;
  margin-top: -15px;
  margin-bottom: 24px;
  span {
    margin-right: 10px;
  }
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
