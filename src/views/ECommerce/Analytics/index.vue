<template>
  <div class="e-commerce">
    <el-row :gutter="32">
      <el-col :span="10">
        <el-row class="inner-row">
          <el-col :span="11">
            <StatusCard></StatusCard>
          </el-col>
          <el-col :span="11">
            <EarningCard></EarningCard>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <TrafficCard></TrafficCard>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="14">
        <ChartsCard></ChartsCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Analytics'
}
</script>

<script setup>
import StatusCard from '@/views/ECommerce/StatusCard'
import EarningCard from '@/views/ECommerce/EarningCard'
import TrafficCard from '@/views/ECommerce/TrafficCard'
import ChartsCard from '@/views/ECommerce/ChartsCard'
</script>

<style scoped lang="scss">
.e-commerce {
  .el-row {
    display: flex;
    margin-bottom: 30px;
  }

  .inner-row {
    display: flex;
    justify-content: space-between;
  }
}
</style>
