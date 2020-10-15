<!--
 * @Description: 公共搜索控件组
 * @Author: chenxiaofan
 * @Date: 2019-12-20 16:27:14
 * @LastEditors: cxf
 * @LastEditTime: 2020-10-12 11:24:34
 -->
<template>
  <div class="comm-input-search" :class="[layout, align]">
    <div
      v-for="(item, index) in column"
      :key="index"
      class="input-item"
      :class="item.class"
      :style="item.style"
    >
      <label v-if="item.label">{{ item.label }}</label>
      <!-- 时间 -->
      <a-range-picker
        v-if="item.type === 'date'"
        class="time"
        v-model="dates"
        :format="item.showTime ? 'YYYY/MM/DD HH:mm:ss' : 'YYYY-MM-DD'"
        :placeholder="['开始时间', '结束时间']"
        :showTime="isShowTime(item.showTime)"
        @change="dataChange(item)"
      />
      <!-- 下拉 -->
      <a-select
        v-else-if="item.type === 'select'"
        :style="{ width: item.width ? item.width + 'px' : null }"
        :dropdownMatchSelectWidth="
          item.dropdownMatchSelectWidth !== undefined ? item.dropdownMatchSelectWidth : true
        "
        :class="{ 'show-placeholder': params[item.prop] === '' }"
        v-model="params[item.prop]"
        :mode="item.mode || 'default'"
        :placeholder="item.placeholder"
        @change="dataChange(item)"
      >
        <a-select-option
          v-for="(option, optionIndex) in item.data"
          :key="optionIndex"
          :value="option.value"
        >
          {{ option.label }}
        </a-select-option>
      </a-select>
      <!-- 输入框 -->
      <a-input
        v-else-if="item.type === 'input'"
        v-model="params[item.prop]"
        :placeholder="item.placeholder"
        @change="dataChange(item)"
      />
      <!-- 操作按钮 -->
      <div v-else-if="item.type === 'btn'">
        <div
          v-for="(btn, btnIndex) in item.operation"
          :key="btnIndex"
          class="btn-item"
          :class="btn.class"
          :style="btn.style"
        >
          <a-button
            @click="btn.clickEvent(JSON.parse(JSON.stringify(params)))"
            :icon="btn.icon"
            :type="btn.type"
            :class="[btn.color]"
          >
            {{ btn.text }}
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from "moment";
export default {
  props: {
    params: {
      type: Object,
      default: () => {
        return {};
      },
    },
    column: {
      type: Array,
      default: () => [],
    },
    layout: {
      type: String,
      default: "inline",
    },
    align: {
      type: String,
      default: "left",
    },
    date: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dates: this.date,
      a: "",
    };
  },
  watch: {
    date: {
      handler(now) {
        this.dates = [].concat(now);
      },
      deep: true,
    },
  },
  methods: {
    /**
     * 输入值改变时，触发回调
     */
    dataChange(item) {
      const { prop, type } = item;
      if (type === "date") {
        const dateTime = this.dateChange(this.dates, item.showTime);
        if (Array.isArray(prop)) {
          this.$set(this.params, prop[0], dateTime[0]);
          this.$set(this.params, prop[1], dateTime[1]);
        } else {
          this.$set(this.params, prop, dateTime);
        }
        this.$emit("change", type, dateTime, prop, this.dates);
      } else {
        this.$emit("change", type, this.params[prop], prop);
      }
    },
    /**
     * 搜索-格式化事件相关参数
     */
    dateChange(val, time) {
      let startTime = "";
      let endTime = "";
      if (val) {
        let timeS = time
          ? val[0].format("YYYY-MM-DD HH:mm:ss")
          : val[0].format("YYYY-MM-DD") + " 00:00:00";
        let timeE = time
          ? val[0].format("YYYY-MM-DD HH:mm:ss")
          : val[0].format("YYYY-MM-DD") + " 00:00:00";
        timeS = Date.parse(new Date(timeS.replace(/-/g, "/")));
        timeE = Date.parse(new Date(timeE.replace(/-/g, "/")));
        startTime = timeS / 1000;
        endTime = timeE / 1000;
      }
      return [startTime, endTime];
    },
    /**
     * 是否显示时间
     */
    isShowTime(showTime) {
      return showTime ? { defaultValue: Moment("00:00:00", "HH:mm:ss") } : undefined;
    },
  },
};
</script>

<style lang="less" scoped>
.comm-input-search {
  margin: 10px 0;
  .flex();
  &.left {
    text-align: left;
  }
  &.right {
    text-align: right;
  }
  .input-item {
    .flex();
    label {
      flex: 1;
      white-space: nowrap;
      font-size: 14px;
    }
    vertical-align: middle;
    margin-right: 10px;
  }
  .input-item:last-child {
    margin-right: 0;
  }
  .ant-select {
    min-width: 100px;
  }
  /deep/ .ant-select.show-placeholder {
    .ant-select-selection__placeholder {
      display: block !important;
    }
  }
}
</style>
