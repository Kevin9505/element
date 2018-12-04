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
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li>19</li>
        <li>20</li>
        <li>21</li>
        <li>22</li>
        <li>23</li>
        <li>24</li>
        <li>25</li>
        <li>26</li>
        <li>27</li>
        <li>28</li>
        <li>29</li>
        <li>30</li>
        <li>31</li>
        <li>32</li>
        <li>33</li>
        <li>34</li>
        <li>35</li>
        <li>36</li>
        <li>37</li>
        <li>38</li>
        <li>39</li>
        <li>40</li>
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
  }
}
</style>
