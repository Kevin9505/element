<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avator">
        <img
          width="64"
          height="64"
          :src="seller.avatar"
          alt=""
        >
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <!-- 因为数据是异步回来,需要用 v-if 判断有数据后才做处理 -->
        <div
          class="supports"
          v-if="seller.supports"
        >
          <span
            class="icon"
            :class="classMap[seller.supports[0].type]"
          ></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div
        v-if="seller.supports"
        class="supports-count"
      >
        <span>{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bullentin-wrapper">
      <span class="bullentin-icon"></span>
      <span class="bullentin-content">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      // 根据不同的type显示不同的图标
      classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/fun.scss";
.header {
  height: 134px;
  width: 100%;
  color: #fff;
   background-color: rgba(7, 17, 27, 0.5);
  .content-wrapper {
    height: 106px;
    display: flex;
    box-sizing: border-box;
    padding: 24px 12px 18px 24px;
    position: relative;
    .avator {
      display: flex;
      img {
        border-radius: 2px;
      }
    }
    .content {
      margin-left: 16px;
      .title {
        display: flex;
        margin: 2px 0 8px 0;
        .brand {
          width: 30px;
          height: 18px;
          display: inline-block;
          @include bg-img("./brand");
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }
        .name {
          font-size: 16px;
          font-weight: bold;
          line-height: 18px;
          margin-left: 6px;
        }
      }
      .description {
        font-size: 12px;
        line-height: 12px;
        margin-bottom: 10px;
      }
      .supports {
        display: flex;
        .icon {
          width: 12px;
          height: 12px;
          margin-right: 4px;
          display: inline-block;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease {
            @include bg-img("./decrease_1");
          }
          &.discount {
            @include bg-img("./discount_1");
          }
          &.guarantee {
            @include bg-img("./guarantee_1");
          }
          &.invoice {
            @include bg-img("./invoice_1");
          }
          &.special {
            @include bg-img("./special_1");
          }
        }
        .text {
          font-size: 10px;
          color: #fff;
          line-height: 12px;
        }
      }
    }
    .supports-count {
      height: 24px;
      line-height: 24px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      font-size: 10px;
      position: absolute;
      bottom: 18px;
      right: 12px;
      border-radius: 24px;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  .bullentin-wrapper {
    height: 28px;
    line-height: 28px;
    font-size: 10px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.2);
    .bullentin-icon{
      width: 22px;
      height: 12px;
      float: left;
      @include bg-img('./bulletin');
      background-size: 22px 12px;
    }
    .bullentin-content{
      margin-left: 4px;
      width: 94%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .icon-keyboard_arrow_right{
      overflow: hidden;
      width: 16px;
    }
  }
}
</style>
