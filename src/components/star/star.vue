<template>
  <div
    class="star"
    :class="starType"
  >
    <!-- <span
      v-for="itemClass in itemClasses"
      :class="itemClass"
      :key="$index"
      class="star-item"
    ></span> -->
    <span
      v-for="(itemClass,index) in itemClasses"
      class="star-item"
      :key="index"
      :class="itemClass"
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
      let score = Math.floor(this.score * 2)
      // 判断是否有小数点
      let hasDecimal = score % 1 !== 0
      // 求整数
      let integer = Math.floor(score)
      // 循环遍历,追加全星个数
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      // 追加半星
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      // 当没有满5星就用灰色的星星补齐
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/scss/fun.scss";
.star {
  font-size: 0px;
  .sta-item {
    display: inline-block;
    background-repeat: no-repeat;
    &.star-48 {
      .star-item {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;
        &:last-child {
          margin-right: 0px;
        }
        &.on {
          @include bg-img("./star48_on");
        }
        &.half {
          @include bg-img("./half48_on");
        }
        &.off {
          @include bg-img("./off48_on");
        }
      }
    }
    &.star-36 {
      .star-item {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 15px 15px;
        &:last-child {
          margin-right: 0px;
        }
        &.on {
          @include bg-img("./star36_on");
        }
        &.half {
          @include bg-img("./half36_on");
        }
        &.off {
          @include bg-img("./off36_on");
        }
      }
    }
    &.star-24 {
      .star-item {
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;
        &:last-child {
          margin-right: 0px;
        }
        &.on {
          @include bg-img("./star24_on");
        }
        &.half {
          @include bg-img("./half24_on");
        }
        &.off {
          @include bg-img("./off24_on");
        }
      }
    }
  }
}
</style>
