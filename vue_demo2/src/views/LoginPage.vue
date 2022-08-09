<template>
  <div class="login">
    <el-card class box-card>
        <div slot="header" class="clearfix">
            <span>登录</span>

        </div>
    </el-card>
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
      ref="formref"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="formLabelAlign.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formLabelAlign.password"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button @click="Login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script >
export default {
  data() {
    return {
        formLabelAlign: {
          userName: '',
          password: '',
          type: ''
        }
    };
  },
  methods: {},
  computed: {},
};
</script>

<style lang="scss" scoped>
</style>