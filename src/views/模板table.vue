<template>
    <div class="wrap-table product-menu">
        <!--tree-top-->
            <div class="clearfix">
                <div style="float: right">
                    <el-form :inline="true">
                        <el-form-item>
                            <el-input v-model="inputSearch1" placeholder="请输入品牌名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="inputSearch2" placeholder="请输入类别"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" style="padding: 10px 30px" @click="oneSearch">查询</el-button>
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
                            label="品牌名称"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            prop="b"
                            label="品牌图片"
                            align="center"
                            min-width="200">
                        <template scope="scope">
                            <img :src="scope.row.b" alt="" class="img-table-small"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="c"
                            label="类别"
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
                            prop="e"
                            label="状态"
                            align="center"
                            min-width="100">
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
            <!--diolog字典值-->
            <el-dialog title="编辑" :visible.sync="diolog"  size="tiny">
                <el-form :model="editorForm" :rules="roleRules" label-position="left" label-width="80px"  ref="editorForm">
                    <el-form-item label="商品名称" prop="a">
                        <el-input type="textarea" v-model="editorForm.a" auto-complete="off" placeholder="请输入商品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="是否上架" prop="e">
                        <el-switch on-text="" off-text="" v-model="editorForm.e"></el-switch>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="diolog = false">取 消</el-button>
                    <el-button type="primary" @click="Formsure('editorForm')">确 定</el-button>
                </div>
            </el-dialog>
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
                editorForm:{
                    a:'',
                    e:false,
                    id:null,
                },
                diolog:false,
                defaultProps: {
                    children: 'children',
                    label: 'label',
                    id: "id",
                    isLeaf: "isChild",
                },
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
                inputSearch1:'',
                inputSearch2:'',
                treeId:'',
            };
    },
    methods: {
        refresh:function(){    //刷新
            this.getList();
            this.$message({
                type:'success',
                message:'已刷新'
            })
        },
        oneSearch:function(){  //查询
            this.getList();
        },
        handleEdit:function(index,row){  //编辑
//            this.$router.push({
//                path:'/commodity/product/editor',
//                query:row
//            })
              var that=this;
              that.diolog=true;

        },
        handleDelete:function(){  //删除

        },
        handleSizeChange(val) {       //条数改变
            this.pageSize=val;
        },
        handleCurrentChange(val) {    //页数改变
            this.pageId = val
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
</style>