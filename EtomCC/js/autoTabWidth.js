calcTabShow();
$(window).resize(function(){
	calcTabShow();
});
function calcTabShow(){
	var tabNumber = $(".section-tab").find(".tab-name").length;
	var contentWidth = $(".section-tab").width();
	var tabContentWidth = contentWidth - $(".opear-box").width();
	var tabMoreWidth = $(".section-tab .tab-more").outerWidth();
	var maxShowIndex;
	var tabTotalWidth = 0;
	$(".section-tab-title").find(".tab-name").each(function(i){
		var tabWidth = $(this).outerWidth();
		tabTotalWidth += tabWidth;
		if(tabTotalWidth > tabContentWidth){
			maxShowIndex = i - 1;
			tabTotalWidth -= tabWidth;
			return false;
		}else{
			maxShowIndex = i;
		}
	});
	if((tabTotalWidth + tabMoreWidth>tabContentWidth) && maxShowIndex+1<tabNumber){
		maxShowIndex--;
	}
	if(maxShowIndex + 1 >= tabNumber){
		$(".section-tab").find(".tab-name").not(".tab-more").show();
		$(".tab-more").hide();
	}else{
		$(".section-tab").find(".tab-name").hide();
		$(".section-tab").find(".tab-name").eq(maxShowIndex+1).prevAll().show();
		$(".section-tab .tab-more").show();
		$(".tab-more-list").find(".tab-more-name").hide();
		$(".tab-more-list").find(".tab-more-name").eq(maxShowIndex).nextAll().show();
	}
	$(".section-tab").find(".tab-list").css({"width":"auto","overflow":"visible"});
}