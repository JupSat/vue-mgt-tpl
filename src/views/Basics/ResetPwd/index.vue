<template>
  <div class="reset-pwd">
    <div class="title">
      <h1>{{ $t('resetPassword') }}</h1>
    </div>
    <el-form
      ref="resetPwdRef"
      :model="formData"
      status-icon
      :hide-required-asterisk="true"
      :rules="rules"
      @keyup.enter="submitForm"
    >
      <el-form-item prop="email">
        <el-input v-model="formData.email" autocomplete="off" :placeholder="$t('plzEnterEmail')">
          <template #append>
            <Captcha :email="formData.email"></Captcha>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="validCod">
        <el-input
          v-model.number="formData.validCod"
          maxlength="6"
          autocomplete="off"
          :placeholder="$t('plzEnterCaptcha')"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="formData.password" type="password" :placeholder="$t('plzEnterPwd')" show-password></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input
          v-model="formData.checkPass"
          type="password"
          :placeholder="$t('plzEnterPwdAgain')"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item>
        <div class="btn">
          <el-button type="primary" style="width: 100%" @click="submitForm">{{ $t('confirmReset') }}</el-button>
        </div>
        <div class="go-login">
          <span class="to-login" @click="toLogin">
            <em>{{ $t('signIn') }}</em>
          </span>
          <Language />
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'ResetPassword'
}
</script>

<script setup>
import { reactive, ref, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import { resetPwdApi } from '@/api/user'
import { message } from '@/utils/message'
import Language from '@/components/Language'
import Captcha from '@/components/Captcha'
import { regPwd, getValidator } from '@/utils/validate'
const resetPwdRef = ref()

const formData = reactive({
  email: '',
  validCod: '',
  password: '',
  checkPass: ''
})

const { t } = useI18n()

const validatePwdAgain = (rule, value, callback) => {
  if (!value) {
    callback(new Error(t('plzEnterPwdAgain')))
  } else if (value !== formData.password) {
    callback(new Error(t('pwdInconsistent')))
  } else {
    callback()
  }
}

const rules = reactive({
  email: [
    getValidator('plzEnterEmail'),
    {
      type: 'email',
      message: t('plzEnterCorrectEmail'),
      trigger: ['blur', 'change']
    }
  ],
  validCod: [getValidator('plzEnterCaptcha')],
  password: [getValidator('pwdLenIn6To10'), { validator: regPwd, trigger: 'blur' }],
  checkPass: [{ validator: validatePwdAgain, trigger: 'blur' }]
})

const submitForm = () => {
  if (!resetPwdRef.value) return
  resetPwdRef.value.validate(async (valid) => {
    if (valid) {
      const res = await resetPwdApi(formData)
      if (res && res.status === 200) {
        message('重置密码成功！即将跳转到登录界面')
        toLogin()
      }
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const emit = defineEmits(['toLogin'])
const toLogin = () => {
  emit('toLogin')
}
</script>

<style lang="scss" scoped>
@import '@/styles/switchTheme.scss';

.reset-pwd {
  width: 365px;
  background-color: #13152c;
  padding: 40px;
  border-radius: 10px;

  .go-login {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 12px;
    cursor: pointer;

    .to-login {
      color: #9fa2a8;

      em {
        color: #2878ff;
        margin-left: 5px;
      }
    }
  }
}
</style>
