<template>
  <div class="shopcart">
    <div class="content">
      <div class="shopcart-left-wrapper" @click.stop.prevent="toggleList">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart shopping-icon" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="total-num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费 ￥{{deliveryPrice}}</div>
      </div>
      <div class="shopcart-right-wrapper">
        <div class="pay" :class="payClass" @click="pay">
          {{payDesc}}
        </div>
      </div>
    </div>
    <!-- 小球动画 -->
    <div class="ball-container">
      <div class="ball" v-for="ball in balls" :key="ball.id">
        <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"></transition>
        <div class="ball" v-show="ball.show">
          <div class="inner inner-hook"></div>
        </div>
      </div>
    </div>
    <!-- 购物车列表详情 -->
    <div class="shopcart-list" v-show="listShow" transition="fold">
      <!-- 详情标题 -->
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="empty">清空</span>
      </div>
      <!-- 详情内容 -->
      <div class="list-content" ref="listcontent">
        <ul>
          <li class="food" v-for="food in selectFoods" :key="food.index">
            <span class="name">{{food.name}}</span>
            <div class="food-right">
              <div class="price">￥<span class="total-price">{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <v-cartcontrol :food="food"></v-cartcontrol>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="list-mask" v-show="listShow" @click.stop.prevent="hideList"></div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import cartcontrol from '@/components/cartcontrol/cartcontrol.vue'
import Vue from 'vue'
export default {
  components: {
    'v-cartcontrol': cartcontrol
  },
  props: {
    selectFoods: {
      type: Array,
      default () {
        return [
          {
            price: 10,
            count: 1
          }
        ]
      }
    },
    deliveryPrice: {
      type: Number,
      dafault: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // 商品总价
      // totalPrice: 10,
      // listShow: false,
      // selectFoodData: [],
      // // 起送价
      // minPrice: 20,
      // // 另需配送价
      // deliveryPrice: 8,
      // 维护小球当前状态
      balls: [
        {show: false},
        {show: false},
        {show: false},
        {show: false},
        {show: false}
      ],
      dropBalls: [],
      fold: false
    }
  },
  computed: {
    // getSelectedFood () {
    //   const selectFood = this.$store.selectedFood()
    //   return selectFood
    // },
    // 总价
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    // 所选商品总数
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    // 支付的三种描述情况
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    // 判断结算按钮是否高亮
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    },
    // 判断购物车列表内是否有商品,再进行展开折叠
    listShow () {
      if (!this.totalCount) {
        this.fold = true
        return false
      }
      let show = !this.fold
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listcontent, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  },
  methods: {
    addCart (event) {
      // 解决pc端双击的问题
      if (!event._constructed) { // 浏览器直接return掉,去掉自带click事件的点击
        return
      }
      if (!this.food.count) {
        // food.count 是原生json中不存在的属性,不能直接添加
        Vue.set(this.food, 'count', 1) // 给this.food增加一个count属性，并初始化为1
      } else {
        this.food.count++
      }
      // 设置滚动对象时,点击加号,设置一个派发事件,将dom对象传出去,将target(dom)作为cart.add事件
      // $emit,$on,$off 分别来发、监听、取消监听事件
      this.$emit('cart-add', event.target)
    },
    decreaseCart (event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    },
    // 获取到点击的dom元素
    drop (el) {
      console.log(el)
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    // 定义三个钩子函数实现动画
    beforeEnter (el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x},0,0)`
        }
      }
    },
    enter (el) {
      /* 触发浏览器重绘，重绘之后才可以设置transform */
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight
      this.$nextTick(() => { // 样式重置
        el.style.webKitTransform = 'translate3d(0,0,0)'// 没有变量时只能用单引，不能用反引
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
      })
    },
    afterEnter (el) { // 动画完成
      let ball = this.dropBalls.shift()// 删除并返回第一个ball
      if (ball) {
        ball.show = false // 重置ball.show的状态
        el.style.display = 'none'
      }
    },
    // 购物车列表遮罩
    hideList () {
      this.fold = true
    },
    // 切换购物车详情页
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    // 清空购物车
    empty () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    // 结算支付弹框
    pay () {
      if (this.totalPrice < this.minPrice) {
        return
      }
      window.alert(`你需要支付${this.totalPrice}元`)
    }
  },
  watch: {
  }
  // 动画函数
  // transitions: {
  //   drop: {
  //     beforeEnter (el) {
  //       let count = this.balls.length
  //       while (count--) {
  //         let ball = this.balls[count]
  //         if (ball.show) {
  //           let rect = ball.el.getBoundingClientRect()
  //           let x = rect.left - 32
  //           let y = -(window.innerHeight - rect.top - 22)
  //           el.style.display = ''
  //           el.style.webkitTransform = `translate3d(0,${y}px,0)`
  //           el.style.transform = `translate3d(0,${y}px,0)`
  //           let inner = el.getElementsByClassName('inner-hook')[0]
  //           inner.style.webkitTransform = `translate3d(${x}px,0,0)`
  //         }
  //       }
  //     },
  //     enter (el) {
  //       // let rf = el.offsetHight
  //       this.$nextTick(() => {
  //         el.style.webkitTransform = 'translate3d(0,0,0)'
  //         el.style.transform = 'translate3d(0,0,0)'
  //         let inner = el.getElementsByClassName('inner-hook')[0]
  //         inner.style.webkitTransform = 'translate3d(0,0,0)'
  //         inner.style.transform = 'translate(0,0,0)'
  //       })
  //     },
  //     afterEnter (el) {
  //       let ball = this.dropBalls.shift()
  //       if (ball) {
  //         ball.show = false
  //         el.style.display = 'none'
  //       }
  //     }
  //   }
  // }
}
</script>
<style lang="scss" scoped>
@import '../../common/scss/fun.scss';
.shopcart {
  // width: 100%;
  // height: 48px;
  /* 购物车内容 */
  .content{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 40;
    width: 100%;
    height: 48px;
    display: flex;
    background-color: #141d27;
    color: rgba(255, 255, 255, 0.4);
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
   .ball-container{
     .ball{
        position: fixed; //相对于视口做布局
        left: 32px;
        bottom: 22px;
        z-index: 200;
        transition: all 0.6s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner{
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0,160,220);
          transition: all 0.4s linear;  //x轴做一个线性的过渡即可
        }
     }
   }
  /* 购物车列表 */
  .shopcart-list{
    // height: 305px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    z-index: 10;
    width: 100%;
    background-color: #fff;
    .list-header{
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 18px;
      background-color: #f3f5f7;
      @include border-1px(rgba(7,17,27,0.1));
      .title{
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .empty{
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }
    .list-content{
      max-height: 217px;
      overflow: hidden;
      background-color: #fff;
      ul{
        .food{
          height: 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 18px;
          @include border-1px(rgba(7,17,27,0.1));
          .name{
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .food-right{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .price{
              font-size: 10px;
              font-weight: normal;
              color: rgb(240, 20, 20);
              .total-price{
                font-size: 14px;
                font-weight: 700;
              }
            }
            .cartcontrol-wrapper{
              margin-left: 12px;
            }
          }
        }
      }
    }
  }
  /* 遮罩层 */
  .list-mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 5;
    background: rgba(7, 17, 27, 0.6);
    backdrop-filter: blur(10px);
  }
}
</style>
