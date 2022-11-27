<template>
  <div class="traffic-card">
    <div class="card-header">
      <div class="header-info">
        <span>{{ $t('traffic') }}</span>
        <div class="header-select">
          <el-select v-model="dataType" popper-class="custom-select">
            <el-option :label="$t('year')" :value="0" />
            <el-option :label="$t('month')" :value="90" />
            <el-option :label="$t('week')" :value="45" />
          </el-select>
        </div>
      </div>
      <el-icon class="arrow" :size="15">
        <ArrowUp />
      </el-icon>
    </div>
    <div class="card-body">
      <div class="body-list">
        <div
          class="list-item item"
          v-for="(item, index) in trafficList"
          :key="index"
        >
          <span class="">{{ item.year }}</span>
          <span class="">{{ item.number }}</span>
          <span :class="item.flag === 0 ? 'number-tip-up' : 'number-tip-down'">
            <el-icon class="arrow" :size="15">
              <CaretTop />
            </el-icon>
            <span>{{ item.percent }}%</span>
          </span>
          <div class="item-bar">
            <span class="year">{{ item.year - 1 }}</span>
            <div class="bar-container" style="height: 76%">
              <div class="bar-prev"></div>
            </div>
            <div class="bar-container" style="height: 88%">
              <div
                class="bar-now"
                :class="{ 'now-status': item.flag === 1 }"
              ></div>
            </div>
            <span class="year">{{ item.year }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'TrafficCard',
  setup() {
    const state = reactive({
      dataType: 0,
      trafficList: [
        { year: 2015, number: 19, percent: 12, flag: 0 },
        { year: 2016, number: 943, percent: 0, flag: 0 },
        { year: 2017, number: 215, percent: 12, flag: 0 },
        { year: 2018, number: 237, percent: 36, flag: 1 },
        { year: 2019, number: 342, percent: 52, flag: 1 },
        { year: 2020, number: 246, percent: 56, flag: 1 },
        { year: 2021, number: 645, percent: 62, flag: 1 },
        { year: 2022, number: 375, percent: 43, flag: 0 },
        { year: 2023, number: 0, percent: 0, flag: 0 }
      ]
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/switchTheme.scss';

.traffic-card {
  width: 100%;
  height: 339px;
  text-align: left;
  @include bg_color('secondaryColor');
  border-radius: 4px;
  overflow: hidden;

  .card-header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #151a30;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    @include font_color('fontColor');
    font-family: Open Sans, sans-serif;
    font-size: 0.9375rem;
    font-weight: 600;
    line-height: 1.5rem;

    .header-info {
      display: flex;
      align-items: center;
      justify-content: space-between;

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
    }

    .arrow {
      position: absolute;
      top: 22px;
      right: 20px;
      cursor: pointer;
    }
  }

  .card-body {
    .body-list {
      height: 100%;

      .list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;

        border-bottom: 1px solid #151a30;
        @include font_color('fontColor');
        font-family: Open Sans, sans-serif;
        font-size: 0.9375rem;
        font-weight: 400;
        line-height: 1.25rem;
        padding: 1rem;

        .number-tip-up {
          color: #00d68f;
        }

        .number-tip-down {
          color: #ff3d71;
        }

        .item-bar {
          display: flex;
          align-items: flex-end;
          flex: 1;
          height: 1.25rem;
          max-width: 7rem;

          .year {
            font-family: Open Sans, sans-serif;
            font-size: 0.75rem;
            line-height: 1rem;
            color: #8f9bb3;
          }

          .bar-container {
            flex: 1;
            margin-bottom: 0.1875rem;

            .bar-prev {
              height: 100%;
              width: 0.7rem;
              margin-left: auto;
              margin-right: 0.25rem;
              @include bg_color('mainColor');
            }

            .bar-now {
              height: 100%;
              width: 0.7rem;
              margin-left: 0.25rem;
              margin-right: auto;
              background-color: #00d68f;
            }

            .now-status {
              background-color: #ff3d71;
            }
          }
        }
      }

      .item > * {
        flex: 1;
      }
    }
  }
}
</style>
