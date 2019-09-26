<template>
  <el-container class="home-wrap">
    <!-- header start -->
    <el-header class="flex">
      <div class="logo flex-item"><i class="el-icon-date"></i> 工作周报</div>
      <div class="user-info">
        <el-dropdown trigger="click">
          <el-button type="primary">
            <i class="el-icon-user-solid el-icon--left"></i>admin
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click="loginOut()">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <!-- header end -->
    <el-container>
      <!-- aside-nav start -->
      <el-aside width="200px">
        <el-menu
          :default-active="$route.path"
          background-color="#283643"
          text-color="#fff"
          active-text-color="#1CC09F"
          router>
          <el-menu-item index="/home/userinfo">
            <i class="el-icon-user"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/home/weeklylist">
            <i class="el-icon-s-grid"></i>
            <span slot="title">周报列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- aside-nav end -->

      <!-- main start -->
      <el-main>
        <router-view/>
      </el-main>
      <!-- main end -->

    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  components: {

  },
  computed: {

  },
  created () {
    console.log('$route.path==' + this.$route.path)
  },
  methods: {

  }
}
</script>

<style lang="scss">
.home-wrap{width: 100%; height: 100%;
  .el-header{line-height: 60px; color: $color-white; background: $color-main;
    .logo{font-size: 20px;}
    .user-info .el-button{font-size: 16px;}
  }
  .el-aside{background: #283643;}
}
.el-dropdown-menu__item{padding: 0 40px;}
</style>
