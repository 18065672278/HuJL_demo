/*personal*/
//获取用户登录信息
var infomation = function() {
}
infomation();
/*set*/
//获取实名认证信息进行a连接的更改
var updateverified = function() {
	if(verified == "未认证") {
		$("#shiming").text("未认证");
		$("#verified").attr("href", "verified.html");
	} else if(verified == "认证中") {
		$("#shiming").text("认证中");
	} else if(verified == "认证失败") {
		$("#shiming").text("认证失败");
		$("#verified").attr("href", "verified.html");
	} else if(verified == "已认证") {
		$("#shiming").text("已认证");
	}
}
//获取手机认证信息进行a连接的更改
var updatephone = function() {
	console.log(phone);
	if(phone == "未认证") {
		$("#bindtel").text("未绑定");
		$("#buphone").attr("href", "bind.html");
	} else if(phone == "已认证") {
		$("#bindtel").text("修改");
		$("#buphone").attr("href", "untie.html");
	}
}
//获取交易密码信息进行a链接的更改
var updatefund = function() {

}
//退出按钮
var loginout = function() {
	$('.theme-mask').show();
	$('.theme-mask').height($(document).height());
	$('.loginout').show();
}
//退出按钮（取消）
var closeloginout = function() {
	$('.theme-mask').hide();
	$('.loginout').hide();
}
//退出按钮（确定）
var qdloginout = function() {
	$('.theme-mask').hide();
	$('.loginout').hide();
	$.ajax({
		url: test_url + pro_name + "user/exit",
		type: "POST",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		data: {
			token: token,
		},
		success: function(data) {
			if(data.status == 200) {
				console.log(data);
				sessionStorage.removeItem("token");
				location.href = "../login.html";
				var arr = [];
				for(var i = 0; i < newObject.length; i++) {
					if(newObject[i].id != recommendIdSelf) {
						arr.push(newObject[i]);
					}
				}
				var objString = JSON.stringify(arr);
				$.cookie('logininfo', objString, {
					path: "/"
				});
			} else {
				alert(data.msg);
			}
		}
	});
}