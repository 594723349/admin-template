<!--
 * @Description: 基础公共表单组件
 * @Author: chenxiaofan
 * @Date: 2019-12-20 09:34:01
 * @LastEditors: cxf
 * @LastEditTime: 2020-10-14 15:23:53
 -->
<template>
  <div>
    <slot name="before"></slot>
    <a-form :form="cForm" :layout="layout" :label-col="newLabelCol" :wrapper-col="newWrapperCol">
      <div v-for="(formItem, index) in items" :key="index">
        <div
          v-if="Array.isArray(formItem)"
          class="form-item-multiple"
          :class="'form-item-group-' + index"
        >
          <c-form-item
            v-for="(groupItem, groupIndex) in formItem"
            :key="groupIndex"
            :formItem="mergeFormItem(groupItem)"
            :index="index"
            :form="cForm"
          ></c-form-item>
        </div>
        <div v-else class="form-item-single">
          <c-form-item :formItem="formItem" :index="index" :form="cForm"></c-form-item>
        </div>
      </div>
    </a-form>
    <slot name="after"></slot>
  </div>
</template>

<script>
import formItem from "./form-item";
import "@assets/css/global.less";
import Moment from "moment";
export default {
  name: "CForm",
  components: {
    "c-form-item": formItem,
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
    filterUndef: {
      type: Boolean,
      default: true,
    }, // 是否过滤值为undefined的字段
    defValue: {
      type: [Array, Number, String, Boolean],
      default: "",
    },
    layout: {
      type: String,
      default: "horizontal",
    },
    labelCol: {
      type: Object,
      default: () => {
        return {};
      },
    },
    wrapperCol: {
      type: Object,
      default: () => {
        return {};
      },
    },
    groupLabelCol: {
      type: Object,
    },
    groupWrapperCol: {
      type: Object,
    },
    form: {
      type: Object,
    },
    formatTime: {
      type: Function,
    },
  },
  data() {
    return {
      cForm: null,
      defLabelCol: {
        sm: { span: 24 },
        md: { span: 5 },
      },
      defWrapperCol: {
        sm: { span: 24 },
        md: { span: 19 },
      },
      editors: {}, // 富文本编辑器实例
      fileList: [],
    };
  },
  computed: {
    newLabelCol() {
      return Object.assign(this.defLabelCol, this.labelCol);
    },
    newWrapperCol() {
      return Object.assign(this.defWrapperCol, this.wrapperCol);
    },
  },
  created() {
    this.$on("handleChange", this.handleChange);
    this.$on("handelClickBtn", this.handelClickBtn);
    this.$on("saveEditors", this.saveEditors);
    this.$on("saveFileList", this.saveFileList);
    this.cForm = this.$form.createForm(this);
    this.mountedFn();
    this.$emit("update:form", this.cForm);
  },
  methods: {
    /**
     * 挂载扩展方法
     */
    mountedFn() {
      this.cForm = Object.assign(this.cForm, {
        setSelectOptions: this.setSelectOptions,
        formatDate: this.formatDate,
        setItem: this.setItem,
        reset: this.reset,
      });
      // let form = this.cForm;
      // form.setSelectOptions = this.setSelectOptions;
      // form.formatDate = this.formatDate;
      // form.setItem = this.setItem;
      // form.reset = this.reset;
    },
    /**
     * 表单值改变的回调
     */
    handleChange(formItem) {
      const { prop, type } = formItem;
      setTimeout(() => {
        const value = this.cForm.getFieldValue(prop);
        this.$emit("change", value, prop, type);
      }, 0);
    },
    /**
     * 确定
     */
    handleSubmit(clickEvent) {
      this.cForm.validateFields((err, values) => {
        values = Object.assign(this.formatData(values), this.getEditorContent());
        console.log(err, values);
        clickEvent(err, values);
      });
    },

    /**
     * 表单按钮点击事件
     */
    handelClickBtn(btnConf) {
      const { validator, clickEvent, type } = btnConf;
      if (validator) {
        this.handleSubmit(clickEvent);
      } else {
        const values = Object.assign(this.cForm.getFieldsValue(), this.getEditorContent());
        type === "reset" && this.cForm.resetFields();
        typeof clickEvent === "function" && clickEvent(values);
      }
    },
    /**
     * 合并配置
     */
    mergeFormItem(formItem) {
      return Object.assign(
        {
          labelCol: this.groupLabelCol,
          wrapperCol: this.groupWrapperCol,
        },
        formItem,
      );
    },
    /**
     * 格式化参数
     */
    formatData(values) {
      if (typeof values !== "object") return values;
      let obj = {};
      for (let k in values) {
        let val = values[k];
        if (val != null && val !== "") {
          if (val instanceof Moment) {
            // 转换时间
            const item = this.findItem(k);
            let format = this.getDateFormat(item);
            val = val.format(format);
            if (typeof item.formatDate === "function") {
              val = item.formatDate(val);
            } else if (typeof this.formatTime === "function") {
              val = this.formatDate(val);
            }
          }
          obj[k] = val;
        } else {
          !this.filterUndef && (obj[k] = this.defValue);
        }
      }
      return obj;
    },
    /**
     * 获取时间转换格式
     */
    getDateFormat(formItem) {
      if (formItem.format) return formItem.format;
      if (formItem.showTime) {
        return "YYYY-MM-DD HH:mm:ss";
      } else {
        return "YYYY-MM-DD";
      }
    },
    /**
     * 给select组件添加下拉数据
     * @param {Array} data 下拉数据
     * @param {String, Array} prop 目标key
     * @param {Array} keys 要取值的key
     */
    setSelectOptions(data, prop, keys) {
      if (!Array.isArray(this.items)) return;
      data = data.map((item, index) => {
        if (!Array.isArray(keys)) {
          return {
            label: item,
            value: index,
          };
        } else {
          return {
            label: item[keys[0]],
            value: item[keys[1]],
          };
        }
      });
      prop = Array.isArray(prop) ? prop : [prop];
      let max = prop.length;
      let num = 0;
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        if (prop.indexOf(item.prop) !== -1) {
          this.$set(this.items[i], "data", data);
          num++;
          if (num === max) break;
        }
      }
    },
    /**
     * 通过prop值更新item任一字段值
     * @param {String} prop prop值
     * @param {String} key 要修改的字段
     * @param {Any} data 修改的值
     */
    setItem(prop, key, data) {
      !Array.isArray(prop) && (prop = [prop]);
      let isString = !Array.isArray(key);
      prop.forEach((item, i) => {
        let index = this.findItem(item, "prop", "index");
        let k = isString ? key : key[i];
        this.$set(this.items[index], k, data);
      });
    },
    /**
     * 转换时间戳
     */
    formatDate(moment, format = "YYYY-MM-DD") {
      return moment.format(format);
    },
    /**
     * 根据prop寻找对应item
     */
    findItem(value, key = "prop", type = "data") {
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        if (item[key] === value) {
          return type === "data" ? item : i;
        }
      }
    },
    /**
     * 保存富文本编辑器实例
     */
    saveEditors(istan, id) {
      this.editors[id] = istan;
    },
    /**
     * 获取富文本编辑器内容
     */
    getEditorContent() {
      const keys = Object.keys(this.editors);
      if (keys.length > 0) {
        if (keys.length === 1) {
          let { prop } = this.findItem("editor", "type");
          let content = this.editors[keys[0]].getContent();
          return { [prop]: content };
        } else {
          let ctx = {};
          keys.forEach((key) => {
            let { prop } = this.findItem(key, "id");
            let content = this.editors[key].getContent();
            ctx[prop] = content;
          });
          return ctx;
        }
      }
      return {};
    },
    /**
     * 保存文件上传控件中的fileList变量
     */
    saveFileList(list) {
      this.fileList.push(list);
    },
    /**
     * 清空fileList中的数据
     */
    clearFileList() {
      this.fileList.forEach((item) => {
        item.splice(0);
      });
    },
    /**
     * 重置
     */
    reset(params) {
      this.form.resetFields(params);
      this.clearFileList();
    },
  },
};
</script>
<style lang="less" scoped>
.form-item-multiple {
  .flex(flex-start, row, wrap, baseline);
  .ant-form-item {
    flex: 1;
  }
}
</style>
