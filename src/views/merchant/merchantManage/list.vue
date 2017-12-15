<template>
  <div class="merchantManage">
    <div class="header clearfix">
      <div class="headerLeft">
        <el-button>新增</el-button>
        <el-button>升级申请</el-button>
      </div>
      <div class="headerRight">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="店铺名称">
            <el-input v-model="formInline.name" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="店铺等级">
            <el-select v-model="item">
              <el-option :label="item" :value="item" v-for="item in formInline.rankOption" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店铺状态">
            <el-select v-model="item">
              <el-option :label="item" :value="item" v-for="item in formInline.statusOption" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="storeTable">
      <template>
        <el-table
          ref="multipleTable"
          :data="tableData3"
          border
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange" align="center">
          <el-table-column
            type="selection"
            width="55"
            align="center">
          </el-table-column>
          <el-table-column
            label="店铺名称"
            width="120"
            align="center">
            <template scope="scope">{{ scope.row.storeName }}</template>
          </el-table-column>
          <el-table-column
            prop="hostName"
            label="店主用户名"
            align="center">
          </el-table-column>
          <el-table-column
            prop="address"
            label="所在地"
            width="200"
            show-overflow-toolti
            align="center">
          </el-table-column>
          <el-table-column
            prop="category"
            label="店铺类别"
            show-overflow-toolti
            align="center">
          </el-table-column>
          <el-table-column
            prop="rank"
            label="店铺等级"
            show-overflow-toolti
            align="center">
          </el-table-column>
          <el-table-column
            prop="validityDate"
            label="有效期至"
            show-overflow-toolti
            align="center">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            show-overflow-toolti
            align="center">
          </el-table-column>
          <el-table-column
            prop="recommend"
            label="推荐"
            show-overflow-toolti
            align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px" class="footer clearfix">
          <div class="mountDel">
            <el-button @click="toggleSelection()">批量删除</el-button>
          </div>
          <div class="page">
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
        </div>
      </template>
    </div>
    <div class="dialogWrap">
      <!--弹出框-->
      <el-dialog title="店铺编辑" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form"  :label-width="formLabelWidth" :label-position="labelPosition">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="会员名" prop="memberName">
                {{form.memberName}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="店主姓名" prop="hostName">
                <el-input v-model="form.hostName" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="店主身份证号">
                <el-input v-model="form.cardId" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="店铺名称" prop="storeName">
                <el-input v-model="form.storeName" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="店铺分类" class="dialogLeft" prop="category">
                <el-select v-model="form.category" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="所在地区" prop="address">
                {{form.address}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="详细地址">
                <el-input v-model="form.detailAddress" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="邮政编码">
                <el-input v-model="form.postId" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话">
                <el-input v-model="form.telNo" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="有效期至">
                <el-input v-model="form.validityDate" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item  label="店铺状态" class="dialogLeft" prop="status">
                <el-select v-model="form.status" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否推荐">
                <el-switch
                  v-model="value1"
                  on-text=""
                  off-text="">
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="认证情况">
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="实名认证"></el-checkbox>
                  <el-checkbox label="实体店铺认证"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editorSave('form')">确 定</el-button>
        </div>
      </el-dialog>
      <!---->
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        labelPosition: 'left',
        value1:true,
        checkList:[],
        dialogFormVisible: false,
        form: {
          memberName:'',
          hostName:'',
          cardId:'',
          storeName:'',
          category:'',
          address:'',
          detailAddress:'',
          postId:'',
          telNo:'',
          validityDate:'',
          status:'',
        },
        rules: {
          memberName: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          hostName:[
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          storeName:[
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          category:[
            {required: true, message: '请输入活动名称', trigger: 'blur'},
          ],
          address:[
            {required: true, message: '请输入活动名称', trigger: 'blur'},
          ],
          status:[
            {required: true, message: '请输入活动名称', trigger: 'blur'},
          ]
        },
        formLabelWidth: '100px',
        formInline: {
          name: '',
          rank: '',
          status: '',
          rankOption: ['请选择', '默认等级', '蓝钻级', '黄钻级'],
          statusOption: ['请选择', '待审核', '正常', '违规关闭']
        },
        tableData3: [
          {
            storeName: '漫步云端',
            hostName: '董二千先生',
            address: '安徽省合肥市黄山路',
            category: '花草',
            rank: '黄钻级',
            validityDate: '2017-07-18',
            status: '待审核',
            recommend: '五颗星',
          },
          {
            storeName: '漫步云端',
            hostName: '董二千先生',
            address: '安徽省合肥市黄山路',
            category: '花草',
            rank: '默认等级',
            validityDate: '2017-07-18',
            status: '正常',
            recommend: '五颗星',
          },
          {
            storeName: '漫步云端',
            hostName: '董二千先生',
            address: '安徽省合肥市黄山路',
            category: '花草',
            rank: '蓝钻级',
            validityDate: '2017-07-18',
            status: '违规关闭',
            recommend: '五颗星',
          },
        ],
        multipleSelection: [],
        total: 1000,
        pageSize: 100,
      }
    },
    methods: {
      onSearch() {   //搜索
        console.log('submit!');
      },
      toggleSelection(rows) {  //全选
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) { //全选
        this.multipleSelection = val;
      },
      handleSizeChange(val) {       //条数改变
//          this.pageSize=val;
      },
      handleCurrentChange(val) {    //页数改变
//          this.pageId = val
      },
      handleEdit(index, row) { //编辑
        this.dialogFormVisible = true
        this.form = this.tableData3[index]  //先这么赋值，回改
      },
      editorSave(formName){
        dialogFormVisible = false
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>
<style scoped>
  .merchantManage {
    margin: 50px 20px 50px 20px;
    box-sizing: border-box;
    color: #333;
    width: 1440px;
  }

  .header {
    margin-bottom: 30px;
  }

  .headerLeft {
    float: left;
  }

  .headerLeft button {
    width: 90px;
  }

  .headerRight {
    float: right;
  }

  .footer > div {
    float: left;
  }

  .footer > div.page {
    margin-top: 4px;
  }
.storeTable{
  min-height: 600px;
}
  .dialogLeft{
    text-align: left;
  }

</style>
