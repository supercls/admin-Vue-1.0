<template>
  <div class="store">
    <div class="onOff">
      <span class="type">开店申请</span>
      <el-tooltip :content="'Switch value: ' + value3" placement="top">
        <el-switch
          v-model="value3"
          on-color="#20a0ff"
          off-color="#ff4949"
          on-value="100"
          off-value="0">
        </el-switch>
      </el-tooltip>
    </div>
    <div class="tittle">信用额度</div>
    <div class="content">
      <div class="row">
        <div class="col">等级</div>
        <div class="col">信用介于</div>
      </div>
      <div class="row" v-for="item in rankList">
        <div class="col" v-html="item.rank">
        </div>
        <div class="col">
          <input type="text" v-model="item.numStart"> - <input type="text" v-model="item.numEnd">
        </div>
      </div>
    </div>
    <div class="submitBtn">
      <el-button type="primary">提交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value3: '100',
        rankList:[
          {
            rank:"<img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_0.gif'>",
            numStart:1,
            numEnd:100
          },
          {
            rank:"<img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_0.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_0.gif'>",
            numStart:101,
            numEnd:200
          },
          {
            rank:"<img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_0.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_0.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_0.gif'>",
            numStart:201,
            numEnd:300
          },
          {
            rank:"<img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_0.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_0.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_0.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_0.gif'>",
            numStart:301,
            numEnd:400
          },
          {
            rank:"<img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_0.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_0.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_0.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_0.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_0.gif'>",
            numStart:401,
            numEnd:500
          },
          {
            rank:"<img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_1.gif'>",
            numStart:501,
            numEnd:600
          },
          {
            rank:"<img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_1.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_1.gif'>",
            numStart:601,
            numEnd:700
          },
          {
            rank:"<img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_1.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_1.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_1.gif'>",
            numStart:701,
            numEnd:800
          },
          {
            rank:"<img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_1.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_1.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_1.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_1.gif'>",
            numStart:801,
            numEnd:900
          },
          {
            rank:"<img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_1.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_1.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_1.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_1.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_1.gif'>",
            numStart:901,
            numEnd:1000
          },
          {
            rank:"<img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_2.gif'>",
            numStart:1001,
            numEnd:1100
          },
          {
            rank:"<img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_2.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_2.gif'>",
            numStart:1101,
            numEnd:1200
          },
          {
            rank:"<img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_2.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_2.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_2.gif'>",
            numStart:1201,
            numEnd:1300
          },
          {
            rank:"<img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_2.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_2.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_2.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_2.gif'>",
            numStart:1301,
            numEnd:1400
          },
          {
            rank:"<img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_2.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_2.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_2.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_2.gif'> <img src='http://192.168.6.137:8090/shopping/resources/style/common/images/level_2.gif'>",
            numStart:1401,
            numEnd:1500
          },
        ]
      }
    }
  }
</script>
<style scoped>
  .store {
    /*margin: 20px 20px 50px 20px;*/
    /*box-sizing: border-box;*/
    color: #8492a6;
  }
  .onOff{
    margin: 20px 20px 0px 20px;
  }

  .onOff .type {
    margin-right: 20px;
  }

  .tittle {
    margin: 30px auto;
    color: #20a0ff;
    width: 700px;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
  }

  .content {
    width: 700px;
    border: 1px solid #e6e6e6;
    color: #333;
    margin:0 auto;
  }

  .row {
    overflow: hidden;
    height: 50px;
    box-sizing: border-box;
  }
  .row:not(:first-of-type){
    border-top: 1px solid #e6e6e6;
  }
  .row .col {
    width: 50%;
    float: left;
    text-align: center;
    line-height: 50px;
    font-size: 14px;
  }
  .row .col input{
    height: 30px;
    outline: none;
    border: none;
    border: 1px solid #ddd;
    width: 120px;
    box-sizing: border-box;
    padding: 0 10px;
    text-align: center;
    color: #333;
  }
  .submitBtn{
    text-align: center;
    padding: 50px 0;
  }
</style>
