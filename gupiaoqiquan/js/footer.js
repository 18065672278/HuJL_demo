$(function(){
	$(".rows_1").on("click",function(){
		$("#row_1").attr("src","img/交易-1.png");
		$(".change").css("color","rgb(142,108,78)");
		window.location.href='buy.html'
	});
	$(".rows_1").on("mouseout",function(){
		$("#row_1").attr("src","img/交易.png");
		$(".change").css("color","#FFFFFF");
	});
	$(".rows_2").on("click",function(){
		$("#row_2").attr("src","img/订单-1.png");
		$(".order").css("color","rgb(142,108,78)");
		window.location.href='order.html'
	});
	$(".rows_2").on("mouseout",function(){
		$("#row_2").attr("src","img/订单.png");
		$(".order").css("color","#FFFFFF");
	});
	$(".rows_3").on("click",function(){
		$("#row_3").attr("src","img/会员中心-1.png");
		$(".member").css("color","rgb(142,108,78)");
		window.location.href='personal_center.html'
	});
	$(".rows_3").on("mouseout",function(){
		$("#row_3").attr("src","img/会员中心.png");
		$(".member").css("color","#FFFFFF");
	});
});