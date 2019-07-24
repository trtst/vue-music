<template>
  <div id="app">
    <m-header></m-header>
    <navs></navs>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
    import MHeader from '@/components/header/header'
    import Navs from '@/components/navs/navs'
    export default {
        name: 'App',
        components: {
            MHeader,
            Navs
        }
    }
</script>

<style>

</style>
