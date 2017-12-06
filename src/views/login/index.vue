<template>
	<div class="login-container" id="particles">
		<el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
			class="card-box login-form">
			<h3 class="title">后台管理系统</h3>
			<el-form-item prop="username">
				<span class="svg-container svg-container_login">
					<icon-svg icon-class="yonghuming" />
				</span>
				<el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
			</el-form-item>
			<el-form-item prop="password">
				<span class="svg-container">
					<icon-svg icon-class="mima"></icon-svg>
				</span>
				<el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
					placeholder="password"></el-input>
			</el-form-item>
			<el-form-item>
                <div id="mpanel"></div> <!--验证插件-->
			</el-form-item>
			<el-form-item>
				<el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
					登录
				</el-button>
			</el-form-item>

		</el-form>
	</div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import { setToken } from '@/utils/auth'
import '@/assets/js/verify.js'
import '@/assets/css/verify.css'
export default {
	name: 'login',
	data() {
		const validateUsername = (rule, value, callback) => {
			if (!isvalidUsername(value)) {
				callback(new Error('请输入正确的用户名'))
			} else {
				callback()
			}
		}
		const validatePass = (rule, value, callback) => {
			if (value.length < 5) {
				callback(new Error('密码不能小于5位'))
			} else {
				callback()
			}
		}
		return {
			loginForm: {
				username: 'admin',
				password: '111111'
			},
			loginRules: {
				username: [{ required: true, trigger: 'blur', validator: validateUsername }],
				password: [{ required: true, trigger: 'blur', validator: validatePass }]
			},
			loading: false,
            slideVerify:false //滑动验证判断
		}
	}, 
	methods: {
		handleLogin() {
			var that=this
			that.$refs.loginForm.validate(valid => {
			    if(!that.slideVerify){
			        that.$message({
			            message:'请移动滑块验证',
			            type:'error'
			        })
			        return false
			    }
				if (valid) {
					that.loading = true
                    that.$store.dispatch('Login', that.loginForm).then(() => {  //相应action LOgin的函数执行
                        that.loading = false
                        that.$router.push({ path: '/' })
                        that.$message({
					  		message:'登录成功'
					  	})
					}).catch(() => {
					    that.loading = false
					})
				} else {
                    that.$message.error('提交失败')
					return false
				}
			})
		}
	},
	mounted:function(){
	    var that=this;
		$(document).ready(function() {
			$('#particles').particleground({
				dotColor: '#58677b',
				lineColor: '#58677b'
			});
		});
		$('#mpanel').slideVerify({
			type : 1,		//类型
			vOffset :1,	   //误差量，根据需求自行调整
			barSize : {
				width : '100%',
				height : '40px',
			},
			success : function() {
				that.slideVerify=true;
			},
			error : function() {
				that.slideVerify=false;
				that.$message({
					message:'妹子，玩呢？手不要抖啊',
					type:'error'
				})
			}

		});
	}
}
</script>

<style rel="stylesheet/scss" lang="scss">
	@import "src/styles/mixin.scss";
	$bg:#2d3a4b;
	$dark_gray:#889aa4;
	$light_gray:#eee;

	.login-container {
		@include relative;
		height: 100vh;
		overflow: hidden;
		background-color: $bg;
		input:-webkit-autofill {
			-webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
			-webkit-text-fill-color: #fff !important;
		}
		input {
			background: transparent;
			border: 0px;
			-webkit-appearance: none;
			border-radius: 0px;
			padding: 12px 5px 12px 15px;
			color: $light_gray;
			height: 47px;
		}
		.el-input {
			display: inline-block;
			height: 47px;
			width: 85%;
		}
		.tips {
			font-size: 14px;
			color: #fff;
			margin-bottom: 10px;
		}
		.svg-container {
			padding: 6px 5px 6px 15px;
			color: $dark_gray;
			vertical-align: middle;
			width: 30px;
			display: inline-block;
			&_login {
				font-size: 20px;
			}
		}
		.title {
			font-size: 26px;
			font-weight: 400;
			color: $light_gray;
			margin: 0px auto 40px auto;
			text-align: center;
			font-weight: bold;
		}
		.login-form {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			width: 400px;
			padding: 35px 35px 15px 35px;
			margin: 120px auto;
		}
		.el-form-item {
			border: 1px solid rgba(255, 255, 255, 0.1);
			background: rgba(0, 0, 0, 0.1);
			border-radius: 5px;
			color: #454545;
		}
		.show-pwd {
			position: absolute;
			right: 10px;
			top: 7px;
			font-size: 16px;
			color: $dark_gray;
			cursor: pointer;
		}
		.thirdparty-button{
			position: absolute;
			right: 35px;
			bottom: 28px;
		}
	}
</style>