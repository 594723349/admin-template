<!--
 * @Description: 文章编辑
 * @Author: cxf
 * @Date: 2020-10-12 17:24:28
 * @LastEditTime: 2020-10-15 10:59:43
 * @LastEditors: cxf
 * @FilePath: /blog-admin/src/views/Article/edit.vue
-->
<template>
  <div>
    <c-form :items="formItems"></c-form>
  </div>
</template>

<script>
import editor from "@/components/comm/editor/index.vue";
export default {
  components: {
    "c-editor": editor,
  },
  data() {
    return {
      formItems: [
        {
          type: "editor",
          label: "文本",
          prop: "content",
          placeholder: "请输入用户名",
          rules: [{ required: true, message: "请输入内容" }],
        },
        {
          type: "action",
          align: "center",
          btns: [
            {
              type: "primary",
              label: "登录",
              validator: true,
              clickEvent: this.submit,
            },
          ],
        },
      ],
    };
  },
  methods: {
    submit() {},
  },
};
</script>

<style></style>
