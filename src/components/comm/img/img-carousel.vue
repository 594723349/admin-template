<!--
 * @Description: 图片轮播
 * @Author: chenxiaofan
 * @Date: 2020-01-02 20:41:09
 * @LastEditors  : chenxiaofan
 * @LastEditTime : 2020-01-02 21:08:26
 * @FilePath: \leigod_admin_front\src\components\comm\img\img-carousel.vue
 -->
<template>
  <a-carousel arrows effect="fade">
    <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
        <a-icon type="left-circle" />
    </div>
    <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
        <a-icon type="right-circle" />
    </div>
    <div v-for="(img, index) in imgList" :key="index" class="img-box">
      <img alt="example" style="width: 100%" :src="img"/>
    </div>
  </a-carousel>
</template>

<script>
export default {
  props: {
    imgs: {
      type: [Array, String],
      required: true,
      default: () => []
    },
  },
  computed: {
    imgList() {
      if (Array.isArray(this.imgs)) {
        return this.imgs;
      } else {
        return this.imgs.split(',').filter(item => item);
      }
    },
  }
}
</script>

<style lang="less" scoped>
.custom-slick-arrow{
  &::before{
    display: none;
  }
  .anticon{
    font-size: 25px;
    color: #fff;
  }
}
</style>