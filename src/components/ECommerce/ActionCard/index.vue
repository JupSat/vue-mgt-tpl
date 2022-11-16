<template>
  <div class="action-card">
    <div class="icon-container">
      <div class="icon">
        <el-icon :size="40" color="white">
          <component :is="iconName" />
        </el-icon>
      </div>
    </div>
    <div class="details">
      <div class="title h6">
        {{ $t(title) }}
      </div>
    </div>
    <div class="actions">
      <a href="" class="danger size-large">{{ $t(tip) }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActionCard",
  props: {
    iconName: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    tip: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {};
  },
};
</script>
<style lang="scss">
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
</style>
