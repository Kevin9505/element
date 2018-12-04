<template>
  <div class="goods">
    <div
      class="menu-wrapper"
      ref="menuWrapper"
    >
      <ul>
        <li
          class="menu-item"
          v-for="item in goods"
          :key="item.index"
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
          v-for="item in goods"
          :key="item.index"
          class="food-list foodlist-list-hook"
        >
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li
              class="food-item border-1px"
              v-for="food in item.foods"
              :key="food.index"
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
                <span class="food-description">{{food.description}}</span>
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
import BScroll from 'better-scroll'
const errOk = 0
export default {
  name: 'goods',
  data () {
    return {
      goods: [],
      classMap: []
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  },
  mounted () {
    // 发请求获取商品数据
    this.$http.get('/api/goods').then(response => {
      if (response.body.errno === errOk) {
        this.goods = response.body.data
      }
      console.log(this.goods)
    })
    this.$nextTick(() => {
      let bscrollDom = this.$refs['menuWrapper']
      this.aBscroll = new BScroll(bscrollDom, {})
    })
    this.$nextTick(() => {
      let bscrollDom = this.$refs['foodsWrapper']
      this.aBscroll = new BScroll(bscrollDom, {})
    })
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
      padding: 0px 12px;
      .menu-item {
        height: 54px;
        width: 56px;
        display: flex;
        align-items: center;
        line-height: 14px;
        font-size: 0px;
        @include border-1px(rgba(7, 17, 27, 0.1));
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
