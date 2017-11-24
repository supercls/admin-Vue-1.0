<template>
    <div class="el-table-div">
        <div class="clearfix">
            <div class="group-Search-div pull-left clearfix">
                <el-input placeholder="请输入内容" v-model="inputSerch">
                    <el-select v-model="select" slot="prepend" placeholder="商品名称">
                        <el-option label="条形码" value="1"></el-option>
                        <el-option label="品牌" value="2"></el-option>
                    </el-select>
                    <el-button slot="append" icon="search" @click="searchButton"></el-button>
                </el-input>
            </div>
            <div class="pull-left data-pick">
                <dataPick @dataPick1="dataPick1"></dataPick>
            </div>
            <el-button type="primary"  class="pull-right addButton el-icon-plus" @click="addButton">添加</el-button>
            <el-button type="primary" class="pull-right addButton fa-repeat fa" @click="refreshBut">刷新</el-button>
        </div>
        <el-table
                :data="tableData"
                stripe
                style="width: 100%"  @select="selectOne" @select-all="selectAll"  v-loading="loading"
                element-loading-text="拼命加载中">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop=""
                    label="ID"
                    width="60">
            </el-table-column>
            <el-table-column
                    prop="create_date"
                    label="日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="mem_name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="mem_qq"
                    label="QQ"
                    width="130">
            </el-table-column>
            <el-table-column
                    prop="mem_email"
                    label="email">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button
                            size="small"
                            type=""
                            @click="handleEdit(scope.$index, scope.row)"
                            >编辑</el-button>
                    <el-button
                            size="small"
                            type="danger" @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="clearfix">
            <el-button   class="pull-left removeButtom" @click="removeAllButton">批量删除</el-button>
        </div>
        <!--分页-->
        <div class="block page-div">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    current-page.sync="listQuery.pageId"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="listQuery.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
        <!--编辑-->
        <el-dialog
                title="编辑"
                :visible.sync="dialogVisible"
                size="small">
            <el-form :model="EditorForm" label-width="80px" :rules="addFormRules" ref="EditorForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="EditorForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="EditorForm.sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="QQ" prop="age">
                    <el-input-number v-model="EditorForm.age"></el-input-number>
                </el-form-item>
                <el-form-item label="日期" prop="date">
                    <el-date-picker type="date" placeholder="选择日期" v-model="EditorForm.date"></el-date-picker>
                </el-form-item>
                <el-form-item label="email" prop="email">
                    <el-input type="textarea" v-model="EditorForm.address"></el-input>
                </el-form-item>
            </el-form>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="EditorSure('EditorForm')">确 定</el-button>
			  </span>
        </el-dialog>
        <!--添加-->
        <el-dialog
                title="新增"
                :visible.sync="dialogAdd"
                size="small">
            <el-form :model="AddForm" label-width="80px" :rules="addFormRules" ref="AddForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="AddForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="AddForm.sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="QQ" prop="age">
                    <el-input-number v-model="AddForm.age"></el-input-number>
                </el-form-item>
                <el-form-item label="日期" prop="date">
                    <el-date-picker type="date" placeholder="选择日期" v-model="AddForm.date"></el-date-picker>
                </el-form-item>
                <el-form-item label="email">
                    <el-input type="textarea" v-model="AddForm.address"></el-input>
                </el-form-item>
            </el-form>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogAdd = false">取 消</el-button>
			    <el-button type="primary" @click="AddSure('AddForm')">确 定</el-button>
			  </span>
        </el-dialog>
    </div>
</template>
<script>
    import {validaName,validateQQ} from '../../../utils/validate.js'
    import dataPick from '../../../components/data-picker/data-pick1.vue'
    export default {
        data() {
        var checkName = (rule, value, callback) => {
            if (!validaName(value)) {
                callback(new Error('请输入正确的用户名'))
            } else {
                callback()
            }
        }
        var checkQQ=(rule,value,callback)=>{
            if(!validateQQ(value)){
                callback(new Error('请输入正确的QQ号'))
            } else {
                callback()
            }
        }
        return {
            inputSerch:'',
            select:'',
            total:null,
            loading:true,
            currentPage:5,
            tableData:[],
            dialogVisible:false,
            dialogAdd:false,
            listQuery: {
                pageId: 1,
                pageSize: 10, //每页条数
            },
            addFormRules: {
                name: [
                    { validator: checkName, trigger: 'blur' }
                ],
                age:[
                    { validator:checkQQ,message:'请输入qq号'}
                ],
                date:[
                    { required:true,message:'请选择日期'}
                ]
            },
            EditorForm:{
                id:'',
                date:'',
                name:'',
                sex:'',
                age:'',
                address:''
            },
            AddForm:{
                id:'',
                date:'',
                name:'',
                sex:'',
                age:'',
                address:''
            },
            ArrayId:[]
        }
    },
    created() {
        this.getList()
    },
    components:{
        dataPick
    },
    methods:{
        handleEdit:function(index,rows){  //编辑
            this.dialogVisible=true;
            this.EditorForm={
                id:rows.id,
                date:rows.create_date,
                name:rows.mem_name,
                sex:rows.mem_qq,
                age:rows.mem_qq,
                address:rows.mem_email
            }
        },
        EditorSure:function(formName){        //编辑确认
            var that=this;
            that.$refs[formName].validate(function (valid) {
                if(valid){
                    that.service({
                        url:'http://192.168.6.252:7777/demo/member/update',
                        data:{
                            id:that.EditorForm.id,
                            create_date:that.EditorForm.date,
                            mem_name:that.EditorForm.name,
                            mem_qq:that.EditorForm.age,
                            mem_email:that.EditorForm.address,
                        },
                        method:'post'
                    }).then(function(response){
                        that.$message({
                            type: 'success',
                            message:response.message
                        })
                        that.dialogVisible=false;
                        that.getList();
                        that.loading=false;
                    }).catch(function(data){
                        that.$message({
                            type:'error',
                            message:data
                        })
                    })
                }else{
                    that.$message({
                        type:'error',
                        message:'请重新填写'
                    })
                    return false
                }
            })

        },
        addButton:function(){                     //添加
            this.dialogAdd=true;
            setTimeout(()=>{
                this.$refs['AddForm'].resetFields();  //重置
            },300)
        },
        AddSure:function(formName){        //确认添加
            var that=this;
            that.$refs[formName].validate(function (valid) {
                if (valid) {
                    that.service({
                        url:'http://192.168.6.252:7777/demo/member/add',
                        data:{
                            create_date:that.AddForm.date,
                            mem_name:that.AddForm.name,
                            mem_qq:that.AddForm.age,
                            mem_email:that.AddForm.address,
                        },
                        method:'post'
                    }).then(function(response){
                        that.dialogAdd=false;
                        that.$message({
                            type: 'success',
                            message:response.message
                        })
                        that.getList();
                        that.loading=false;
                    }).catch(function(data){
                        console.log(data)
                    })
                } else {
                    that.$message({
                        type:'error',
                        message:'请重新填写'
                    })
                    return false;
                }
            })
        },
        handleDelete(index, rows) {          //删除数据
            //this.tableData.splice(index,1)
            console.log(rows)
            var that=this;
            that.service({
                url:'http://192.168.6.252:7777/demo/member/remove',
                data:{
                    id:rows.id
                },
                method:'post'
            }).then(function(response){
                that.getList();
                that.loading=false;
            }).catch(function(data){
                console.log(data)
            })
        },
        selectOne:function(selection,row){ //单选
            var that=this;
            that.ArrayId=[];
            selection.map(function (item,index) {
                that.ArrayId.push(item.id)
            })
            console.log(that.ArrayId)
        },
        selectAll:function(selection){  //全选
            var that=this;
            that.ArrayId=[];
            selection.map(function (item,index) {
                that.ArrayId.push(item.id)
            })
            console.log(that.ArrayId)
        },
        removeAllButton:function(){       //批量删除

        },
        searchButton:function(){

        },
        handleSizeChange(val) {       //条数改变
            this.listQuery.pageSize=val;
            this.getList()
        },
        handleCurrentChange(val) {    //页数改变
            this.listQuery.pageId = val
            this.getList()
        },
        dataPick1:function(value){
            var str=value.replace(/\-/g,'').replace(/\s+/g,"");
            var strStart=str.slice(0,8)
            var strEnd=str.slice(8,16)
            console.log(strStart+'/'+strEnd)
        },
        refreshBut:function(){       //刷新
            this.getList()
            this.$message({
                type:'success',
                message:'已刷新数据'
            })
        },
        getList:function(){     //获取列表
            var that=this;
            that.service({
                url:'http://192.168.6.252:7777/demo/member/pageInfo',
                data:{
                    pageId: that.listQuery.pageId,
                    pageSize: that.listQuery.pageSize, //每页条数
                },
                method:'post',
            }).then(function (response) {
                that.tableData=response.rows;
                that.total=response.rowCount;
                that.loading=false
            }).catch(function (data) {
                that.$message({
                    type:'error',
                    message:data
                })
                return false
            })
        }
    },
    }

</script>
<style scoped>
    .el-table-div{
        margin: 20px;
    }
    .group-Search-div{
        max-width:280px;
        margin:20px 0px;
    }
    .group-Search-div .el-input{
        min-width: 106px;
    }
    .page-div{
        margin: 20px auto;
    }
    .addButton{
        margin:20px 0px 20px 15px;
    }
    .data-pick{
        margin: 20px;
    }
    .removeButtom{
        margin:20px 0px 0px 0px;
    }
</style>