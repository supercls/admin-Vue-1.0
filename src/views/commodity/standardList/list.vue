<template>
    <div class="wrap-table product-menu">
        <!--tree-top-->
            <div class="clearfix">
                <div style="float: right">
                    <el-form :inline="true">
                        <el-form-item>
                            <el-button type="primary" style="padding: 10px 30px" @click="oneAdd">新增</el-button>
                        </el-form-item>
                        <el-button style="padding: 10px 30px" @click="refresh">刷新</el-button>
                    </el-form>
                </div>
            </div>
            <!---->
            <template>
                <el-table
                        :data="tableData"
                        border
                        v-loading="loading"
                        height="500"
                        element-loading-text="拼命加载中"
                        @select="choseOne" @select-all="choseAll"
                        style="width: 100%">
                    <el-table-column
                            fie
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column align="center" label="序号" width="65">
                        <template scope="scope">
                            {{scope.$index+1}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="a"
                            align="center"
                            label="规格名称"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            prop="c"
                            label="备注"
                            align="center"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            prop="d"
                            label="排序"
                            align="center"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            min-width="200"
                            align="center"
                            label="操作">
                        <template scope="scope">
                            <el-button
                                    size="small" @click="handleEdit(scope.$index, scope.row)"
                                    >编辑</el-button>
                            <el-button
                                    size="small"
                                    type="danger" @click="handleDelete(scope.$index, scope.row)"
                                    >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <!--分页-->
            <div class="block page-div">
                <el-button style="float:left;margin-top: 3px;margin-right: 5px" size="small">批量删除</el-button>
                <el-pagination
                        style="display: inline-block"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        current-page.sync="pageId"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
            <!---->
            <!--diolog-->
            <el-dialog title="编辑" :visible.sync="diolog"  size="small">
                <el-form :model="editorForm" :rules="roleRules" label-position="right" label-width="80px"  ref="editorForm">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="规格名称" prop="a">
                                <el-input type="text" v-model="editorForm.a" auto-complete="off" placeholder="请输入规格名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="排序" prop="a">
                                <el-input type="number" v-model="editorForm.a" auto-complete="off" placeholder="请输入数字"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="规格类型" prop="a">
                                <el-radio class="radio" v-model="radio" label="1">文字</el-radio>
                                <el-radio class="radio" v-model="radio" label="2">图片</el-radio>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!--addLIst-->
                    <el-row >
                        <el-col :span="24">
                            <el-form-item label="规格值" prop="a">
                                <el-button  @click="addGuige">新增规格值</el-button>
                                <div class="addGuige">
                                    <el-row>
                                        <el-col :span="6">
                                            <span>规格值</span>
                                        </el-col>
                                        <el-col :span="6">
                                            <span>排序</span>
                                        </el-col>
                                        <el-col :span="6">
                                            <span>颜色</span>
                                        </el-col>
                                        <el-col :span="6">
                                            <span>操作</span>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div style="max-height: 200px;overflow-y: auto;">
                                    <div class="addList" v-for="list in guiGelist">
                                        <el-row class="clearfix">
                                            <el-col :span="6">
                                                <el-input type="text" style="max-width: 100px" v-model="list.a" auto-complete="off"></el-input>
                                            </el-col>
                                            <el-col :span="6">
                                                <el-input type="number" style="max-width: 60px" v-model="list.b" auto-complete="off"></el-input>
                                            </el-col>
                                            <el-col :span="6">
                                                <div class="colordiv clearfix">
                                                    <colorPicker v-model="list.colorvalue" :disabled='colorcha' @change="headleChangeColor"></colorPicker>
                                                </div>
                                            </el-col>
                                            <el-col :span="6">
                                                <i class="fa fa-trash-o fa-2x" @click="deleteGUI"></i>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="diolog = false">取 消</el-button>
                    <el-button type="primary" @click="Formsure('editorForm')">确 定</el-button>
                </div>
            </el-dialog>
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
                colorcha:false,
                colorvalue:'#f00',
                diolog:false,
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
                loading:true,
                tableData:[],
                total:null,
                pageId:1,
                pageSize:10,
                radio:'1',
            };
    },
    components:{
        colorPicker,
    },
    methods: {
        refresh:function(){    //刷新
            this.getList();
            this.$message({
                type:'success',
                message:'已刷新'
            })
        },
        headleChangeColor:function(value){   //colorpicker
            console.log(value)
        },
        addGuige:function(){
            var newObj={
                a:'',
                b:'',
                colorvalue:''
            }
            this.guiGelist.push(newObj)
        },
        deleteGUI:function(){     //删除规格

        },
        oneAdd:function(){  //查询
        },
        handleEdit:function(index,row){  //编辑
              this.$router.push({
                path:'/commodity/standardList/editor',
                query:'1'
              })
        },
        handleDelete:function(){  //删除

        },
        handleSizeChange(val) {       //条数改变
            this.pageSize=val;
            this.getList()
        },
        handleCurrentChange(val) {    //页数改变
            this.pageId = val
            this.getList()
        },
        choseOne:function(selection,row){       //单选
            var arrCh=[];
            for (var value of selection) {      //es6  for of循环
                arrCh.push(value.id)
            }
        },
        choseAll:function(selection){        //多选
            var arrChall=[];
            for (var value of selection) {      //es6  for of循环
                arrChall.push(value.id)
            }
        },
        getList:function(){           //获取信息列表
            var that=this
            that.service({
                url:'https://www.easy-mock.com/mock/59bb7d44e0dc663341ab7963/example/tableProduce',
                method:'post',
                data:{
                    pageId:that.pageId,
                    pageSize:that.pageSize,
                    selectOne:that.selectOne,
                    inputSearch1:that.inputSearch1,
                    inputSearch2:that.inputSearch2,
                    checkboxGroup1:that.checkboxGroup1,
                    treeId:that.treeId
                }
            }).then(response=>{
                that.tableData=response.data.rows
                that.total=response.data.rowCount
                that.loading=false
            }).catch(data=>{
                that.loading=false
                console.log(data)
            })
        },
    },
    mounted:function(){
        this.getList()
    }
};
</script>
<style scoped>
    .product-menu{
        position: relative;
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
</style>