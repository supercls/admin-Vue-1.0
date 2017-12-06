<template>
	<el-menu class="navbar" mode="horizontal">
		<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
		<levelbar></levelbar>
		<tabview></tabview>
		<span class="navbar-span">{{name}}</span>
		<el-dropdown class="avatar-container" trigger="click">
			<div class="avatar-wrapper">
				<img class="user-avatar" :src="userIcon">
				<i class="el-icon-caret-bottom"></i>
			</div>
			<el-dropdown-menu class="user-dropdown" slot="dropdown">
				<router-link class='inlineBlock' to="/">
					<el-dropdown-item>
						首页
					</el-dropdown-item>
				</router-link>
				<!--<router-link class='inlineBlock' to="/aloneDilog">-->
					<!--<el-dropdown-item>-->
						<!--修改账户-->
					<!--</el-dropdown-item>-->
				<!--</router-link>-->
				<el-dropdown-item >
					<span @click="diologButton1" style="display:block;">修改信息</span>
				</el-dropdown-item>
				<el-dropdown-item divided><span @click="logout" style="display:block;">安全退出</span></el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
		<!--diolog-->
		<el-dialog title="修改账户" size="tiny" :visible.sync="dilogVisible1" class="dilogVisible1">
			<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
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
				<el-form-item label="旧密码" prop="oldpass">
					<el-input type="password" v-model="ruleForm2.oldpass" auto-complete="off" placeholder="请输入旧密码"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pass">
					<el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入新密码"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请再次输入新密码"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dilogVisible1 = false">取 消</el-button>
				<el-button @click="resetForm('ruleForm2')">重置</el-button>
				<el-button type="primary" @click="submitForm('ruleForm2')">确 定</el-button>
			</div>
		</el-dialog>
	</el-menu>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Levelbar from './Levelbar'
	import tabview from './TabsView'
	import Hamburger from '@/components/Hamburger'

	export default {
		data(){
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				if (this.ruleForm2.checkPass !== '') {
					this.$refs.ruleForm2.validateField('checkPass');
				}
				callback();
			}
		};
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.ruleForm2.pass) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return {
			dilogVisible1:false,
			Uploadloading:false,  //头像上传loading
			imageUrl: '',
            Xtoken:{},
			netFileName:'',
			ruleForm2: {
				oldpass:'',
				pass: '',
				checkPass: '',
			},
			rules2: {
				oldpass: [
					{ validator: validatePass, trigger: 'blur' }
				],
				pass: [
					{ validator: validatePass, trigger: 'blur' }
				],
				checkPass: [
					{ validator: validatePass2, trigger: 'blur' }
				],
			}
		}
	},
	components: {
		Levelbar,
				Hamburger,
				tabview
	},
	computed: {
	...mapGetters([
			'sidebar',
			'avatar',
			'userIcon',
			'name',
			'token'
		])
	},
	methods: {
		toggleSideBar() {
			this.$store.dispatch('ToggleSideBar')
		},
		logout() {
			this.$store.dispatch('LogOut').then(() => {
				location.reload()  // 为了重新实例化vue-router对象 避免bug
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
		submitForm(formName) {                 //修改信息提交
			this.$refs[formName].validate((valid) => {
				if (valid) {
				    this.service({
				        url:'/changePwdSave',
				        method:'post',
				        data:{
				            oldPwd:this.ruleForm2.oldpass,
                            newPwd:this.ruleForm2.pass,
							netFileName:this.netFileName
                        }
				    }).then(response=>{
				        console.log(response)
				    }).catch(data=>{
				        console.log(data)
				    })
					this.dilogVisible1=false;
					this.$message({
						message:'修改成功',
						type:'success'
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {         //重置按钮
			this.$refs[formName].resetFields();
		},
		diologButton1:function(){     //修改弹窗
			this.dilogVisible1=true;
			setTimeout(()=>{          //延迟一秒执行，防止报错
				this.$refs['ruleForm2'].resetFields();
			},300)
		},
	},
	mounted:function(){
		var userIcon=this.$store.state.user.userIcon;
		this.imageUrl=userIcon
        this.Xtoken={'X-Token':this.token};
	}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.User-form-data{
		max-width: 500px;
		margin: 80px  auto;
		text-align: center
	}
	.Nav-avatar-uploader{
		text-align: center
	}
	.el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 50%;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.Nav-avatar-uploader .el-upload:hover {
		border-color: #20a0ff;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
	}
	.avatar {
		width: 100px;
		height: 100px;
		border: 1px dashed #d9d9d9;
		border-radius: 50%;
		display: block;
	}
	.navbar {
		height: 50px;
		line-height: 50px;
		border-radius: 0px !important;
	.hamburger-container {
		line-height: 58px;
		height: 50px;
		float: left;
		padding: 0 10px;
	}
	.errLog-container {
		display: inline-block;
		position: absolute;
		right: 150px;
	}
	.screenfull {
		position: absolute;
		right: 90px;
		top: 16px;
		color: red;
	}
	.avatar-container {
		height: 50px;
		display: inline-block;
		position: absolute;
		right: 35px;
	.avatar-wrapper {
		cursor: pointer;
		margin-top: 5px;
		position: relative;
	.user-avatar {
		width: 40px;
		height: 40px;
		border-radius: 10px;
	}
	.el-icon-caret-bottom {
		position: absolute;
		right: -20px;
		top: 25px;
		font-size: 12px;
	}
	}
	}
	}
	.navbar-span{
		float: right;
		margin-right: 88px;
		color: #228DFF;
		display: inline-block;
		-webkit-transition: all 0.5s;
		-moz-transition: all 0.5s;
		transition: all 0.5s;
	}
	.navbar-span:hover{

	}

</style>

