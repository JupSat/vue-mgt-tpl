<template>
  <div class="summary-content">
    <el-row :gutter="32">
      <el-col :span="8">
        <div class="content-card">
          <div class="total">
            <div class="total-left">
              <div>{{ $t('totalRevenue') }}</div>
              <div class="content-type">$ 6666.66</div>
              <div>{{ $t('closeTarget') }}</div>
            </div>
            <div class="total-right">
              <el-progress type="circle" :percentage="36">
                <template #default="{ percentage }">
                  <span class="percentage-value">{{ percentage }}%</span>
                </template>
              </el-progress>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="content-card">
          <div class="total">
            <div class="total-left">
              <div>{{ $t('invoice') }}</div>
              <div class="content-type">$ 888.88</div>
              <div>{{ $t('average') }}</div>
            </div>
            <div class="total-right">
              <el-progress type="circle" :percentage="46">
                <template #default="{ percentage }">
                  <span class="percentage-value">{{ percentage }}%</span>
                </template>
              </el-progress>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="content-card">
          <div class="total">
            <div class="total-left">
              <div>{{ $t('totalSaves') }}</div>
              <div class="content-type">$ 999.99</div>
              <div>{{ $t('inDraft') }}</div>
            </div>
            <div class="total-right">
              <el-progress type="circle" :percentage="88">
                <template #default="{ percentage }">
                  <span class="percentage-value">{{ percentage }}%</span>
                </template>
              </el-progress>
            </div>
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
export default {
  name: 'Summary'
}
</script>
<script setup>
import TrendChart from '@/views/Overview/TrendChart'
import EmployeesTable from '@/views/Overview/EmployeesTable'
</script>

<style scoped lang="scss">
@import '@/styles/switchTheme.scss';

.summary-content {
  height: 100%; // 不必是100vh，只需要是该容器显示的最大高度即可
  overflow-x: hidden;
  .el-row {
    display: flex;
    margin-bottom: 30px;
  }

  .trend-chart {
    width: 100%;
    height: 520px;
    margin-right: 16px;
    margin-left: 16px;
    border-radius: 4px;
    @include bg_color('secondaryColor');
    box-shadow: 0 0 #0000, 0 0 #0000, inset 0px 1px 0px hsl(0deg 0% 100% / 10%);
  }
}

.content-card {
  border-radius: 4px;
  @include bg_color('secondaryColor');
  box-shadow: 0 0 #0000, 0 0 #0000, inset 0px 1px 0px hsl(0deg 0% 100% / 10%);

  .total {
    display: flex;
    justify-content: space-between;
    padding: 18px;
    color: #8f9bb3;
    &-left > div {
      padding: 10px 0;
    }

    &-right {
      margin-right: 35px;

      .percentage-value {
        font-family: Open Sans, sans-serif;
        font-size: 30px;
        font-weight: 600;
        color: #85ea8e;
      }
    }
    .content-type {
      display: flex;
      color: #f8b13a;
      font-family: Open Sans, sans-serif;
      font-size: 20px;
      font-weight: 600;
    }
  }
}
</style>
