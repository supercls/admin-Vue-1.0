<template>
    <div class="wrap-table product-menu route-div">
        <div class="header">
            <span class="pull-left">编辑规格</span>
            <el-button class="pull-right" @click="goback">返回</el-button>
        </div>
            <el-form :model="editorForm" :rules="roleRules" label-position="right" label-width="80px"  ref="editorForm">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="规格名称" prop="a">
                            <el-input type="text" v-model="editorForm.a" auto-complete="off" placeholder="请输入规格名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="排序" prop="a">
                            <el-input type="number" v-model="editorForm.a" auto-complete="off" placeholder="请输入数字"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="规格类型" prop="a"  >
                            <el-radio-group v-model="radio" @change="changeradio">
                                <el-radio :label="1">文字</el-radio>
                                <el-radio :label="2">图片</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--addLIst-->

                <el-form-item label="规格值" prop="a" style="margin-top: 30px">
                    <el-button  @click="addGuige">新增规格值</el-button>
                    <div class="addGuige">
                        <el-row>
                            <el-col :span="4">
                                <span>规格值</span>
                            </el-col>
                            <el-col :span="4">
                                <span>排序</span>
                            </el-col>
                            <el-col :span="4" v-if="colorHide">
                                <span>颜色</span>
                            </el-col>
                            <el-col :span="4">
                                <span>操作</span>
                            </el-col>
                        </el-row>
                    </div>
                    <div>
                        <div class="addList" v-for="(list,index) in guiGelist">
                            <el-row class="clearfix">
                                <el-col :span="4">
                                    <el-input type="text" style="max-width: 100px" v-model="list.a" auto-complete="off"></el-input>
                                </el-col>
                                <el-col :span="4">
                                    <el-input type="number" style="max-width: 60px" v-model="list.b" auto-complete="off"></el-input>
                                </el-col>
                                <el-col :span="4" v-if="colorHide">
                                    <div class="colordiv clearfix">
                                        <colorPicker v-model="list.colorvalue" :disabled='colorcha'></colorPicker>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <i class="fa fa-trash-o fa-2x" @click="deleteGUI(index)"></i>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="goback">返回</el-button>
                <el-button type="primary" @click="Formsure('editorForm')">确 定</el-button>
            </div>
        </div>
</template>
<script>
import colorPicker from '@/components/colorpick/colorPicker'   //引入颜色组件
export default {
    name:'product',
        data() {
            var checkRole= (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('不能为空'));
                }
                setTimeout(() => {
                    if (value.length>20) {
                        callback(new Error('长度不超过20'));
                    }  else {
                        callback();
                    }
                }, 1000);
            }
            return {
                editorForm:{
                    a:'',
                    e:false,
                    id:null,
                },
                guiGelist:[
                    {
                        a:'1',
                        b:'2',
                        colorvalue:'#ccc'
                    }
                ],
                colorHide:true,
                colorcha:false,
                colorvalue:'#f00',
                radio:1,
                roleRules: {
                    dictType: [
                        { validator: checkRole, trigger: 'blur' }
                    ],
                    dictTypeName: [
                        { validator: checkRole, trigger: 'blur' }
                    ],
                    dictValue: [
                        { validator: checkRole, trigger: 'blur' }
                    ],
                    dictName: [
                        { validator: checkRole, trigger: 'blur' }
                    ],
                },
            };
    },
    components:{
        colorPicker,
    },
    methods: {
        addGuige:function(){
            var newObj={
                a:'',
                b:'',
                colorvalue:'#ccc'
            }
            this.guiGelist.push(newObj)
        },
        deleteGUI:function(index){     //删除规格
            this.guiGelist.splice(index,1)
        },
        changeradio:function(value){
            if(value==1){
               this.colorHide=false
            }
            else{
               this.colorHide=true
            }
        },
        goback:function(){
            this.$router.go(-1)    //返回上一页
            var view=this.$route
            this.$store.dispatch('delVisitedViews', view) //关闭tab，跳转到上一级
        }
    },
    mounted:function(){
        var query=this.$route.query
        console.log(query)
    }
};
</script>
<style scoped>
    .route-div{
        margin:35px;
        border:1px solid #d4dde2;
        padding:0px 0px 20px 0px;
    }
    .route-div .header{
        background: #ECEFF1;
        height: 50px;
        line-height: 50px;
        padding:0 20px;
    }
    .route-div .header .el-button{
        margin-top: 7px;
        padding: 8px 15px;
    }
    .route-div .el-row{
        padding:10px 0px;
        margin:10px;
        border-bottom: 1px dashed #ccc;
    }
    .product-menu{
        position: relative;
    }
    .route-div .dialog-footer{
        text-align: left;
        margin-left: 200px;
    }
    .product-menu .page-div{
        margin: 20px auto;
    }
    .product-menu .img-table-small{
        width: 68px;
        height: 56px;
        vertical-align: middle;
    }
    .product-menu .Nav-avatar-uploader{
        text-align: center;
        margin-top: -10px;
    }
    .product-menu  .colordiv{border:1px solid #BFCBD9;width: 30px;height: 30px;display: inline-block;text-align: center}
    .product-menu .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .product-menu .Nav-avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .product-menu .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
        border:1px dashed #ccc;
    }
    .product-menu .avatar {
        width: 120px;
        height: 120px;
        border: 1px dashed #d9d9d9;
        display: block;
    }
    .product-menu .addGuige{
        margin:10px 0px;
    }
    .product-menu .addList{
        margin:8px auto
    }
    .product-menu .addList .el-row{
        padding:0px 0px 8px 0px;
        margin:3px
    }
</style>