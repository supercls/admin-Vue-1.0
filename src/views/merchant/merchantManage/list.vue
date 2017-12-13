<template>
  <div class="merchantManage">
    <div class="header clearfix">
      <div class="headerLeft">
        <el-button>新增</el-button>
        <el-button>升级申请</el-button>
      </div>
      <div class="headerRight"></div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>
<style scoped>
  .merchantManage{
    margin: 50px 20px 50px 20px;
    box-sizing: border-box;
    color: #333;
  }
  .headerLeft{
    float: left;
  }
  .headerLeft button{
    width: 90px;
  }
  .headRight{
    float: right;
  }
</style>
