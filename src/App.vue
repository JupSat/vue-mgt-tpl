<template>
  <el-config-provider :locale="language === 'zh' ? zh : en">
    <router-view />
  </el-config-provider>
</template>

<script>
import { ref, watch } from "vue";
import { useCommonStore } from "@/pinia/modules/common";
import { ElConfigProvider } from 'element-plus'
import zh from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
export default {
  name: 'App',
  components: {
    ElConfigProvider,
  },
  setup() {
    const language = ref('zh')
    const commonStore = useCommonStore()

    watch(() => commonStore.language, () => {
      language.value = commonStore.language
    })
    return {
      commonStore,
      language,
      zh,
      en
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/switchTheme.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.custom-select {
  @include bg_color("secondaryColor");
}
</style>
