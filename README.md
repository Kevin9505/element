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













