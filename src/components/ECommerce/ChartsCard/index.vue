<template>
  <div class="chart-card">
    <div class="tab-set">
      <el-tabs v-model="activeName" class="tabs-body">
        <div class="summary-container">
          <div>
            <div>{{ $t('marketplace') }}</div>
            <div class="total">3654</div>
          </div>
          <div>
            <div>{{ $t('lastMonth') }}</div>
            <div class="total">946</div>
          </div>
          <div>
            <div>{{ $t('lastWeek') }}</div>
            <div class="total">654</div>
          </div>
          <div>
            <div> {{ $t('today') }}</div>
            <div class="total">230</div>
          </div>
        </div>
        <div class="header-select">
          <el-select v-model="dataType" popper-class="custom-select">
            <el-option :label="$t('year')" :value="0" />
            <el-option :label="$t('month')" :value="90" />
            <el-option :label="$t('week')" :value="45" />
          </el-select>
        </div>
        <el-tab-pane :label="$t('orders')" name="Orders">
          <div class="chart-header">
            <div class="legend-chart"></div>
          </div>
          <OrderChart v-if="activeName === 'Orders'"></OrderChart>
        </el-tab-pane>

        <el-tab-pane :label="$t('profit')" name="Profit">
          <div class="chart-header">
            <div class="legend-chart"></div>
          </div>
          <ProfitChart v-if="activeName === 'Profit'"></ProfitChart>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import OrderChart from "@/components/ECommerce/ChartsCard/OrderChart";
import ProfitChart from "@/components/ECommerce/ChartsCard/ProfitChart";

export default {
  name: "ChartsCard",
  components: {
    OrderChart,
    ProfitChart
  },
  setup() {
    const state = reactive({
      dataType: 0,
      activeName: 'Orders',
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style scoped lang="scss">
.chart-card {
  width: 100%;
  height: 586px;
  // background-color: cadetblue;
  border-radius: 4px;

  .tab-set {
    height: 100%;
    background-color: #222b45;
    border: 0.0625rem solid #101426;
    border-radius: 0.25rem;
    box-shadow: none;
    color: #fff;
    font-family: Open Sans, sans-serif;
    font-size: .9375rem;
    font-weight: 400;
    line-height: 1.25rem;
    margin-bottom: 1.875rem;

    :deep(.el-tabs__item) {
      background-color: transparent;
      cursor: pointer;
      padding: 1rem 7rem;
      color: #8f9bb3;
      font-family: Open Sans, sans-serif;
      font-size: .875rem;
      font-weight: 700;
      line-height: 1rem;
      text-transform: uppercase;
    }

    :deep(.el-tabs__item:hover) {
      color: #409EFF;
    }

    .tabs-body {
      height: 100%;

      :deep(.el-tabs__header) {
        margin: 0;
      }

      :deep(.el-tabs__content) {
        height: 100%;
      }

      :deep(.el-tabs__nav) {
        padding: 10px;
      }


      :deep(.el-tabs__nav-scroll) {
        display: flex;
        align-items: center;
        justify-content: space-around;
      }


      :deep(.el-tabs__active-bar) {
        min-width: 180px !important;
        height: 4px;
        left: -25px;
        bottom: 0px;
        border-radius: 3px;
        background-color: rgba(51, 102, 255);
      }

      :deep(.el-tabs__active-bar::before) {
        background-color: #36f;
        // position: absolute;
        content: '';
        width: 100%;
        border-radius: 3px;
        // bottom: -2px;
        left: 0;
      }

      :deep(.el-tabs__nav-wrap::after) {
        width: 0;
      }

      .summary-container {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        background-color: #192038;
        justify-content: space-between;
        padding: 2rem 4rem 1rem;
        border: 1px solid #151a30;
        border-right: none;
        border-left: none;

        .total {
          font-size: 1.125rem;
          font-family: Open Sans, sans-serif;
          font-weight: 700;
          line-height: 1.5rem;
        }
      }

      .header-select {
        position: absolute;
        right: 57px;
        top: 115px;
        z-index: 1000;

        .el-select {
          width: 105px;
          border-radius: 4px;
          background-color: #192038;
        }
      }

      .el-tab-pane {
        height: 100%;
      }
    }
  }
}
</style>
