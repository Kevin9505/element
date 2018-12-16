<template>
  <div class="cartcontrol">
    <div class="cart-add icon-remove_circle_outline" v-show="totalCount>0" @click.stop.prevent="decreaseCart"></div>
    <div class="cart-count" v-show="totalCount>0">{{totalCount}}</div>
    <div class="cart-reduce icon-add_circle" @click.stop.prevent="addCart(food, $event)"></div>
  </div>
</template>
<script>
// import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      // 添加商品的数量
      totalCount: 0,
      selectedfoods: [],
      countSelectedFoods: []
    }
  },
  methods: {
    // 添加商品
    addCart (food, event) {
      if (!event._constructed) {
        return false
      }
      this.totalCount++
      this.selectedfoods.push(food)
      // console.log(this.selectedfoods)
      this.$store.dispatch('getSelectFoodAction', this.selectedfoods)
      // this.countSelectedFoods.push(this.selectedfoods)
      // console.log(this.countSelectedFoods)
    },
    // 移除商品
    decreaseCart (event) {
      if (!event._constructed) {
        return false
      }
      if (this.totalCount > 0) {
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
  display: flex;
  .cart-reduce,.cart-add{
    font-size: 24px;
    color: rgb(0, 160, 220);
    line-height: 24px;
  }
  .cart-count{
    font-size: 10px;
    color: rgb(147, 153, 159);
    line-height: 24px;
    width: 24px;
    text-align: center;
  }
  // .cart-add{}
}
</style>
