<template>
  <div class="category">
    <div class="header clearfix">
      <div class="headerLeft"><el-button>新增</el-button></div>
      <div class="headerRight">
          <el-col :span="24"><div class="grid-content bg-purple-light"><span>*友情提示</span>卖家首次开店时需要选择店铺分类</div></el-col>
      </div>
    </div>
    <div class="content clearfix">
      <div class="contentLeft">d</div>
      <div class="contentRight">d</div>
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
  .category{
    margin: 50px 20px 50px 20px;
    box-sizing: border-box;
    color: #333;
    width: 1440px;
  }
  .header {
    margin-bottom: 20px;
  }
  .headerLeft{
    float: left;
  }
  .headerLeft button {
    width: 90px;
  }
  .headerRight{
    float: right;
    text-align: right;
  }
  .bg-purple-light {
    height: 36px;
    line-height: 36px;
    color: #5e6d82;
    font-size: 14px;
  }
  .bg-purple-light span{
    display: inline-block;
    color: #20a0ff;
    margin-right: 10px;
  }
  .content{

  }
  .contentLeft{
    float: left;
    background: #20a0ff;
    width: 440px;
    height: 100px;
  }
  .contentRight{
    float: right;
    background: #f00;
    width:1000px;
    height: 100px;
  }
</style>
