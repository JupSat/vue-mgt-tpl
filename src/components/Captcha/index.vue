<template>
  <div>
    <el-button
      :disabled="sendingCode"
      :loading="loading"
      @click="sendVerificationCode(email)"
      type="primary"
      class="captcha"
      v-show="showTimer"
    >
      {{ $t('getCaptcha') }}
    </el-button>
    <span v-show="!showTimer">{{ count }}s后重新获取</span>
  </div>
</template>

<script>
export default {
  name: 'Captcha'
}
</script>

<script setup>
import { reactive, toRefs, defineProps } from 'vue'
import { sendVerificationCodeToEmail, checkEmail } from '@/utils/email'
const data = reactive({
  sendingCode: false,
  loading: false,
  timer: null,
  count: 0,
  showTimer: true
})

defineProps({
  email: {
    type: String,
    default: ''
  }
})
const sendVerificationCode = async (email) => {
  const flag = checkEmail(email)
  if (flag) {
    data.sendingCode = true
    data.loading = true
    const res = await sendVerificationCodeToEmail(email)

    if (res === 'succuss') {
      data.sendingCode = false
      data.loading = false

      const timeCount = 60
      if (!data.timer) {
        data.count = timeCount
        data.showTimer = false
        data.timer = setInterval(() => {
          if (data.count > 0 && data.count <= timeCount) {
            data.count--
          } else {
            data.showTimer = true
            clearInterval(data.timer)
            data.timer = null
          }
        }, 1000)
      }
    }
  }
}

const { sendingCode, loading, count, showTimer } = toRefs(data)
</script>
<style scoped lang="scss">
.captcha {
  background-color: #409eff !important;
  color: #fff !important;
  height: 34px;
}
</style>
