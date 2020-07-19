<template>
  <div class="tabBar">
    <ul>
      <li class="tabBarItem" v-for="item of list" :key="item.path"
          @click.stop="$router.replace(item.path)">
        <div class="icon">
          <span :class="[item.icon,{'iconActive':$route.path.startsWith(item.path)}]"></span>
        </div>
        <div class="text" :class="{'textActive':$route.path.startsWith(item.path)}">{{item.text}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

  export default {
    name: "TabBar",
    data() {
      return {
        list: [
          {path: '/recommend', icon: 'iconfont icon-cat-4', text: '推荐'},
          {path: '/singer', icon: 'iconfont icon-shouye-geshou', text: '歌手'},
          {path: '/rank', icon: 'iconfont icon-paihang', text: '排行'},
          {path: '/search', icon: 'iconfont icon-sousuo', text: '搜索'},
        ]
      }
    }
  }
</script>

<style scoped>

  .tabBar {
    width: 100%;
    background-color: #333333;
  }

  .tabBar ul {
    width: 100%;
    height: 46px;
    display: flex;
  }

  .tabBar ul .tabBarItem {
    flex: 1;
    padding: 3px 0;
  }

  .tabBarItem .icon {
    height: 24px;
  }

  .tabBarItem .icon span {
    display: block;
    width: 24px;
    height: 24px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 24px;
    border-radius: 50%;
    text-align: center;
    color: #eeeeee;
  }

  .tabBarItem .text {
    height: 16px;
    font-size: 12px;
    text-align: center;
    line-height: 16px;
  }

  .iconActive {
    background-color: #dd1800;
    color: #ffffff;
  }

  .textActive {
    color: #dd1800;
  }
</style>