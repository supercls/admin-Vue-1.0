<template>
    <div class="wrap-table product-menu">
        <div class="produce-tree-left">
            <el-tree
                :data="datatree"
                :props="defaultProps"
                @node-click="handleNodeClick"
                ref="tree"
                node-key="id"
                :render-content="renderContent"
                >
            </el-tree>
        </div>
        <!--tree-top-->
        <div class="produce-tree-right">
                <div style="float: left">
                    <el-form :inline="true">
                        <el-form-item>
                            <el-button style="padding: 10px 30px" @click="">新增</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div style="float: right">
                    <el-form :inline="true">
                        <el-button style="padding: 10px 30px" @click="refresh">刷新</el-button>
                    </el-form>
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
                            fixed
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
                            label="分类名称"
                            min-width="150">
                    </el-table-column>
                    <el-table-column
                            prop="b"
                            label="类型"
                            align="center"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            prop="c"
                            label="显示"
                            align="center"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            prop="d"
                            label="推荐"
                            align="center"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="e"
                            label="排序"
                            align="center"
                            min-width="80">
                    </el-table-column>
                    <el-table-column
                            min-width="300"
                            align="center"
                            label="操作">
                        <template scope="scope">
                            <el-button
                                    size="small" @click="addNext(scope.$index, scope.row)"
                                    >新增下级</el-button>
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
            <!--diolog字典值-->
            <el-dialog title="编辑" :visible.sync="diolog"  size="small">
                <el-form :model="editorForm" :rules="roleRules" label-position="left" label-width="80px"  ref="editorForm">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="分类名称" prop="a">
                                <el-input type="text" class="w250" v-model="editorForm.a" auto-complete="off" placeholder="请输入分类名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="上级分类">
                                <el-cascader
                                        :options="editorForm.options"
                                        placeholder="请选择上级分类"
                                        v-model="editorForm.selectedOptions"
                                        :props="defaultprops"
                                        clearable="clearable"
                                        style="width: 240px;"
                                        @change="handleChange">
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="类型" style="display: inline-block">
                                <el-checkbox v-model="editorForm.checked">关联类型到下级</el-checkbox>
                            </el-form-item>
                            <el-form-item style="display: inline-block;">
                                <el-select v-model="editorForm.select2" placeholder="请选择">
                                    <el-option
                                            v-for="item in editorForm.items"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="显示">
                                <el-switch
                                        v-model="editorForm.switch1"
                                        on-text=""
                                        off-text="">
                                </el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="推荐">
                                <el-switch
                                        v-model="editorForm.switch2"
                                        on-text=""
                                        off-text="">
                                </el-switch>
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
    </div>
</template>
<script>
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
                datatree: [{
                    label: '一级 1',
                    isChild:false,
                    id:'0',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                            label: '三级 1-1-1'
                        }],
                        isChild:true,
                        id:'1',
                    }]
                }],
                defaultprops:{
                    value: 'value',
                    label:'label',
                    children: 'children'
                },
                clearable:true,
                editorForm:{
                    a:'',
                    e:false,
                    options:[],
                    selectedOptions:[],
                    id:null,
                    checked:false,
                    select2:'',
                    items:[],
                    switch1:true,
                    switch2:true
                },
                diolog:false,
                defaultProps: {
                    children: 'children',
                    label: 'label',
                    id: "id",
                    isLeaf: "isChild",
                },
                roleRules: {
                    a: [
                        { validator: checkRole, trigger: 'blur' }
                    ],
                    b: [
                        { validator: checkRole, trigger: 'blur' }
                    ],
                    c: [
                        { validator: checkRole, trigger: 'blur' }
                    ],
                    d: [
                        { validator: checkRole, trigger: 'blur' }
                    ],

                },
                loading:true,
                tableData:[],
                total:null,
                pageId:1,
                pageSize:10,
                treeId:'',
            };
    },
    methods: {
        renderContent(h, { node, data, store }) {        //tree-JSX语法
            if(data.is_menu==false){
                return (
                <span>
                    <i class="fa fa-cog" style="color:#97A8BE;margin-right:5px"></i>
                    <span>
                    <span>{node.label}</span>
                    </span>
                </span>
                )
             }
            else{
             return (
                <span>
                    <i class="fa fa-file-text" style="color:#97A8BE;margin-right:5px"></i>
                    <span>
                    <span>{node.label}</span>
                    </span>
                </span>
                )
            }
        },
        handleNodeClick(data) {  //tree
            this.loading=true;
            this.treeId=data.id
            this.getList()
        },
        handleChange(value) {    //change事件
            console.log(value);
        },
        refresh:function(){    //刷新
            this.getList();
            this.$message({
                type:'success',
                message:'已刷新'
            })
        },
        addNext:function(index,row){

        },
        handleEdit:function(index,row){  //编辑
//            this.$router.push({
//                path:'/commodity/product/editor',
//                query:row
//            })
              var that=this;
              that.diolog=true;
              that.editorForm.a=row.a
              that.editorForm.options=row.options
              that.editorForm.id=row.id
        },
        handleDelete:function(){  //删除

        },
        handleSizeChange(val) {       //条数改变
            this.pageSize=val;
            this.getList();
        },
        handleCurrentChange(val) {    //页数改变
            this.pageId = val
            this.getList();
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
                url:'https://www.easy-mock.com/mock/59bb7d44e0dc663341ab7963/example/categoryList',
                method:'post',
                data:{
                    pageId:that.pageId,
                    pageSize:that.pageSize,
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
    .product-menu .el-tree{
        border:none;
    }
    .product-menu .produce-tree-left{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 150px;
        height: 100%;
    }
    .product-menu .produce-tree-right{
        margin-left: 180px;
    }
    .product-menu .page-div{
        margin: 20px auto;
    }
    .product-menu .img-table-small{
        width: 68px;
        height: 56px;
        vertical-align: middle;
    }
    .product-menu .el-table__fixed{
        box-shadow: 0;
    }
</style>