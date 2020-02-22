function createUpload(dir, sysOrgPersonId, tempPick) {
	setTimeout(function() {
		if (!WebUploader.Uploader.support()) {
			top.layer.alert('附件上传控件不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
			throw new Error(
					'WebUploader does not support the browser you are using.');
		}
		if (!tempPick) {
			tempPick = {
				id : '#uploadImage',
				multiple : false
			};
		} else if (tempPick == '#picker') {
			tempPick = {
				id : '#picker',
				multiple : true
			};
		} else {
			tempPick = {
				id : tempPick,
				multiple : false
			};
		}
		// 初始化Web Uploader
		var uploader = WebUploader.create({
			// 自动上传。
			auto : true,
			formData : {
				'dir' : dir,
				'sysOrgPersonId' : sysOrgPersonId
			}, // 上传目录,当前用户信息
			// swf文件路径
			swf : ctp + '/js/webuploader/Uploader.swf',
			// 设置头文件不然IE8 无法上传正常的文件只能上传图片
			headers : {
				'Access-Control-Allow-Origin' : '*'
			},
			// 文件接收服务端。
			server : ctp + '/sys/file/addFileData.do',
			// server: '/sysFileData/addFileData.do',
			// server: '/sysFileData/addFileData.do',
			// accept:{
			// title: 'Images',
			// extensions: 'gif,jpg,jpeg,bmp,png',
			// mimeTypes: 'image/gif,image/jpg,image/jpeg,image/bmp,image/png'
			// },
			duplicate : true,
			// 选择文件的按钮。可选。
			// 内部根据当前运行是创建，可能是input元素，也可能是flash.
			pick : tempPick,
			compress : false,// 不启用压缩
			resize : false,// 尺寸不改变
		});
		// 添加文件时调用，做上传前的验证，返回false 则不添加进上传队列
		uploader.on('beforeFileQueued', function(file) {
			var flag = true;
			$.ajax({
				type : 'POST',
				async : false,
				dataType : 'json',
				url : ctp + '/sys/file/upload_check.do',
				data : {
					filename : file.name,
					filesize : file.size,
					filetype : file.type
				}, // {filename:
				// file.name},
				success : function(data) {
					if (data) {
						if (!data.success) {
							// 请求失败，后台返回失败原因
							if (data.msg != null) {
								top.layer.alert(file.name + " 异常! " + data.msg,
										{
											shift : 2
										});
								flag = false;
							}
						}
					}
				}
			});
			return flag;
		});
		// 当一批文件添加进来的时候
		uploader.on('filesQueued', function(file) {
			var fileCount = $('#uploadedAccessoryList').children(
					'.uploaded-accessory-item').length;
			if (file.length + fileCount > 9) {
				top.layer.alert("最多只能上传9个文件！");
				for (var i = 0; i < file.length; i++) {// 取消要上传的文件
					uploader.cancelFile(file[i]);
				}
			}
		});
		// 文件上传成功，给item添加成功class, 用样式标记上传成功。
		uploader.on('uploadSuccess', function(file, fileData) {
			var pickId = uploader.options.pick.id;
			if (pickId !== "#picker") {
				var ext = file.ext;
				if (ext == "bmp" || ext == "doc" || ext == "docx"
						|| ext == "xls" || ext == "xlsx" || ext == "ppt"
						|| ext == "pptx" || ext == "pdf" || ext == "txt"
						|| ext == "rar" || ext == "zip") {
					top.layer.alert("只允许上传图片");
				} else {
					$(pickId).addClass("hasImage").css(
							"background-image",
							"url(" + ctp
									+ "/sys/file/download.do?pk_file_data="
									+ fileData.data.pk_file_data + "");
					$(pickId).next('input[type=hidden]').val(
							fileData.data.pk_file_data);
				}
			} else {
				if (file.type.indexOf("image/") == 0) {// 上传图片
					addImages(fileData.data.pk_file_data, file.name);
				} else {// 上传非图片附件
					addFiles(fileData.data.pk_file_data, file);
				}
			}
			;

		});

		// 文件上传失败，现实上传出错。
		uploader.on('uploadError', function(file, reason) {
			top.layer.alert('上传失败');
		});
	}, 300);
}
// 页面中添加文件
var addFiles = function(pk_file_data, file) {
	var html = '';
	html += '<div class="uploaded-accessory-item" id="' + pk_file_data
			+ '" title="' + file.name + '">';
	html+='<input type="hidden" name="fileid" value="'+pk_file_data+'"/>';
	html += '<div class="filetype">';
	html += '<img src="' + getFileImageSrc(file) + '" alt="' + file.name
			+ '" title="' + file.name + '" class="filetype-icon" />';
	html += '<p class="filetype-txt">' + file.name + '</p>';
	html += '<div class="boxlist clearfix">';
	html += '<a class="download" href="javascript:void(0)" style="display: inline-block;width: 120px;text-align: center">下载</a>';
	/*html += '<a class="preview" href="javascript:void(0)">预览</a>';*/
	html += '</div>';
	html += '</div>';
	html += '<i class="accessory-remove"></i>';
	html += '</div>';
	$("#uploadedAccessoryList .accessory-upload-btn").before(html);
	// 点击预览图片
	$("#uploadedAccessoryList .preview").click(
			function() {

				var pk_file_data = $(this).parent().parent().parent()
						.attr("id");
				window.open("/sys/file/preview.do?pk_file_data=" + pk_file_data
						+ "&key=qfupnfpbrtcope");
			});
	// 点击下载
	$('#uploadedAccessoryList .download').click(
			function() {
				var pk_file_data = $(this).parent().parent().parent()
						.attr("id");
				window.open(ctp + "/sys/file/download.do?pk_file_data="
						+ pk_file_data);
			});
	// 点击删除
	$('.uploaded-accessory-list .accessory-remove').click(function() {
		var attrId = $(this).parent(".uploaded-accessory-item").attr("id");
		//del_id += attrId + ",";
		// var jlImgs = $("#jlImgs").val();
		// jlImgs = jlImgs.replace(attrId,"");
		// var data = "&attrId=" + attrId;
		$(this).parent('.uploaded-accessory-item').remove();
		// $.post(eoaBathPath+'/att/delete.json',data,function(item,status){
		// if(status = 'success'){
		// $("#jlImgs").val(jlImgs);
		// }else{
		// top.layer.alert("删除失败！");
		// }
		// });
	});
};
// 页面中添加图片
var addImages = function(pk_file_data, fileName) {
	// 图片加载完成后才能获取imgWidth和imgHeight
	var html = '';
	html += '<div class="uploaded-accessory-item" id="' + pk_file_data
			+ '" title="' + fileName + '">';
	html+='<input type="hidden" name="attrid" value="'+pk_file_data+'"/>';
	html += '<div class="filetype">';
	html += '<img src="' + ctp + '/sys/file/download.do?pk_file_data='
			+ pk_file_data + '" alt="' + fileName + '" title="' + fileName
			+ '" class="filetype-icon" />';
	html += '<p class="filetype-txt">' + fileName + '</p>';
	html += '<div class="boxlist clearfix">';
	html += '<a class="download" href="javascript:void(0)" style="display: inline-block;width: 120px;text-align: center">下载</a>';
	/*html += '<a class="preview" href="javascript:void(0)">预览</a>';*/
	html += '</div>';
	html += '</div>';
	html += '<i class="accessory-remove"></i>';
	html += '</div>';

	$('#uploadedAccessoryList .accessory-upload-btn').before(html);

	// 点击预览图片
	$("#uploadedAccessoryList .preview").click(
			function() {

				var pk_file_data = $(this).parent().parent().parent()
						.attr("id");
				window.open("/sys/file/preview.do?pk_file_data=" + pk_file_data
						+ "&key=qfupnfpbrtcope");
			});
	// 点击下载
	$('#uploadedAccessoryList .download').click(
			function() {
				var pk_file_data = $(this).parent().parent().parent()
						.attr("id");
				window.open(ctp + "/sys/file/download.do?pk_file_data="
						+ pk_file_data);
			});
	// 点击删除
	$('.uploaded-accessory-list .accessory-remove').click(
			function() {
				var pk_file_data = $(this).parent(".uploaded-accessory-item")
						.attr("id");
				/*del_id += pk_file_data + ",";
				var jlImgs = $("#jlImgs").val();
				jlImgs = jlImgs.replace(attrId,"");
				var data = "&attrId=" + attrId;*/
				$(this).parent('.uploaded-accessory-item').remove();
				/*$.post(ctp + '/sys/file/delete.json', data, function(
						item, status) {
					if (status = 'success') {
						$("#jlImgs").val(jlImgs);
					} else {
						top.layer.alert("删除失败！");
					}
				});*/
			});
};
var getFileImageSrc = function(file) {
	var ext = file.ext;// 文件后缀
	if (ext == 'doc' || ext == 'docx') {
		return ctp + "/images/uploaddoc.png";
	} else if (ext == 'xls' || ext == 'xlsx') {
		return ctp + "/images/uploadexc.png";
	} else if (ext == 'ppt' || ext == 'pptx') {
		return ctp + "/images/uploadppt.png";
	} else if (ext == 'pdf') {
		return ctp + "/images/uploadpdf.png";
	} else if (ext == 'txt') {
		return ctp + "/images/txt.png";
	} else if (ext == 'rar' || ext == 'zip') {
		return ctp + "/images/uploadzip.png";
	} else {
		return ctp + "/images/other.png";
	}
};
