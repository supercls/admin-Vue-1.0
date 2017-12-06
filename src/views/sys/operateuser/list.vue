<template>
	<div class="menu-user">
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
			<div style="clear:both">
				
			</div>
		</el-form>
		
		<el-button type="primary" class="add" @click="addUser">新增</el-button>
		
		<el-button type="primary" class="refresh" @click="refresh">刷新</el-button>
		<!--新增-->
		<el-dialog title="新增" :visible.sync="dialogXinzengBox" size="small" class="edit">
				  <el-form :model="addFrom" label-width="80px" :rules="addFormRules" ref="addFrom">
				  			<el-form-item label="用户名" prop="roleName">
								<el-input v-model="addFrom.roleName" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="手机号码" prop="userMobile">
								<el-input v-model="addFrom.userMobile" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="登录密码" prop="pass">
								<el-input v-model="addFrom.pass" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="确认密码" prop="checkPass">
								<el-input v-model="addFrom.checkPass" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="真实姓名" prop="nameUser">
								<el-input v-model="addFrom.nameUser" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="Email地址" prop="userEmail">
								<el-input v-model="addFrom.userEmail" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="账号状态">
								<template>
								  <el-select v-model="value1" placeholder="请选择" @change="changeStutas1">
								    <el-option
								      v-for="item in options"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								  </el-select>
								</template>
							</el-form-item>
							<el-form-item label="所属角色">
								<el-checkbox-group v-model="radios" @change="changeRadio1">
									<span v-for="item in radioList"  ref="changeRadio1">
										<el-checkbox  :label="item.id">{{item.roleName}}</el-checkbox>
										
									</span>
								    
								</el-checkbox-group>
							</el-form-item>
					</el-form>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="dialogXinzengBox = false">取 消</el-button>
				    <el-button type="primary" @click="dialogEditor('addFrom')">确 定</el-button>
				  </span>
		</el-dialog>
		<!--主体部分-->
		<div class="el-table-div" style="margin-top:50px">
			<el-table :data="tableData" border width="100%" height="500">
				<el-table-column  label="序号" width="70" >
					<template scope="scope">
						{{scope.$index+1}}
					</template>
				</el-table-column>
				<el-table-column prop="userName" label="用户名" > </el-table-column>
				<el-table-column prop="userRealName" label="姓名" > </el-table-column>
				<el-table-column prop="userMobile" label="手机号" > </el-table-column>
				
				
				<el-table-column prop="userEmail" label="邮箱" min-width="150"> </el-table-column>
				<el-table-column prop="userStatus" label="账号状态"> </el-table-column>
				
				
				<el-table-column prop="updateDate" label="创建时间" > </el-table-column>
				<el-table-column label="操作" min-width="150">
				<template scope="scope">
					<el-button size="small" @click="resetting(scope.$index, scope.row)">重置</el-button>
			        <el-button size="small" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
			        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)" >删除</el-button>
	      	    </template>
	      	
				</el-table-column>
			</el-table>
			<!--编辑-->
		  	<el-dialog title="编辑" :visible.sync="dialogVisible" size="small" class="edit">
			    <el-form :model="EditorForm" label-width="80px"  ref="EditorForm">
					<el-form-item label="用户名" prop="name">
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
						<template>
						  <el-select v-model="value1" placeholder="请选择" @change="changeStutas">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
						</template>
					</el-form-item>
					<el-form-item label="所属角色">	
						<el-checkbox-group v-model="radioS1" @change="changeRadio">
							<span v-for="item in EditorForm.roleList"  ref="changeRadio">
								<el-checkbox :label="item.id" style="margin-right: 5px">{{item.roleName}}</el-checkbox>
							</span>
						</el-checkbox-group>
					</el-form-item>
				</el-form>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="sureAdd">确 定</el-button>
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
	//import { isvalidUserphone } from '@/utils/validate'
export default {
    data() {
    	const isvalidUserphone = (rule, value, callback) => {
			if (!(/^1[3|4|5|7|8][0-9]{9}$/).test(value)) {
				callback(new Error('请输入正确的手机号'))
			} else {
				callback()
			}
		}
		var validatePass = (rule, value, callback) => {
	        if (value === '' || !(/^[\x21-\x7E]{6,20}$/).test(value)) {
	          callback(new Error('请输入包括字母、数字、特殊字符的6-20密码'));
	        } else {
	          if (this.addFrom.checkPass !== '') {
	            this.$refs.addFrom.validateField('checkPass');
	          }
	          callback();
	        }
	    };
	     var validatePass2 = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请再次输入密码'));
	        } else if (value !== this.addFrom.pass) {
	          callback(new Error('两次输入密码不一致!'));
	        } else {
	          callback();
	        }
	    };
		var checkRole = (rule, value, callback) => {
	        if (!value) {
	          return callback(new Error('用户名不能为空'));
	        }else{
	        	callback();
	        }
	        
	    };
	    var nameUser = (rule,value,callback) =>{
	    	if(!(/^[\u4e00-\u9fa5]{0,}$/).test(value) || value === ''){
	    		return callback(new Error("姓名格式为汉字"))
	    	}else{
	    		callback()
	    	}
	    }
		var emailUser = (rule,value,callback)=>{
			if(!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ ).test(value)){
				return callback(new Error('请输入正确的邮箱！'))
			}else{
				callback();
			}
		}
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
		
		addFormRules: {
			userMobile: [
				{ validator: isvalidUserphone, trigger: 'blur' }
			],
			pass: [
	            { validator: validatePass, trigger: 'blur' }
	        ],
	        checkPass: [
	            { validator: validatePass2, trigger: 'blur' }
	        ],
			roleName :[
				{validator : checkRole,trigger :'blur'}
			],
			nameUser :[
				{ validator: nameUser , trigger: 'blur' }
			],
			userEmail : [
				{ validator: emailUser , trigger: 'blur' }
			]
			
		},
		 options: [{
          value: '02',
          label: '禁用'
        }, {
          value: '01',
          label: '开启'
        }],
        value1:"",
		radioS1:[],
		radios:[],
		EditorForm:{
		
		},
		radioList:[],
       	addFrom:{
			roleName:'',
			userMobile:'',
			userEmail:'',
			nameUser:'',
			pass:'',
			checkPass:'',
			//radioList:[]
		},
		listQuery:{
			pageSize:10,
			pageId:1
		},
        radio1:3,
		value:'',
		valueVal:'',
		valueStatus:"",
		id:"",
		list:'',
       }
      
    },
    created() {
	    this.getPersonnelList();
	 },
    methods: {
    	changeStutas(val){//状态选择
    		this.valueVal=val;
    	},
    	changeStutas1(val){
    		this.valueStatus = val;
    	},
    	changeRadio:function(event){//角色ID数转字符串

			var list = [];
			for(let i=0;i<event.length;i++){
				list.push(event[i])
			}
			this.list = list.join(',');
		},
    	changeRadio1:function(event){
    		var list = [];
			for(let i=0;i<event.length;i++){
				list.push(event[i])
			}
			this.list = list.join(',');
			
		},
        onSubmit() {//查询
           		var that = this;
	            that.service({
	           		url : '/sys/operateuser/listData',
	           		method:'post',
	           		data:{
	           			pageSize :10,
	           			pageId:1,
	           			userNameSearch : that.formInline.user,
	           			userMobileSearch:that.formInline.region
	           		}
	            }).then(function(response){
	            	that.tableData = response.data.rows;
	           	}).catch(function(data){
	           	
	            })
        },
        handleEdit:function(index,rows){//编辑数据
        	var that=this;
			that.EditorForm={};
		    that.dialogVisible=true;
		    that.service({
		    	url:"/sys/operateuser/update",
		    	method:"post",
		    	data:{
		    		id:rows.id
		    	}
		    }).then(function(response){
		    	that.EditorForm = response.data;
		    	var rediRED= response.data.roleList
		    	for(let i=0;i<rediRED.length;i++){
		    	    if(rediRED[i].isChecked){
						that.radioS1=that.radioS1.concat(rediRED[i].id.split(','))
		    	    }
		    	}
		    }).catch(function(data){

		    })
		},
		sureAdd(){//确认编辑
			var that = this;
			that.service({
				url:"/sys/operateuser/updateSave",
				method:"post",
				data:{
					checkedRole : that.list,
					id:that.EditorForm.id,
					userMobile:that.EditorForm.userMobile,
					userEmail:that.EditorForm.userEmail,
					userRealName:that.EditorForm.userRealName,
					userStatus:that.valueVal
				}
			}).then(function(response){
				that.$message({
		            type: 'success',
		            message: response.message
		        });
		        that.getPersonnelList()
				that.dialogVisible=false;
			}).catch(function(data){
				
			})
		},
		handleDelete(index, rows) { // 删除
			var that = this;
			that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	        	that.service({
				url:"/sys/operateuser/delete",
				method:"post",
				data:{
					id : rows.id
				}
				}).then(function(response){
					that.$message({
			            type: 'success',
			            message: response.message
			        });
			        that.getPersonnelList()
				})
	          
	        }).catch(() => {
	          that.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
	    },
		dialogEditor : function(formName){//新增数据
			var that = this;
			that.$refs[formName].validate((valid) => {
		          if (valid) {
		            that.service({
		            	url:"/sys/operateuser/addSave",
		            	method:"post",
		            	data:{
		            		checkedOperateRole:that.list,
		            		userName:that.addFrom.roleName,
		            		userPwd:that.addFrom.pass,
		            		userConfirmPwd:that.addFrom.checkPass,
		            		userMobile:that.addFrom.userMobile,
		            		userEmail:that.addFrom.userEmail,
		            		userRealName:that.addFrom.nameUser,
		            		userStatus:that.valueStatus
		            	}
		            }).then(function(response){
		            	that.$message({
							type:"success",
							message:response.message
						})
						that.getPersonnelList();
						that.dialogXinzengBox = false
						
		            }).catch(function(data){
		            })
		          } else {
		            return false;
		          }
			})
		},
		refresh : function(){//刷新数据
			this.getPersonnelList();
			this.$message("已刷新")
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
    	addUser(){
    		var that = this;
    		that.addFrom={}
            setTimeout(()=>{
                that.$refs['addFrom'].resetFields();
            },200)
    		that.dialogXinzengBox = true;
    		that.service({
    			url:"/sys/operateuser/add",
    			method:"post"
    		}).then(function(response){
    			console.log(response)

				that.radioList = response.data;
		   }).catch(function(data){
    			
    		})
    	},
    }
  }
</script>
<style>
    .menu-user .fillName{
	    width: 200px;
	  }
	.menu-user{
		padding:20px;
	}
    .menu-user .userName{
		width:200px;
		float:left;
		margin-right:10px;
	}
    .menu-user .add{
		background:none;
		border:1px solid #ddd;
		float:left;
		color:#989898;
	}
    .menu-user .refresh{
		background:none;
		border:1px solid #ddd;
		color:#989898;
		float:right;
	}

    .menu-user .el-table th>.cell{
		text-align: center;
	}
    .menu-user .el-table .cell{
		text-align: center;
	}
    .menu-user .block {
		padding:20px 0;
		border-bottom: 1px solid #ddd;
	}
    .menu-user .block .demonstration{
		font-weight: 100;
		color:#666;
		font-size: 14px;
	}
    .menu-user .edit .el-dialog--small{
		width:35%
	}	

  
</style>