<template>
  <div class="summary-content">
    <el-row :gutter="32">
      <el-col :span="8">
        <div class="content-card">
          <div class="total">
            <div>Total Revenue</div>
            <div class="content-type">
              <span>$ 666.66</span>
              <div>
                36% <el-icon><TopRight /></el-icon>
              </div>
            </div>
            <div>Close target</div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="content-card">
          <div class="total">
            <div>Invoice</div>
            <div class="content-type">
              <span>$ 888.88</span>
              <div class="invoice">
                36% <el-icon><BottomRight /></el-icon>
              </div>
            </div>
            <div>Average</div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="content-card">
          <div class="total">
            <div>Total Saves</div>
            <div class="content-type">
              <span>$ 999.99</span>
              <div>
                18% <el-icon><TopRight /></el-icon>
              </div>
            </div>
            <div>In Draft</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <div class="trend-chart">
        <TrendChart></TrendChart>
      </div>
    </el-row>
    <el-row :gutter="32">
      <EmployeesTable></EmployeesTable>
    </el-row>
  </div>
</template>

<script>
import TrendChart from '@/components/Overview/TrendChart'
import EmployeesTable from '@/components/Overview/EmployeesTable'

import { reactive, toRefs } from 'vue'

export default {
  name: 'Summary',
  components: {
    TrendChart,
    EmployeesTable
  },
  setup() {
    const data = reactive({
      transactions: [
        { id: 'dropBox', value: '$5000' },
        { id: 'StarBucks', value: '$3500' },
        { id: 'McDonalds', value: '$5000' }
      ]
    })
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/switchTheme.scss';

.summary-content {
  .el-row {
    display: flex;
    margin-bottom: 30px;
  }

  .inner-row {
    display: flex;
    justify-content: space-between;
  }

  .trend-chart {
    width: 100%;
    height: 450px;
    margin-right: 16px;
    margin-left: 16px;
    border-radius: 4px;
    @include bg_color('secondaryColor');
  }
}

.content-card {
  border-radius: 4px;
  @include bg_color('secondaryColor');

  .total {
    padding: 18px;
    color: #8f9bb3;
    > div {
      padding: 5px 0;
    }
    .content-type {
      display: flex;
      color: #409eff;

      span:nth-child(1) {
        font-family: Open Sans, sans-serif;
        font-size: 20px;
        font-weight: 600;
      }

      div:nth-child(2) {
        display: flex;
        align-items: center;
        padding: 0 15px;
        margin-left: 130px;
        border-radius: 50px;
        color: green;
        background: #daf3eb;

        > i {
          margin-left: 5px;
        }
      }

      .invoice {
        color: red !important;
        background: #fcdddd !important;
      }
    }
  }
}
</style>
