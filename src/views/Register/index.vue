<template>
  <div class="register_content">
    <div class="title">
      <h1>vue-mgt-tpl</h1>
    </div>
    <el-form ref="registerRef" :model="formData" :rules="rules" @keyup.enter="register">
      <el-form-item prop="email">
        <el-input v-model="formData.email" placeholder="请输入邮箱">
          <template #append>
            <el-button :disabled="sendingCode">获取验证码</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="validCod">
        <el-input v-model="formData.validCod" placeholder="请输入验证码" />
      </el-form-item>
      <el-form-item prop="regUsrNam">
        <el-input v-model="formData.regUsrNam" placeholder="请输入用户名">
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
        <el-input v-model="formData.password" :type="'password'" placeholder="请输入密码">
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
        <el-input v-model="formData.checkPass" :type="'password'" placeholder="请再次输入密码">
        </el-input>
      </el-form-item>

      <el-form-item>
        <div class="btn-register">
          <el-button type="primary" style="width: 100%">注册</el-button>
        </div>
        <div class="go-login">
          <span class="to-login">已有账号<em @click="goLogin">去登陆</em></span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";

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

    const checkUsername = (rule, value, callback) => {
      if (value.length < 5) {
        return callback(new Error("用户名不能小于5位"));
      } else {
        callback();
      }
    };

    const checkPassword = (rule, value, callback) => {
      if (value.length < 6) {
        return callback(new Error("密码不能小于6位"));
      } else {
        callback();
      }
    };

    const validatePsdAgain = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== formData.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    const validatePsd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        if (formData.checkPass) {
          registerRef.value.validateField("checkPass");
        }
        callback();
      }
    };

    const rules = {
      email: [
        { required: true, message: "请输入注册邮箱", trigger: "change" },
        {
          type: "email",
          message: "请输入正确的邮箱地址",
          trigger: ["blur", "change"],
        },
      ],
      validCod: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      regUsrNam: [{ required: true, message: "请输入名称", trigger: "blur" }],
      password: [
        { validator: validatePsd, trigger: "blur" },
        { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" },
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
