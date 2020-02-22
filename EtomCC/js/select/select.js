//下拉框
/* 
**   divselect       下拉框容器的id
**   inputselectid   下拉框input的id，用于值的展示
**   hiddenInputId   隐藏域的id，用于form表单值的传输（可选）
**   callback        回调函数（可选）
*    scrollBox       滚动容器，jquery选择器
*    isSearch        是否搜索，不传值或者为false无搜索
*
*    html结构
*    <div class="selectDiv up" id="selectDiv">
		<input id="beginyear" type="text" class="selectValue" readonly="" value="2017" data-type="4">
		<div class="selectOption">
			<div class="option"><a href="javascript:void(0);" date-selectid="3">2016</a></div>
			<div class="option"><a href="javascript:void(0);" date-selectid="4">2017</a></div>
		</div>
	</div>
	有搜索是的html结构
	<div class="selectDiv up" id="selectDiv">
		<input id="beginyear" type="text" class="selectValue" readonly="true" unselectable="on" data-type="">
		<div class="selectOption has-selectsearch">
            <div class="select-search">
            	<input class="search-input js-search-input" type="text" placeholder="搜索"/>
            </div>
            <div class="select-scroll">
				<div class="option"><a href="javascript:void(0);" date-selectid="3">2016</a></div>
				<div class="option"><a href="javascript:void(0);" date-selectid="4">2017</a></div>
			</div>
		</div>
	</div>
*   用法
*   $.divselect("#selectDiv","#beginyear");  
**/
jQuery.divselect = function(divselect,inputselectid,hiddenInputId,callback,scrollBox,isSearch) {
	var inputselect = $(inputselectid);
	/*$(divselect).click(function(event){
		event.stopPropagation();
		event.preventDefault();
		$(divselect+" .selectValue").not(":disabled").trigger("click");
		if(isSearch){
			$(this).find(".js-search-input").val("");
			$(divselect).find('.option').removeClass('searchable-select-hide');
		}
	});*/
	if(isSearch){
		//自定义选择器
	    $.expr[":"].searchableSelectContains = $.expr.createPseudo(function(arg) {
		  	return function( elem ) {
		    	return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
		  	};
		});
	    
	    //下拉搜索
	    $(divselect+ " .js-search-input").off("keyup").on("keyup",function(){
	    	var text = $(this).val();
	    	var ul = $(divselect+" .selectOption");
	    	$(divselect+" .selectOption").css("min-height",ul.outerHeight());
	    	var scrollNode = $(this).parents(".select-search").next(".select-scroll");
	    	scrollNode.find('.option').addClass('searchable-select-hide');
	    	scrollNode.find('.option:searchableSelectContains('+text+')').removeClass('searchable-select-hide');
	    });
	}
	$(divselect+" .selectValue").click(function(event){
		event.stopPropagation();
		event.preventDefault();
		$(".selectDiv").removeClass("down").addClass("up");
		var ul = $(divselect+" .selectOption");
		if(ul.css("display")=="none"){
			$(".selectOption").hide();
			$(divselect).removeClass("up").addClass("down");
			setPosition(inputselect,ul);
			ul.show();
		}else{
			ul.hide();
			$(divselect).removeClass("down").addClass("up");
			if(isSearch){
				$(this).find(".js-search-input").val("");
				$(divselect).find('.option').removeClass('searchable-select-hide');
				$(divselect+" .selectOption").css("min-height",0);
			}
		}
		if(isSearch){
			$(divselect+ " .js-search-input").focus();
		}
	});
	$(divselect+" .selectOption").unbind("click").bind("click",function(event){
		event.stopPropagation();
		event.preventDefault();
		if(event.target.nodeName === "A"){ //流程页面引用的jQuery版本过低，不支持off方法
			var txt = $(event.target).text();
			if(txt == "其他"){
				$(divselect+" .otherInput").show();
			}
			else{
				$(divselect+" .otherInput").hide();
			}
			
			$(divselect+" .selectValue").val(txt);
			var type = $(event.target).attr("date-selectid");
			if(hiddenInputId){
				$(hiddenInputId).val(type);
			}
			inputselect.attr("data-type",type);
			inputselect.attr("value",txt);
			if(callback){
				callback(inputselectid,type);
			}
			
			$(divselect+" .selectOption").hide();
			$(divselect).removeClass("down").addClass("up");
			if(isSearch){
				$(this).find(".js-search-input").val("");
				$(divselect).find('.option').removeClass('searchable-select-hide');
				$(divselect+" .selectOption").css("min-height",0);
			}
		}
	});
	$(document).click(function(){
		$(divselect+" .selectOption").hide();
		$(divselect).removeClass("down").addClass("up");
		if(isSearch){
			$(this).find(".js-search-input").val("");
			$(divselect).find('.option').removeClass('searchable-select-hide');
			$(divselect+" .selectOption").css("min-height",0);
		}
	});
	
	function setPosition(inputselect,ul){
		var left = inputselect.get(0).getBoundingClientRect().left;
        var top = inputselect.get(0).getBoundingClientRect().top;
        var inputHeight = inputselect.outerHeight();
        var ulHeight = ul.outerHeight()+1;
        var scrollBoxHeight = scrollBox ? scrollBox.outerHeight() : $(window).height();
        var scrollHeight = scrollBox ? scrollBox.get(0).scrollHeight : $(window).height(); 
        var scrollBoxTop = scrollBox ? scrollBox.get(0).getBoundingClientRect().top : 0;
        if(top + inputHeight - scrollBoxTop +ulHeight> scrollBoxHeight){
        	if(ulHeight > top - scrollBoxTop){
        		//如果容器有横向滚动条会影响定位，所以要减去滚动条的高度
        		var scrollBarHeight = scrollBoxHeight - scrollHeight;
            	ul.css({"bottom":top + inputHeight + scrollBarHeight - scrollBoxHeight - scrollBoxTop + 1 + "px","border-top-width":"1px"});
            }else{
            	ul.css({"bottom":inputHeight+"px","border-top-width":"1px"});
            }
        }else{
        	ul.css({"bottom":"auto","border-top-width":"0"});
        }
	}
};