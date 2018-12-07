<template>
  <div class="shopcart">
    <div class="shopcart-left-wrapper">
      <div class="logo-wrapper">
        <div class="logo" :class="{'highlight':totalCount>0}">
          <i class="icon-shopping_cart shopping-icon" :class="{'highlight':totalCount>0}"></i>
        </div>
        <div class="total-num" v-show="totalCount>0">{{totalCount}}</div>
      </div>
      <div class="price">￥{{totalPrice}}</div>
      <div class="desc">另需配送费 ￥{{deliveryPrice}}</div>
    </div>
    <div class="shopcart-right-wrapper">
      <div class="pay" :class="payClass">
        ￥20起送
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 商品总数
      totalCount: 1,
      // 商品总价
      totalPrice: 20,
      // 起送价
      minPrice: 20,
      // 另需配送价
      deliveryPrice: 8
    }
  },
  computed: {
    payClass () {
      if (this.totalPrice >= this.minPrice) {
        return 'enough'
      } else {
        return 'not-enough'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.shopcart {
  height: 48px;
  display: flex;
  background-color: #141d27;
  .shopcart-left-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 15px;
    .logo-wrapper {
      height: 56px;
      width: 56px;
      // display: inline-block;
      position: relative;
      bottom: 8px;
      // background: #141d27;
      .logo {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background: #2b343c;
        display: flex;
        align-items: center;
        justify-content: center;
        // background-color: rgba(0,0,0,0.2);
        border: 6px solid #141d27;
        &.highlight {
          background: rgb(0, 160, 220);
        }
        .shopping-icon {
          font-size: 24px;
          line-height: 24px;
          color: rgba(255, 255, 255, 0.4);
          &.highlight {
            color: #fff;
          }
        }
      }
      .total-num {
        width: 26px;
        padding: 0 6px;
        font-size: 9px;
        line-height: 16px;
        color: #fff;
        text-align: center;
        border-radius: 20px;
        box-sizing: border-box;
        position: absolute;
        top: -2px;
        right: -2px;
        z-index: 10;
        background-color: rgb(240, 20, 20);
        box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4);
      }
    }
    .price {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.4);
      font-weight: 700;
      line-height: 24px;
      margin-left: 18px;
      margin-right: 12px;
    }
    .desc {
      font-size: 10px;
      color: rgba(255, 255, 255, 0.4);
      // line-height: 48px;
    }
  }
  .shopcart-right-wrapper {
    flex: 0 0 105px;
    width: 105px;
    .pay {
      height: 48px;
      line-height: 48px;
      text-align: center;
      font-size: 12px;
      font-weight: 700;
      padding: 0 8px;
      color: rgba(255, 255, 255, 0.4);
      &.not-enough {
        background: #2b333b;
      }
      &.enough {
        background: #00b43c;
        color: #fff;
      }
    }
  }
}
</style>
