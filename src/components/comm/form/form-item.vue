<!--
 * @Description: 表单控件
 * @Author: chenxiaofan
 * @Date: 2019-12-26 09:01:20
 * @LastEditors: cxf
 * @LastEditTime: 2020-10-14 15:17:11
 * @FilePath: /blog-admin/src/components/comm/form/form-item.vue
 -->

<template>
  <a-form-item
    class="comm-form-item"
    :class="{ 'disabled-hidden': formItem.onlyRead }"
    :label="formItem.label || ''"
    :label-col="formItem.type === 'action' ? { span: 24 } : formItem.labelCol"
    :wrapper-col="formItem.type === 'action' ? { span: 24 } : formItem.wrapperCol"
  >
    <!-- 操作 -->
    <template v-if="formItem.type === 'action'">
      <div class="btn-group" :class="[formItem.layout, formItem.align || 'left']">
        <a-button
          v-for="(btn, btnIndex) in formatBtnModel(formItem)"
          :icon="btn.icon"
          :key="btnIndex"
          :size="btn.size"
          :type="btn.type"
          :class="[btn.color]"
          @click.prevent="handelClickBtn(btn)"
          >{{ btn.label }}</a-button
        >
      </div>
    </template>
    <!-- 输入框 -->
    <template v-else-if="formItem.type === 'input'">
      <a-input
        v-decorator="setDecorator(formItem)"
        :disabled="formItem.disabled"
        :placeholder="setPlaceholder(formItem)"
        @change="handleChange(formItem)"
      ></a-input>
    </template>
    <!-- 输入框 -->
    <template v-else-if="formItem.type === 'password'">
      <a-input
        v-decorator="setDecorator(formItem)"
        :disabled="formItem.disabled"
        :placeholder="setPlaceholder(formItem)"
        @change="handleChange(formItem)"
        type="password"
      ></a-input>
    </template>
    <!-- 文本域 -->
    <template v-else-if="formItem.type === 'textarea'">
      <a-textarea
        v-decorator="setDecorator(formItem)"
        :disabled="formItem.disabled"
        :placeholder="setPlaceholder(formItem)"
        @change="handleChange(formItem)"
        :rows="formItem.row || 3"
      />
    </template>
    <!-- 下拉框 -->
    <template v-else-if="formItem.type === 'select'">
      <a-select
        v-decorator="setDecorator(formItem)"
        :showSearch="formItem.search !== undefined ? formItem.search : false"
        :disabled="formItem.disabled"
        :mode="formItem.mode || 'default'"
        :placeholder="setPlaceholder(formItem)"
        :filterOption="selectFilterOption"
        @change="handleChange(formItem)"
      >
        <a-select-option
          v-for="(selectOption, optionIndex) in formItem.data"
          :key="optionIndex"
          :value="selectOption.value"
          >{{ selectOption.label }}</a-select-option
        >
      </a-select>
    </template>
    <!-- 复选框 -->
    <template v-else-if="formItem.type === 'checkbox'">
      <a-checkbox-group
        v-decorator="setDecorator(formItem)"
        :disabled="formItem.disabled"
        :options="formItem.data"
        @change="handleChange(formItem)"
      ></a-checkbox-group>
    </template>
    <!-- 单选框 -->
    <template v-else-if="formItem.type === 'radio'">
      <a-radio-group
        v-decorator="setDecorator(formItem)"
        :disabled="formItem.disabled"
        @change="handleChange(formItem)"
      >
        <a-radio-button
          v-for="(radioItem, radioItemIndex) in formItem.data"
          :key="radioItemIndex"
          :value="radioItem.value"
          >{{ radioItem.label }}</a-radio-button
        >
      </a-radio-group>
    </template>
    <!-- 上传图片 -->
    <template v-else-if="formItem.type === 'upload'">
      <a-upload
        v-decorator="setDecorator(formItem)"
        :name="formItem.name || 'file'"
        :listType="formItem.listType || 'text'"
        :fileList="fileList"
        :showUploadList="isUploadImg() ? false : true"
        :action="formItem.url || '/v1/upload'"
        :beforeUpload="beforeUpload"
        :disabled="formItem.disabled"
        :remove="handleUploadRemove"
        :accept="formItem.accept || ''"
        :multiple="formItem.multiple === undefined ? false : formItem.multiple"
        @change="handleUploadChange"
      >
        <div v-if="isUploadImg()">
          <img v-if="imgUrl" :src="imgUrl" alt="avatar" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">上传</div>
          </div>
        </div>
        <div v-else>
          <a-button> <a-icon type="upload" />上传 </a-button>
        </div>
      </a-upload>
    </template>
    <!-- 日期选择框 -->
    <template v-else-if="formItem.type === 'date'">
      <a-date-picker
        :disabled="formItem.disabled"
        :placeholder="setPlaceholder(formItem)"
        v-decorator="setDecorator(formItem)"
        :format="getDateFormat(formItem)"
        :showTime="formItem.showTime"
        @change="handleChange(formItem)"
      />
    </template>
    <!-- 照片墙 -->
    <template v-else-if="formItem.type === 'img'">
      <c-img-card
        :imgs="formItem.data"
        :icons="formItem.icons"
        :disabled="formItem.disabled"
      ></c-img-card>
    </template>
    <!-- 富文本编辑器 -->
    <template v-else-if="formItem.type === 'editor'">
      <c-editor v-decorator="setDecorator(formItem)"></c-editor>
    </template>
  </a-form-item>
</template>

<script>
import CImgCard from "@/components/comm/img/img-card.vue";
import CEditor from "@/components/comm/editor/index.vue";
import uploadMixins from "./upload";
import Moment from "moment";
export default {
  name: "CFormItem",
  mixins: [uploadMixins],
  components: {
    "c-img-card": CImgCard,
    "c-editor": CEditor,
  },
  props: {
    formItem: {
      type: Object,
      default: () => {
        return {};
      },
    },
    index: {
      type: Number,
    },
    form: {
      type: Object,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    /**
     * 设置表单控件的绑定
     */
    setDecorator(formItem) {
      let { prop, options, rules, initialValue, type } = formItem;
      if (type === "date" && initialValue) {
        let val = typeof initialValue === "number" ? new Date(initialValue * 1000) : initialValue;
        initialValue = Moment(val);
      }
      return [prop, { rules, initialValue, ...options }];
    },
    /**
     * 设置提示语
     */
    setPlaceholder(formItem) {
      const { type } = formItem;
      if (formItem.disabled) {
        return "";
      } else {
        let str = type === "select" ? "请选择" : "请输入" + formItem.label;
        return formItem.placeholder || str;
      }
    },
    /**
     * 表单按钮点击事件
     */
    handelClickBtn(btnConf) {
      this.dispatch("CForm", "handelClickBtn", btnConf);
    },
    /**
     * 格式化按钮操作列
     */
    formatBtnModel(formItem) {
      if (Array.isArray(formItem.btns)) {
        return formItem.btns;
      } else {
        return [formItem.btns];
      }
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
     * 表单值改变的回调
     */
    handleChange(formItem) {
      this.dispatch("CForm", "handleChange", formItem);
    },
    /**
     * 下拉搜索
     */
    selectFilterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
  },
};
</script>
<style lang="less" scoped>
.btn-group.left {
  .ant-btn {
    margin-right: 10px;
  }
}
.btn-group.center {
  text-align: center;
}
.btn-group.right {
  text-align: right;
  .ant-btn {
    margin-left: 10px;
  }
}
.ant-upload {
  img {
    width: 102px;
    height: 102px;
  }
}
.disabled-hidden {
  /deep/ .ant-input-disabled,
  /deep/ .ant-select-disabled .ant-select-selection {
    color: rgba(0, 0, 0, 0.65);
    background-color: transparent;
    cursor: default;
    opacity: 1;
    border: none;
    &:hover {
      border: none;
    }
    .ant-select-arrow {
      display: none;
    }
  }
  /deep/ .ant-calendar-picker-input.ant-input-disabled + i {
    display: none;
  }
}
</style>
