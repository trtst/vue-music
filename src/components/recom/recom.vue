<template>
    <div class="recommend">
        <my-scroll ref="scroll" :data="discList" class="recommend-content">
            <div>
                <div v-if="recommends.length" class="slider-wrapper">
                    <slider>
                        <div v-for="(item, index) in recommends" :key="index">
                            <a :href="item.linkUrl">
                                <img class="needsclick" :src="item.picUrl">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li v-for="item in discList" :key="item.dissid" @click="selectItem(item)" class="item">
                            <div class="icon">
                              <img v-lazy="item.imgurl" width="60" height="60">
                            </div>
                            <div class="text">
                              <p v-html="item.creator.name" class="name"></p>
                              <p v-html="item.dissname" class="desc"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </my-scroll>
    </div>
</template>

<script>
    import Slider from '@/base/slider'
    import MyScroll from '@/base/scroll'
    import {getRecommend, getDiscList} from 'api/recom'
    import {ERR_OK} from 'api/config'
    export default {
        data () {
            return {
                recommends: [],
                discList: []
            }
        },
        created () {
            this._getRecommend()
            this._getDiscList()
        },
        methods: {
            // 子路由跳转
            selectItem (item) {
                this.$router.push({
                    path: `/recommend/${item.dissid}`
                })
            },
            _getRecommend () {
                getRecommend().then((res) => {
                    if (res.code === ERR_OK) {
                        this.recommends = res.data.slider
                    }
                })
            },
            _getDiscList () {
                getDiscList().then((res) => {
                    if (res.code === ERR_OK) {
                        this.discList = res.data.list
                    }
                })
            }
        },
        components: {
            Slider,
            MyScroll
        }
    }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
    @import "~stylus/variable"
    .recommend
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
        .recommend-content
            height: 100%
            overflow: hidden
            .slider-wrapper
                position: relative
                width: 100%
                overflow: hidden
            .recommend-list
                 .list-title
                    height: 65px
                    line-height: 65px
                    text-align: center
                    font-size: $font-size-medium
                    color: $color-theme
                 .item
                    display: flex
                    box-sizing: border-box
                    align-items: center
                    padding: 0 20px 20px 20px
                    .icon
                        flex: 0 0 60px
                        width: 60px
                        padding-right: 20px
                    .text
                        display: flex
                        flex-direction: column
                        justify-content: center
                        flex: 1
                        line-height: 20px
                        overflow: hidden
                        font-size: $font-size-medium
                        .name
                            margin-bottom: 10px
                            color: $color-text
                        .desc
                            color: $color-text-d
            .loading-container
                position: absolute
                width: 100%
                top: 50%
                transform: translateY(-50%)
</style>
