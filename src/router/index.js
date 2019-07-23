import Vue from 'vue'
import Router from 'vue-router'
import Recom from 'components/recom/recom'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/recom'
        },
        {
            path: '/recom',
            name: 'recom',
            component: Recom
        },
        {
            path: '/rank',
            name: 'rank',
            component: Rank
        },
        {
            path: '/search',
            name: 'search',
            component: Search
        },
        {
            path: '/singer',
            name: 'singer',
            component: Singer
        }
    ]
})
