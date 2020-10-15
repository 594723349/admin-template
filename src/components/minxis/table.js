/*
 * @Description: minxis-公共表格相关配置参数和方法
 * @Author: chenxiaofan
 * @Date: 2019-12-19 17:09:47
 * @LastEditors: cxf
 * @LastEditTime: 2020-10-12 16:02:02
 */
import { formatDate, formatDates } from "@/utils/util";
export default {
  data() {
    return {
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1,
      }, // 分页
      selectedRowKeys: [],
      tableLoading: false,
    };
  },
  methods: {
    /**
     * 分页切换
     * @param {Object} params
     */
    changePage(params) {
      this.pagination = params;
      this.params.page = params.current;
      this.getTableData();
    },
    /**
     * 设置数据总数
     */
    setTotal(num) {
      this.$set(this.pagination, "total", num);
    },
    /**
     * 过滤搜索控件里，下拉值为-1的字段
     * @param {Object} params 搜索参数
     * @param {Array} searchColumn 搜索控件规则
     */
    filterParams(params, searchColumn) {
      let cacheParams = JSON.parse(JSON.stringify(params));
      let column = searchColumn || this.searchColumn || [];
      column.forEach((item) => {
        if (
          item.type === "select" &&
          cacheParams[item.prop] &&
          cacheParams[item.prop].toString() === "-1"
        ) {
          delete cacheParams[item.prop];
        }
      });
      for (let key in cacheParams) {
        if (
          cacheParams[key] === "" ||
          (Array.isArray(cacheParams[key]) && !cacheParams[key].length)
        ) {
          delete cacheParams[key];
        }
      }
      return cacheParams;
    },
    /**
     * 格式化时间戳
     * @param {String || Number} data 时间戳
     * @param {String} format 时间格式
     * @param {String} type s: data为秒数 sm: data为毫秒
     */
    formatDate(value, format) {
      return formatDate(value, format);
    },
    formatDates(value, format) {
      return formatDates(value, format);
    },
    /**
     * 是否固定操作栏
     */
    fixedAction(type, direction = "right", column = []) {
      if (this.columns) column = this.columns;
      const index = this.findColumn("operation", "key");
      if (type === "delete") {
        delete column[index].fixed;
      } else {
        this.$set(column[index], "fixed", direction);
      }
    },
    /**
     * 寻找指定column
     */
    findColumn(value, key = "dataIndex", column = []) {
      if (this.columns) column = this.columns;
      for (let i = column.length; i--; ) {
        const item = column[i];
        if (item[key] === value) {
          return i;
        }
      }
      return -1;
    },
  },
};
