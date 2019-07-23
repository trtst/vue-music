<template>
  <div id="app">
    <m-header></m-header>
    <navs></navs>
    <router-view></router-view>
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
