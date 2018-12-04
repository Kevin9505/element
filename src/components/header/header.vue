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
    <transition name="fade">
      <div
        v-show="detailShow"
        class="detail fade-transition"
        transition="fade"
      >
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <div class="main-top">
              <h1 class="name">{{seller.name}}</h1>
              <star
                class="star"
                :size="48"
                :score="seller.score"
              ></star>
            </div>
            <div class="mian-discountsInfo">
              <div class="discounts-title">
                <div class="middle-line"></div>
                <h2>优惠信息</h2>
                <div class="middle-line"></div>
              </div>
              <ul
                class="discounts-content"
                v-if="seller.supports"
              >
                <li
                  v-for="item in seller.supports"
                  :key="item.index"
                >
                  <span
                    class="discounts-icon"
                    :class="classMap[item.type]"
                  ></span>
                  <span class="discounts-text">{{item.description}}</span>
                </li>
              </ul>
            </div>
            <div class="seller-bulletin">
              <div class="discounts-title">
                <span class="middle-line"></span>
                <h2>商家公告</h2>
                <span class="middle-line"></span>
              </div>
              <p class="bulletin-content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div
          class="detail-close"
          @click="detailShow=!detailShow"
        >
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// 引入星星组件
import star from '../star/star.vue'

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
  },
  // 注册组件
  components: {
    star
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/fun.scss";
@mixin title {
  .discounts-title {
    display: flex;
    width: 100%;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 24px;
    .middle-line {
      flex: 1;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    h2 {
      font-size: 14px;
      font-weight: 700;
      line-height: 14px;
      color: rgb(255, 255, 255);
      padding: 0px 12px;
    }
  }
}
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
    transition: all 0.5s;
    backdrop-filter: blur(10px);
    &.fade-transition {
      opacity: 1;
      transition: all 0.5s;
      background-color: rgba(7, 17, 27, 0.8);
    }
    &.fade-enter,
    &.fade-leave {
      opacity: 0;
      background-color: rgba(7, 17, 27, 0);
    }
    .detail-wrapper {
      // 如果内容不够长时,也保证有全屏长度
      min-height: 100%;
      // padding: 0 36px;
      .detail-main {
        // 保证内容区域的底部有50px的空白
        padding-bottom: 64px;
        .main-top {
          padding-top: 64px;
          margin-bottom: 28px;
          .name {
            font-size: 16px;
            font-weight: 700;
            line-height: 16px;
            text-align: center;
            margin-bottom: 16px;
          }
          .star {
            display: flex;
            justify-content: center;
          }
        }
        .mian-discountsInfo {
          @include title;
          width: 80%;
          margin: 0 auto;
          margin-bottom: 28px;
          .discounts-content {
            li {
              display: flex;
              align-items: center;
              margin-bottom: 12px;
              padding-left: 12px;
              .discounts-icon {
                width: 16px;
                height: 16px;
                margin-right: 4px;
                display: inline-block;
                background-size: 16px 16px;
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
              .discounts-text {
                font-size: 12px;
                color: rgb(255, 255, 255);
                // line-height: 16px;
              }
            }
          }
        }
        .seller-bulletin {
          @include title;
          width: 80%;
          margin: 0 auto;
          .bulletin-content {
            font-size: 12px;
            color: #fff;
            line-height: 24px;
            padding: 0 12px;
          }
        }
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
