<template>
  <div class="reset-pwd">
    <div class="title">
      <h3>密码重置</h3>
    </div>
    <el-form ref="resetPwdRef" :model="formData" status-icon :hide-required-asterisk="true" :rules="rules">
      <el-form-item prop="email">
        <el-input v-model="formData.email" autocomplete="off" placeholder="请输入注册邮箱">
          <template #append>
            <el-button :disabled="sendingCode">获取验证码</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="validCod">
        <el-input v-model.number="formData.validCod" maxlength="6" autocomplete="off" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="formData.password" type="password" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input v-model="formData.checkPass" type="password" autocomplete="off" placeholder="请再次输入密码"></el-input>
      </el-form-item>

      <el-form-item>
        <div class="btn-reset">
          <el-button type="primary" style="width: 100%">确认重置</el-button>
        </div>
        <div class="go-login">
          <span class="to-login" @click="toLogin"><em>去登陆</em></span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { reactive, toRefs, ref } from "vue";
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

    const validatePwdAgain = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== state.formData.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    const validatePwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
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
        { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" },
      ],
      checkPass: [{ validator: validatePwdAgain, trigger: "blur" }],
      email: [
        { required: true, message: "请输入注册邮箱", trigger: "change" },
        {
          type: "email",
          message: "请输入正确的邮箱地址",
          trigger: ["blur", "change"],
        },
      ],
      validCod: [{ required: true, message: "请输入验证码", trigger: "blur" }],
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
.reset-pwd {
  width: 375px;
  background-color: #13152C;
  padding: 40px;
  border-radius: 10px;

  .title {
    color: #fff;
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
