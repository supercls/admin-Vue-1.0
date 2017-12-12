<template>
  <div class="wrapRole">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <div style="overflow: hidden">
        <div  style="float: left">
          <el-form-item>
            <el-input v-model="formInline.userName" placeholder=""><template slot="prepend">角色名称：</template></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="padding: 10px 30px" @click="select">查询</el-button>
          </el-form-item>
        </div>
        <div style="float: right">
          <el-button style="padding: 10px 30px" @click="addRow">新增</el-button>
          <el-button style="padding: 10px 30px" @click="refresh">刷新</el-button>
        </div>
      </div>
      <div class="roleTable">
        <template>
          <el-table
            :data="tableData"
            border
            highlight-current-row
            height="500"
            v-loading="loading"
            style="width: 100%">
            <el-table-column  label="序号" width="65"  align="center">
              <template scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            <el-table-column
              prop="roleName"
              label="角色名称"
              align="center"
              min-width="200">
            </el-table-column>
            <el-table-column
              prop="roleCode"
              label="角色编码"
              align="center"
              min-width="200">
            </el-table-column>
            <el-table-column
              prop="createDate"
              label="创建时间"
              align="center"
              min-width="250">
            </el-table-column>
            <el-table-column
              prop="editor"
              align="center"
              label="操作"
              min-width="300">
              <template scope="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button  size="small" @click="handleConfig(scope.$index, scope.row)" style="margin-left: 10px">分配</el-button>
                <el-button  size="small" @click="roleConfig(scope.$index, scope.row)" style="margin-left: 10px">人员分配</el-button>
                <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)" style="margin-left: 10px">删除 </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="handleClose" :size="dialogSize" v-if="dialogId==1">
            <div v-if="configId==1">
              <el-tree
                :data="data3"
                show-checkbox
                node-key="id"
                ref="tree"
                :default-checked-keys="checkedList"
                :props="defaultProps"
                :render-content="renderContent"
                style="max-height: 500px;overflow-y: scroll"
              >
              </el-tree>
              <!--<el-button @click="getCheckedNodes">通过 node 获取</el-button>-->
            </div>
            <div v-else-if="roleConfigId==1">
              <template>
                <el-transfer  :filter-method="filterMethod" :titles="['未选择', '已选择']" v-model="value1" filterable :data="data" style="display: flex;justify-content: center;text-align: left"></el-transfer>
              </template>
            </div>
            <div v-else>
              <el-form :model="form" :rules="roleRules" ref="form"
                       style="display: flex;flex-flow: column wrap;justify-content: flex-start;align-items: center;">
                <el-form-item label="角色名称" prop="roleName" :label-width="formLabelWidth" style="display: flex">
                  <el-input v-model="form.roleName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色编码" prop="roleCode" :label-width="formLabelWidth"  style="display: flex">
                  <el-input v-model="form.roleCode" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
              <div class="configSave" v-if="configId==1"><el-button type="primary"  @click="saveConfigs">保存</el-button></div>
              <div v-else>
              <el-button @click="cancelEvent">取 消</el-button>
              <el-button type="primary" @click="editorSave('form')" v-if="editorId==1">确 定</el-button>
                <el-button type="primary" @click="saveOption"  v-else-if="roleConfigId==1">保存</el-button>
              <el-button type="primary" @click="addSave('form')" v-else>确 定</el-button>
              </div>
            </div>
          </el-dialog>
        </template>
      </div>
      <div class="block" style="margin:20px 0;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-form>
  </div>
</template>
<script>
  export default {
//    name:'角色管理',
    data() {
      var checkRole = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('角色名称不能为空'));
        }
        setTimeout(() => {
          if (value.length>20) {
            callback(new Error('角色名称长度不超过20'));
          }  else {
            callback();
          }
        }, 1000);
      };
      var checkRoleCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('角色编码不能为空'));
        }
        setTimeout(() => {
          if (value.length>20) {
            callback(new Error('角色编码长度不超过20'));
          }  else {
            callback();
          }
        }, 1000);
      };
      return {
        dialogId:0,
        data: [],
        value1: [],
        dialogSize:'tiny',
        filterMethod(query, item) {
          return item.label.indexOf(query) > -1;
        },
        roleConfigId:0,
        index:'',
        id: '',
        loading:true,
        data3: [],
        defaultProps: {
          children: 'children',
          label: 'label',
          disabled:'disabled'
        },
        checkedList: [],
        total:null,
        configId: 0,
        currentPage: 1,
        pageSize:10,
        editorId: 0,
        title: '',
        dialogFormVisible: false,
        form: {
          roleCode: '',
          roleName: ''
        },
        formLabelWidth: 'auto',
        formInline: {
          userName: '',
          region: ''
        },
        tableData: [],
        roleRules: {
          roleName: [
            { validator: checkRole, trigger: 'blur' }
          ],
          roleCode: [
            { validator: checkRoleCode, trigger: 'blur' }
          ],
        }
      }
    },
    mounted() {
      this.displayData()
    },
    methods: {
      roleConfig(index,row){ //人员分配
        let that=this
        that.id=row.id
        that.service({
          url: '/sys/operaterole/allotOperateUser',
          method: 'post',
          data: ({
            id: row.id
          })
        }).then(function (response) {
          if(response.code==0)
          {
            that.dialogId=1
            that.roleConfigId=1
            that.dialogFormVisible=true
            that.title='管理员分配人员'
            that.dialogSize='small'
            that.data=response.data.allUser
            that.value1=response.data.selectedUser
          }else {
            that.$message({
              type: 'fail',
              message: response.message
            });
            that.dialogSize='tiny'
            return
          }
        }).catch(function (data) {
          console.log(data)
        })
      },
      saveOption(){ //人员分配保存
        let that=this
        that.service({
          url: '/sys/operaterole/allotOperateUserSave',
          method: 'post',
          data: ({
            id: that.id,
            checkedOperateUser:that.value1.join()
          })
        }).then(function (response) {
          that.dialogId=0
          that.dialogFormVisible=false
          that.roleConfigId=0
          that.$message({
            type: 'success',
            message: response.message
          });
          that.dialogSize='tiny'
        }).catch(function (data) {
          console.log(data)
        })
      },
      handleClose(){
        this.dialogFormVisible = false
        this.dialogId=0
        this.editorId = 0
        this.configId = 0
        this.roleConfigId=0
        this.dialogSize='tiny'
      },
      cancelEvent(){ //-------------取消
        this.dialogFormVisible = false
        this.dialogId=0
        this.editorId = 0
        this.configId = 0
        this.roleConfigId=0
        this.dialogSize='tiny'
      },
      handleConfig(index, row) { //---------------------角色分配
        var that = this
        that.service({
          url: '/sys/operaterole/allotOperateMenu',
          method: 'post',
          data: ({
            id: row.id
          })
        }).then(function (response) {
          if(response.code==0){
            that.id = row.id
            that.dialogId=1
            that.configId = 1
            that.dialogFormVisible = true
            that.title = '管理员分配'
            that.data3 = response.data.jsonData.rootList
            that.checkedList = response.data.jsonData.checkedList
          }else {
            that.$message({
              message:response.message,
              type:'fail'
            })
          }
        }).catch(function (data) {
          that.loading = false
          console.log(data)
        })
      },
      saveConfigs() {       //---------------------角色分配 保存
        var that = this
        var tempData = this.getCheckedNodes();
        tempData.id = that.id;
        that.service({
          url: '/sys/operaterole/allotOperateMenuSave',
          method: 'post',
          data: (tempData)
        }).then(function (response) {
          that.$message({
            message:response.message,
            type:'success'
          })
          that.dialogId=0
          that.dialogFormVisible=false;
          that.configId=0
        }).catch(function (data) {
          that.loading = false
          console.log(data)
        })
      },
      renderContent(h, { node, data, store }) {        //JSX语法
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
      getCheckedNodes() { //---------------------角色分配 获取节点方法
        var that = this
        var temp = that.$refs.tree.getCheckedNodes()
        var m = []
        var txt = []
        var tempArr=[]
        for (let i = 0; i < temp.length; i++) {
          if (!temp[i].is_menu){
            m.push(temp[i].id)
            tempArr=tempArr.concat(temp[i].parentIds)
          }
          else {
            tempArr.push(temp[i].id)
          }
        }
        //let psIdArray = [...new Set(pIdsArray)];
        var newTemp=Array.from(new Set(tempArr)); //ES6数组去重
        return {checkedOperateMenu: newTemp.join(), checkedOperateMenuBtn: m.join()}
      },
      displayData() { //---------------------角色 表格显示
        var that = this
        that.service({
          url: '/sys/operaterole/listData',
          method: 'post',
          data:({
            pageSize:that.pageSize,
            pageId:that.currentPage
          })
        }).then(function (response) {
          that.tableData = response.data.rows
          that.total=response.data.rowCount
          that.loading=false
        }).catch(function (data) {
        })
      },
      handleSizeChange(val) {
        this.pageSize=val
        this.displayData()
      },
      handleCurrentChange(val) {
        this.currentPage=val
        this.displayData()
      },
      select() { //---------------------查询
        var that = this
        that.service({
          url: '/sys/operaterole/listData',
          method: 'post',
          data:({
            pageSize:that.pageSize,
            pageId:that.currentPage,
            roleNameSearch:that.formInline.userName
          })
        }).then(function (response) {
          that.tableData = response.data.rows
        }).catch(function (data) {
        })
      },
      refresh() { //---------------------刷新
        this.displayData()
        this.$message({
          message:'已刷新',
          type:'success'
        })
      },
      handleEdit(index, row) { //---------------------编辑
        this.editorId = 1
        this.dialogId=1
        this.configId = 0
        this.dialogFormVisible = true
        this.title = '修改用户信息'
        this.id=row.id
        this.index=index
        this.form = this.tableData[index]
        var that = this
        that.service({
          url: '/sys/operaterole/update',
          method: 'post',
          data:({
            id:row.id
          })
        }).then(function (response) {
        }).catch(function (data) {

        })
      },
      editorSave(formName) { //---------------------编辑 保存
        var that = this
        let id=that.id
        let index=that.index
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.service({
              url: '/sys/operaterole/updateSave',
              method: 'post',
              data:({
                id:id,
                roleName:that.form.roleName,
                roleCode:that.form.roleCode
              })
            }).then(function (response) {
              that.dialogFormVisible = false
              that.editorId = 0
              that.dialogId=0
              that.$message({
                message:response.message,
                type:'success'
              })
              that.displayData()
            }).catch(function (data) {

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addRow(formName) { //---------------------新增
        this.form={}
        this.dialogId=1
        this.dialogFormVisible = true
        this.title = '新增用户信息'
        let that=this
        that.editorId = 0
//        that.service({
//          url: '/sys/operaterole/add',
//          method: 'post',
//          data:({
//          })
//        }).then(function (response) {
//
//        }).catch(function (data) {
//
//        })
      },

      addSave(formName) { //---------------------新增 保存
        let that=this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.service({
              url: '/sys/operaterole/addSave',
              method: 'post',
              data:({
                roleName:that.form.roleName,
                roleCode:that.form.roleCode
              })
            }).then(function (response) {
              that.dialogId=0
              that.dialogFormVisible = false
              that.$message({
                message:response.message,
                type:'success'
              })
              that.displayData()
            }).catch(function (data) {
              this.dialogFormVisible =false
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      handleDelete(index, row) { //---------------------删除
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let that=this
          that.service({
            url: '/sys/operaterole/delete',
            method: 'post',
            data:({
              id:row.id
            })
          }).then(function (response) {
            that.$message({
              type: 'success',
              message: '删除成功!'
            })
            that.displayData()
          }).catch(function (data) {

          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
    }
  }
</script>
<style scoped>
  .wrapRol .el-form-item__content{
    margin-left: 0!important;
  }
  .wrapRole {
    margin: 20px 20px 50px 20px;
    box-sizing: border-box;
  }

  .wrapRol .roleTable,   .wrapRol .el-table th {
    text-align: center;
  }
  .wrapRol .el-dialog__body{
    text-align: left;
  }
  .wrapRol .el-dialog__header {
    text-align: center;
  }

  .wrapRol .el-tree {
    border: none;
  }
  .wrapRol .configSave{
    position: absolute;
    right: 50px;
    top: 10px;
  }
  .wrapRol .configSave button{
    padding: 10px 15px!important;
  }
  .wrapRol .el-dialog__footer{
    display: flex;
    justify-content: center;
  }
  .wrapRol .dialog-footer button{
    padding: 10px 30px;
  }
  .wrapRol .dialog-footer>div{
    text-align: center;
  }

</style>
