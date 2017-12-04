<template>
  <el-menu mode="vertical" theme="dark" unique-opened :default-active="$route.path" :collapse="!sidebar.opened" >
     <sidebar-item :routes='permission_routers'></sidebar-item>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  data(){
    return {
     // isCollapse:true
    }
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
     
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
  min-height: 100%;
}
.el-submenu .el-menu-item{
  min-width: 170px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
