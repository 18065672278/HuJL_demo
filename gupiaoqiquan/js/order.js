


//行权
$(".apply").bind("click",function(){
  layer.open({
		  type: 1,
		  title:false,
		  skin: 'layui-layer-demo', //样式类名
		  closeBtn: 0, //不显示关闭按钮
		  anim: 2,
		  shadeClose: true, //开启遮罩关闭
		  area: ['7.33rem', '5.6rem'],
		  content: $('#app')
			});
    });
   $(".now_price").on("mouseover",function(){
	$(".now_price").css("color","#AC825E");					
	$(".now_cost").show();
	$(".market_cost").hide();
	});
   $(".now_price").on("mouseout",function(){
	$(".now_price").css("color","#999999");					
	});
   $(".market_price").on("mouseover",function(){
	$(".market_price").css("color","#AC825E");					
	$(".now_cost").hide();
	$(".market_cost").show();
	});
   $(".market_price").on("mouseout",function(){
	$(".market_price").css("color","#999999");					
});
$(".no").bind("click",function(){
	layer.closeAll();
});
$(".yes").bind("click",function(){
	layer.closeAll();
	window.location.href='apply_compete.html'
});