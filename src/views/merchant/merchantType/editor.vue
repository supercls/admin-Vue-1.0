<template>
  <div class="editorWrap">
    <div style="margin: 30px;"></div>
    <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
      <el-form-item label="等级名称" prop="rankName">
        <el-col :span="6"><div class="grid-content bg-purple"><el-input v-model="formLabelAlign.rankName"></el-input></div></el-col>
      </el-form-item>
      <el-form-item label="允许发布商品数" >
        <el-col :span="6"><div class="grid-content bg-purple"><el-input v-model="formLabelAlign.mount"></el-input></div></el-col>
        <el-col :span="10"><div class="grid-content"><span class="bg-purple-light">0表示没有限制</span></div></el-col>
      </el-form-item>
      <el-form-item label="店铺附件空间" >
        <el-col :span="6"><div class="grid-content bg-purple"><el-input v-model="formLabelAlign.attachSpace"></el-input></div></el-col>
        <el-col :span="10"><div class="grid-content"><span class="bg-purple-light">0表示没有限制，店铺附件空间用来存放商品图片等所有店铺附件</span></div></el-col>
      </el-form-item>
      <el-form-item label="等级序号" >
        <el-col :span="6"><div class="grid-content bg-purple"><el-input v-model="formLabelAlign.rankNo"></el-input></div></el-col>
        <el-col :span="10"><div class="grid-content"><span class="bg-purple-light">越小显示越靠前</span></div></el-col>
      </el-form-item>
      <el-form-item label="等级级别" >
        <el-col :span="6"><div class="grid-content bg-purple"><el-input v-model="formLabelAlign.rankType"></el-input></div></el-col>
        <el-col :span="10"><div class="grid-content"><span class="bg-purple-light">数值越大级别越高，用于店铺升级</span></div></el-col>
      </el-form-item>
      <el-form-item label="允许子账户个数" >
        <el-col :span="6"><div class="grid-content bg-purple"><el-input v-model="formLabelAlign.children"></el-input></div></el-col>
        <el-col :span="10"><div class="grid-content"><span class="bg-purple-light">允许卖家添加的子账户个数</span></div></el-col>
      </el-form-item>
      <el-form-item label="是否需要审核" >
        <el-col :span="6"><div class="grid-content bg-purple"><el-switch
          v-model="formLabelAlign.value1"
          on-text=""
          off-text="">
        </el-switch></div></el-col>
        <el-col :span="10"><div class="grid-content"><span class="bg-purple-light">需要审核等级，用户提交申请后需管理员确认方可开通</span></div></el-col>
      </el-form-item>
      <el-form-item label="可选模板套数" >
        <el-col :span="10"><div class="grid-content bg-purple"><span class="note" >{{formLabelAlign.template}}(在店铺等级列表设置)</span></div></el-col>
      </el-form-item>
      <el-form-item label="可用附加功能" >
        <el-col :span="6"><div class="grid-content bg-purple">
          <el-checkbox v-model="formLabelAlign.checked">编辑器多媒体功能</el-checkbox>
        </div></el-col>
      </el-form-item>
      <el-form-item label="收费标准" prop="feeScale" >
        <el-col :span="6"><div class="grid-content bg-purple"><el-input v-model="formLabelAlign.feeScale"></el-input></div></el-col>
        <el-col :span="10"><div class="grid-content"><span class="bg-purple-light">收费标准，在会员开通或升级店铺时将显示在前台</span></div></el-col>
      </el-form-item>
      <el-form-item label="申请说明" >
        <el-col :span="6"><div class="grid-content bg-purple"><el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="formLabelAlign.textarea">
        </el-input></div></el-col>
        <el-col :span="10"><div class="grid-content"><span class="bg-purple-light">申请说明，在会员开通或升级店铺时将显示在前台</span></div></el-col>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submitForm('formLabelAlign')">编辑提交</el-button> <el-button type="primary">新增提交</el-button>
    <div style="margin-top: 20px"></div>
    <el-row :gutter="20">
      <el-col :span="10"><div class="grid-content bg-purple">两页面长一样，跳页面的时候通过v-if切换相关功能按钮！</div></el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        data() {
            return {
              labelPosition: 'left',
              formLabelAlign: {
                rankName:'黄钻级',
                mount:7,
                attachSpace:'12.0 M',
                rankNo:9,
                rankType:1,
                children:3,
                value1: true,
                template:'10套',
                fee:'300元',
                checked: true,
               feeScale:'每月100元',
                textarea:''
              },
              rules: {
                rankName: [
                  {required: true, message: '请输入等级名称', trigger: 'blur'},
                  {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
                ],
                feeScale:[
                  {required: true, message: '请输入等级名称', trigger: 'blur'},
                  {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
                ]
              },
            }
        },

      methods:{
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
      }
    }
</script>
<style scoped>
  .editorWrap{
    margin: 50px 100px;
    box-sizing: border-box;
    color: #333;
    width: 1440px;
  }
  .bg-purple-light {
    display: inline-block;
    height: 36px;
    padding: 0 20px;
    background: #e5e9f2;
    box-sizing: border-box;
    margin-left: 20px;
    border-radius: 4px;
    text-align: center;
    color: #48576a;
  }

  .note{
    color: #999;
  }
</style>
