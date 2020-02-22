function doLogin() {
	var user = $("#userName").val();
	var password = $("#password").val();
	var yzm = $("#yzm").val();
	if(user == "") {
		layer.msg('请输入用户名！', {
			icon: 5
		});
		return
	}
	if(password == "") {
		layer.msg('请输入密码！', {
			icon: 5
		});
		return;
	}
	if(yzm == "") {
		layer.msg('请输入验证码！', {
			icon: 5
		});
		return;
	}
	if(user != "1" || password != "55") {
		layer.msg('用户名或者密码错误！', {
			icon: 5
		});

		return;
	}
	$('#submit').html('登录中...');
	window.location.href = '../html/home.html';
}

function funLoginNameKeyDown() {
	if(event.keyCode == 13) {
		document.getElementById("password").focus();
		return false;
	}
}

function funPasswordKeyDown() {
	if(event.keyCode == 13) {
		document.getElementById("yzm").focus();
		doLogin();
		return false;
	}
}

function funYzmKeyDown() {
	if(event.keyCode == 13) {
		doLogin();
		return false;
	}
}