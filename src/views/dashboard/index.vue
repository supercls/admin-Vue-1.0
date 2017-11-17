<template>
  <div class="dashboard-container">
    <div class='dashboard-text'>name:{{name}}</div>
    <div class='dashboard-text'>role:<span v-for='role in roles' >{{role}}</span></div>
    <p>{{token}}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'  
export default {
  name: 'dashboard',
  computed: {            //从vuex state里获取数据
    ...mapGetters([
      'name',
      'roles',
      'token'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
