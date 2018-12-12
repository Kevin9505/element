<template>
  <div class="seller" ref="sellerScroll">
    <div class="seller-scroll">
      <!-- 商家详细信息 -->
      <div class="seller-info">
        <div class="info-top">
          <div class="grade-wrapper">
            <h2>{{seller.name}}</h2>
            <div class="seller-sales">
              <v-star class="seller-star" :size="36" :score="seller.score"></v-star>
              <span class="month-sales">(661) <i>月售{{seller.sellCount}}单</i></span>
            </div>
          </div>
          <div class="collection" @click="toggleFavorite">
            <span class="icon-favorite" :class="{'favorite':getFavorite}"></span>
            <span class="desc">{{collection}}</span>
          </div>
        </div>
        <div class="info-bottom">
          <ul>
            <li>
              <div class="title">起送价</div>
              <div class="price">{{seller.minPrice}}<span class="unit">元</span></div>
            </li>
            <li>
              <div class="title">商家配送</div>
              <div class="price">{{seller.deliveryPrice}}<span class="unit">元</span></div>
            </li>
            <li>
              <div class="title">平均配送时间</div>
              <div class="price">{{seller.deliveryTime}}<span class="unit">分钟</span></div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 商家公告活动 -->
      <div class="notice">
        <h2>公告与活动</h2>
        <div class="seller-desc">
          {{seller.bulletin}}
        </div>
        <ul class="activity">
          <li v-for="item in seller.supports" :key="item.index">
            <!-- :class="classMap[item.type]" -->
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <!-- 商家实景 -->
      <div class="seller-introduce">
        <h2>商家实景</h2>
        <div class="pic-wrapper" ref="picwrapper">
          <!-- <div class="piclist"> -->
            <ul class="slider" ref="piclist">
              <li v-for="pic in seller.pics" :key="pic.index">
                <img class="seller-pic" :src="pic" alt="">
              </li>
            </ul>
          <!-- </div> -->
        </div>
      </div>
      <!-- 商家信息 -->
      <div class="business-information">
        <h2>商家信息</h2>
        <ul class="infos">
          <li v-for="info in seller.infos" :key="info.index">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from '@/components/star/star.vue'
import BScroll from 'better-scroll'
const errOk = 0
export default {
  name: 'seller',
  data () {
    return {
      msg: '我是商家',
      seller: [],
      favorite: false
    }
  },
  methods: {
    // 计算内容区
    _initScroll () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.sellerScroll, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
      // 初始化scroll区域
      // this.sellerScroll = new BScroll(this.$refs.sellerScroll, {
      //   click: true, // beeter-scroll 取消默认事件,我们这里再派发一个点击事件
      //   probeType: 3 // beeter-scroll 探针
      // })
      // // 结合 BScroll 的接口使用,3实时派发scroll事件
      // this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
      //   click: true,
      //   probeType: 3 // beeter-scroll 探针
      // })
      // 结合 BScroll 的接口使用,监听 scroll 事件(实时派发的),并获取鼠标的坐标
      // this.sellerScroll.on('scroll', pos => {
      //   // 滚动坐标会出现负的,并且是小数,所以需要处理一下
      //   this.scrollY = Math.abs(Math.round(pos.y))
      // })
    },
    // 计算商家图片
    _initPics () {
      if (this.seller.pics) {
        let picWidth = 120
        let margin = 6
        let width = (picWidth + margin) * this.seller.pics.length - margin
        // 动态计算图片容器的宽度
        this.$refs.piclist.style.width = width + 'px'
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picwrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            this.picScroll.refresh()
          }
        })
      }
    },
    toggleFavorite () {
      const favorite = this.$store.state.favorite ? this.$store.state.favorite : this.$store.getters.getFavoriteStatus
      if (favorite) {}
      this.favorite = !this.favorite
      this.$store.dispatch('getFavoriteAction', this.favorite)
    }
  },
  computed: {
    getFavorite () {
      const favorite = this.$store.state.favorite ? this.$store.state.favorite : this.$store.getters.getFavoriteStatus
      return favorite
    },
    collection () {
      return this.getFavorite ? '已收藏' : '收藏'
    }
  },
  watch: {
    'seller' () {
      this._initScroll()
      this._initPics()
    }
    // toggleFavorite () {
    //   if (localStorage.getItem('seller-favorite')) {
    //     this.favorite = localStorage.getItem('seller-favorite')
    //     console.log(this.favorite)
    //     return this.favorite
    //   } else {
    //     this.favorite = true
    //     localStorage.setItem('seller-favorite', this.favorite)
    //     return this.favorite
    //   }
    // }
  },
  mounted () {
    this.$http.get('/api/seller').then(response => {
      response = response.body
      console.log(response)
      if (response.errno === errOk) {
        this.seller = response.data
      }
    })
  },
  created () {
    // 根据不同的type显示不同的图标
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  },
  components: {
    'v-star': star
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/scss/fun.scss';
.seller{
  background-color: #f3f5f7;
    // .seller-scroll{
      position: absolute;
      top: 174px;
      bottom: 0px;
      width: 100%;
      overflow: hidden;
    /* 商家详细信息 */
    .seller-info{
      padding: 18px;
      margin-bottom: 16px;
      background-color: #fff;
      @include border-1px(rgba(7,17,27,0.1));
      .info-top{
        display: flex;
        padding-bottom: 18px;
        @include border-1px(rgba(7,17,27,0.1));
        .grade-wrapper{
          flex: 4;
          // font-size: 0px;
          h2{
            font-size: 14px;
            padding-bottom: 8px;
            color: rgb(7, 17, 27);
          }
          .seller-sales{
            display: flex;
            .seller-star{
              display: inline-block;
            }
            .month-sales{
              display: flex;
              align-items: center;
              font-size: 10px;
              line-height: 18px;
              padding-left: 8px;
              color: rgb(77, 85, 93);
              i{
                font-style: normal;
                padding-left: 12px;
              }
            }
          }
        }
        .collection{
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          .icon-favorite{
            font-size: 24px;
            padding-bottom: 4px;
            color: rgba(7, 17, 27, 0.3);
            &.favorite{
              color: rgb(240, 20, 20);
            }
          }
          .desc{
            font-size: 10px;
            color: rgb(77, 85, 93);
          }
        }
      }
      .info-bottom{
        padding-top: 18px;
        ul{
          display: flex;
          li{
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-left: 1px solid rgba(7,17,27,0.1);
            &:nth-of-type(1){
              border-left: 0px;
            }
            .title{
              font-size: 10px;
              margin-bottom: 4px;
              color: rgb(147, 153, 159);
              line-height: 10px;
            }
            .price{
              font-size: 24px;
              line-height: 24px;
              color: rgb(7, 17, 27);
              .unit{
                font-size: 10px;
              }
            }
          }
        }
      }
    }
    /* 公告与活动 */
    .notice{
      padding: 0px 18px;
      margin-bottom: 16px;
      background-color: #fff;
      @include bordertop-1px(rgba(7,17,27,0.1));
      @include border-1px(rgba(7,17,27,0.1));
      h2{
        font-size: 14px;
        padding-bottom: 8px;
        padding-top: 18px;
        color: rgb(7, 17, 27);
      }
      .seller-desc{
        font-size: 12px;
        color: rgb(240, 20, 20);
        line-height: 24px;
        padding: 0px 12px 16px;
        @include border-1px(rgba(7,17,27,0.1));
      }
      .activity{
        li{
          padding: 16px 12px;
          display: flex;
          align-items: center;
          @include border-1px(rgba(7,17,27,0.1));
          &:nth-last-of-type(1){
            @include border-1px(rgba(7,17,27,0));
          }
          .icon {
            width: 16px;
            height: 16px;
            margin-right: 6px;
            display: inline-block;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease {
              @include bg-img("./decrease_4");
            }
            &.discount {
              @include bg-img("./discount_4");
            }
            &.guarantee {
              @include bg-img("./guarantee_4");
            }
            &.invoice {
              @include bg-img("./invoice_4");
            }
            &.special {
              @include bg-img("./special_4");
            }
          }
          .text {
            font-size: 12px;
            color: rgb(7, 17, 27);
            line-height: 16px;
          }
        }
      }
    }
    /* 商家实景 */
    .seller-introduce{
      padding: 0px 18px;
      padding-bottom: 16px;
      margin-bottom: 16px;
      background-color: #fff;
      @include bordertop-1px(rgba(7,17,27,0.1));
      @include border-1px(rgba(7,17,27,0.1));
      h2{
        font-size: 14px;
        padding-bottom: 8px;
        padding-top: 18px;
        color: rgb(7, 17, 27);
      }
      .pic-wrapper{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        // .piclist{
          .slider{
            height: 100%;
            li{
              float: left;
              width: 120px;
              height: 90px;
              overflow: hidden;
              margin-right: 6px;
              &:nth-last-of-type(1){
                margin-right: 0px;
              }
              .seller-pic{
                width: 100%;
              }
            }
          }
        // }
      }
    }
    /* 商家信息 */
    .business-information{
      padding: 0 18px;
      background-color: #fff;
      @include bordertop-1px(rgba(7,17,27,0.1));
      @include border-1px(rgba(7,17,27,0.1));
      h2{
        font-size: 14px;
        padding-bottom: 8px;
        padding-top: 18px;
        color: rgb(7, 17, 27);
      }
      .infos{
        li{
          padding: 16px 12px;
          font-size: 12px;
          color: rgb(7, 17, 27);
          line-height: 16px;
          &:nth-last-of-type(1){
            @include border-1px(rgba(7,17,27,0));
          }
          @include border-1px(rgba(7,17,27,0.1));
        }
      }
    }
  // }
}
</style>
