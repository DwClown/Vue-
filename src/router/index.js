import Vue from 'vue'
import VueRouter from 'vue-router'

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};
Vue.use(VueRouter)

//导入路由模块
const Recommend = () => import('../views/Recommend')
const Album = () => import("../components/contact/recommend/Album")
const PlayList = () => import("../components/contact/recommend/PlayList")
const Singer = () => import('../views/Singer')
const SingerInfo = () => import('../components/contact/singer/SingerSongList')
const Rank = () => import('../views/Rank')
const RankSongList = () => import("../components/contact/rank/RankSongList")
const Search = () => import('../views/Search')
const SearchResult = () => import("../components/contact/search/SearchResult")

const mySongList = () => import("../components/contact/mySongList/MySongList")

const routes = [
  {path: '/', redirect: '/recommend'},
  {
    path: '/recommend',
    component: Recommend,
  },
  {
    path: '/recommend/album',
    component: Album
  },
  {
    path: '/recommend/playList',
    component: PlayList
  },
  {
    path: '/singer',
    component: Singer,
  },
  {
    path: '/singerInfo',
    component: SingerInfo
  },
  {
    path: '/rank',
    component: Rank,
  },
  {
    path: '/rankSongList',
    component: RankSongList,
  },
  {
    path: '/search',
    component: Search,
  },
  {
    path: '/searchResult',
    component: SearchResult
  },
  {
    path: '/mySongList',
    component: mySongList
  }
]

const router = new VueRouter({
  routes
})

export default router
