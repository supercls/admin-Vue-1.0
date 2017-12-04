(function(window,$,undefined){

	window._g={
		//ajaxurl:true?"http://...":"http://192.168.0.145:8080/api/",  //ajax请求前缀
		//保存和设置localStorage
		owner: {
			token: function(token) {
				var settings = _g.owner.settings();
				if(!!arguments.length) {
					settings.token = token;
					_g.owner.settings(settings);
				} else {
					return(settings && settings.token) || "";
				}
			},
			settings: function(settings) {
				if(!!arguments.length) {
					settings = settings || {};
					localStorage.setItem('cls_settings', JSON.stringify(settings));
				} else {
					var settingsText = localStorage.getItem('cls_settings') || "{}";
					return JSON.parse(settingsText);
				}
			}
		},
		useSessions:function(settings){
			if(!!arguments.length) {
					settings = settings || {};
					sessionStorage.setItem('goldadmin', JSON.stringify(settings));
			} else {
				var settingsText = sessionStorage.getItem('goldadmin') || "{}";
				return JSON.parse(settingsText);
			}  
		},
		ajax: function(url, data, callback, dataType) {
			if($.isFunction(data)) {
				callback = data;
				data = {}
			};
			$.ajax({
				type: 'POST',
				url: (url.indexOf("http") > -1 ? url : _g.ajaxurl + url),
				data: $.extend(data, {
					token: encodeURIComponent(_g.owner.token()),
					ajax: true
				}),
				timeout: 1200000, //超时时间设置 ，单位毫秒
				dataType: !dataType ? "json" : dataType,
				beforeSend: function(xhr) {
					
					//跨域不被执行
					//xhr.setRequestHeader('X-Requested-With', "XMLHttpRequest");
				},
				complete: function(XMLHttpRequest, status) {
					if(status == "timeout") {
						alert("网络有问题，请检查后再次连接")
					}
				},
				error: function(XMLHttpRequest) {
					console.log(JSON.stringify(XMLHttpRequest));
				},
				success: callback
			})
			}  
		};
		//string原型函数
		//返回字符串长度
		String.prototype.strlen = function () {  
			return this.replace(/[^\x00-\xff]/g, "**").length;  
		}  
		//字符串超出省略  
		String.prototype.cutstr = function (len) {  
			var restr = this;  
			var wlength = this.replace(/[^\x00-\xff]/g, "**").length;  
			if (wlength > len) {  
				for (var k = len / 2; k < this.length; k++) {  
					if (this.substr(0, k).replace(/[^\x00-\xff]/g, "**").length >= len) {  
						restr = this.substr(0, k) + "...";  
						break;  
					}  
				}  
			}  
			return restr;  
		}  
		//替换全部  
		String.prototype.replaceAll = function (s1, s2) {  
			return this.replace(new RegExp(s1, "gm"), s2)  
		}  
		//字符串去空格  
		////去除首  空格
		String.prototype.trim = function () {  
			return this.replace(/(^\s*)|(\s*$)/g, "");  
		}
		//去除所有空格 
		String.prototype.trimAll = function () {  
			return this.replace(/\s+/g, "");  
		}  
		String.prototype.lTrim = function () {  
			return this.replace(/(^\s*)/g, "");  
		}  
		String.prototype.rTrim = function () {  
			return this.replace(/(\s*$)/g, "");  
		}  
		//判断是否以某个字符串开头  
		String.prototype.startWith = function (s) {  
			return this.indexOf(s) == 0  
		}  
		//判断是否以某个字符串结束  
		String.prototype.endWith = function (s) {  
			var d = this.length - s.length;  
			return (d >= 0 && this.lastIndexOf(s) == d)  
		}
		//数组判断
		//判断某个值是否在数组中  
		Array.prototype.in_array = function (e) {  
			for (i = 0; i < this.length; i++) {  
				if (this[i] == e)  
					return true;  
			}  
			return false;  
		}  
		//判断某个值在数组中的位置  
		Array.prototype.indexOf = function (e) {  
			for (i = 0; i < this.length; i++) {  
				if (this[i] == e)  
					return i;  
			}  
			return -1;  
		}
		//去除数组中重复的元素
		Array.prototype.getUnique=function(){
			tempArray = this.slice(0); //复制数组到临时数组  
			for (var i = 0; i < tempArray.length; i++) {  
				for (var j = i + 1; j < tempArray.length;) {  
					if (tempArray[j] == tempArray[i])  
						//后面的元素若和待比较的相同，则删除并计数；  
						//删除后，后面的元素会自动提前，所以指针j不移动  
					{  
						tempArray.splice(j, 1);  
					}  
					else {  
						j++;  
					}  
					//不同，则指针移动  
				}  
			}  
			return tempArray; 
		}
		//判断数组中是否有重复元素
		Array.prototype.confirmRepeat=function(){
			tempArray = this.slice(0); //复制数组到临时数组  
			for (var i = 0; i < tempArray.length; i++) {  
				for (var j = i + 1; j < tempArray.length;) {  
					if (tempArray[j] == tempArray[i])  
						//后面的元素若和待比较的相同，则删除并计数；  
						//删除后，后面的元素会自动提前，所以指针j不移动  
					{  
						return true;  
					}  
					else {  
						j++;  
					}  
					//不同，则指针移动  
				}  
			}  
			return false;
		}
})(window,jQuery,undefined) 