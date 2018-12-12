<template>
  <div class="ratings" ref="ratingswrapper">
    <div class="ratings-wrapper">
    <!-- 商家评分 -->
    <div class="seller-info">
      <div class="info-left">
        <span class="rank-rate">{{seller.score}}</span>
        <span class="synthesize">综合评分</span>
        <span class="overtop">高于周边商家{{seller.rankRate}}%</span>
      </div>
      <div class="info-right">
        <div class="server-wrapper">
          <span class="server">服务态度</span>
          <v-star :size="36" :score="seller.serviceScore"></v-star>
          <span class="server-score">{{seller.serviceScore}}</span>
        </div>
        <div class="good-wrapper">
          <span class="good">商品评分</span>
          <v-star :size="36" :score="seller.foodScore"></v-star>
          <span class="good-score">{{seller.foodScore}}</span>
        </div>
        <div class="time-wrapper">
          <span class="time">送达时间</span>
          <span class="deliveryTime">平均{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
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
          <li v-for="list in ratings" :key="list.index">
            <img :src="list.avatar" width="28" height="28" alt="">
            <div class="container-wrapper">
              <div class="wrapper-top">
                <div class="top-left">
                  <span class="name">{{list.username}}</span>
                  <div class="desc">
                    <v-star :size="24" :score="list.score"></v-star>
                    <span class="time" v-show="list.deliveryTime">{{list.deliveryTime}}分送达</span>
                  </div>
                </div>
                <div class="top-right">{{list.rateTime|formatdate()}}</div>
              </div>
              <div class="wrapper-middle">
                {{list.text}}
              </div>
              <div class="wrapper-bottom">
                <span class="icon-thumb_up"></span>
                <span class="list" v-for="item in list.recommend.slice(0, 3)" :key="item.index">{{item}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import star from '@/components/star/star.vue'
import BScroll from 'better-scroll'
const errOk = 0
export default {
  name: 'ratings',
  data () {
    return {
      ratings: [],
      seller: []
    }
  },
  methods: {
    _initScroll () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.ratingswrapper, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    }
  },
  watch: {
    'ratings' () {
      this._initScroll()
    }
  },
  mounted () {
    this.$http.get('/api/ratings').then(response => {
      response = response.body
      console.log(response)
      if (response.errno === errOk) {
        this.ratings = response.data
      }
    })
    this.$http.get('/api/seller').then(response => {
      response = response.body
      console.log(response)
      if (response.errno === errOk) {
        this.seller = response.data
      }
    })
  },
  filters: {
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
  },
  components: {
    'v-star': star
  }
}
</script>
<style lang="scss" scoped>
@import '../../common/scss/fun.scss';
.ratings{
  background-color: #f3f5f7;
    position: absolute;
    top: 174px;
    bottom: 0px;
    width: 100%;
    overflow: hidden;
  .ratings-wrapper{
  /* 商家评分 */
  .seller-info{
    background-color: #fff;
    display: flex;
    padding: 18px;
    margin-bottom: 16px;
    @include border-1px(rgba(7,17,27,0.1));
    .info-left{
      flex: 3;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-right: 1px solid rgba(7,17,27,0.1);
      .rank-rate{
        font-size: 24px;
        line-height: 28px;
        color: rgb(255, 153, 0);
        padding-bottom: 6px;
      }
      .synthesize{
        font-size: 12px;
        line-height: 12px;
        color: rgb(7, 17, 27);
        padding-bottom: 8px;
      }
      .overtop{
        font-size: 10px;
        color: rgb(147, 153, 159);
        line-height: 10px;
      }
    }
    .info-right{
      flex: 5;
      padding-left: 24px;
      .server-wrapper{
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        .server{
          font-size: 12px;
          color: rgb(7, 17, 27);
          line-height: 18px;
          padding-right: 12px;
        }
        .server-score{
          font-size: 12px;
          padding-left: 12px;
          color: rgb(255, 153, 0);
        }
      }
      .good-wrapper{
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        .good{
          font-size: 12px;
          color: rgb(7, 17, 27);
          line-height: 18px;
          padding-right: 12px;
        }
        .good-score{
          font-size: 12px;
          padding-left: 12px;
          color: rgb(255, 153, 0);
        }
      }
      .time-wrapper{
        display: flex;
        align-items: center;
        .time{
          font-size: 12px;
          color: rgb(7, 17, 27);
          line-height: 18px;
          padding-right: 12px;
        }
        .deliveryTime{
          font-size: 12px;
          color: rgb(147, 153, 159);
          line-height: 18px;
        }
      }
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
        padding: 0px 18px;
        li{
          display: flex;
          padding: 18px 0px;
          @include border-1px(rgba(7,17,27,0.1));
          img{
            border-radius: 50%;
          }
          .container-wrapper{
            margin-left: 12px;
            width: 100%;
            .wrapper-top{
              display: flex;
              align-items: center;
              justify-content: space-between;
              .top-left{
                .name{
                  font-size: 10px;
                  color: rgb(7, 17, 27);
                  line-height: 12px;
                  margin-bottom: 4px;
                }
                .desc{
                  display: flex;
                  align-items: center;
                  margin-bottom: 6px;
                  .time{
                    font-size: 10px;
                    margin-left: 6px;
                    color: rgb(147, 153, 159);
                    line-height: 12px;
                  }
                }
              }
              .top-right{
                font-size: 10px;
                color: rgb(147, 153, 159);
                line-height: 12px;
              }
            }
            .wrapper-middle{
              font-size: 12px;
              color: rgb(7, 17, 27);
              line-height: 18px;
              margin-bottom: 8px;
            }
            .wrapper-bottom{
              display: flex;
              align-items: center;
              .icon-thumb_up{
                font-size: 12px;
                color: rgb(0, 160, 220);
              }
              .list{
                padding: 2px 6px;
                margin-left: 8px;
                border-radius: 2px;
                background-color: #fff;
                border: 1px solid rgba(7,17,27,0.1);
                font-size: 9px;
                color: rgb(147, 153, 159);
                line-height: 16px;
              }
            }
          }
        }
      }
    }
  }
  }
}
</style>
