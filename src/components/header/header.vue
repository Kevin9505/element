<template>
  <div class="header">
    <div class="content-wrapper">
      <!-- 头像 -->
      <div class="avator">
        <img
          width="64"
          height="64"
          :src="seller.avatar"
          alt=""
        >
      </div>
      <!-- 右侧内容区 -->
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
        @click="detailShow=!detailShow"
      >
        <span>{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!-- 公告 -->
    <div
      class="bullentin-wrapper"
      @click="detailShow=!detailShow"
    >
      <span class="bullentin-icon"></span>
      <span class="bullentin-content">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img
        :src="seller.avatar"
        alt=""
        width="100%"
      >
    </div>
    <!-- 浮层 -->
    <div
      v-show="detailShow"
      class="detail clearfix"
    >
      <div class="detail-wrapper">
        <div class="detail-main">

        </div>
      </div>
      <div
        class="detail-close"
        @click="detailShow=!detailShow"
      >
        <i class="icon-close"></i>
      </div>
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
      detailShow: false
    }
  },
  created () {
    // 根据不同的type显示不同的图标
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/fun.scss";
.header {
  height: 134px;
  width: 100%;
  color: #fff;
  overflow: hidden;
  position: relative;
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
    background-color: rgba(0, 0, 0, 0.2);
    .bullentin-icon {
      width: 22px;
      height: 12px;
      float: left;
      @include bg-img("./bulletin");
      background-size: 22px 12px;
    }
    .bullentin-content {
      margin-left: 4px;
      width: 93%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .icon-keyboard_arrow_right {
      overflow: hidden;
    }
  }
  .background {
    width: 100%;
    position: absolute;
    top: 0%;
    left: 0px;
    z-index: -1;
    filter: blur(1px);
  }
  .detail {
    width: 100%;
    height: 100%;
    // 如果内容太长,会显示滚动条
    overflow: auto;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 100;
    background-color: rgba(7, 17, 27, 0.8);
    .detail-wrapper {
      // 如果内容不够长时,也保证有全屏长度
      min-height: 100%;
      .detail-main {
        // 保证内容区域的底部有50px的空白
        padding-bottom: 64px;
      }
    }
    .detail-close {
      position: relative;
      width: 32px;
      height: 32px;
      clear: both;
      font-size: 32px;
      // 让关闭按钮向 detail-wraaper 里面伸入50px
      margin: -64px auto 0 auto;
    }
  }
}
</style>
