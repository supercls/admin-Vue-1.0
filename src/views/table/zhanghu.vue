<template>
  <div class="el-table-div">
    <div class="group-Search-div">
      <el-input placeholder="请输入内容" v-model="inputSerch">
        <el-select v-model="select" slot="prepend" placeholder="商品名称">
          <el-option label="条形码" value="1"></el-option>
          <el-option label="品牌" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="search" @click="searchButton"></el-button>
      </el-input>
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
              prop="id"
              label="ID"
              width="60">
      </el-table-column>
      <el-table-column
              prop="date"
              label="日期"
              width="180">
      </el-table-column>
      <el-table-column
              prop="name"
              label="姓名"
              width="180">
      </el-table-column>
      <el-table-column
              prop="sex"
              label="性别"
              width="100">
      </el-table-column>
      <el-table-column
              prop="address"
              label="地址">
      </el-table-column>
      <el-table-column label="操作">
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
    <!--分页-->
    <div class="block page-div">
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              current-page.sync="listQuery.page"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="listQuery.limit"
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
        <el-form-item label="年龄">
          <el-input-number v-model="EditorForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="EditorForm.date"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="EditorForm.address"></el-input>
        </el-form-item>
      </el-form>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			  </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
    return {
      inputSerch:'',
      select:'',
      total:null,
      loading:true,
      currentPage:5,
      tableData:[],
      dialogVisible:false,
      listQuery: {
        page: 1,
        limit: 10, //每页条数
      },
      addFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      EditorForm:{
        date:'',
        name:'',
        sex:'',
        age:'',
        address:''
      }
    }
  },
  created() {
    this.getList()
  },
  methods:{
    handleEdit:function(index,rows){  //编辑
      this.dialogVisible=true;
      this.EditorForm={
        date:rows.date,
        name:rows.name,
        sex:rows.sex,
        age:rows.age,
        address:rows.address
      }
    },
    handleDelete(index, rows) {
      this.tableData.splice(index,1) //删除数据
    },
    selectOne:function(selection,row){ //单选
      console.log(row)
    },
    selectAll:function(selection){  //全选
      console.log(selection)
    },
    searchButton:function(){

    },
    handleSizeChange(val) {       //条数改变
      this.listQuery.limit=val;
      this.getList()
    },
    handleCurrentChange(val) {    //页数改变
      this.listQuery.page = val
      this.getList()
    },
    getList:function(){     //获取列表
      var that=this;
      that.service({
        url:'/tablelist',
        data:that.listQuery,
        method:'post',
      }).then(function (response) {
        that.tableData=response.data;
        that.total=response.total;
        that.loading=false
      }).catch(function (data) {
        console.log(data)
      })
    }
  },
  mounted:function(){

  }
  }

</script>
<style>
  .el-table-div{
    margin: 20px;
  }
  .group-Search-div{
    max-width:400px;
    margin:20px 0px;
  }
  .group-Search-div .el-input{
    min-width: 120px;
  }
  .page-div{
    margin: 20px auto;
  }
</style>