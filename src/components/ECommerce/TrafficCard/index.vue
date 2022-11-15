<template>
  <div class="traffic-card">
    <div class="card-header">
      <div class="header-info">
        <span>Traffic</span>
        <div class="header-select">
          <el-select v-model="dataType">
            <el-option label="Year" :value="0" />
            <el-option label="Month" :value="90" />
            <el-option label="Week" :value="45" />
          </el-select>
        </div>

      </div>
      <el-icon class="arrow" :size="15">
        <ArrowUp />
      </el-icon>
    </div>
    <div class="card-body">
      <div class="body-list">
        <div class="list-item item" v-for="(item, index) in trafficList" :key="index">
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
            <div class="bar-container" style="height: 76%;">
              <div class="bar-prev"></div>
            </div>
            <div class="bar-container" style="height: 88%;">
              <div class="bar-now" :class="{ 'now-status': item.flag === 1 }"></div>
            </div><span class="year">{{ item.year }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue"
export default {
  name: "TrafficCard",
  setup() {
    const state = reactive({
      dataType: 0,
      trafficList:
        [{ year: 2015, number: 19, percent: 12, flag: 0 },
        { year: 2016, number: 943, percent: 0, flag: 0 },
        { year: 2017, number: 215, percent: 12, flag: 0 },
        { year: 2018, number: 237, percent: 36, flag: 1 },
        { year: 2019, number: 342, percent: 52, flag: 1 },
        { year: 2020, number: 246, percent: 56, flag: 1 },
        { year: 2021, number: 645, percent: 62, flag: 1 },
        { year: 2022, number: 375, percent: 43, flag: 0 },
        { year: 2023, number: 0, percent: 0, flag: 0 }],
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style scoped lang="scss">
.e-commerce {
  .el-row {
    display: flex;
    margin-bottom: 30px;
  }

  .action-card {
    display: flex;
    align-items: center;
    border-radius: 4px;
    min-height: 94px;
    background-color: #222b45;

    .icon-container {
      height: 100%;
      padding: 10px;

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 92px;
        height: 74px;
        border-radius: 4px;
        background-color: #36f;
      }
    }

    .details {
      // flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 50%;
      height: 100%;
      border-left: 1px solid transparent;
      padding: 0 0.5rem 0 0.625rem;

      .title {
        margin: 0;
      }

      .h6 {
        font-size: 1.125rem;
        font-family: Open Sans, sans-serif;
        font-weight: 700;
        line-height: 1.5rem;
      }
    }

    .actions {
      padding: 0 10px 0 5px;

      .danger {
        background-image: linear-gradient(90deg, #ff708d, #ff3d71);
        border: none;
        box-shadow: 0 0 0 0 #db2c66, 0 0 0 0 #b81d5b, 0 0 transparent;
        color: #fff;
        border-radius: 4px;
      }

      .size-large {
        padding: 0.875rem 1.1875rem;
      }
    }
  }

  .inner-row {
    .item-card {
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

            .header-select {
              height: 35px;
              margin-top: -5px;
              padding-right: 35px;

              .el-select {
                width: 105px;
                border-radius: 4px;
                background-color: #192038;
              }
            }

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
              height: 73%;
            }
          }

          .chart-pdg {
            padding: 15px 0 0;
          }
        }
      }
    }
  }

  .traffic-card {
    width: 100%;
    height: 339px;
    text-align: left;
    background-color: #222b45;
    border-radius: 4px;
    overflow: hidden;

    .card-header {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #151a30;
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 0.25rem;
      color: #fff;
      font-family: Open Sans, sans-serif;
      font-size: .9375rem;
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
            background-color: #192038;
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
          color: #fff;
          font-family: Open Sans, sans-serif;
          font-size: .9375rem;
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
              font-size: .75rem;
              line-height: 1rem;
              color: #8f9bb3;
            }

            .bar-container {
              flex: 1;
              margin-bottom: 0.1875rem;

              .bar-prev {
                height: 100%;
                width: .7rem;
                margin-left: auto;
                margin-right: 0.25rem;
                background-color: #151a30;
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

        .item>* {
          flex: 1;
        }

      }
    }
  }

  .order-card {
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
          left: -60px;
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

          .bar-chart {
            height: calc(100% - 150px);
          }
        }
      }
    }
  }
}

:deep(.el-popper-container-1717) {
  .is-light {
    background: none;
    border: none;
  }
}

:deep(.el-input__wrapper) {
  padding: 0;

  .el-input__inner {
    border-radius: 3px;
    border-color: #101426;
    color: #fff;
    background-color: #192038;
    font-size: 0.9375rem;
    font-weight: 600;
    line-height: 1.5rem;
  }
}
</style>
