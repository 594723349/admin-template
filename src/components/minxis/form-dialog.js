/*
 * @Description: 表单弹窗混入
 * @Author: chenxiaofan
 * @Date: 2020-01-06 14:53:58
 * @LastEditors: cxf
 * @LastEditTime: 2020-10-15 11:01:54
 * @FilePath: /blog-admin/src/components/minxis/form-dialog.js
 */
export default {
  data() {
    return {
      formDialog: null,
      formDialogVisible: false,
      formDialogLoading: false,
      currentId: null,
      baseDialogTitle: "",
    };
  },
  methods: {
    /**
     * 关闭弹窗
     */
    hideFormDialog() {
      this.formDialog.resetFields();
      this.currentId = null;
      this.formDialogVisible = this.formDialogLoading = false;
    },
    /**
     * 打开弹窗
     */
    openFormDialog(record) {
      this.formDialogVisible = true;
      if (record) {
        this.currentId = record.id;
        this.getDetail();
      }
      this.setTitle();
    },
    /**
     * @override
     * @description: 获取详情
     */
    getDetail() {},
    /**
     * @description: 设置弹窗title
     */
    setTitle() {
      if (this.currentId) {
        this.baseDialogTitle = "编辑";
      } else {
        this.baseDialogTitle = "新增";
      }
    },
  },
};
