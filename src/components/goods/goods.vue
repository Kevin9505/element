<template>
  <div class="goods">
    <div
      class="menu-wrapper"
      ref="menuWrapper"
    >
      <ul>
        <li
          class="menu-item"
          :class="{'current':currentIndex===index}"
          v-for="(item,index) in goods"
          :key="index"
          @click="selectMenu(index,$event)"
        >
          <span class="text border-1px">
            <span
              class="icon"
              :class="classMap[item.type]"
              v-show="item.type>0"
            ></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div
      class="foods-wrapper"
      ref="foodsWrapper"
    >
      <ul>
        <li
          v-for="(item, index) in goods"
          :key="index"
          class="food-list foodlist-list-hook"
        >
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li
              class="food-item border-1px"
              v-for="(food, index) in item.foods"
              :key="index"
            >
              <div class="food-img">
                <img
                  :src="food.icon"
                  width="57"
                  height="57"
                  alt=""
                >
              </div>
              <div class="food-content">
                <h2 class="food-name">{{food.name}}</h2>
                <span v-show="food.description" class="food-description">{{food.description}}</span>
                <div class="food-sell">
                  <span class="sellCount">月售{{food.sellCount}}</span><span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="tool-wrapper">
                  <div class="price">
                    <span class="newPrice"><i>￥</i>{{food.price}}</span><span
                      v-show="food.oldPrice"
                      class="oldPrice"
                    ><i>￥</i>{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <!-- <span class="reduce">-</span>
                    <span class="count-number"></span>
                    <span class="increase">+</span> -->
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// 导入 better-scroll 模块
import BScroll from 'better-scroll'
const errOk = 0 // 常量,方便解耦
export default {
  // name: 'goods',
  data () {
    return {
      goods: [], // 接收商品页的数据
      // classMap: [],
      listHeight: [], // 用来存储 foods区域的各个区块的高度(clientHeight)
      scrollY: 0 // 用来存储foods区域的滚动的 y 坐标
    }
  },
  // 接收数据
  props: {
    // seller: {
    //   type: Object
    // }
  },
  created () {
    // 计算左侧菜单栏的小图标,动态添加类来控制
    (this.classMap = [
      'decrease',
      'discount',
      'guarantee',
      'invoice',
      'special'
    ])
    // 当这个组件被调用时,发请求获取商品数据将数据赋值给goods
    this.$http.get('/api/goods').then(response => { // '/api/goods/' 请求的是data.json 下的goods数组
      response = response.body
      if (response.errno === errOk) {
        this.goods = response.data
        // 可以用 $nextTick(()=>{}) 来确保 Dom 变化后再执行一些事情
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      }
      // console.log(this.goods)
    })
  },
  methods: {
    /**
     * 关于在selectMenu中点击,在pc界面会出现两次事件,在移动端就只出现一次事件的问题:
     * 原因: bsScrooler会监听事件(例如touchmove,click之类),并且阻止默认事件(prevent stop),
     * 并且他只会监听移动端的,pc端的没有监听在pc页面上 bsScroller也派发了一次click事件,原生也派发了一次click事件
     * 解决: 针对bsScroole的事件,有_constructed: true,所以做处理,return掉非bsScroll的事件
     */
    // 选中的菜单
    selectMenu (index, event) {
      // console.log(index)
      // 去掉自带的click事件点击,即pc端直接返回
      if (!event._constructed) {
        return
      }
      // 将商品区的每一个分类区块添加到数组里，
      let foodList = this.$refs.foodsWrapper.getElementsByClassName(
        'foodlist-list-hook'
      )
      // 根据左侧点击按钮获取对应的商品区块
      let el = foodList[index]
      /**
       * scrollToElement()：是better-scroll中的方法，滚动到某个元素，el（必填）表示 dom 元素，time 表示动画时间，
       * offsetX 和 offsetY 表示坐标偏移量，easing 表示缓动函数
       */
      // 类似jump to 的功能,通过这个方法,跳转到指定的dom
      this.foodsScroll.scrollToElement(el, 100)
    },
    _initScroll () {
      // 初始化scroll区域
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        click: true // beeter-scroll 取消默认事件,我们这里再派发一个点击事件
      })
      // 结合 BScroll 的接口使用,3实时派发scroll事件
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3 // beeter-scroll 探针
      })
      // 结合 BScroll 的接口使用,监听 scroll 事件(实时派发的),并获取鼠标的坐标
      this.foodsScroll.on('scroll', pos => {
        // 滚动坐标会出现负的,并且是小数,所以需要处理一下
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    // 计算 foods 内部块的高度
    _calculateHeight () {
      // 获取每一个 food 的dom
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('foodlist-list-hook')
      let height = 0
      // 初始化第一个高度为 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        // 每一个 item 都是刚才获取的 food 的每一个 dom
        let item = foodList[i]
        // 只要是为了获取每一个 foods 内部块的高度
        height += item.clientHeight
        this.listHeight.push(height)
      }
      // console.log(this.listHeight)
    },
    _drop (target) {
      this.$nextTick(() => {
        this.$resf.shopcart.drop(target)
      })
    }
  },
  computed: {
    // 计算到达哪个区域的区间时候的对应的索引值
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        // 当前menu子块的高度
        let height1 = this.listHeight[i]
        // console.log(height1)
        // 下一个 menu 子块的高度
        let height2 = this.listHeight[i + 1]
        // console.log(height2)
        // 滚到底部时,height2 为 undefined,需要考虑这种情况
        // 需要确定是在两个 menu 子块的高度区间
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          // 返回这个 menu 子块的索引
          // console.log(i)
          return i
        }
      }
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/fun.scss";
// @import "@/common/scss/base.scss";
.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
    ul {
      .menu-item {
        height: 54px;
        width: 56px;
        display: flex;
        align-items: center;
        line-height: 14px;
        font-size: 0px;
        padding: 0px 12px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        &.current { /* 菜单选中的样式 */
          position: relative;
          z-index: 10;
          margin-top: -1px;
          background-color: #fff;
          font-weight: 700;
        }
        .text {
          font-size: 12px;
          color: rgb(22, 22, 22);
          line-height: 14px;
          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 2px;
            vertical-align: top;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease {
              @include bg-img("./decrease_3");
            }
            &.discount {
              @include bg-img("./discount_3");
            }
            &.guarantee {
              @include bg-img("./guarantee_3");
            }
            &.invoice {
              @include bg-img("./invoice_3");
            }
            &.special {
              @include bg-img("./special_3");
            }
          }
        }
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    ul {
      .food-list {
        .title {
          height: 26px;
          font-size: 12px;
          color: rgb(147, 153, 159);
          line-height: 26px;
          padding-left: 14px;
          border-left: 2px solid #d9dde1;
          background-color: #f3f5f7;
        }
        ul {
          .food-item {
            // margin: 0 18px;
            margin-left: 18px;
            padding: 18px 18px 18px 0;
            display: flex;
            box-sizing: border-box;
            @include border-1px(rgba(7, 17, 27, 0.1));
            // .food-img{}
            .food-content {
              padding-left: 10px;
              .food-name {
                font-size: 14px;
                margin-bottom: 8px;
                color: rgb(7, 17, 27);
              }
              .food-description {
                width: 90%;
                display: block;
                font-size: 10px;
                line-height: 10px;
                margin-bottom: 8px;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: rgb(147, 153, 159);
              }
              .food-sell {
                font-size: 10px;
                line-height: 10px;
                margin-bottom: 8px;
                color: rgb(147, 153, 159);
                // .sellCount{}
              }
              .tool-wrapper {
                width: 100%;
                display: flex;
                align-items: center;
                .price {
                  .newPrice {
                    font-size: 14px;
                    font-weight: 700;
                    color: rgb(240, 24, 1);
                    i {
                      font-size: 10px;
                      font-weight: normal;
                      font-style: normal;
                    }
                  }
                  .oldPrice {
                    font-size: 10px;
                    line-height: 24px;
                    font-weight: 700;
                    margin-left: 8px;
                    color: rgb(147, 153, 159);
                    i {
                      font-weight: normal;
                      font-style: normal;
                    }
                  }
                }
                // .cartcontrol-wrapper{
                // .reduce{}
                // .count-number{}
                // .increase{}
                // }
              }
            }
          }
        }
      }
    }
  }
}
</style>
