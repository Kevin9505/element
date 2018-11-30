<template>
  <div
    class="header"
  >
    <div class="content-wrapper">
      <div class="avator">
        <img
          width="64"
          height="64"
          :src="seller.avatar"
          alt=""
        >
      </div>
      <div class="content">
      </div>
    </div>
    <div class="notice-wrapper"></div>
  </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 134px;
  width: 100%;
}
</style>
