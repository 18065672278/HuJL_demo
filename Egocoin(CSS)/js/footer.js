$(function(){
	$(".b_button1").on("click",function(){
		$("#menu1").attr("src","img/transaction2.png");
		$("#transaction").css("color","#28cec3");
		window.location.href='transaction.html'
	});
	$(".b_button2").on("click",function(){
		$("#menu2").attr("src","img/order2.png");
		$("#order").css("color","#28cec3");
//		window.location.href='order.html'
	});
	$(".b_button3").on("click",function(){
		$("#menu3").attr("src","img/wallet2.png");
		$("#wallet").css("color","#28cec3");
		window.location.href='wallet.html'
	});
	$(".b_button4").on("click",function(){
		$("#menu4").attr("src","img/personal2.png");
		$("#personal").css("color","#28cec3");
		window.location.href='PersonalCenter/personal.html'
	});
	$(".b_center").on("click",function(){
		window.location.href='PersonalCenter/setfund.html'
	});
}); 
//获取前一个页面的数据
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return r[2];
	return null;
}		
