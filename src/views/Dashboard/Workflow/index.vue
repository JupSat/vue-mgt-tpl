<template>
  <div class="cart">
    <div id="chartFlow" ref="chartRef" class="flow-chart"></div>
  </div>
</template>

<script>
export default {
  name: 'Workflow'
}
</script>
<script setup>
import { ref, nextTick, onMounted, onUnmounted, shallowRef } from 'vue'
import * as echarts from 'echarts'

const chart = shallowRef(null)
const chartRef = ref(null)
const setEChartsBar = () => {
  chart.value = echarts.init(chartRef.value)

  let option
  // prettier-ignore
  const hours = [
    'a', '1a', '2a', '3a', '4a', '5a', '6a',
    '7a', '8a', '9a', '10a', '11a',
    '12p', '1p', '2p', '3p', '4p', '5p',
    '6p', '7p', '8p', '9p'
  ]
  // prettier-ignore
  const days = [
    '第一条', '第二条', '第三条',
    '第四条', '第五条', '第六条',
    '第七条', '第八条', '第九条',
    '第十条'
  ]
  // prettier-ignore
  const data = [[2, 5, 5], [0, 2, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0],
    [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0],
    [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3],
    [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3],
    [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0],
    [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0],
    [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6],
    [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8],
    [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1],
    [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0],
    [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8],
    [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4],
    [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0],
    [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4],
    [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5],
    [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1],
    [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0],
    [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4],
    [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3],
    [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0],
    [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0],
    [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7],
    [5, 16, 11], [5, 17, 6]]
  const title = []
  const singleAxis = []
  const series = []
  const symbolPath = 'M 0 0 L 20 0 L 20 20 L 0 20 Z'
  days.forEach(function (day, idx) {
    title.push({
      textBaseline: 'middle',
      top: ((idx + 0.5) * 100) / 7 + '%',
      text: day
    })
    singleAxis.push({
      left: 150,
      type: 'category',
      boundaryGap: false,
      data: hours,
      top: (idx * 100) / 7 + 5 + '%',
      height: 100 / 7 - 10 + '%',
      axisLabel: {
        interval: 1
      }
    })
    series.push({
      singleAxisIndex: idx,
      coordinateSystem: 'singleAxis',
      type: 'scatter',
      data: [],
      symbol: 'path://' + symbolPath,
      // symbol: 'squerd',
      symbolSize: function (dataItem) {
        return dataItem[1] * 4
      }
    })
  })
  data.forEach(function (dataItem) {
    series[dataItem[0]].data.push([dataItem[1], dataItem[2]])
  })
  option = {
    tooltip: {
      position: 'top'
    },
    title: title,
    singleAxis: singleAxis,
    series: series
  }

  chart.value && chart.value.setOption(option, true)
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
  height: calc(100% - 150px);
}
</style>
