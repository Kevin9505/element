<template>
  <transition name="move">
    <div
      v-show="showFlag"
      class="detail"
      ref="detailwrapper"
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
          <div class="cartcontrol-wrapper">
            <v-cartcontrol :food="food"></v-cartcontrol>
          </div>
          <div class="buy" @click.stop.prevent="addCart" v-show="!food.count || food.count===0">加入购物车</div>
        </div>
        <div class="ratings">
          <h1 class="ratings-title">商品介绍</h1>
          <div class="desc">{{food.info||'暂无描述...'}}</div>
        </div>
        <!-- 客户评论区 -->
      <div class="comments-wrapper">
        <div class="comment-title">
          <h2>商品评价</h2>
          <div class="btn-wrapper">
            <span class="all">全部<i>57</i></span>
            <span class="satisfaction">满意<i>47</i></span>
            <span class="unsatisfaction">不满意<i>10</i></span>
          </div>
          <div class="toggle">
            <span class="icon-check_circle"></span>只看有内容的评论
          </div>
        </div>
        <div class="comment-container" ref="commentcontainer">
          <ul class="container" ref="container">
            <li v-show="food.ratings" v-for="list in food.ratings" :key="list.index">
              <div class="top">
                <span class="time">{{list.rateTime|formatdate()}}</span>
                <div class="uers">
                  <span class="username">{{list.username}}</span>
                  <img class ="avator" :src="list.avatar" alt="">
                </div>
              </div>
              <div class="bottom">
                <span class="icon" :class="list.rateType|changeRate()"></span>
                <span class="text">{{list.text}}</span>
              </div>
            </li>
            <!-- <span class="noratings" v-show="food.ratings">暂无评价呢....</span> -->
          </ul>
        </div>
      </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScoll from 'better-scroll'
import Vue from 'vue'
import cartcontrol from '@/components/cartcontrol/cartcontrol.vue'
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
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScoll(this.$refs.detailwrapper, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    goBack () {
      this.showFlag = false
    },
    // 当页面加载完成后滚动初始化
    _initScroll () {
      if (!this.scroll) {
        this.scroll = new BScoll(this.$refs.detailwrapper, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    addCart (event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    }
  },
  filters: {
    // 点赞是否
    changeRate (rateType) {
      if (rateType === 1) {
        return 'icon-thumb_down'
      } else if (rateType === 0) {
        return 'icon-thumb_up icon-color'
      }
    },
    // 时间过滤器
    formatdate (rateTime) {
      var date = new Date(rateTime)
      var year = date.getFullYear()
      var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
      var day = date.getDate()
      var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      var minute = date.getMinutes()
      var second = date.getSeconds()
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    }
    // isRatings (ratings) {
    //   if (ratings.length > 0) {
    //     return true
    //   } else {
    //     return false
    //   }
    // }
  },
  components: {
    'v-cartcontrol': cartcontrol
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
  padding-bottom: 48px;
  background-color: #f3f5f7;
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
    padding-bottom: 90px;
    .header-img {
      position: relative;
      width: 100%;
      height: 0px;
      padding-top: 100%;
      background-color: #fff;
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
      background-color: #fff;
      margin-bottom: 16px;
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

      .cartcontrol-wrapper{
        position: absolute;
        right: 18px;
        bottom: 15px;
      }
      .buy{
        font-size: 10px;
        color: #fff;
        padding: 6px 12px;
        border-radius: 12px;
        box-sizing: border-box;
        background-color: rgb(0, 160, 220);
        position: absolute;
        right: 18px;
        bottom: 20px;
      }
    }
    .ratings{
      padding: 18px;
      background-color: #fff;
      @include bordertop-1px(rgba(7,17,27,0.1));
      .ratings-title{
        font-size: 14px;
        font-weight: 700;
        line-height: 26px;
        color: rgb(7, 17, 27);
        margin-bottom: 8px;
      }
      .desc{
        font-size: 12px;
        color: rgb(77, 85, 93);
        line-height: 24px;
      }
    }
    /* 评论区 */
  .comments-wrapper{
    background-color: #fff;
    .comment-title{
      padding: 18px;
      padding-bottom: 0px;
      @include border-1px(rgba(7,17,27,0.1));
      h2{
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
        margin-bottom: 18px;
      }
      .btn-wrapper{
        display: flex;
        padding-bottom: 18px;
        @include border-1px(rgba(7,17,27,0.1));
        span{
          font-size: 12px;
          line-height: 16px;
          padding: 8px;
          margin-right: 8px;
          border-radius: 2px;
          &:nth-last-of-type(1){
            margin-right: 0px;
          }
          i{
            font-style: normal;
            font-size: 8px;
            padding-left: 4px;
          }
        }
        .all{
          color: #fff;
          background-color: rgb(0, 160, 220);
        }
        .satisfaction{
          color: rgb(77, 85, 93);
          background-color: rgba(0,160,220,0.2);
        }
        .unsatisfaction{
          color: rgb(77, 85, 93);
          background-color: rgba(77,85,93,0.2);
        }
      }
      .toggle{
        font-size: 12px;
        color: rgb(147, 153, 159);
        padding: 12px 0px;
        line-height: 24px;
        display: flex;
        align-items: center;
        .icon-check_circle{
          font-size: 24px;
          margin-right: 4px;
        }
      }
    }
    .comment-container{
      .container{
        padding: 16px;
        li{
          padding-bottom: 16px;
          @include border-1px(rgba(7,17,27,0.1));
          .top{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .time{
              font-size: 10px;
              color: rgb(147, 153, 159);
              line-height: 24px;
            }
            .uers{
              display: flex;
              .username{
                font-size: 10px;
                color: rgb(147, 153, 159);
                margin-right: 6px;
              }
              .avator{
                width: 12px;
                height: 12px;
                border-radius: 50%;
              }
            }
          }
          .bottom{
            .icon{
              font-size: 12px;
              color: rgb(147, 153, 159);
              line-height: 24px;
              &.icon-color{
                color: rgb(0, 160, 220);
              }
            }
            .text{
              font-size: 12px;
              color: rgb(7, 17, 27);
              line-height: 16px;
            }
          }
        }
        .noratings{
          color: rgb(7, 17, 27);
          font-size: 10px;
        }
      }
    }
  }
  }
}
</style>
