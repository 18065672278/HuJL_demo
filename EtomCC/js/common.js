var ctp ='';
$(function() {
	$(".power-close").click(function() {
		layer.confirm('是否要退出登录？', {
			btn : [ '确定', '取消' ], // 按钮
			offset : 'auto',
			move : false
		}, function(index) {
			// 确定登出
			window.location.href = ctp + '/doLogout.do';
			layer.close(index);
		}, function(index) {
			layer.close(index);
		});
	});
	
	$('.left-nav-tree ul li').children('.link').click(function(){
    	var that=$(this);
    	var parent=that.parent();
    	if(that.next('ul').length>0)
    		{
        		if(!parent.hasClass('open'))
        			{
        			 	parent.siblings().find('ul').slideUp();
        			    parent.siblings().removeClass('open');
        			    parent.siblings().find('li').removeClass('open');
        				that.next('ul').slideDown(function() { 
        					parent.addClass('open');
 						});		
        			}
        		else
        			{
        				parent.find('ul').slideUp(function(){
        					parent.find('.open').removeClass('open');
        					parent.removeClass('open');
        				});
        			
        			}
    		}
    	else
    		{
        		parent.siblings().find('ul').slideUp();
			    parent.siblings().removeClass('open');
    		    $('.left-nav-item').find('a').removeClass('active');
    			that.addClass('active');
    			  // 获取页面url
 			   var url = that.attr("data-url");	
 			   changemenu(that, url);
    		}
    })
      
    
// 选择菜单
function changemenu(ele, url) {
	if (url == undefined)
		return;
	$("#poIframe").remove();
	var newIframe = $('<iframe id="poIframe" src="' + url + '" frameborder="0" style="width:100%;height:100%;border:none;outline:none;"></iframe>');
	$(".admin-content").append(newIframe);
	getLoad(".admin-content");
}
function getLoad(parentEle) {
	layer.ready(function() {
		var index = parent.layer.load(1, {
			shade : [ 0 ]
		});
		$(parentEle).find("iframe").load(function() {
			layer.close(index);
		})
	});
}


	
	// table全选
	$(".table").on("click", "#checkAllBox", function() {
		var isChecked = $(this).prev().prop("checked");
		if (isChecked) {
			$(".table tbody").find(".checkbox").prop("checked", false);
		} else {
			$(".table tbody").find(".checkbox").prop("checked", true);
		}
	});
	/* table单选 */
	$(".table").on("change",".checkbox",function(){
		var parentTable = $(this).parents("table");
		var inputNum = parentTable.find(".checkbox").length;
		var checkedNum = parentTable.find(".checkbox:checked").length;
		var checkAllBox = parentTable.find(".checkAll");
		if(inputNum == checkedNum){
			checkAllBox.prop("checked",true);
		}else{
			checkAllBox.prop("checked",false);
		}
	})
	var ran = Math.floor(Math.random() * 100);
	$('#kaptchaImage').attr('src', ctp + '/getVeriCode.do?' + ran);
	$("#kaptchaImage").click(function() {
		$('#kaptchaImage').attr('src', ctp + '/getVeriCode.do?' + ran);
	});
});
function funLoginNameKeyDown() {
	if (event.keyCode == 13) {
		document.getElementById("password").focus();
		return false;
	}
}
function funPasswordKeyDown() {
	if (event.keyCode == 13) {
		document.getElementById("yzm").focus();
		doLogin();
		return false;
	}
}
function funYzmKeyDown() {
	if (event.keyCode == 13) {
		doLogin();
		return false;
	}
}

function doLogin(force) {
	var loginUrl = ctp + "/login.json";
	if (force != undefined) {
		loginUrl = loginUrl + "?isLogin=y";
	}
	var user = $("#userName").val();
	var password = $("#password").val();
	var yzm = $("#yzm").val();
	if (user == "") {
		layer.msg('请输入用户名！', {
			icon : 5
		});
		return;
	}
	if (password == "") {
		layer.msg('请输入密码！', {
			icon : 5
		});
		return;
	}
	$('#submit').html('登录中...');
	$.ajax({
		url : loginUrl,
		type : "POST",
		dataType : 'json',
		data : {
			"account" : user,
			"pwd" : password,
			"validateCode" : $("#yzm").val()
		},
		success : function(result) {
			if (result.success) {
				window.location.href = result.data;
			} else {
				if (result.msg.indexOf("该用户已经登陆") != -1) {
					layer.confirm("该用户已经登陆，确定强制登陆？", {
						btn : [ '确定', '取消' ], // 按钮
						offset : 'auto',
						move : false
					}, function(index) {
						doLogin(true);
						layer.close(index);
					}, function(index) {
						$('#submit').html('登录');
						layer.close(index);
					});
				} else {
					$('#submit').html('登录');
					$(".yzm-group").show();
					var ran = Math.floor(Math.random() * 100);
					$('#kaptchaImage').attr('src', ctp + '/getVeriCode.do?' + ran);
					layer.msg(result.msg, {
						icon : 5
					});
					return;
				}
			}
		}
	});
}