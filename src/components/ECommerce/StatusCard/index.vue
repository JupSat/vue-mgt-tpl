<template>
  <div class="status-card">
    <div class="card-body">
      <div class="front-container">
        <div class="front-card-header">
          <div class="header-title">{{ $t('profit') }}</div>
          <el-icon class="arrow-right" :size="15">
            <ArrowRight />
          </el-icon>
        </div>
        <div class="front-card-body">
          <div id="statusCardId" class="body-chart"></div>
        </div>
      </div>
      <div class="back-container"></div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import * as echarts from "echarts";
import { useI18n } from 'vue-i18n'

export default {
  name: "StatusCard",
  setup() {
    const { t } = useI18n();
    const setEChartsLine = () => {
      let chart1 = document.getElementById("statusCardId");
      let myChart = echarts.init(chart1);
      let option = null;
      let xAxisData = [];
      let data1 = [];
      let data2 = [];
      for (let i = 0; i < 80; i++) {
        xAxisData.push("A" + i);
        data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 10);
        data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 10);
      }
      option = {
        // title: {
        //   text: "Bar Animation Delay",
        // },
        legend: {
          data: [t("transactions"), t("orders")],
          itemWidth: 15,
          textStyle: {
            color: "white",
          },
        },
        grid: {
          show: false,
          top: "0%",
          left: "0%",
          right: "0%",
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#151a30"],
              width: "0.5",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        series: [
          {
            name: t("transactions"),
            type: "bar",
            data: data1,
            emphasis: {
              focus: "series",
            },
            animationDelay: function (idx) {
              return idx * 10;
            },
          },
          {
            name: t("orders"),
            type: "bar",
            data: data2,
            emphasis: {
              focus: "series",
            },
            animationDelay: function (idx) {
              return idx * 10 + 100;
            },
          },
        ],
        animationEasing: "elasticOut",
        animationDelayUpdate: function (idx) {
          return idx * 5;
        },
      };

      option && myChart.setOption(option);
    };

    const initECharts = () => {
      setEChartsLine();
    };

    onMounted(() => {
      initECharts();
    });

    return {
      setEChartsLine,
      initECharts,
    };
  },
};
</script>

<style scoped lang="scss">
.status-card {
  height: 216px;
  background-color: #222b45;
  border-radius: 4px;

  .card-body {
    width: 100%;
    height: 100%;

    .front-container {
      width: 100%;
      height: 100%;

      .front-card-header {
        position: relative;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #151a30;
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
        color: #fff;
        font-family: Open Sans, sans-serif;
        font-size: 0.9375rem;
        font-weight: 600;
        line-height: 1.5rem;

        .header-title::before {
          content: "$";
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
        width: 225px;
        height: 100%;

        .body-chart {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
