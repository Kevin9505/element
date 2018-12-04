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









