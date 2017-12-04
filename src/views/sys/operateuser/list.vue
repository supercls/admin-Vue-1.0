<template>
	<div class="menu">
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<div class="userName">
			  <el-input placeholder="请输入内容" v-model="formInline.user" class="fillName">
			    <template slot="prepend">用户名：</template>
			  </el-input>
			</div>
			<div class="userName">
			  <el-input placeholder="请输入内容" v-model="formInline.region">
			    <template slot="prepend">手机号码：</template>
			  </el-input>
			</div>
			<div class="userName">
				<el-form-item>
				    <el-button type="primary" @click="onSubmit">查询</el-button>
				 </el-form-item>
			</div>
		</el-form>
		<el-button type="primary" class="add" @click="addUser">新增</el-button>
		<el-button type="primary" class="refresh" @click="refresh">刷新</el-button>
		<el-dialog title="新增" :visible.sync="dialogXinzengBox" size="small">
				  <el-form :model="addFrom" label-width="80px" :rules="addFormRules" ref="addFrom">
				  			<el-form-item label="用户名" prop="userRealName">
								<el-input v-model="addFrom.userRealName" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="手机号码" prop="userMobile">
								<el-input v-model="addFrom.userMobile" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="登录密码" prop="userMima">
								<el-input v-model="addFrom.userMima" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="确认密码" prop="userSureMima">
								<el-input v-model="addFrom.userSureMima" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="真实姓名" prop="userName">
								<el-input v-model="addFrom.userName" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="Email地址" prop="userEmail">
								<el-input v-model="addFrom.userEmail" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="账号状态">
								<el-select  placeholder="请选择" >
								    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="所属角色">
								<el-radio-group v-model="addFrom">
								</el-radio-group>
							</el-form-item>
					</el-form>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="dialogXinzeng (false)">取 消</el-button>
				    <el-button type="primary" @click="dialogXinzeng (true,addForm)">确 定</el-button>
				  </span>
		</el-dialog>
		<div class="el-table-div">
			<el-table :data="tableData" border style="width: 100%" height="250">
				<el-table-column  label="序号" width="70" >
					<template scope="scope">
						{{scope.$index+1}}
					</template>
				</el-table-column>
				<el-table-column prop="userName" label="用户名" min-width="200"> </el-table-column>
				<el-table-column prop="userRealName" label="姓名" min-width="200"> </el-table-column>
				<el-table-column prop="userMobile" label="手机号" min-width="200"> </el-table-column>
				<el-table-column prop="userEmail" label="邮箱" min-width="200"> </el-table-column>
				<el-table-column prop="userStatus" label="账号状态" min-width="200"> </el-table-column>
				<el-table-column prop="updateDate" label="创建时间" min-width="200"> </el-table-column>
				<el-table-column label="操作" min-width="200">
				<template scope="scope">
					<el-button size="small" @click="resetting(scope.$index, scope.row)">重置</el-button>
			        <el-button size="small" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
			        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)" >删除</el-button>
	      	    </template>
				</el-table-column>
			</el-table>
			<!--编辑-->
		  	<el-dialog title="编辑" :visible.sync="dialogVisible" size="small">
			    <el-form :model="EditorForm" label-width="80px" :rules="addFormRules" ref="EditorForm">
					<el-form-item label="用户名" prop="userName">
						<el-input v-model="EditorForm.userName" auto-complete="off" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="姓名" prop="userRealName">
						<el-input v-model="EditorForm.userRealName" auto-complete="off" ></el-input>
					</el-form-item>
					<el-form-item label="手机号" prop="userMobile">
						<el-input v-model="EditorForm.userMobile" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="Email地址">
						<el-input v-model="EditorForm.userEmail" ></el-input>
					</el-form-item>
					<el-form-item label="账号状态">
						<el-select v-model="EditorForm" placeholder="请选择" >
						    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="所属角色">

					</el-form-item>
				</el-form>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="dialogVisible=false">确 定</el-button>
			  </span>
			</el-dialog>
		</div>
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
	</div>
</template>
<script>
	import { isvalidUsername } from '@/utils/validate'
export default {
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        total:null,
        loading:true,
        tableData: [],
        dialogVisible:false,
        dialogXinzengBox : false,
		radio:'',
		addFormRules: {
			name: [
				{ required: true, message: '请输入姓名', trigger: 'blur' }
			]
		},
		EditorForm:{

		},
       	addFrom:{
			userRealName:'',
			userMobile:'',
			userEmail:'',
			userName:'',
			userMima:'',
			userSureMima:'',
			radioList : [],
		},
		listQuery:{
			pageSize:10,
			pageId:1
		},
        radio1:3,
		options: [{
          value: '01',
          label: '启用'
        }, {
          value: '02',
          label: '禁止'
        }],
        value:'',
      }
    },
    created() {
	    this.getPersonnelList();
	 },
    methods: {
        onSubmit() {//查询
	            var that = this;
	            that.service({
	           		url : '/sys/operateuser/listData',
	           		method:'post',
	           		data:{
	           			pageSize :10,
	           			pageId:1,
	           			menuNameSearch : that.formInline.user,
	           			userMobileSearch:that.formInline.region
	           		}
	            }).then(function(response){
	           		that.tableData = response.data.rows;
	            }).catch(function(data){
	           	console.log(data)
	            })
        },
        handleEdit:function(index,rows){//编辑数据
        	var that=this;
		    that.dialogVisible=true;
		    that.service({
		    	url:"/sys/operateuser/update",
		    	method:"post",
		    	data:{
		    		id:rows.id
		    	}
		    }).then(function(response){
		    	that.EditorForm = response.data
		    }).catch(function(data){

		    })
		},
		handleDelete(index, rows) {
	        this.tableData.splice(index,1) //删除数据
	    },
		dialogXinzeng :function( index,rows){//新增数据
			var that = this;
			if(index == false){
				that.dialogXinzengBox = false;
			}else{
				that.dialogXinzengBox = false;

			}
		},
		refresh : function(){//刷新数据
			this.getPersonnelList();
		},
		getPersonnelList (){//获取菜单数据
			var that = this;
	    	that.service({                     //不走store,直接写
				url: '/sys/operateuser/listData',
			 	method: 'post',
			 	data:this.listQuery
			 }).then(function(response){
			 	that.loading=false;
			 	that.tableData = response.data.rows;
			 	that.total=response.data.rowCount;
			 }).catch(function(data){
			 })
		},
		handleSizeChange(val) {  //条数改变
			this.listQuery.pageSize = val;
			this.getPersonnelList()
	    },
	    handleCurrentChange(val) {    //页数改变
	    	this.listQuery.pageId = val;
			this.getPersonnelList()
	    },
		resetting(index,rows){//重置密码
			var that = this;
		    that.$confirm('是否重置密码?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	        	that.service({
					url:"/sys/operateuser/resetPassword",
					method:"post",
					data:{
						id:rows.id
					}
				}).then(function(response){
					that.$message({
			            type: 'success',
			            message: '重置成功!',
			        });
				}).catch(function(data){
				})
	        }).catch(() => {
	          that.$message({
	            type: 'info',
	            message: '已取消'
	          });
	        });
		},
    	select(){
    	},
    	addUser(){
    		var that = this;
    		that.dialogXinzengBox = true;
    		that.service({
    			url:"/sys/operateuser/add",
    			method:"post"
    		}).then(function(response){
    			that.addFrom.radioList = response.data
    		}).catch(function(data){

    		})
    	},
    }
  }
</script>
<style>
	.fillName{
	    width: 200px;
	  }
	.menu{
		padding:20px;
	}
    .menu .userName{
		width:200px;
		float:left;
		margin-right:10px;
	}
    .menu .input_4{
		width:150px;
		float:left;
	}
    .menu .add{
		background:none;
		border:1px solid #ddd;
		position: absolute;
		left:200px;
		top:150px;
		color:#989898;
	}
    .menu .refresh{
		background:none;
		border:1px solid #ddd;
		position: absolute;
		right:20px;
		top:150px;
		color:#989898;
	}
    .menu .el-table-div{
		margin-top:130px;
	}
    .menu .el-table th>.cell{
		text-align: center;
	}
    .menu .el-table .cell{
		text-align: center;
	}
    .menu .block {
		padding:20px 0;
		border-bottom: 1px solid #ddd;
	}
    .menu .block .demonstration{
		font-weight: 100;
		color:#666;
		font-size: 14px;
	}
</style>