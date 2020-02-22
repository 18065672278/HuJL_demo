$(function(){
   $(".lefts").on("mouseover",function(){
		$(".lefts").css("color","#AC825E");
		$(".lefts").css("border","2px solid #AC825E");
		$(".lefts").css("border-top","none");
		$(".lefts").css("border-left","none");
		$(".lefts").css("border-right","none");
		$(".first").show();
		$(".second").hide();
	});
   $(".lefts").on("mouseout",function(){
		$(".lefts").css("color","rgb(153,153,153)");
		$(".lefts").css("border","1px solid #F5F5F5");
		$(".lefts").css("border-top","none");
		$(".lefts").css("border-left","none");
		$(".lefts").css("border-right","none");
	});
	   $(".rights").on("mouseover",function(){
		$(".rights").css("color","#AC825E");
		$(".rights").css("border","2px solid #AC825E");
		$(".rights").css("border-top","none");
		$(".rights").css("border-left","none");
		$(".rights").css("border-right","none");
		$(".first").hide();
		$(".second").show();
	});
   $(".rights").on("mouseout",function(){
		$(".rights").css("color","rgb(153,153,153)");
		$(".rights").css("border","1px solid #F5F5F5");
		$(".rights").css("border-top","none");
		$(".rights").css("border-left","none");
		$(".rights").css("border-right","none");
	});
	
	/*订单*/
	$(".left").on("mouseover",function(){
		$(".left").css("color","#AC825E");
		$(".left").css("border","2px solid #AC825E");
		$(".left").css("border-top","none");
		$(".left").css("border-left","none");
		$(".left").css("border-right","none");
		$(".one").show();
		$(".two").hide();
		$(".three").hide();
	});
   $(".left").on("mouseout",function(){
		$(".left").css("color","#999999");
		$(".left").css("border","1px solid #262626");
		$(".left").css("border-top","none");
		$(".left").css("border-left","none");
		$(".left").css("border-right","none");
	});
	$(".middle").on("mouseover",function(){
		$(".middle").css("color","#AC825E");
		$(".middle").css("border","2px solid #AC825E");
		$(".middle").css("border-top","none");
		$(".middle").css("border-left","none");
		$(".middle").css("border-right","none");
		$(".two").show();
		$(".one").hide();
		$(".three").hide();
	});
   $(".middle").on("mouseout",function(){
		$(".middle").css("color","#999999");
		$(".middle").css("border","1px solid #262626");
		$(".middle").css("border-top","none");
		$(".middle").css("border-left","none");
		$(".middle").css("border-right","none");
	});
   $(".right").on("mouseover",function(){
		$(".right").css("color","#AC825E");
		$(".right").css("border","2px solid #AC825E");
		$(".right").css("border-top","none");
		$(".right").css("border-left","none");
		$(".right").css("border-right","none");
		$(".three").show();
		$(".two").hide();
		$(".one").hide();
	});
   $(".right").on("mouseout",function(){
		$(".right").css("color","#999999");
		$(".right").css("border","1px solid #262626");
		$(".right").css("border-top","none");
		$(".right").css("border-left","none");
		$(".right").css("border-right","none");
	});
});