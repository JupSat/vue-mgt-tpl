<template>
  <div class="register_content">
    <div class="title">
      <h1>vue-mgt-tpl</h1>
    </div>
    <el-form ref="registerRef" :model="formData" :rules="rules" @keyup.enter="register">
      <el-form-item prop="email">
        <el-input v-model="formData.email" :placeholder="$t('plzEnterEmail')">
          <template #append>
            <el-button :disabled="sendingCode">{{ $t('getCaptcha') }}</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="validCod">
        <el-input v-model="formData.validCod" :placeholder="$t('plzEnterCaptcha')" />
      </el-form-item>
      <el-form-item prop="regUsrNam">
        <el-input v-model="formData.regUsrNam" :placeholder="$t('plzEnterUsrNam')">
          <template #suffix>
            <span class="input-icon">
              <el-icon>
                <User />
              </el-icon>
            </span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="formData.password" :type="'password'" :placeholder="$t('plzEnterPwd')">
          <template #suffix>
            <span class="input-icon">
              <el-icon>
                <Lock />
              </el-icon>
            </span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input v-model="formData.checkPass" :type="'password'" :placeholder="$t('plzEnterPwdAgain')">
        </el-input>
      </el-form-item>

      <el-form-item>
        <div class="btn-register">
          <el-button type="primary" style="width: 100%">{{ $t('signUp') }}</el-button>
        </div>
        <div class="go-login">
          <span class="to-login">{{ $t('haveAccount') }}<em @click="goLogin">{{ $t('signIn') }}</em></span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { useI18n } from 'vue-i18n'

export default {
  name: "Register",
  emits: ["toLogin"],
  setup(props, { emit }) {
    const state = reactive({
      sendingCode: false,
    });

    const registerRef = ref(null);
    const formData = reactive({
      email: "",
      validCod: "",
      regUsrNam: "",
      password: "",
      checkPass: "",
    });


    const { t } = useI18n();
    const checkUsername = (rule, value, callback) => {
      if (value.length < 5) {
        return callback(new Error(t("usrNamDonLessLen5")));
      } else {
        callback();
      }
    };

    const checkPassword = (rule, value, callback) => {
      if (value.length < 6) {
        return callback(new Error(t("psdDonLessLen6")));
      } else {
        callback();
      }
    };

    const validatePsdAgain = (rule, value, callback) => {
      if (!value) {
        callback(new Error(t("plzEnterPwdAgain")));
      } else if (value !== formData.password) {
        callback(new Error(t("psdInconsistent")));
      } else {
        callback();
      }
    };

    const validatePsd = (rule, value, callback) => {
      if (!value) {
        callback(new Error(t("plzEnterPwd")));
      } else {
        if (formData.checkPass) {
          registerRef.value.validateField("checkPass");
        }
        callback();
      }
    };

    const rules = {
      email: [
        { required: true, message: t("plzEnterEmail"), trigger: "change" },
        {
          type: "email",
          message: t("plzEnterCorrectEmail"),
          trigger: ["blur", "change"],
        },
      ],
      validCod: [{ required: true, message: t('plzEnterCaptcha'), trigger: "blur" }],
      regUsrNam: [{ required: true, message: t('plzEnterUsrNam'), trigger: "blur" }],
      password: [
        { validator: validatePsd, trigger: "blur" },
        { min: 6, max: 10, message: t('psdLenIn6To10'), trigger: "blur" },
      ],
      checkPass: [{ validator: validatePsdAgain, trigger: "blur" }],
    };

    const submitForm = () => { };

    const getVerificationCode = () => { };

    const goLogin = () => {
      emit("toLogin");
    };

    return {
      ...toRefs(state),
      registerRef,
      formData,
      checkUsername,
      checkPassword,
      rules,
      getVerificationCode,
      submitForm,
      goLogin,
    };
  },
};
</script>
<style scoped lang="scss">
.register_content {
  width: 375px;
  padding: 40px;
  background-color: #13152C;
  border-radius: 10px;

  .title {
    color: #fff;
    margin-bottom: 20px;
  }

  .input-icon {
    margin-right: 10px;
  }

  :deep(.el-input__wrapper) {
    all: unset;
  }

  .btn-register {
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

    .to-login {
      color: #9fa2a8;

      em {
        margin-left: 5px;
        color: #2878ff;
        cursor: pointer;
      }
    }
  }
}
</style>
