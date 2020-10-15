<!--
 * @Description: demo
 * @Author: cxf
 * @Date: 2020-10-12 15:23:32
 * @LastEditTime: 2020-10-15 11:20:55
 * @LastEditors: cxf
 * @FilePath: /admin-template/src/views/Demo/list.vue
-->
<template>
  <div>
    <div class="row-flex">
      <c-input-group :column="searchColumn" :params="params"></c-input-group>
      <c-btns :column="operations"></c-btns>
    </div>
    <a-table
      :rowKey="(record) => record.id"
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      :scroll="{ x: '100%' }"
      :loading="tableLoading"
      @change="changePage"
    >
      <div slot="prompt"></div>
      <div slot="action" slot-scope="text, record, index, column">
        <table-btns :data="column.operations" :record="record" :index="index"></table-btns>
      </div>
    </a-table>
    <!-- 编辑 -->
    <a-modal
      :title="baseDialogTitle + '列'"
      :visible="formDialogVisible"
      @ok="handleConfirm"
      @cancel="hideFormDialog"
    >
      <c-loading :loading="formDialogLoading">
        <c-form
          :items="formItems"
          :form.sync="formDialog"
          :labelCol="{ md: { span: 3 } }"
          :wrapperCol="{ md: { span: 11 } }"
        ></c-form>
      </c-loading>
    </a-modal>
  </div>
</template>

<script>
import tableMixins from "@/components/minxis/table.js"; // 表格相关配置参数和操作混入文件
import formDialogMixins from "@/components/minxis/form-dialog.js"; // 表单弹窗混入
export default {
  mixins: [tableMixins, formDialogMixins],
  data() {
    return {
      data: [], // 表格数据
      columns: [
        {
          title: "ID",
          dataIndex: "id"
        },
        {
          title: "标题",
          dataIndex: "name"
        },
        {
          title: "简介",
          dataIndex: "desc"
        },
        {
          title: "作者",
          dataIndex: "online",
          customRender: value => (value ? "是" : "否")
        },
        {
          title: "创建时间",
          dataIndex: "number"
        },
        {
          title: "更新时间",
          dataIndex: "memo",
          width: 250,
          customRender: value => <textEllipsis content={value}></textEllipsis>
        },
        {
          title: "操作",
          key: "operation",
          fixed: "right",
          scopedSlots: { customRender: "action" },
          operations: [
            {
              text: "编辑",
              clickEvent: this.edit
            },
            {
              text: "下架",
              clickEvent: this.down
            },
            {
              text: "删除",
              clickEvent: this.delete
            }
          ]
        }
      ], // 列规则
      formItems: [
        {
          type: "input",
          label: "分类",
          prop: "category",
          placeholder: "请输入分类",
          rules: [{ required: true, message: "请输入分类" }]
        }
      ],
      operations: [
        {
          text: "添加",
          icon: "plus",
          clickEvent: this.openFormDialog
        }
      ], // 全局操作配置项
      searchColumn: [
        {
          type: "input",
          prop: "words",
          placeholder: "标题"
        },
        {
          type: "btn",
          operation: [
            {
              color: "green",
              text: "搜索",
              clickEvent: this.seachEvent,
              class: "search-btn"
            }
          ]
        }
      ], // 搜索配置项
      params: {
        page: 1,
        num: 10,
        keywords: ""
      } // 请求下发参数
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$store.commit("UPDATE_BREADCRUMB", [
        {
          label: "首页",
          name: "Index"
        },
        {
          label: "demo",
          alise: "Demo"
        }
      ]);
    }
  }
};
</script>

<style></style>
