<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <!-- 一个层平移一个层滚动 -->
          <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      // 添加商品的数量
      // totalCount: 0,
      selectedfoods: [],
      countSelectedFoods: []
    }
  },
  methods: {
    // 添加商品
    addCart (event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      // this.$dispatch('cart.add', event.target)
      // this.totalCount++
      // this.selectedfoods.push(food)
      // console.log(this.selectedfoods)
      // this.$store.dispatch('getSelectFoodAction', this.selectedfoods)
      // this.countSelectedFoods.push(this.selectedfoods)
      // console.log(this.countSelectedFoods)
    },
    // 移除商品
    decreaseCart (event) {
      if (!event._constructed) {
        return false
      }
      if (this.food.count > 0) {
        this.food.count--
      }
    }
  },
  computed: {

  },
  created () {
    // console.log(this.food)
  }
}
</script>
<style lang="scss" scoped>
.cartcontrol{
  font-size: 0px;
  .cart-decrease{
    display: inline-block;
    padding: 6px;
    transition: all 0.4s linear;
    // &.move-enter-active{
    //   opacity: 1;
    //   transform: translate3d(0,0,0);
      .inner{
        display: inline-block;
        line-height: 24px;
        font-size: 24px;
        color: rgb(0, 160, 220);
        transition: all 0.4s linear;
        transform: rotate(0);
      }
    // }
    // &.move-enter,&.move-leave{
    //   opacity: 0;
    //   transform: translate3d(24px,0,0);
    //   .inner{
    //     transform: rotate(180deg);
    //   }
    // }
  }
  .cart-count{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .cart-add{
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }
}
// .cartcontrol{
//   display: flex;
//   .cart-reduce,.cart-add{
//     font-size: 24px;
//     color: rgb(0, 160, 220);
//     line-height: 24px;
//   }
//   .cart-count{
//     font-size: 10px;
//     color: rgb(147, 153, 159);
//     line-height: 24px;
//     width: 24px;
//     text-align: center;
//   }
//   // .cart-add{}
// }
</style>
