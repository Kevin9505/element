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

    把灰色星星放到数组里面  if( arr_star.length < 5) { 

                  for( var i=0;i<(5-arr_star.length) ; i++ ){  arr_star.push( "off" ) }   //off是灰色星星的名字


```html
  <template>
    <div class="star">
      <span v-for="(item,index) in itemClasslass" class="star-item" :key="index" :class="item"></span>
    </div>
  </template>
```
```js
  <script>
const lengths = 5;
const starOn = 'on';
const starHalf = 'half';
const starOff = 'off';

export default({
  data(){
    return {

    }
  },
  props:{
    score:{//分数
      type:Number,
      default:function(){
        return 5
      }
    }
  },
  created() {
  },
  computed:{
    itemClasslass(){//星星的数组
      let result = [];
      let score = Math.floor(this.score * 2) / 2; //例如：把分数处理成在4.5以上及4.5就变成向上取整5，在4.5以下就变成4.5

      //是否需要半星
      let starhalf = score%1 != 0 ? true : false ;

      //几颗全星
      let fullstar = Math.floor(score);
      for(var i=0 ; i<fullstar;i++){//放全星
        result.push(starOn);
      }
      if(starhalf){//放半星
        result.push(starHalf)
      }
      if(result.length < lengths){//如果没有满到五个星就用灰色的星星补齐9
        var offstar = lengths - result.length;
        for(var i=0;i<offstar;i++){
            result.push(starOff);
        }
      };
      return result;
    }
  }
})
</script>
```









