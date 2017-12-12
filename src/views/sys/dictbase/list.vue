<template>
    <div class="dictionaryTable wrap-table">
        <div class="clearfix">
            <div style="float: left">
                <el-form :inline="true">
                    <el-form-item style="max-width: 160px">
                        <el-select v-model="selectOne" placeholder="请选择搜索条件">
                            <el-option label="字典类型" value="0"></el-option>
                            <el-option label="字典类型名称" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="inputSearch" placeholder="请输入要搜索的内容"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="padding: 10px 30px" @click="oneSearch">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div style="float: right">
                <el-button style="padding: 10px 30px" @click="oneAddinfo">新增</el-button>
                <el-button style="padding: 10px 30px" @click="refresh">刷新</el-button>
            </div>
        </div>
        <template>
            <el-table
                    :data="tableData"
                    border
                    v-loading="loading"
                    height="500"
                    element-loading-text="拼命加载中"
                    style="width: 100%">
                <el-table-column align="center" label="序号" width="65">
                    <template scope="scope">
                        {{scope.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="dictType"
                        align="center"
                        label="字典类型"
                        min-width="200">
                </el-table-column>
                <el-table-column
                        prop="dictTypeName"
                        label="类型名称"
                        align="center"
                        min-width="200">
                </el-table-column>
                <el-table-column
                        prop="createData"
                        label="创建时间"
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
                                size="small" @click="changeZdit(scope.$index, scope.row)"
                                >字典值</el-button>
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
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    current-page.sync="pageId"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
        <!-------------diolog
        ----------字典值-->
        <el-dialog title="字典值列表" :visible.sync="diologZdTwo"  size="small">
            <div class="clearfix">
                <div style="float: left;margin: 10px 0">
                    <el-button style="padding: 10px 30px" @click="oneAddinfoTwo">新增</el-button>
                </div>
            </div>
            <template>
                <el-table
                        :data="tableDataTwo"
                        border
                        v-loading="loadingTwo"
                        element-loading-text="拼命加载中"
                        style="width: 100%">
                    <el-table-column align="center" label="序号" width="65">
                        <template scope="scope">
                            {{scope.$index+1}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="dictValue"
                            align="center"
                            label="字典值"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            prop="dictName"
                            label="字典名称"
                            align="center"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            prop="createData"
                            label="创建时间"
                            align="center"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            min-width="200"
                            fixed="right"
                            align="center"
                            label="操作">
                        <template scope="scope">
                            <el-button
                                    size="small" @click="handleEditTwo(scope.$index, scope.row)"
                                    >编辑</el-button>
                            <el-button
                                    size="small"
                                    type="danger" @click="handleDeleteTwo(scope.$index, scope.row)"
                                    >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <!--分页-->
            <div class="block page-div">
                <el-pagination
                        @size-change="handleSizeChangeTwo"
                        @current-change="handleCurrentChangeTwo"
                        current-page.sync="pageIdTwo"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageSizeTwo"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalTwo">
                </el-pagination>
            </div>
        </el-dialog>
        <!--diolog字典值-->
        <el-dialog :title="diologTitleTwo" :visible.sync="diologTwo"  size="tiny">
            <el-form :model="twoForm" :rules="roleRules" :label-position="labelPosition" label-width="80px"  ref="twoForm">
                <el-form-item label="字典值" prop="dictValue">
                    <el-input v-model="twoForm.dictValue" auto-complete="off" placeholder="请输入字典值"></el-input>
                </el-form-item>
                <el-form-item label="字典名称" prop="dictName">
                    <el-input v-model="twoForm.dictName" auto-complete="off" placeholder="请输入字典值对应的名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="diologTwo = false">取 消</el-button>
                <el-button type="primary" @click="TwoFormsure('twoForm')" v-if="TwoaddConfid==0">确 定</el-button>
                <el-button type="primary" @click="addTwoFormsure('twoForm')" v-if="TwoaddConfid==1">确 定</el-button>
            </div>
        </el-dialog>
        <!--diolog字典值-->
        <!--diolog-->
        <el-dialog :title="diologTitle" :visible.sync="diologOne"  size="tiny">
            <el-form :model="oneForm" :rules="roleRules" :label-position="labelPosition" label-width="80px"  ref="oneForm">
                <el-form-item label="字典类型" prop="dictType">
                    <el-input v-model="oneForm.dictType" auto-complete="off" placeholder="请输入字典类型"></el-input>
                </el-form-item>
                <el-form-item label="类型名称" prop="dictTypeName">
                    <el-input v-model="oneForm.dictTypeName" auto-complete="off" placeholder="请输入字典类型名称"></el-input>
                </el-form-item>
                <div v-if="addConfid==1">
                    <el-form-item label="字典值" prop="dictValue">
                        <el-input v-model="oneForm.dictValue" auto-complete="off" placeholder="请输入字典值"></el-input>
                    </el-form-item>
                    <el-form-item label="字典名称" prop="dictName">
                        <el-input v-model="oneForm.dictName" auto-complete="off" placeholder="请输入字典值对应的名称"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="diologOne = false">取 消</el-button>
                <el-button type="primary" @click="oneFormsure('oneForm')" v-if="addConfid==0">确 定</el-button>
                <el-button type="primary" @click="addFormsure('oneForm')" v-if="addConfid==1">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default{
    name:'dictbase',
    data(){
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
            loading:true,
            isSearch:false,
            addConfid:0,
            diologTitleTwo:'',
            tableData:[],
            tableDataTwo:[],
            loadingTwo:true,
            selectOne:'',
            inputSearch:'',
            total:null,
            totalTwo:null,
            pageId:1,
            TwoaddConfid:0,
            pageSize:10,
            pageIdTwo:1,
            pageSizeTwo:10,
            diologTitle:'',
            diologTitleTwo:'',
            diologOne:false,
            diologZdTwo:false,
            diologTwo:false,
            dictTypeTwo:'',
            oneForm:{
                dictType:'',
                dictTypeName:'',
                dictValue:'',
                dictName:''
            },
            twoForm:{
                dictValue:'',
                dictName:'',
                id:null,
            },
            oldDictType:'',
            labelPosition:'left',
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

            }
        }
    },
    methods:{
        refresh:function(){            //页面刷新
            this.getList()
            this.$message({
                message:'已刷新',
                type:'success'
            })
        },
        oneSearch:function(){           //一级查询
            var that=this;
            that.pageId=1;
            that.pageSize=10;
            that.getList()
        },
        oneAddinfo:function(){          //一级新增触发
            var that=this;
            that.addConfid=1;
            that.diologTitle='新增';
            that.diologOne=true;
            setTimeout(()=>{
                that.oneForm={
                    dictType:'',
                    dictTypeName:'',
                    dictValue:'',
                    dictName:''
                }
                that.$refs['oneForm'].resetFields();  //重置
            },100)
//            that.service({
//                url:'/sys/dictbase/addType',
//                method:'post'
//            }).then(response=>{
//            }).catch(data=>{
//                console.log(data)
//            })
        },
        addFormsure:function(formName){         //新增确认
            var that=this;
            that.$refs[formName].validate(function (valid) {
                if(valid){
                    that.service({
                        url:'/sys/dictbase/addTypeSave',
                        method:'post',
                        data:{
                            dictType:that.oneForm.dictType,
                            dictTypeName:that.oneForm.dictTypeName,
                            dictValue:that.oneForm.dictValue,
                            dictName:that.oneForm.dictName,
                        }
                    }).then(response=>{
                        that.diologOne=false
                        that.$message({
                            message:response.message,
                            type:'success'
                        })
                        that.getList()
                    }).catch(data=>{
                        that.diologOne=false
                        console.log(data)
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
        handleEdit:function(index,row){  //one 编辑触发
            var that=this;
            that.addConfid=0;
            that.diologTitle='编辑';
            that.diologOne=true;
            that.oldDictType=row.dictType
            that.oneForm={
                dictType:row.dictType,
                dictTypeName:row.dictTypeName,
                dictValue:'',
                dictName:''
            }
            that.service({
                url:'/sys/dictbase/updateType',
                method:'post',
                data:{
                    dictType:row.dictType
                }
            }).then(response=>{

            }).catch(data=>{
                console.log(data)
            })
        },
        /************
         修改字典值
         ***********/
        changeZdit:function(index,row){  //字典值
            var that=this;
            that.dictTypeTwo=row.dictType;
            that.pageIdTwo=1;
            that.pageSizeTwo=10,
            that.diologZdTwo=true
            that.getListTwo()
        },
        oneAddinfoTwo:function(){         //two 新增触发
            var that=this;
            that.TwoaddConfid=1;
            that.diologTitleTwo='新增';
            that.diologTwo=true;
            setTimeout(()=>{
                that.twoForm={
                    dictValue:'',
                    dictName:'',
                    id:null,
                }
                that.$refs['twoForm'].resetFields();  //重置
            },100)
            that.service({
                url:'/sys/dictbase/addValue',
                method:'post',
                data:{
                    dictType:that.dictTypeTwo,
                }
            }).then(response=>{
            }).catch(data=>{
                console.log(data)
            })
        },
        addTwoFormsure:function(formName){   //two新增保存确认
            var that=this;
            that.$refs[formName].validate(function (valid) {
                if(valid){
                    that.service({
                        url:'/sys/dictbase/addSave',
                        method:'post',
                        data:{
                            dictType:that.dictTypeTwo,
                            dictValue:that.twoForm.dictValue,
                            dictName:that.twoForm.dictName,
                        }
                    }).then(response=>{
                        that.diologTwo=false;
                        that.$message({
                            message:response.message,
                            type:'success'
                        })
                        that.getListTwo()
                    }).catch(data=>{
                        that.diologTwo=false;
                        console.log(data)
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
        handleEditTwo:function(index,row){       //two 编辑触发
            var that=this;
            that.TwoaddConfid=0;
            that.diologTitleTwo='编辑';
            that.diologTwo=true;
            that.twoForm={
                dictValue:row.dictValue,
                dictName:row.dictName,
                id:row.id
            }
            that.service({
                url:'/sys/dictbase/updateValue',
                method:'post',
                data:{
                    id:row.id
                }
            }).then(response=>{
            }).catch(data=>{
                console.log(data)
            })
        },
        TwoFormsure:function(formName){     //two编辑保存确认
            var that=this;
            that.$refs[formName].validate(function (valid) {
                if(valid){
                    that.service({
                        url:'/sys/dictbase/updateSave',
                        method:'post',
                        data:{
                            id:that.twoForm.id,
                            dictValue:that.twoForm.dictValue,
                            dictName:that.twoForm.dictName
                        }
                    }).then(response=>{
                        that.diologTwo=false;
                        that.$message({
                            message:response.message,
                            type:'success'
                        })
                        that.getListTwo()
                    }).catch(data=>{
                        that.diologTwo=false;
                        console.log(data)
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
        handleDeleteTwo:function(index,row){     //two  删除触发
            var that=this;
            that.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.service({
                    url:'/sys/dictbase/delete',
                    method:'post',
                    data:{
                        id:row.id
                    }
                }).then(response=>{
                    that.$message({
                        type: 'success',
                        message: response.message
                    });
                    console.log(response)
                    that.getListTwo()
                    if(that.tableDataTwo.length==1){
                        that.diologZdTwo=false;
                        setTimeout(()=>{
                            that.getList()
                        },1000)
                    }
                }).catch(data=>{
                    console.log(data)
                })

            }).catch(() => {
                that.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        oneFormsure:function(formName){           //one 编辑保存
            var that=this;
            that.$refs[formName].validate(function (valid) {
                if(valid){
                    that.service({
                        url:'/sys/dictbase/updateTypeSave',
                        method:'post',
                        data:{
                            oldDictType:that.oldDictType,
                            dictType:that.oneForm.dictType,
                            dictTypeName:that.oneForm.dictTypeName,
                        }
                    }).then(response=>{
                        that.diologOne=false
                        that.$message({
                            message:response.message,
                            type:'success'
                        })
                        that.getList()
                    }).catch(data=>{
                        that.diologOne=false
                        console.log(data)
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
        handleDelete:function(index,row){  //一级删除
            var that=this;
            that.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.service({
                    url:'/sys/dictbase/deleteDictType',
                    method:'post',
                    data:{
                        dictType:row.dictType
                    }
                }).then(response=>{
                    that.$message({
                        type: 'success',
                        message: response.message
                    });
                    console.log(response)
                    that.getList()
                }).catch(data=>{
                    console.log(data)
                })

            }).catch(() => {
                that.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        getList:function(){           //获取一级信息列表
            var that=this
            that.service({
                url:'/sys/dictbase/listData',
                method:'post',
                data:{
                    pageId:that.pageId,
                    pageSize:that.pageSize,
                    dictTypeSearch:that.selectOne==0 ? that.inputSearch:'',
                    dictTypeNameSearch:that.selectOne==1 ? that.inputSearch:''
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
        getListTwo:function(){           //获取2级信息列表
            var that=this
            that.service({
                url:'/sys/dictbase/listValueData',
                method:'post',
                data:{
                    pageId:that.pageIdTwo,
                    pageSize:that.pageSizeTwo,
                    dictType:that.dictTypeTwo
                }
            }).then(response=>{
                that.tableDataTwo=response.data.rows
                that.totalTwo=response.data.rowCount
                that.loadingTwo=false
            }).catch(data=>{
                that.loadingTwo=false
                console.log(data)
            })
        },
        handleSizeChange(val) {       //条数改变
            this.pageSize=val;
            this.getList()
        },
        handleCurrentChange(val) {    //页数改变
            this.pageId = val
            this.getList()
        },
        handleSizeChangeTwo(val) {       //
            this.pageSizeTwo=val;
            this.getListTwo()
        },
        handleCurrentChangeTwo(val) {    //
            this.pageIdTwo = val
            this.getListTwo()
        },
    },
    mounted:function(){
        var that=this;
        that.getList()
    }
}
</script>
<style scoped>
    .dictionaryTable .page-div{
        margin: 20px auto;
    }
</style>
