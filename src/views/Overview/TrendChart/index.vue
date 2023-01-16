<template>
  <div id="chartBar" ref="chartRef" class="bar-chart"></div>
</template>

<script>
export default {
  name: 'TrendChart'
}
</script>

<script setup>
import { ref, nextTick, onMounted, onUnmounted, shallowRef } from 'vue'
import * as echarts from 'echarts'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const chart = shallowRef(null)
const chartRef = ref(null)
const setEChartsBar = () => {
  chart.value = echarts.init(chartRef.value)
  const yearCount = 7
  const categoryCount = 30
  const xAxisData = []
  const customData = []
  const legendData = []
  const dataList = []
  legendData.push('trend')
  const encodeY = []
  for (let i = 0; i < yearCount; i++) {
    legendData.push(2016 + i + '')
    dataList.push([])
    encodeY.push(1 + i)
  }
  for (let i = 0; i < categoryCount; i++) {
    const val = Math.random() * 1000
    xAxisData.push('category' + i)
    const customVal = [i]
    customData.push(customVal)
    for (let j = 0; j < dataList.length; j++) {
      let value
      if (j === 0) {
        value = echarts.number.round(val, 2)
      } else {
        value = echarts.number.round(Math.max(0, dataList[j - 1][i] + (Math.random() - 0.5) * 200), 2)
      }
      dataList[j].push(value)
      customVal.push(value)
    }
  }
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    title: {
      text: t('trendAnalytics'),
      top: '4%',
      left: '12px',
      textStyle: {
        color: '#8f9bb3'
      }
    },
    legend: {
      data: legendData,
      itemWidth: 15,
      itemGap: 20,
      textStyle: {
        color: '#8f9bb3',
        fontFamily: 'sans-serif',
        fontSize: 15,
        lineHeight: 20,
        fontWeight: 'normal'
      },
      top: '7%',
      right: '12%',
      bottom: '30'
    },
    grid: {
      top: '20%'
    },
    dataZoom: [
      {
        type: 'slider',
        start: 50,
        end: 70
      },
      {
        type: 'inside',
        start: 50,
        end: 70
      }
    ],
    xAxis: {
      data: xAxisData
    },
    yAxis: {},
    series: [
      {
        type: 'custom',
        name: 'trend',
        renderItem: function (params, api) {
          const xValue = api.value(0)
          const currentSeriesIndices = api.currentSeriesIndices()
          const barLayout = api.barLayout({
            barGap: '30%',
            barCategoryGap: '20%',
            count: currentSeriesIndices.length - 1
          })
          const points = []
          for (let i = 0; i < currentSeriesIndices.length; i++) {
            const seriesIndex = currentSeriesIndices[i]
            if (seriesIndex !== params.seriesIndex) {
              const point = api.coord([xValue, api.value(seriesIndex)])
              point[0] += barLayout[i - 1].offsetCenter
              point[1] -= 20
              points.push(point)
            }
          }
          const style = {
            stroke: api.visual('color'),
            fill: 'none'
          }
          return {
            type: 'polyline',
            shape: {
              points: points
            },
            style
          }
        },
        itemStyle: {
          borderWidth: 2
        },
        encode: {
          x: 0,
          y: encodeY
        },
        data: customData,
        z: 100
      },
      ...dataList.map(function (data, index) {
        return {
          type: 'bar',
          animation: false,
          name: legendData[index + 1],
          data: data
        }
      })
    ]
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
.bar-chart {
  width: 100%;
  height: 480px;
}
</style>
