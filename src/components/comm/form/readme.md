<!--
 * @Author: your name
 * @Date: 2020-01-08 19:59:19
 * @LastEditTime : 2020-01-11 13:08:04
 * @LastEditors  : chenxiaofan
 * @Description: In User Settings Edit
 * @FilePath: \leigod_admin_front\src\components\comm\form\readme.md
 -->
## form表单 

### 基础form表单公共组件 base-from.vue 

|参数|	数据类型|	默认值|	描述|
|--|--|--|--|
|items              |Array    |[]         | 表单控件规则 |
|filterUndef        |Boolean  |true       | 表单校验后，返回的values是否过滤值为undefined的字段 |
|layout             |String   |horizontal | 表单布局，值：horizontal、vertical、inline |
|LabelCol           |Object   |{}         | label宽度自适应设置 例：{sm: {span: 3, offset: 12}} |
|WrapperCol         |Object   |{}         | 控件宽度自适应设置 例：{sm: {span: 3, offset: 12}} |
|group-label-col    |Object   |undefined  | 指定form-item的label宽度自适应设置 例：{sm: {span: 3, offset: 12}} |
|group-wrapper-col  |Object   |undefined  | 指定form-item的控件宽度自适应设置 例：{sm: {span: 3, offset: 12}} |
|defValue           |Any      |''         | 在filterUndef为false时，会将defValue值赋值给值为undefined的字段 |
|formatDate         |Function |undefined  | 全局时间转换函数 |
调用方式：`<c-form :items="formItems" @change="change" :filterUndef="true" :layout="horizontal" :form:sync="form" :defValue="''" :formatDate="formatDate"></c-form>`
items规则：
    [
        {
            type: 'input', // input || select || radio || checkout || date || upload || textarea 【必填】
            label: '开始时间', 【必填】
            prop: 'beg_time', 【必填】
            disabled: true // 是否禁用
            hidden: true // 禁用后是否隐藏控件，默认为显示
            rules: [{required: true, message: '请选择开始时间'}],
            data: [{label: 'VIP1', value: 0}] 【select和checkout独有】
            mode: 'tags', // 'default' | 'multiple' | 'tags' | 'combobox' 设置 Select 的模式为多选或标签
            formatDate：val => {}, 【date独有】
            format：'YYYY/MM/DD', 【date独有】
            showTime: true, 【date独有】
            row: 5, 【textarea独有】
            url: '/v1/upload', 【upload独有】
            accept: '.xls,.png', 【upload独有】
            multiple: false 【是否支持多选文件,upload独有】
            auto: true, 【是否自动上传, upload独有】
            beforeUpload： Function(file): boolean | void 【上传文件之前的钩子, upload独有】
            listType: 'text', 上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card 【upload独有】
            fileList: [], 【已经上传的文件列表, upload独有】
            success: Function(res, Function(url)): any 【上传成功后的回调, upload独有】
            imgUrl: '', 【图片显示路径, upload独有】
        },
    ]
相关函数:

    /**  
    * 表单控件值改变时  
    * @param {Any} value 控件值  
    * @param {String} prop 标识  
    * @param {String} type 控件类型  
    */  
    change(value, prop, type) {}

    /**  
    * 给指定select控件添加options数据 
    * @param {Array} data 下拉数据  
    * @param {String, Array} prop 目标keys
    * @param {Array} keys 要取值的key
    */
    this.form.setSelectOptions(data, prop, keys);

    /**  
    * 时间转换函数
    * @param {String} date 通过moment.format()转换后的时间字符串
    */
    this.form.formatDate(date)

    /**
     * 通过prop值更新item任一字段值
     * @param {String, Array} prop prop值
     * @param {String, Array} key 要修改的字段
     * @param {Any} data 修改的值
     * 若prop和key同为数组类型，两者下标要对应
     */
    this.form.setItem(prop, key, data)


