<template>
    <div class="navs">
        <router-link tag="div" class="navs-item" to="/recom">
            <span class="navs-link">推荐</span>
        </router-link>
        <router-link tag="div" class="navs-item" to="/singer">
            <span class="navs-link">歌手</span>
        </router-link>
        <router-link tag="div" class="navs-item" to="/rank">
            <span class="navs-link">排行</span>
        </router-link>
        <router-link tag="div" class="navs-item" to="/search">
            <span class="navs-link">搜索</span>
        </router-link>
    </div>
</template>

<script>
    export default {
    }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
    @import '~stylus/variable'
    .navs
      display: flex
      height: 44px
      line-height: 44px
      font-size: $font-size-medium
      .navs-item
        flex: 1
        text-align: center
        .navs-link
          padding-bottom: 5px
          color: $color-text-l
        &.router-link-active
          .navs-link
            color: $color-theme
            border-bottom: 2px solid $color-theme
</style>
