<!--
 * @Description: 1
 * @Author: cxf
 * @Date: 2020-10-12 11:18:48
 * @LastEditTime: 2020-10-13 15:38:38
 * @LastEditors: cxf
 * @FilePath: /blog-admin/src/views/Login.vue
-->
<template>
  <div class="login-wrapper">
    <div class="title">后台管理</div>
    <c-form
      :items="formItems"
      :form.sync="form"
      :labelCol="{sm: {span: 24, }, md: {span: 7}}"
      :wrapperCol="{sm: {span: 24, }, md: {span: 17}}"
    ></c-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formItems: [
        {
          type: "input",
          label: "用户名",
          prop: "username",
          placeholder: "请输入用户名",
          rules: [{ required: true, message: "请输入用户名" }]
        },
        {
          type: "password",
          label: "密码",
          prop: "passwrod",
          placeholder: "请输入密码",
          rules: [{ required: true, message: "请输入密码" }]
        },
        {
          type: "action",
          align: "center",
          btns: [
            {
              type: "primary",
              label: "登录",
              validator: true,
              clickEvent: this.submit
            }
          ]
        }
      ],
      form: null
    };
  },
  methods: {
    submit() {
      this.$router.push({ name: "Home" });
    }
  }
};
</script>

<style lang="less" scoped>
.login-wrapper {
  width: 320px;
  max-height: 250px;
  padding: 20px;
  border-radius: 10px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
}
.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 10px;
}
</style>
