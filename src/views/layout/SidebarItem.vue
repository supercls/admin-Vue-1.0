<template>
  <div class='menu-wrapper'>
    <template v-for="item in routes">

      <router-link v-if="!item.hidden&&!item.noDropdown&&item.children==null" :to="item.path">
        <el-menu-item :index="item.path" class='submenu-title-noDropdown'>
          <i v-if='item.icon' :class="item.icon"  class="fa"></i><span>{{item.name}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden&&item.children!=null">
        <template slot="title">
          <i v-if='item.icon' :class="item.icon"  class="fa"></i><span>{{item.name}}</span>
        </template>
        <template v-for="child in item.children" v-if='!child.hidden'>

          <sidebar-item class='nest-menu' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>

          <router-link v-else :to="child.path">
            <el-menu-item :index="child.path">
              <i v-if='child.icon' :class="child.icon" class="fa"></i><span>{{child.name}}</span>
            </el-menu-item>
          </router-link>

        </template>

      </el-submenu>

    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  },
}
</script>
<style scoped>
  .menu-wrapper .fa{margin-right: 15px;}
  .el-submenu .el-menu-item{
    min-width: 170px;
  }
</style>
