<template>
  <div
    class="star"
    :class="starType"
  >
    <span
      v-for="(itemClass,index) in itemClasses"
      class="star-item"
      :key="index"
      :id="itemClass"
    ></span>
  </div>
</template>

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
// }
</style>
