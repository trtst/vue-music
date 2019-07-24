<template>
    <div ref="wrapper" class="my-scroll">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: 'scroll',
        props: {
            data: {
                type: Array,
                default: null
            },
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            // 是否监听滚动位置
            listenScroll: {
                type: Boolean,
                default: false
            },
            // 是否开启上拉刷新
            pullup: {
                type: Boolean,
                default: false
            },
            // 滚动前是否触发事件，如：滚动前让输入框失去焦点，避免滚动搜索结果时移动端键盘遮挡
            beforeScroll: {
                type: Boolean,
                default: false
            },
            // 延迟刷新
            refreshDelay: {
                type: Number,
                default: 20
            }
        },
        mounted () {
            setTimeout(() => {
                this._initScroll()
            }, 20)
        },
        watch: {
            data () {
                setTimeout(() => {
                    this.refresh()
                }, this.refreshDelay)
            }
        },
        methods: {
            _initScroll () {
                if (!this.$refs.wrapper) {
                    return
                }

                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click
                })
            },
            enable () {
                this.scroll && this.scroll.enable()
            },
            disable () {
                this.scroll && this.scroll.disable()
            },
            refresh () {
                this.scroll && this.scroll.refresh()
            }
        }
    }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
</style>
