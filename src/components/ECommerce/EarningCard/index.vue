<template>
  <div class="earning-card">
    <div class="card-body">
      <div class="front-container">
        <div class="front-card-header">
          <div class="header-select">
            <el-select v-model="coinType" popper-class="custom-select">
              <el-option :label="$t('bitcoin')" :value="0" />
              <el-option :label="$t('tether')" :value="90" />
              <el-option :label="$t('ethereum')" :value="45" />
            </el-select>
          </div>
          <el-icon class="arrow-right" :size="15">
            <ArrowRight />
          </el-icon>
        </div>
        <div class="front-card-body chart-pdg">
          <div class="chart-info">
            <div>{{ $t('dailyIncome') }}</div>
            <div class="h6">584</div>
            <div class="percent">
              <span>
                <el-icon :color="'#ff3d71'">
                  <CaretBottom />
                </el-icon>
              </span>
              21%
            </div>
          </div>
          <div id="earningCardId" class="body-chart"></div>
        </div>
      </div>
    </div>
    <div class="back-container"></div>
  </div>
</template>

<script>
export default {
  name: 'EarningCard'
}
</script>
<script setup>
import { reactive, toRefs, onMounted } from 'vue'
import * as echarts from 'echarts'

const state = reactive({
  eChartData: [],
  coinType: 0
})

let startNum = 0
let endNum = 60

const setEChartsLine = () => {
  const chart = document.getElementById('earningCardId')
  const myChart2 = echarts.init(chart)
  let option = null

  let base = +new Date(2022, 9, 3)
  const oneDay = 24 * 3600 * 1000
  state.eChartData = [[base, Math.random() * 200]]
  for (let i = 1; i < 200; i++) {
    const now = new Date((base += oneDay))
    state.eChartData.push([+now, Math.round((Math.random() - 0.5) * 10 + state.eChartData[i - 1][1])])
  }

  option = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return ['10%']
      }
    },
    grid: {
      show: false,
      top: '0',
      left: '0',
      right: '0'
    },
    dataZoom: [
      {
        type: 'slider',
        show: false,
        realtime: true,
        start: 0,
        end: 100,
        xAxisIndex: [0],
        filterMode: 'none'
      }
    ],
    xAxis: {
      show: false,
      type: 'time',
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    yAxis: {
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    series: [
      {
        name: 'Bitcoin',
        data: state.eChartData,
        type: 'line',
        symbol: 'circle',
        sampling: 'average',

        emphasis: {
          itemStyle: {
            opacity: 0
          }
        },
        lineStyle: {
          width: 0
        },
        areaStyle: {
          color: 'rgba(51, 102, 255)',
          opacity: 1
        }
      }
    ]
  }

  setInterval(() => {
    startNum = startNum + 0.1
    endNum = endNum + 0.1
    if (endNum >= 100) {
      startNum = 0
      endNum = 60
    }
    myChart2.dispatchAction({
      type: 'dataZoom',
      start: startNum,
      end: endNum
    })
  }, 100)

  option && myChart2.setOption(option)
}

const initECharts = () => {
  setEChartsLine()
}

onMounted(() => {
  initECharts()
})

const { coinType } = toRefs(state)
</script>
<style scoped lang="scss">
@import '@/styles/switchTheme.scss';

.earning-card {
  height: 216px;
  @include bg_color('secondaryColor');
  border-radius: 4px;
  box-shadow: 0 0 #0000, 0 0 #0000, inset 0px 1px 0px hsl(0deg 0% 100% / 10%);

  .card-body {
    width: 100%;
    height: 100%;

    .front-container {
      height: 100%;

      .front-card-header {
        position: relative;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #151a30;
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
        @include font_color('fontColor');
        font-family: Open Sans, sans-serif;
        font-size: 0.9375rem;
        font-weight: 600;
        line-height: 1.5rem;

        .header-select {
          height: 35px;
          margin-top: -5px;
          padding-right: 35px;

          .el-select {
            width: 105px;
            border-radius: 4px;
            @include bg_color('mainColor');
          }
        }

        .header-title::before {
          content: '$';
          margin-right: 10px;
        }

        .arrow-right {
          position: absolute;
          right: 10px;
          top: 22px;
          cursor: pointer;
        }
      }

      .front-card-body {
        width: 212px;
        height: 100%;

        .chart-info {
          position: relative;
          display: flex;
          flex-direction: column;
          margin: 0 15px 20px;

          .percent {
            position: absolute;
            display: inline-block;
            top: 0;
            right: 0;
          }
        }

        .body-chart {
          width: 100%;
          height: 73%;
        }
      }

      .chart-pdg {
        padding: 15px 0 0;
      }
    }
  }
}
</style>
