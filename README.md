# admin

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 解决字体的默认边距问题
`字体在布局中总会有几像素的间隙,虽然不是很大,但是还是有影响`
+ 解决方案
  1. 父容器添加 font-size:0px; 再单独设置字体大小
  2. 采用display:flex;布局方式好像可以解决这个问题
  3. 将两个容器放在同一行上，可以解决

# CSS Sticky footer完美底部布局
```html
  <!-- html 页面结构 -->
  <div
    v-show="detailShow"
    class="detail clearfix"
  >
    <div class="detail-wrapper">
      <div class="detail-main">

      </div>
    </div>
    <div
      class="detail-close"
      @click="detailShow=!detailShow"
    >
      <i class="icon-close"></i>
    </div>
  </div>
```
```css
  // css 样式
  .detail {
    width: 100%;
    height: 100%;
    // 如果内容太长,会显示滚动条
    overflow: auto;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 100;
    background-color: rgba(7, 17, 27, 0.8);
    .detail-wrapper {
      // 如果内容不够长时,也保证有全屏长度
      min-height: 100%;
      .detail-main {
        // 保证内容区域的底部有50px的空白
        padding-bottom: 64px;
      }
    }
    .detail-close {
      position: relative;
      width: 32px;
      height: 32px;
      clear: both;
      font-size: 32px;
      // 让关闭按钮向 detail-wraaper 里面伸入50px
      margin: -64px auto 0 auto;
    }
  }
```
# 星星组件的设计
一：实现的思路：
　通过评分的分数，来算出高亮的全星有几颗，有没有半星，灰色星星有几颗，通过背景图片实现，例如：

  评分 ： 4.6 分 

  四舍五入计算把分数换算成0.5的倍数：Math.floor( 4.6 *2 ) / 2   等于 4.5

  把星星放到数组 arr_star 里面：

    是否需要半星  var half = 4.5 % 1 != 0 ?  true :false    //能被1取余整数的话就不需要半星为false,否则是true

    把全星push到数组里面   for ( var i = 0; i< Math.floor( 4.5) ;i++ ) {  arr_star.push( "on")  }  //on是星星高亮的图片名字

    把半星放到数组里面  if( half ) { arr_star.push( "half" ) }  //half是半星图片的名字

    把灰色星星放到数组里面  
    if( arr_star.length < 5) { 

      for( var i=0;i<(5-arr_star.length) ; i++ ){  arr_star.push( "off" ) }   //off是灰色星星的名字


```html
  <template>
  <div
    class="star"
    :class="starType"
  >
    <span
      v-for="(itemClass,index) in itemClasses"
      class="star-item"
      :key="index"
      :class="itemClass"
    ></span>
  </div>
</template>
```
```js
  <script>
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + this.size
      },
      itemClasses () {
        // 星星的数组
        let result = []
        // 把数组处理成在4.5以及以上就想上取整6,在4.5以下就变成4.5
        let score = Math.floor(this.score * 2) / 2
        console.log(score)
        // 判断是否有小数点
        let hasDecimal = score % 2 === 0
        // 求整数
        let integer = Math.floor(score)
        // 循环遍历,追加全星个数
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON)
        }
        console.log(hasDecimal)
        // 追加半星
        if (!hasDecimal) {
          result.push(CLS_HALF)
        }
        // 当没有满5星就用灰色的星星补齐
        while (result.length < LENGTH) {
          result.push(CLS_OFF)
        }
        console.log(result)
        return result
      }
    }
  }
</script>
```
```css
  <style lang="scss" scoped>
  @import "@/common/scss/fun.scss";
  .star {
    font-size: 0px;
    &.star-48 {
      // .star-item {
      background-repeat: no-repeat;
      .star-item {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        display: inline-block;
        background-size: 20px 20px;
        &:last-child {
          margin-right: 0px;
        }
        &#on {
          // width: 20px;
          // height: 20px;
          @include bg-img("./star48_on");
          // background-image: url('./star48_on@2x.png');
        }
        &#half {
          // width: 20px;
          // height: 20px;
          @include bg-img("./star48_half");
          // background-image: url('./star48_half@2x.png');
        }
        &#off {
          // width: 20px;
          // height: 20px;
          @include bg-img("./star48_off");
        }
        }
      }
    &.star-36 {
      background-repeat: no-repeat;
      .star-item {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        display: inline-block;
        background-size: 15px 15px;
        background-repeat: no-repeat;
        &:last-child {
          margin-right: 0px;
        }
        &#on {
          display: inline-block;
          @include bg-img("./star36_on");
        }
        &#half {
          // width: 15px;
          // height: 15px;
          @include bg-img("./star36_half");
        }
        &#off {
          // width: 15px;
          // height: 15px;
          @include bg-img("./star36_off");
        }
      }
    }
    &.star-24 {
      background-repeat: no-repeat;
      .star-item {
        margin-right: 3px;
        display: inline-block;
        width: 10px;
        height: 10px;
        background-size: 10px 10px;
        &:last-child {
          margin-right: 0px;
        }
        &#on {
          // display: inline-block;
          @include bg-img("./star24_on");
        }
        &#half {
          // width: 10px;
          // height: 10px;
          @include bg-img("./star24_half");
        }
        &#off {
          // width: 10px;
          // height: 10px;
          @include bg-img("./star24_off");
        }
      }
    }
  }
```
# 商品页的滚动效果 -- better-scroll 的使用
better-scroll 是移动端滚动的解决方案,它基于iscroll的重写,不仅可以做滚动列表还可以做轮播图，等
`better-scroll 常见的html结构`
```html
<!-- wrapper 是父容器  content 是子容器  父容器中只能有一个子元素 -->
  <div class="wrapper">
    <ul class="content">
      <li>...</li>
      <li>...</li>
      ...
    </ul>
  </div>
  // better-scroll 的初始化
  import BScroll from 'better-scroll'
  let wrapper = document.querySelect('.wrapper')
  let scroll = new BScroll(wrapper,{})
```
+ better-scrool 在 vue 中使用 
```html
<template>
  <div class="wrapper" ref="wrapper">
    <ul class="content">
      <li v-for="(item,index) in data" :key="index">{{item}}</li>
    </ul>
  </div>
</template>
<script>
  // 导入 better-scroll 模块
  import BScroll from 'better-scroll'
  export default {
    data(){
      return{
        data:[]
      }
    },
    // created 钩子函数 -- 在实例创建完成后被立即调用.
    created() {
      axios.get('/api/goods').then(res => {
        this.data = res.data
        //  better-scroll 初始化 this.$nextTick(()=>{  }) 是异步函数
        this.$nextTick(() => {
          this.scroll = new Bscroll(this.$refs.wrapper, {
            scrollX: true
          })
        })
      })
    }
  }
</script>
```

# 商品页菜单按钮和商品区的联动效果
实现原理
  因为按钮菜单的个数和商品块端的个数是相等的，点击左侧按钮时获取索引，根据索引获取对应的商品区块向上滚动
## 页面布局
```html
<template>
  <div class="goods">
    <!-- 菜单 -->
    <div
      class="menu-wrapper"
      ref="menuWrapper"
    >
      <ul>
        <li
          class="menu-item"
          :class="{'current':currentIndex===index}"
          v-for="(item,index) in goods"
          :key="item.index"
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
    <!-- 商品 -->
    <div
      class="foods-wrapper"
      ref="foodsWrapper"
    >
      <ul>
        <!-- 商品区块 -->
        <li
          v-for="(item, index) in goods"
          :key="index"
          class="food-list foodlist-list-hook"
        >
          <!-- 商品区块标题 -->
          <h1 class="title">{{item.name}}</h1>
          <!-- 商品区块内容 -->
          <ul>
            <li
              class="food-item border-1px"
              v-for="(food, index) in item.foods"
              :key="index"
            >
            ...
            </li>
          </ul>
        </li>
      </ul>
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
  created () {
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
      console.log(this.goods)
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
      console.log(index)
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
    // 初始化scroll区域
    _initScroll () {
      // -- 左侧按钮
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        click: true // beeter-scroll 取消默认事件,我们这里再派发一个点击事件
      })
      // 结合 BScroll 的接口使用,3实时派发scroll事件  --- 商品区
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
    },
    computed: {
      // 计算到达哪个区域的区间时候的对应的索引值
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          // 当前menu子块的高度
          let height1 = this.listHeight[i]
          // 下一个 menu 子块的高度
          let height2 = this.listHeight[i + 1]
          // 滚到底部时,height2 为 undefined,需要考虑这种情况
          // 需要确定是在两个 menu 子块的高度区间
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            // 返回这个 menu 子块的索引
            return i
          }
        }
      }
    }
  }
</script>

```








