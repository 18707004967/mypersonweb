import Vue from 'vue'
import Router from 'vue-router'
import IndexNew from '@/components/index_new'
import RankList from '@/components/rankList'
import listRank from '@/components/list_rank'
import singerList from '@/components/singer_list'
import search from '@/components/search'
import musicListDetail from '@/components/music_list_detail'
import rankMusicDetail from '@/components/rank_music_detail'
import singerListInner from '@/components/singer_list_in'
import singerDetail from '@/components/singerDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'new',
      component: IndexNew
    },
    {
      path: '/rank',
      name: 'rank',
      component: RankList
    },
    {
      path: '/class',
      name: 'class',
      component: listRank
    },
    {
      path: '/singer',
      name: 'singer',
      component: singerList
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/musicListDetail',
      name: 'musicListDetail',
      component: musicListDetail
    },
    {
      path: '/rankMusicDetail',
      name: 'rankMusicDetail',
      component: rankMusicDetail
    },
    {
      path: '/singerListInner',
      name: 'singerListInner',
      component: singerListInner
    }
  ]
})
