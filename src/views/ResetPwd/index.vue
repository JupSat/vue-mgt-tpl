<template>
  <div class="reset-pwd">
    <div class="title">
      <h3>{{ $t('forgotPassword') }}</h3>
    </div>
    <el-form ref="resetPwdRef" :model="formData" status-icon :hide-required-asterisk="true" :rules="rules">
      <el-form-item prop="email">
        <el-input v-model="formData.email" autocomplete="off" :placeholder="$t('plzEnterEmail')">
          <template #append>
            <el-button :disabled="sendingCode">{{ $t('getCaptcha') }}</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="validCod">
        <el-input v-model.number="formData.validCod" maxlength="6" autocomplete="off"
          :placeholder="$t('plzEnterCaptcha')"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="formData.password" type="password" autocomplete="off" :placeholder="$t('plzEnterPwd')">
        </el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input v-model="formData.checkPass" type="password" autocomplete="off" :placeholder="$t('plzEnterPwdAgain')">
        </el-input>
      </el-form-item>

      <el-form-item>
        <div class="btn-reset">
          <el-button type="primary" style="width: 100%">{{ $t('confirm') }}</el-button>
        </div>
        <div class="go-login">
          <span class="to-login" @click="toLogin"><em>{{ $t('signIn') }}</em></span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { reactive, toRefs, ref } from "vue";
import { useI18n } from 'vue-i18n'

export default {
  name: "ResetPassword",
  emits: ["toLogin"],
  setup(props, { emit }) {
    const resetPwdRef = ref();
    const state = reactive({
      formData: {
        email: "",
        validCod: "",
        password: "",
        checkPass: "",
      },
    });
    const sendingCode = ref(false);
    const toLogin = () => {
      emit("toLogin");
    };
    const { t } = useI18n();

    const validatePwdAgain = (rule, value, callback) => {
      if (!value) {
        callback(new Error(t("plzEnterPwdAgain")));
      } else if (value !== state.formData.password) {
        callback(new Error(t("pwdInconsistent")));
      } else {
        callback();
      }
    };

    const validatePwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error(t("plzEnterPwd")));
      } else {
        if (!state.formData.checkPass) {
          resetPwdRef.value.validateField("checkPass");
        }
        callback();
      }
    };

    const rules = {
      password: [
        { validator: validatePwd, trigger: "blur" },
        { min: 6, max: 10, message: t("pwdLenIn6To10"), trigger: "blur" },
      ],
      checkPass: [{ validator: validatePwdAgain, trigger: "blur" }],
      email: [
        { required: true, message: t("plzEnterEmail"), trigger: "change" },
        {
          type: "email",
          message: t("plzEnterCorrectEmail"),
          trigger: ["blur", "change"],
        },
      ],
      validCod: [{ required: true, message: t('plzEnterCaptcha'), trigger: "blur" }],
    };
    return {
      ...toRefs(state),
      rules,
      sendingCode,
      toLogin,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/switchTheme.scss";

.reset-pwd {
  width: 375px;
  background-color: #13152C;
  padding: 40px;
  border-radius: 10px;

  .title {
    @include font_color("fontColor");
    margin-bottom: 20px;
  }

  :deep(.el-input__wrapper) {
    all: unset;
  }

  .btn-reset {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }

  .go-login {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
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
