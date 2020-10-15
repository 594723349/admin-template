<!--
 * @Description: 富文本编辑器
 * @Author: cxf
 * @Date: 2020-10-12 17:15:25
 * @LastEditTime: 2020-10-14 17:33:24
 * @LastEditors: cxf
 * @FilePath: /blog-admin/src/components/comm/editor/index.vue
-->
<template>
  <div class="c-editor">
    <ckeditor v-model="editorData" :editor="editor" :config="editorConfig"></ckeditor>
  </div>
</template>

<script>
import "./core/translations/zh-cn";
import ClassicEditor from "./core/ckeditor";
import CKEditor from "@ckeditor/ckeditor5-vue";
export default {
  model: {
    prop: "value",
    event: "change",
  },
  components: {
    // 编辑器组件的局部注册方式
    ckeditor: CKEditor.component,
  },
  props: {
    value: {
      type: String,
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        language: "zh-cn",
        placeholder: this.placeholder,
        image: {
          styles: ["alignLeft", "alignCenter", "alignRight"],
          resizeOptions: [
            {
              name: "imageResize:original",
              label: "Original",
              value: null,
            },
            {
              name: "imageResize:50",
              label: "50%",
              value: "50",
            },
            {
              name: "imageResize:75",
              label: "75%",
              value: "75",
            },
          ],
          toolbar: [
            "imageStyle:alignLeft",
            "imageStyle:alignCenter",
            "imageStyle:alignRight",
            "|",
            "imageResize",
            "|",
            "imageTextAlternative",
          ],
        },
        ckfinder: {
          uploadUrl: "/upload",
        },
      },
    };
  },
  watch: {
    editorData(now) {
      this.$emit("change", now);
    },
  },
};
</script>

<style></style>
