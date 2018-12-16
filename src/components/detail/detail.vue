<template>
  <transition name="move">
    <div
      v-show="showFlag"
      class="detail"
    >
      <div class="detail-content">
        <div class="header-img">
          <img
            :src="food.image"
            alt=""
          >
          <div
            class="back"
            @click="goBack"
          >
            <span class="icon-arrow_lift"></span>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="seller-count">
            <span class="sellCount">月售{{food.sellCount}}</span><span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="newPrice"><i>￥</i>{{food.price}}</span><span
              v-show="food.oldPrice"
              class="oldPrice"
            ><i>￥</i>{{food.oldPrice}}</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    // 接收good组件传过来的值
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show () {
      this.showFlag = true
    },
    goBack () {
      this.showFlag = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../common/scss/fun.scss';
.detail {
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 48px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  &.move-enter-active,
  &.move-leave-active {
    // transition: all 0.2s linear;
    // transform: translate3d(0,0,0);
    transition: opacity 0.5s;
  }
  &.move-enter,
  &.move-leave {
    // transform: translate3d(100%,0,0);
    opacity: 0;
  }
  .detail-content {
    .header-img {
      position: relative;
      width: 100%;
      height: 0px;
      padding-top: 100%;
      img {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        display: block;
      }
      .back {
        position: absolute;
        top: 5px;
        left: 0px;
        .icon-arrow_lift {
          display: block;
          font-size: 20px;
          padding: 10px;
          color: #fff;
        }
      }
    }
    .content{
      padding: 18px;
      @include border-1px(rgba(7,17,27,0.1));
      .title{
        font-size: 14px;
        font-weight: 700;
        line-height: 26px;
        color: rgb(7, 17, 27);
        margin-bottom: 8px;
      }
      .seller-count{
        font-size: 10px;
        line-height: 20px;
        color: rgb(147, 153, 159);
        // .sellCount{}
        .rating{
          margin-left: 12px;
        }
      }
      .price{
        .newPrice{
          color: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
          line-height: 24px;
          i{
            font-size: 10px;
            font-style: normal;
            font-weight: normal;
          }
        }
        .oldPrice{
          font-size: 10px;
          font-weight: 700;
          line-height: 24px;
          color: rgb(147, 153, 159);
          margin-left: 12px;
          i{
            font-style: normal;
            font-weight: normal;
          }
        }
      }
    }
  }
}
</style>
