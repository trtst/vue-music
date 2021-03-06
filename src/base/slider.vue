<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot" :class="{active: currentDotsIndex == index }" v-for="(dot, index) in dots" :key="index"></span>
        </div>
    </div>
</template>

<script>
    import { addClass } from 'common/js/dom'
    import BScroll from 'better-scroll'
    export default {
        name: 'slider',
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 4000
            }
        },
        data () {
            return {
                dots: [],
                currentDotsIndex: 0
            }
        },
        methods: {
            _setSliderWidth (isResize) {
                this.children = this.$refs.sliderGroup.children
                let width = 0
                let sliderWidth = this.$refs.slider.clientWidth
                for (let i = 0; i < this.children.length; i++) {
                    let child = this.children[i]
                    addClass(child, 'slider-item')

                    child.style.width = sliderWidth + 'px'
                    width += sliderWidth
                }
                if (this.loop && !isResize) {
                    width += 2 * sliderWidth
                }
                this.$refs.sliderGroup.style.width = width + 'px'
            },
            _initSlider () {
                clearTimeout(this.timer)
                this.slider = new BScroll(this.$refs.slider, {
                    scrollX: true,
                    momentum: false,
                    snap: {
                        loop: this.loop,
                        threshold: 100,
                        speed: 400
                    }
                })
                this.slider.on('scrollEnd', this._onScrollEnd)
                this.slider.on('beforeScrollStart', () => {
                    clearTimeout(this.timer)
                })
                this.slider.on('scrollEnd', (page) => {
                    this._play()
                    this.currentDotsIndex = this.slider.getCurrentPage().pageX
                })
                this._play()
            },
            _initDots () {
                this.dots = new Array(this.children.length)
            },
            _nextPage () {
                this.slider.next()
            },
            _prePage () {
                this.slider.prev()
            },
            _onScrollEnd () {
                this._play()
            },
            _play () {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this._nextPage()
                }, this.interval)
            }
        },
        mounted () {
            setTimeout(() => {
                this._setSliderWidth()
                this._initDots()
                this._initSlider()

                if (this.autoPlay) {
                    this._play()
                }

                window.addEventListener('resize', () => {
                    if (!this.slider) {
                        return
                    }
                    this._setSliderWidth(true)
                    this.slider.refresh()
                })
            }, 20)
        },
        destroyed () {
            clearTimeout(this.timer)
        }
    }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
    @import "~stylus/variable"

    .slider
      min-height: 1px
      .slider-group
        position: relative
        overflow: hidden
        white-space: nowrap
        .slider-item
          float: left
          box-sizing: border-box
          overflow: hidden
          text-align: center
          a
            display: block
            width: 100%
            overflow: hidden
            text-decoration: none
          img
            display: block
            width: 100%
      .dots
        position: absolute
        right: 0
        left: 0
        bottom: 12px
        text-align: center
        font-size: 0
        .dot
          display: inline-block
          margin: 0 4px
          width: 8px
          height: 8px
          border-radius: 50%
          background: $color-text-l
          &.active
            width: 20px
            border-radius: 5px
            background: $color-text-ll
</style>
