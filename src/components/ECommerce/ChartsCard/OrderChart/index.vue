<template>
  <div id="chartBar" ref="orderChart" class="bar-chart"></div>
</template>

<script>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import { useI18n } from 'vue-i18n'

export default {
  name: "OrderChart",
  setup() {
    const { t } = useI18n();

    const setEChartsBar = () => {
      const id = "chartBar"
      let chart = null;
      let chartInstance = null;
      let option = null;
      chart = document.getElementById(id);
      chartInstance = echarts.init(chart);

      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(0, 0, 0, 0.3)',
            },
          },
        },
        grid: {
          show: true,
          top: "20%",
          right: "5%",
          bottom: "30",
          containLabel: true,
          // borderWidth: 0.5,
          borderColor: "#151a30",
        },
        legend: {
          data: [t("payment"), t("canceled"), t("allOrders")],
          itemWidth: 15,
          itemGap: 20,
          textStyle: {
            color: "white",
            fontFamily: "sans-serif",
            fontSize: 15,
            lineHeight: 20,
            fontWeight: "normal",
          },
          top: "7%",
          left: "9%",
          bottom: '30'
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: true, alignWithLabel: true, lineStyle: { color: '#151a30' } },
            data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],

            axisLine: {
              lineStyle: {
                color: "#151a30",
              },
            },
            axisLabel: {
              color: "#8f9bb3",
              fontSize: 16
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: { show: true, lineStyle: { color: '#151a30' } },
            axisLine: {
              lineStyle: {
                color: '#151a30',
              },
            },

            splitLine: {
              show: true,
              lineStyle: {
                color: ["#151a30"],
                // width: "0.5",
              },
            },
            axisLabel: {
              color: "#8f9bb3",
              fontSize: 16
            },
          }
        ],
        series: [
          {
            name: t("payment"),
            type: 'bar',
            barGap: 0,
            emphasis: {
              focus: 'series'
            },
            itemStyle: {
              color: "#ffd438"
            },
            data: [320, 332, 301, 334, 390, 353, 489]
          },
          {
            name: t("canceled"),
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            itemStyle: {
              color: "#3366ff"
            },
            data: [220, 182, 191, 234, 290, 253, 172]
          },
          {
            name: t("allOrders"),
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            itemStyle: {
              color: "#21e298"
            },
            data: [150, 232, 201, 154, 190, 218, 129]
          }
        ]
      };

      option && chartInstance.setOption(option);
    };

    const orderChart = ref(null);

    onMounted(() => {
      setEChartsBar()
    });

    return {
      setEChartsBar,
      orderChart,
    };
  },
};
</script>

<style scoped lang="scss">
.bar-chart {
  width: 100%;
  height: calc(100% - 150px);
}
</style>
