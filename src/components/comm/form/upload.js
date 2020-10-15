/*
 * @Description: 上传文件相关逻辑混入文件
 * @Author: chenxiaofan
 * @Date: 2020-01-11 10:33:04
 * @LastEditors  : chenxiaofan
 * @LastEditTime : 2020-01-11 12:47:04
 * @FilePath: \leigod_admin_front\src\components\comm\form\upload.js
 */
import {accMul} from '@/utils/util'
export default {
  data() {
    return {
      imgUrl: '',
      fileList: [],
      currentFile: null
    }
  },
  computed: {
    maxUploadSize() {
      let size = this.formItem.size || 5
      size = accMul(accMul(size, 1024), 1024);
      return size;
    }
  },
  created() {
    const {type} = this.formItem;
    if (type === 'upload') {
      this.fileList = this.formItem.fileList || [];
      this.$nextTick(() => {
        this.dispatch("CForm", "saveFileList", this.fileList);
      })
    }
  },
  updated() {
    const {type, imgUrl} = this.formItem;
    if (type === 'upload' && !this.imgUrl && this.isUploadImg()) {
      console.log(this.formItem);
      this.imgUrl = imgUrl;
    }
  },
  methods: {
    /**
     * 上传前的校验
     */
    beforeUpload(file) {
      const {beforeUpload, accept, auto, multiple} = this.formItem;
      let result = true;
      if (typeof beforeUpload === 'function') {
        this.loading = true;
        result = beforeUpload(file, this.form, this.fileList);
      } else {
        if (Array.isArray(accept) && accept.length) {
          const flag = accept.some(item => file.type.indexOf(item) !== -1);
          !flag && this.$message.error('上传格式不正确');
          return;
        }
        if (this.maxUploadSize < file.size) {
          this.$message.error('上传不能超过' + this.maxUploadSize + 'M');
          return;
        }
        this.fileList.push(file);
        this.loading = true
      }
      if (auto === undefined || auto) {
        return result;
      } else {
        if (multiple === undefined || !multiple) {
          this.fileList.splice(0);
          this.fileList.push(file);
        }
        return false;
      }
    },
    /**
     * 上传请求回调
     */
    handleUploadChange(info) {
      const {auto, prop, success, listType, multiple} = this.formItem
      if (auto === undefined || auto) {
        const {status, response} = info.file;
        if (status === 'uploading') { // 上传中
          this.loading = true;
        } else {
          if (status === 'done') { // 请求成功
            this.dispatch("CForm", "handleChange", this.formItem);
            let data = response;
            if (typeof success === 'function') {
              if (listType === 'picture' || listType === 'picture-card') {
                data = success(response, this.setImgUrl);
              } else {
                data = success(response);
              }
            }
            // 给上传控件赋值并保存file文件到fileList中
            this.$nextTick(() => {
              this.form.setFieldsValue({[prop]: data});
              this.saveOneFile(multiple);
            })
          } else if (status === 'error') { // 请求失败
            this.$nextTick(() => {
              this.form.setFieldsValue({[prop]: undefined})
              this.fileList.splice(- 1, 1)
            })
            this.$message.error(response.msg || '上传失败');
          }
          this.loading = false;
        }
        // this.currentFile = null;
      } else {
        this.dispatch("CForm", "handleChange", this.formItem);
        this.loading = false;
      }
    },
    /**
     * 移出上传的文件
     */
    handleUploadRemove(file) {
      const {prop} = this.formItem;
      const index = this.fileList.indexOf(file);
      this.fileList.splice(index, 1);
      this.form.setFieldsValue({[prop]: this.fileList});
    },
    /**
     * 设置图片路径
     */
    setImgUrl(imgUrl) {
      this.$nextTick(() => {
        this.imgUrl = imgUrl;
      });
    },
    /**
     * 是否是上传图片
     */
    isUploadImg() {
      return this.formItem.listType === 'picture' || this.formItem.listType === 'picture-card'
    },
    saveOneFile(multiple) {
      if (multiple === undefined || !multiple) {
        let data = this.fileList.reverse()[0];
        this.fileList.splice(0);
        this.fileList.push(data);
      }
    }
  }
}