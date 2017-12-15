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
            <el-dialog title="编辑" :visible.sync="diolog"  size="small">
                <el-form :model="editorForm" :rules="roleRules" label-position="right" label-width="80px"  ref="editorForm">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="品牌名称" prop="a">
                                <el-input type="text" v-model="editorForm.a" auto-complete="off" placeholder="请输入品牌名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="类别" prop="a">
                                <el-input type="text" v-model="editorForm.a" auto-complete="off" placeholder="请输入类别"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="排序" prop="a">
                                <el-input type="number" v-model="editorForm.a" auto-complete="off" placeholder="请输入数字"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="推荐" prop="e">
                                <el-switch on-text="" off-text="" v-model="editorForm.e"></el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 30px">
                        <el-col :span="10">
                            <el-form-item label="品牌图片" prop="a">
                                <el-upload
                                        class="Nav-avatar-uploader"
                                        ref="upload"
                                        action="http://192.168.6.246:9191/file/upload"
                                        :show-file-list="false"
                                        name="file"
                                        :headers="Xtoken"
                                        :on-progress="handOnloading"
                                        :auto-upload="true"
                                        :on-success="handleAvatarSuccess"
                                        v-loading.body="Uploadloading"
                                        :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
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
import { mapGetters } from 'vuex'
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
                diolog:false,
                Uploadloading:false,
                Xtoken:{},
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
                imageUrl:'',
                pageSize:10,
                inputSearch1:'',
                inputSearch2:'',
                treeId:'',
            };
    },
    computed:{
        ...mapGetters([
            'token'
        ])
    },
    methods: {
        refresh:function(){    //刷新
            this.getList();
            this.$message({
                type:'success',
                message:'已刷新'
            })
        },
        handOnloading:function(){     //文件上传时候的钩子
            this.Uploadloading=true
        },
        handleAvatarSuccess(res, file,fileList) {    //文件上传成功时候钩子
            console.log(res)
            this.imageUrl = URL.createObjectURL(file.raw);
            this.netFileName=res.data.netFileName;
            this.Uploadloading=false;
        },
        beforeAvatarUpload(file) {         //文件上传前的钩子
            const isJPGPNG = file.type === 'image/jpeg'||file.type==='image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPGPNG) {
                this.$message.error('上传头像图片只能是 JPG和 PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPGPNG && isLt2M;
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
        this.Xtoken={'X-Token':this.token};
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
</style>