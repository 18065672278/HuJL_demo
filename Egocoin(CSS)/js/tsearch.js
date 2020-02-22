//菜单栏切换(选择搜索类型)
var searchtype = function(tab, content) {
	var $tab = $(tab);
	$tab.find("li").eq(0).addClass("hover");
	$tab.find("li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("hover").siblings().removeClass("hover");
		$("#searchtype").val($(this).text());
		$(content).children("div").eq(index).show().siblings().hide();
	})
}
//执行菜单切换函数
searchtype(".nav", ".conlbox");
//广告搜索(币种选择)
var selectcoin = function(obj) {
	var selectcoin = $(obj).text();
	console.log("选择币种：" + selectcoin);
	sessionStorage.setItem("coin", selectcoin);
	$("#selectcoin").val(selectcoin);
	$('.theme-mask').hide();
	$('.selcurlist').slideUp(200);
}
$("#selectcoin").click(function() {
	$('.theme-mask').show();
	$('.theme-mask').height($(document).height());
	$('.selcurlist').slideDown(200);
})
$("#selcoinclose").click(function() {
	$('.theme-mask').hide();
	$('.selcurlist').slideUp(200);
})
//广告搜索（地区选择）
$("#selectarea").click(function() {
	location.href = "selectarea.html";
})
var selectarea = function(obj) {
	var area = $(obj).text();
	var curry = $(obj).attr("curry")
	sessionStorage.setItem("area", area);
	sessionStorage.setItem("curry", curry);
	location.href = "tsearch.html";
}
//广告搜索（货币类型）
$("#selectcurry").click(function(obj) {
	location.href = "selectcurry.html";
})
var selectcurry = function(obj) {
	var area = $(obj).text();
	var curry = $(obj).attr("curry");
	sessionStorage.setItem("curry", area + " " + curry);
	location.href = "tsearch.html";
}
//广告搜索（付款方式选择）
var selectpay = function(obj) {
	var selectpay = $(obj).text();
	console.log("支付方式：" + selectpay);
	sessionStorage.setItem("pay", selectpay);
	$("#selectpay").val(selectpay);
	$('.theme-mask').hide();
	$('.selpaylist').slideUp(200);
}
//点击付款方式显示可选项
$("#selectpay").click(function() {
	$('.theme-mask').show();
	$('.theme-mask').height($(document).height());
	$('.selpaylist').slideDown(200);
})
//点击取消关闭付款方式可选项
$("#selectpayclose").click(function() {
	$('.theme-mask').hide();
	$('.selpaylist').slideUp(200);
})
//价格区间执行函数（最低价）
var lowerprice = function(obj) {
	console.log("最低价：" + obj);
	sessionStorage.setItem("lprice", obj);
}
//价格区间执行函数（最高价）
var upperprice = function(obj) {
	console.log("最高价：" + obj);
	sessionStorage.setItem("uprice", obj);
}
//搜索按钮（广告）
var searchadv = function() {
	var selectcoin = $("#selectcoin").val(); //币种选择
	var selectarea = $("#selectarea").val(); //所在地区
	var selectcurry = $("#selectcurry").val(); //货币类型
	var selectpay = $("#selectpay").val(); //付款方式
	var lowerprice = $("#lowerprice").val(); //最低价
	var upperprice = $("#upperprice").val(); //最高价
	if(lowerprice == "" || lowerprice == null || lowerprice.length == 0) {
		layer.msg("最低价不能为空！", {
			time: 2000
		});
	} else if(upperprice == "" || upperprice == null || upperprice.length == 0) {
		layer.msg("最高价不能为空！", {
			time: 2000
		});
	} else if(lowerprice >= upperprice) {
		layer.msg("最高价要大于最低价！", {
			time: 2000
		});
	} else {
		console.log("选择币种：" + selectcoin, "所在地区：" + selectarea, "货币类型：" + selectcurry, "支付方式：" + selectpay, "最低价：" + lowerprice, "最高价：" + upperprice);
	}
}
//搜索按钮（用户）
var searchuser = function() {
	var searchuser = $("#susername").val();
	if(searchuser == "" || searchuser == null || searchuser.length == 0) {
		layer.msg("请输入用户昵称", {
			time: 2000
		});
	} else {
		console.log("用户昵称：" + searchuser);
	}
}

