<!--
 * @Description: 照片墙
 * @Author: chenxiaofan
 * @Date: 2020-01-02 17:13:01
 * @LastEditors  : chenxiaofan
 * @LastEditTime : 2020-01-02 20:18:10
 * @FilePath: \leigod_admin_front\src\components\comm\img-card.vue
 -->
<template>
  <div class="comm-img-card" :class="[layout]">
    <div v-for="(item, index) in imgList" :key="index" class="img-card-item">
      <div class="box">
        <img :src="item">
        <slot>
          <div class="icons">
            <a-icon v-for="(iconItem, iconIndex) in iconList" :key="iconIndex" :type="iconItem.icon" @click="iconItem.clickEvent(item)"></a-icon>
          </div>
        </slot>
      </div>
    </div>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    imgs: {
      type: [Array, String],
      required: true,
      default: () => []
    },
    icons: {
      type: Array
    },
    disabled: {
      type: Boolean,
      default: false
    },
    layout: {
      type: String,
      default: 'inline'
    }
  },
  data() {
    return {
      previewVisible: false,
      previewImage: null
    }
  },
  computed: {
    imgList() {
      if (Array.isArray(this.imgs)) {
        return this.imgs;
      } else {
        return this.imgs.split(',').filter(item => item);
      }
    },
    iconList() {
      if (this.icons) {
        return this.icons;
      } else {
        let arr = [{icon: 'eye', clickEvent: this.check}];
        if (!this.disabled) {
          arr.push({
            icon: 'delete',
            clickEvent: this.delete
          });
        }
         return arr;
      }
    }
  },
  methods: {
    check(img) {
      this.previewImage = img;
      this.previewVisible = true;
    },
    handleCancel() {
      this.previewVisible = false;
      this.previewImage = null;
    }
  }
}
</script>

<style lang="less" scoped>
.comm-img-card.inline{
  .flex()
}
.comm-img-card{
  .img-card-item{
    border: 1px solid #d9d9d9;
    padding: 8px;
    border-radius: 5px;
    margin-right: 5px;
    .box{
      position: relative;
      overflow: hidden;
      border-radius: 5px;
      &::before{
        content: '';
        position: absolute;
        background-color: rgba(0, 0, 0, 0.4);
        width: 100%;
        height: 100%;
        display: none;
        z-index: 1;
      }
      &:hover{
        .icons{
          display: inline;
        }
        &::before{
          display: block;
        }
      }
      img{
        width: 80px;
        height: 80px;
        border-radius: 5px;
      }
      .icons{
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 10;
        white-space: nowrap;
        transform: translate(-50%, -50%);
        display: none;
        transition: all 0.3s;
        color: rgba(255, 255, 255, 0.85);
      }
    }
  }
}
</style>