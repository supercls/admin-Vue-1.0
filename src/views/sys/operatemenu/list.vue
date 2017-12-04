<!--菜单管理-->
<template>
	<div class="menu">
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<div class="userName">
			  <el-input placeholder="请输入内容" v-model="formInline.user"  class="fillName">
			    <template slot="prepend">菜单名称：</template>
			  </el-input>
			</div>
			
			<div class="userName">
				<el-form-item>
				    <el-button type="primary" @click="onSubmit">查询</el-button>
				 </el-form-item>
			</div>
		</el-form>
		
		<el-button type="primary" class="add" @click="EnterInfo">新增</el-button>
		
		<el-button type="primary" class="refresh" @click="refresh()">刷新</el-button>
		<!--新增-->
		<el-dialog title="新增" :visible.sync="dialogXinzengBox" size="small" class="addNews">
				  <el-form :model="EditorForm" label-width="80px" ref="EditorForm">
				  		
						<el-form-item label="菜单名称" prop="name">
							<el-input v-model="indexFrom.name" auto-complete="off" style="width:300px"></el-input>
						</el-form-item>
						<el-form-item label="菜单级别" prop="menuGrade" >
							<!--<el-input v-model="EditorForm.menuLevel" auto-complete="off"></el-input>-->
							<el-input v-model="indexFrom.menuGrade" auto-complete="off" style="width:300px" :disabled="true"></el-input>
						</el-form-item>
						
						<el-form-item label="菜单链接">
							<el-input v-model="indexFrom.menuUrl" auto-complete="off" style="width:300px"></el-input>
						</el-form-item>
						
					</el-form>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="dialogXinzeng (false)">取 消</el-button>
				    <el-button type="primary" @click="dialogXinzeng (true)">确 定</el-button>
				  </span>
		</el-dialog>
		<!--主部分-->
		<div class="el-table-div eldiv">
			<el-table :data="tableData" border style="width: 100%" height="400">
				<el-table-column  label="序号" width="70"  stripe>
					<template scope="scope">
						{{scope.$index+1}}
					</template>
				</el-table-column>
				<el-table-column prop="name" label="菜单名称"> </el-table-column>
				<el-table-column prop="menuGrade" label="菜单级别" > </el-table-column>	
				<el-table-column prop="path" label="菜单级别" > </el-table-column>	
				<el-table-column prop="updateDate" label="创建时间" > </el-table-column>
				<el-table-column label="操作">
				<template scope="scope">
					<el-button size="small" @click="second(scope.row)">设置</el-button>
			        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)" >删除</el-button>
	      	    </template>
	      	
				</el-table-column>
			</el-table>
			<!--编辑-->
		  	<el-dialog title="编辑" :visible.sync="dialogGengxinBox" size="small" class="edit">
				  <el-form :model="EditorForm" label-width="80px"  ref="EditorForm">
				  		
						<el-form-item label="菜单名称" prop="menu">
							<el-input v-model="EditorForm.menu" auto-complete="off" style="width:300px"></el-input>
						</el-form-item>
						<el-form-item label="菜单级别" prop="menuLevel">
							<el-input v-model="EditorForm.menuLevel" auto-complete="off" style="width:300px" :disabled = "true"></el-input>
						</el-form-item>
						<el-form-item label="菜单图标">
							<el-input v-model="EditorForm.icon" auto-complete="off" style="width:300px" placeholder="非必填"></el-input>
						</el-form-item>
						<el-form-item label="菜单链接">
							<el-input v-model="EditorForm.path" auto-complete="off" style="width:300px" placeholder="非必填"></el-input>
						</el-form-item>
						
					</el-form>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="dialogGengxin (false)">取 消</el-button>
				    <el-button type="primary" @click="dialogGengxin (true)">确 定</el-button>
				  </span>
			</el-dialog>
			<!--二级菜单编辑-->
			<el-dialog title="编辑" :visible.sync="dialogSecondGengxinBox" size="small"  class="dialog_width_25">
				  <el-form :model="EditorForm" label-width="80px"  ref="EditorForm">
				  		
						<el-form-item label="菜单名称" prop="menu">
							<el-input v-model="EditorForm.menu" auto-complete="off" style="width:300px"></el-input>
						</el-form-item>
						<el-form-item label="菜单级别" prop="menuLevel">
							<el-input v-model="EditorForm.menuLevel" auto-complete="off" style="width:300px" :disabled = "true"></el-input>
						</el-form-item>
						<el-form-item label="菜单图标">
							<el-input v-model="EditorForm.icon" auto-complete="off" style="width:300px" placeholder="非必填"></el-input>
						</el-form-item>
						<el-form-item label="菜单链接">
							<el-input v-model="EditorForm.path" auto-complete="off" style="width:300px"></el-input>
						</el-form-item>
						
					</el-form>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="dialogSecondGengxin (false)">取 消</el-button>
				    <el-button type="primary" @click="dialogSecondGengxin (true)">确 定</el-button>
				  </span>
			</el-dialog>
		</div>
		<!--主部分分页-->
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
		 <el-dialog title="【菜单管理】二级菜单" :visible.sync="dialogSecond" size="small">
					 <el-button style="margin-bottom:20px;float:float" @click="addUpdata">新增</el-button>
				    <el-button style="margin-bottom:20px;float:right" @click="refreshSecond">刷新</el-button>
				
				<el-table
			    :data="tableDataData"
			    border
			    style="width: 100%"
			    height="250"
			    >
			    <el-table-column
			      
			      label="序号"
			      width="65">
			     	 <template scope="scope">
						{{scope.$index+1}}
					</template>
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="菜单名称"
			      min-width="200"
			     >
			    </el-table-column>
			    <el-table-column
			      prop="menuGrade"
			      label="菜单级别"
			    min-width="200"
			     >
			    </el-table-column>
			    <el-table-column
			      prop="path"
			      label="菜单链接"
			      min-width="200"
			     >
			    </el-table-column>
			    <el-table-column
			      prop="updateDate"
			      label="创建时间"
			      min-width="200"
			      >
			    </el-table-column>
			    
			    <el-table-column
			     label="操作"
			     min-width="200"
			     >
			      <template scope="scope">
			       		<el-button size="small" @click="checkPermission(scope.row)" >查看</el-button>
				        <el-button size="small" @click="handleEditSecond(scope.$index, scope.row)">编辑</el-button>
				        <el-button size="small" type="danger" @click="handleDeleteData(scope.$index, scope.row)" >删除</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
				<!--分页-->
				<div class="block page-div">
			      <el-pagination
			              @size-change="SizeChange"
			              @current-change="CurrentChange"
			              current-page.sync="listQuery.pageId"
			              :page-sizes="[10, 20, 30, 40]"
			              :page-size="listQuery.pageSize"
			              layout="total, sizes, prev, pager, next, jumper"
			              :total="total1">
			      </el-pagination>
			    </div>
		</el-dialog>
		<!--查看按钮权限-->
		<el-dialog title="按钮列表" :visible.sync="dialogBtn" size="small">
			<el-button style="margin-bottom:20px;" @click="addSecond">新增</el-button>
			<el-table :data="tableDataBtn" border style="width: 100%" height="250">
				<el-table-column  label="序号" width="70" stripe> 
					<template scope="scope">
						{{scope.$index+1}}
					</template>
				</el-table-column>
				<el-table-column prop="btnName" label="按钮名称" min-width="160"> </el-table-column>
				<el-table-column prop="btnPermissions" label="按钮权限" min-width="150"> </el-table-column>	
				<el-table-column prop="updateDate" label="创建时间" min-width="150"> </el-table-column>
				<el-table-column label="操作" min-width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEditUpdata(scope.$index, scope.row)">编辑</el-button>
			        <el-button size="small" type="danger" @click="pressionDelect(scope.$index, scope.row)" >删除</el-button>
	      	    </template>
	      	
				</el-table-column>
			</el-table> 
			<div class="block page-div">
		      <el-pagination
		              @size-change="SizeChangeBtn"
		              @current-change="CurrentChangeBtn"
		              current-page.sync="listQuery.pageId"
		              :page-sizes="[10, 20, 30, 40]"
		              :page-size="listQuery.pageSize"
		              layout="total, sizes, prev, pager, next, jumper"
		              :total="total2">
		      </el-pagination>
		    </div>
		</el-dialog>
		<!--按钮列表编辑-->
		<el-dialog title="更新按钮" :visible.sync="dialogBtnUpdata" size="small" class="EditBtn">
			<el-form :model="UpdataForm" label-width="80px" ref="UpdataForm">
				<el-form-item label="按钮名称" prop="menu">
					<el-input v-model="UpdataForm.menu" auto-complete="off" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="按钮权限" prop="menuLevel">
					<el-input v-model="UpdataForm.menuLevel" auto-complete="off" style="width:300px"></el-input>
				</el-form-item>
				
						
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="BtnUpdata (false)">取 消</el-button>
			<el-button type="primary" @click="BtnUpdata (true)">确 定</el-button>
			</span>
			 
		</el-dialog>
		<!--二级菜单新增-->
		<el-dialog title="新增" :visible.sync="dialogMenuUpdata" size="small" class="addMenuNew">
			<el-form :model="menuFrom" label-width="80px" ref="menuFrom">
		  		
				<el-form-item label="菜单名称" prop="name">
					<el-input v-model="menuFrom.name" auto-complete="off" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="菜单级别" prop="menuGrade" >
					<!--<el-input v-model="EditorForm.menuLevel" auto-complete="off"></el-input>-->
					<el-input v-model="menuFrom.menuGrade" auto-complete="off" style="width:300px" :disabled="true"></el-input>
				</el-form-item>
				
				<el-form-item label="菜单链接">
					<el-input v-model="menuFrom.menuUrl" auto-complete="off" style="width:300px"></el-input>
				</el-form-item>
				
			</el-form>
		    <span slot="footer" class="dialog-footer">
		       <el-button @click="dialogmenuXinzeng (false)">取 消</el-button>
		       <el-button type="primary" @click="dialogmenuXinzeng (true)">确 定</el-button>
		    </span>
			 
		</el-dialog>
		<!--按钮列表新增-->
		<el-dialog title="新增" :visible.sync="dialogBtnUpdata1" size="small" class="addBtnNew">
			<el-form :model="btnFrom" label-width="80px" ref="btnFrom">
		  		
				<el-form-item label="按钮名称" prop="name">
					<el-input v-model="btnFrom.name" auto-complete="off" style="width:300px"></el-input>
				</el-form-item>
				
				<el-form-item label="菜单权限">
					<el-input v-model="btnFrom.btnPermissions" auto-complete="off" style="width:300px"></el-input>
				</el-form-item>
				
			</el-form>
		    <span slot="footer" class="dialog-footer">
		       <el-button @click="dialogBtnXinzeng (false)">取 消</el-button>
		       <el-button type="primary" @click="dialogBtnXinzeng (true)">确 定</el-button>
		    </span>
			 
		</el-dialog>
	</div>
</template>
<script>
export default {
    data() {
      return {
      	
        formInline: {
          user: '',
          region: '',
          select:''
        },
        tableData: [],
        total:null,
        total1 : null,
        total2:null,
        loading:true,
        tableDataData:[],
        tableDataBtn:[],
        dialogVisible:false,
        dialogXinzengBox : false,
		dialogGengxinBox:false,
		dialogSecond : false,
		currentPage3 : 1,
		dialogAdd :false,
		dialogBtn:false,
		dialogBtnUpdata:false,
		dialogMenuUpdata:false,
		dialogBtnUpdata1:false,
		showCancelButton:false,
		dialogSecondGengxinBox:false,
		listQuery:{
			pageId:1,
			pageSize:10,
			parentId:'',
			menuId:''
		},
		addFormRules: {
			name: [
				{ required: true, message: '请输入菜单名称', trigger: 'blur' }
			]
		},
		EditorForm:{
		 
          date: '',
          menu :"",
          menuLevel :""

		},
        indexFrom:{
       	 
          menuUrl: '',
          name :"",
          menuGrade :"一级菜单"
       },
        menuFrom:{
       	 
          menuUrl: '',
          name :"",
          menuGrade :"二级菜单"
       },
        options2: [{
          value: '选项1',
          label: '一级菜单'
        }, {
          value: '选项2',
          label: '二级菜单'
          
        }],
        value2: '',
        freshArray :[],
        addFrom : [],
        id:'',
        UpdataForm:{
			menu:"",
			menuLevel:""
		},
		parseId:'',
		btnFrom:{
			btnPermissions: '',
            name :""
		},
		addId:""
      }
    },
    created() {
	    this.getMenuList();
	 },
    methods: {
        onSubmit() { //查询
	            var that = this;
	            that.service({
	           		url : '/sys/operatemenu/listData',
	           		method:'post',
	           		data:{
	           			pageSize :10,
	           			pageId:1,
	           			menuNameSearch : that.formInline.user
	           		}
	            }).then(function(response){
				 	that.tableDataData = response.data.rows;
	            }).catch(function(data){
	           	console.log(data)
	            })
        },
        handleEdit:function(index,rows){//一级菜单更新数据        	
		    this.dialogGengxinBox=true;		    
		    this.EditorForm={
				date:rows.updateDate,
				menu:rows.name,
				menuLevel:"一级菜单",
				path:rows.path
			}
		    this.addId=rows.id;
		    var that = this;
		    that.service({
		    	url:"/sys/operatemenu/update",
		    	method:"post",
		    	data:{
		    		id:rows.id
		    	}
		    }).then(function(response){
		    }).catch(function(data){
		    	
		    })
		},
		handleDelete(index, rows) {   //删除数据
			console.log(rows.id)
	       var that = this;
	        that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	           that.service({
			   		url:"/sys/operatemenu/delete",
			   		method:'post',
			   		data:{
			   			id:rows.id
			   		}
			   	}).then(function(response){
			   		that.tableData.splice(index,1) ;
			   	}).catch(function(data){
			   	})
	           that.$message({
	            type: 'success',
	            message: '删除成功'
	          }); 
	          that.getMenuList();
	        }).catch(() => {
	          that.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
	    },
		handleEditSecond:function(index,rows){    //编辑二级菜单数据
		    this.dialogSecondGengxinBox=true;
		    this.addId = rows.id,
		    this.EditorForm={
				date:rows.updateDate,
				menu:rows.name,
				menuLevel:"二级菜单",
				path:rows.path
			}
		    this.service({
		    	url:"/sys/operatemenu/update",
		    	method:"post",
		    	data:{
		    		id:rows.id
		    	}
		    }).then(function(response){
		    }).catch(function(data){
		    })
		},
		dialogSecondGengxin:function(index){//确定编辑二级菜单
			if(index == false){
				this.dialogSecondGengxinBox = false;
			}else{
				this.dialogSecondGengxinBox = false;
				var that = this;
				that.service({
					url:"/sys/operatemenu/updateSave",
					method:"post",
					data:{
						id:that.addId,
						name : that.EditorForm.menu,
						path: that.EditorForm.path
					}
				}).then(function(response){
					that.getErjiMenuList();
					that.$message("修改成功")
				}).catch(function(data){
					
				})
			}
		},
		handleDeleteData(index, rows) {
	        //this.tableDataData.splice(index,1)     //删除数据
	        //this.delecMenu(rows.id)
	        var that = this;
	        that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	           that.service({
			   		url:"/sys/operatemenu/delete",
			   		method:'post',
			   		data:{
			   			id:rows.id
			   		}
			   	}).then(function(response){
			   		that.tableDataData.splice(index,1) ;
			   	}).catch(function(data){
			   		console.log("noDelect")
			   	})
	           that.$message({
	            type: 'success',
	            message: '删除成功'
	          }); 
	          that.getErjiMenuList();
	        }).catch(() => {
	          that.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
	    },
		dialogXinzeng :function( index){//新增数据
			var that = this;
			if(index == false){
				that.dialogXinzengBox = false;
			}else{
				that.dialogXinzengBox = false;
				that.service({
					url:"/sys/operatemenu/addSave",
					method:"post",
					data:{
						name : that.indexFrom.name,
						path : that.indexFrom.menuUrl
						
					}
				}).then(function(response){
					that.$message("添加成功")
					that.getMenuList();
				}).catch(function(data){
				})
			}
		},
		EnterInfo(){//进入新增页面
			this.dialogXinzengBox = true;
			var _self = this;
			_self.service({
				url:"/sys/operatemenu/add",
				method:"post",
				
			}).then(function(response){
			}).catch(function(data){
				console.log(data)
			});
			
		},
		
		refresh : function(){//刷新数据
			this.getMenuList()
		},
		
		dialogGengxin : function(index){//一级菜单编辑数据
			if(index == false){
				this.dialogGengxinBox = false
			}else{
				console.log(this.addId)
				this.dialogGengxinBox = false;
				var that = this;
				that.service({
					url:"/sys/operatemenu/updateSave",
					method:"post",
					data:{
						id:that.addId,
						name : that.EditorForm.menu,
						path: that.EditorForm.path
					}
				}).then(function(response){
					that.getMenuList();
					that.$message("修改成功")
				}).catch(function(data){
				})
			}
		},
		second : function(index){ //进入二级菜单
			this.id = index.id;
			this.listQuery.parentId = index.id
			this.dialogSecond = true;
			var that = this;
	    	that.service({                     //不走store,直接写
				url: '/sys/operatemenu/listChildrenData',
			 	method: 'post',
			 	data:that.listQuery
			 }).then(function(response){
			 	that.tableDataData = response.data.rows;
			 	that.total1 = response.data.rowCount;
			 }).catch(function(data){
			 	console.log(data)
			 })
		},
		handleSizeChange(val) { //条数改变
			this.listQuery.pageSize = val;
			this.getMenuList()
	    },
	    handleCurrentChange(val) {    //页数改变
	      this.listQuery.pageId = val;
		  this.getMenuList()
	    },
	    SizeChange(val){
	    	this.listQuery.pageSize = val
	    	this.getErjiMenuList();
	    },
	    CurrentChange(val){
	    	this.listQuery.pageId = val
	    	this.getErjiMenuList();
	    },
	    getMenuList(){//菜单列表
	    	var that = this;
	    	that.service({                     //不走store,直接写
				url: '/sys/operatemenu/listData',
			 	method: 'post',
			 	data:that.listQuery
			 }).then(function(response){
			 	that.loading = false;
			 	that.tableData = response.data.rows;
			 	that.total = response.data.rowCount;
			 }).catch(function(data){
			 	console.log(data)
			 })
	   },
	   	getErjiMenuList(){//获取二级菜单数据
	   		var that = this;
	    	that.service({                     //不走store,直接写
				url: '/sys/operatemenu/listChildrenData',
			 	method: 'post',
			 	data:that.listQuery
			 	
			 }).then(function(response){
			 	that.tableDataData = response.data.rows;
			 }).catch(function(data){
			 	console.log(data)
			 })
	   },
	   	checkPermission :function(rows){//查看权限列表
	   		console.log(rows);
	   		var that = this;
	   		that.listQuery.menuId = rows.id
	   		that.dialogBtn = true;
	    	that.service({                     //不走store,直接写
				url: '/sys/operatemenubtn/listData',
			 	method: 'post',
			 	data :that.listQuery
			 }).then(function(response){
			 	that.loading = false;
			 	that.tableDataBtn = response.data.rows;
			 	that.total2 = response.data.rowCount;
			 }).catch(function(data){
			 })
	   },
	  	refreshSecond : function(){//二级刷新
	   		var that = this;
	    	that.service({                     //不走store,直接写
				url: '/sys/operatemenu/listChildrenData',
			 	method: 'post',
			 	data:{
			 		pageSize:2,
					pageId:1,   
					parentId:that.id
			 	}
			 }).then(function(response){
			 	console.log(response.data)
			 	that.tableDataData = response.data.rows;
			 }).catch(function(data){
			 	console.log(data)
			 })
	   },
	    pressionDelect(index,rows){//查看权限删除
			var that = this;
	        that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	           that.service({
			   		url:"/sys/operatemenubtn/delete",
			   		method:'post',
			   		data:{
			   			id:rows.id,
			   		}
			   	}).then(function(response){
				   	that.$message({
			            type: 'success',
			            message: '删除成功'
			        });
		          	that.tableDataBtn.splice(index,1);
		         	 that.service({                     //不走store,直接写
						url: '/sys/operatemenubtn/listData',
					 	method: 'post',
					 	data :{
					 		pageSize:10,
					 		pageId :1,
					 		menuId :that.parseId
					 	} 
					 }).then(function(response){
					 	that.loading = false;
					 	that.tableDataBtn = response.data.rows
					 }).catch(function(data){
					 })
		          
			   	}).catch(function(data){
			   		console.log("noDelect")
			   	})
	        }).catch(() => {
	          that.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
	    },
    	addSecond (){//添加按钮列表
    		var that = this;
    		that.dialogBtnUpdata1=true;
    		that.service({
    			url:'/sys/operatemenubtn/add',
    			method:"post",
    			data:{
    				menuId:that.parseId
    			}
    		}).then(function(response){
    			console.log(response)
    		}).catch(function(){
    			console.log(that.parseId)
    		})
    		
    	},
    	dialogBtnXinzeng(Boolean){
    		if(Boolean==false){
    			this.dialogBtnUpdata1 = false
    		}else{
    			var that = this;
    			that.dialogBtnUpdata1 = false;
    			that.service({
	    			url:'/sys/operatemenubtn/addSave',
	    			method:"post",
	    			data:{
	    				menuId:that.parseId,
	    				btnName:that.btnFrom.name,
	    				btnPermissions : that.btnFrom.btnPermissions
	    			}
	    		}).then(function(response){
	    			that.$message("添加成功")
	    		}).catch(function(){
	    		})
    		}
    	},
    	handleEditUpdata(index,rows){//查看按钮列表更新
    		this.dialogBtnUpdata = true;
    		console.log(rows)
    		this.id=rows.id;
    		this.UpdataForm = {
    			menu:rows.btnName,
    			menuLevel:rows.btnPermissions
    		}
    		var that = this;
    		that.service({
    			url:"/sys/operatemenubtn/update",
    			method:"post",
    			data:{
    				id:rows.id
    			}
    		}).then(function(response){
    		}).catch(function(data){
    			console.log(data)
    		})
    	},
    	BtnUpdata(Boolean){//确定按钮更新
    		if(Boolean == false){
    			this.dialogBtnUpdata = false;
    		}else{
    			var that = this;
    			that.dialogBtnUpdata = false;
    			that.service({
    				url:"/sys/operatemenubtn/updateSave",
    				method:"post",
    				data:{
    					id:that.id,
    					btnName:that.UpdataForm.menu,
    					btnPermissions:that.UpdataForm.menuLevel
    				}
    			}).then(function(response){
    				that.$message("修改成功")
    				that.service({                     //不走store,直接写
						url: '/sys/operatemenubtn/listData',
					 	method: 'post',
					 	data :that.listQuery
					 }).then(function(response){
					 	that.loading = false;
					 	that.tableDataBtn = response.data.rows
					 }).catch(function(data){
					 })
    			}).catch(function(data){
    				console.log(data)
    			})
    		}
    	},
    	addUpdata(){//二级菜单新增
    		this.dialogMenuUpdata = true;
    		var _self = this;
			_self.service({
				url:"/sys/operatemenu/add",
				method:"post",
				data:{
					parentId:this.id
				}
			}).then(function(response){
			}).catch(function(data){
				console.log(data)
			});
    	},
    	dialogmenuXinzeng(Boolean){
    		var that=this;
    		if(Boolean==false){
    			that.dialogMenuUpdata = false;
    		}else{
    			that.dialogMenuUpdata = false;
    			that.service({
					url:"/sys/operatemenu/addSave",
					method:"post",
					data:{
						name : that.menuFrom.name,
						path : that.menuFrom.menuUrl,
						parentId : that.id
					}
				}).then(function(response){
					that.getErjiMenuList(that.id)	
					that.$message("添加成功")
				}).catch(function(data){
					console.log(data)
				})
    		}
    	},
    	SizeChangeBtn(val){//按钮条数改变
    		this.listQuery.pageSize = val;
    		var that = this;
    		that.service({                     //不走store,直接写
				url: '/sys/operatemenubtn/listData',
			 	method: 'post',
			 	data :that.listQuery
			 }).then(function(response){
			 	that.loading = false;
			 	that.tableDataBtn = response.data.rows
			 }).catch(function(data){
			 	//console.log(data)
			 })
    	},
    	CurrentChangeBtn(val){//按钮页数改变
    		this.listQuery.pageId = val
    		var that = this;
    		that.service({                     //不走store,直接写
				url: '/sys/operatemenubtn/listData',
			 	method: 'post',
			 	data :that.listQuery
			 }).then(function(response){
			 	that.loading = false;
			 	that.tableDataBtn = response.data.rows
			 }).catch(function(data){
			 })
    	}
    }
  }
</script>
<style>
	.fillName {
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
	.menu .eldiv{
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
	.menu .dialog_width_25 .el-dialog--small, .edit .el-dialog--small, .addNews .el-dialog--small, .EditBtn .el-dialog--small, .addBtnNew .el-dialog--small, .addMenuNew .el-dialog--small{
		width:33%
	}
</style>