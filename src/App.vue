<template>
  <div id="app">
    <v-header :seller="seller" />
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link
          class="a-link"
          to="/goods"
        >商品</router-link>
      </div>
      <div class="tab-item">
        <router-link
          class="a-link"
          to="/ratings"
        >评论</router-link>
      </div>
      <div class="tab-item">
        <router-link
          class="a-link"
          to="/seller"
        >商家</router-link>
      </div>
    </div>
    <router-view />
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import header from '@/components/header/header.vue'

const errOk = 0

export default {
  name: 'App',
  components: {
    'v-header': header
  },
  data () {
    return {
      seller: {}
    }
  },
  mounted () {
    this.$http.get('/api/seller').then(response => {
      if (response.body.errno === errOk) {
        this.seller = response.body.data
      }
      console.log(this.seller)
    })
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/fun.scss";
#app {
  /* background-color: #f3f5f7; */
  // height: 100%;
  // width: 100%;
  .tab {
    display: flex;
    align-items: center;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    @include border-1px(rgba(7, 17, 27, 0.1));
    .tab-item {
      flex: 1;
      font-size: 14px;
      color: rgb(75, 85, 93);
      text-align: center;
      .a-link {
        display: block;
      }
      .router-link-active {
        color: rgb(240, 24, 20);
      }
    }
  }
}
</style>
