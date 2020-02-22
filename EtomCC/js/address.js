/**
 * 使用说明 selectOrgTree({ isTop:true //弹框方式，布尔值，默认最顶级窗口弹出 offset: 'auto'
 * //默认auto，距离top：'100px' 距离top与left：['100px','200px']，右下角：'rb' orgId: 'cotrId',
 * //要绑定的控件id 返回所选择的ID（必填） orgName: 'cotrName', //要绑定的控件id 返回所选择的显示名(必填) type:
 * 'cotrType', //要绑定的控价id 返回所选择的类型（选填） isMulti: false, //是否多选，默认单选 orgType: 0
 * //选择的类别,默认0：1：部门，0：人员，1|0：部门&人员... }, callBackName);
 * //回调方法，传入一个字符串类型的函数名,关闭窗口的时候触发
 */
function selectOrgTreeadress(para, callBackName) {
	var defaults = {
		isTop : true,
		offset : "auto",
		orgName : "",
		orgId : "",
		type : '',
		orgType : "0",
		isMulti : false
	}
	var parameters = $.extend({}, defaults, para);
	if (!parameters.orgName || !parameters.orgId) {
		layer.alert("没有绑定控件id", {
			icon : 9
		});
		return;
	}
	top.popAddressLayer = window;
	if ($("#pop-address-options").length) {
		$("#pop-address-options").remove();
	}
	if (callBackName) {
		var html = '<input id="pop-address-options" type="hidden" data-callBack="'
				+ callBackName
				+ '" data-orgName="'
				+ parameters.orgName
				+ '" data-orgId="'
				+ parameters.orgId
				+ '" data-type="'
				+ parameters.type
				+ '" data-orgType="'
				+ parameters.orgType
				+ '" data-isMulti="' + parameters.isMulti + '"/>';
	} else {
		var html = '<input id="pop-address-options" type="hidden" data-orgName="'
				+ parameters.orgName
				+ '" data-orgId="'
				+ parameters.orgId
				+ '"  data-type="'
				+ parameters.type
				+ '" data-orgType="'
				+ parameters.orgType
				+ '" data-isMulti="'
				+ parameters.isMulti
				+ '"/>';
	}
	$("#" + parameters.orgName).after(html);
	if (parameters.isTop) {
		top.layer
				.open({
					type : 2,
					title : false,
					area : [ '710px', '432px' ],
					closeBtn : false,
					offset : parameters.offset ? parameters.offset : "auto",
					shadeClose : false,
					content : [
							ctp + "/sys/dept/dept_tree.html?type="
									+ parameters.orgType, 'no' ]
				});
	} else {
		layer
				.open({
					type : 2,
					title : false,
					area : [ '710px', '432px' ],
					closeBtn : false,
					offset : parameters.offset ? parameters.offset : "auto",
					shadeClose : false,
					content : [
							ctp + "/sys/dept/dept_tree.html?type="
									+ parameters.orgType, 'no' ]
				});
	}

}