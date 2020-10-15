<!--
 * @Description: 表格按钮组
 * @Author: chenxiaofan
 * @Date: 2019-12-19 15:48:52
 * @LastEditors  : chenxiaofan
 * @LastEditTime : 2020-01-13 10:13:15
 -->
<template>
  <div class="table-btn-group" :class="['type-' + type, layout]">
    <template v-for="(btn, i) in btns" >
      <!-- 按钮 -->
      <a-button v-if="btn.type === undefined || btn.type === 'btn'"
        :key="i"
        :class="[btn.type, 'operation-btn']"
        :icon="btn.icon"
        :loading="btn.loading"
        :disabled="btn.disabled"
        @click.stop="handleClick(btn, record, index, i)"
      >{{btn.text}}</a-button>
      <!-- 下拉 -->
      <a-select v-if="btn.type === 'select'" 
        :id="'operation-select-' + i"
        :placeholder="btn.text" :key="i"
        :dropdownMatchSelectWidth="false"
        :class="['operation-btn']"
        :dropdownClassName="'table-btn-group-select-options'"
      >
        <a-icon slot="suffixIcon" type="down" />
        <a-select-option v-for="(selectOption, optionIndex) in btn.data" :key="optionIndex" :disabled="selectOption.disabled"
          @click="handleClick(btn, record, index, optionIndex)">
          {{selectOption}}
        </a-select-option>
      </a-select>
    </template>
  </div>
</template>

<script>
export default {
  name: 'TableBtnGroup',
  props: {
    data: {
      type: [Array, Function],
      default: () => []
    },
    type: {
      type: String,
      default: 'text'
    },
    record: {
      type: Object,
      required: true
    },
    index: {
      type: Number
    },
    layout:{
      type: String,
      default: 'inline'
    }
  },
  computed: {
    btns() {
      return typeof this.data === 'function' ? this.data(this.record, this.index) : this.data;
    }
  },
  methods: {
    handleClick(btn, record, index, optionIndex) {
      if (btn.disabled) return;
      btn.clickEvent(record, index, optionIndex)
    },
  }
}
</script>
<style lang="less" scoped>
/deep/ .ant-select{
  // min-width: 100px;
  .ant-select-selection{
    border: none;
    height: auto;
    line-height: normal;
    background-color: transparent;
    .flex()
  }
  .ant-select-selection__rendered{
    line-height: normal;
    margin: 0;
  }
  .ant-select-selection__placeholder{
    display: inline-block !important;
    position: static;
    line-height: normal;
    margin-top: 0;
    vertical-align: middle;
    color: #1890ff;
  }
  .ant-select-arrow{
    position: static;
    vertical-align: middle;
    margin-top: 4px;
    margin-left: 2px;
  }
  .ant-select-arrow-icon{
    svg{
      fill: #1890ff
    }
  }
  .ant-select-selection{
    box-shadow: none;
  }
  .ant-select-selection-selected-value{
    display: none !important;
  }
}
.table-btn-group{
  /deep/ .ant-btn{
    color: #1890ff;
  }
}
.table-btn-group.type-text{
  /deep/ .ant-btn{
    padding: 0;
    width: auto;
    height: auto;
    display: inline-block;
    background-color: transparent;
    border: none;
    
  }
}
.table-btn-group.block{
  /deep/ .ant-btn{
    display: block;
  }
}
.operation-btn{
  margin-right: 10px;
}
.operation-btn:last-child{
  margin-right: 0;
}
</style>
<style lang="less">
.table-btn-group-select-options{
  .ant-select-dropdown-menu-item-selected,
  .ant-select-dropdown-menu-item-selected:hover,
  .ant-select-dropdown-menu-item-active{
    font-weight: normal;
    background: transparent;
    &:hover{
      background-color: transparent;
    }
  }
}
</style>