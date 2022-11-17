<template>
  <div>这是一个IoT Dashboard测试界面</div>
  <div>
    <el-button type="primary" @click="sendRequest">请求测试按钮</el-button>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import request from "@/utils/http/request";

export default {
  name: 'Workflow',
  setup() {
    const state = reactive({})

    const sendRequest = () => {
      const res = request({
        url: "/api/get",
        method: "get",
        data: {},
      });
      console.log(res);
    };
    onBeforeMount(() => { })
    onMounted(() => { })
    return {
      ...toRefs(state),
      sendRequest
    }
  },
}

</script>
<style scoped lang='scss'>

</style>
