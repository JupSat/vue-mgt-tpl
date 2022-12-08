<template>
  <div class="e-commerce">
    <!-- <el-row :gutter="32">
      <el-col :span="12">
        <ActionCard
          :iconName="'Platform'"
          title="systemCustomization"
          tip="contactUS"
        ></ActionCard>
      </el-col>
      <el-col :span="12">
        <ActionCard :iconName="'Management'" title="docArticle" tip="learnMore">
        </ActionCard>
      </el-col>
    </el-row> -->
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
// import ActionCard from '@/components/ECommerce/ActionCard'
import StatusCard from '@/components/ECommerce/StatusCard'
import EarningCard from '@/components/ECommerce/EarningCard'
import TrafficCard from '@/components/ECommerce/TrafficCard'
import ChartsCard from '@/components/ECommerce/ChartsCard'

export default {
  name: 'Analytics',
  components: {
    // ActionCard,
    StatusCard,
    EarningCard,
    TrafficCard,
    ChartsCard
  },
  setup() {
    return {}
  }
}
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
