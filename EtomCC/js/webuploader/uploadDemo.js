function createUpload(dir,sysOrgPersonId,tempPick){
	setTimeout(function(){
		if (!WebUploader.Uploader.support()) {
			top.layer.alert('附件上传控件不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
			throw new Error('WebUploader does not support the browser you are using.');
		}
		if(!tempPick){
			tempPick={
				id:'#uploadImage',
				multiple:false
			};
		}
		// 初始化Web Uploader
		var uploader = WebUploader.create({
			// 自动上传。
			auto: true,
			formData:{'dir':dir, 'sysOrgPersonId':sysOrgPersonId},	//上传目录,当前用户信息
			// swf文件路径
			swf: ctp + '/js/webuploader/Uploader.swf',
			//设置头文件不然IE8 无法上传正常的文件只能上传图片
			headers:{'Access-Control-Allow-Origin':'*'},
			// 文件接收服务端。
			server: ctp +'/sysFileData/addFileData.do',
		//	server: '${pageContext.request.contextPath}/sysFileData/addFileData.do',
		//	server: '${ctp}/sysFileData/addFileData.do',
			accept:{
				title: 'Images',
				extensions: 'gif,jpg,jpeg,bmp,png',
				mimeTypes: 'image/gif,image/jpg,image/jpeg,image/bmp,image/png'
			},
			duplicate:true,
			// 选择文件的按钮。可选。
			// 内部根据当前运行是创建，可能是input元素，也可能是flash.
			pick: tempPick
		});
		// 文件上传成功，给item添加成功class, 用样式标记上传成功。
		uploader.on( 'uploadSuccess', function(file,data) {
			$("#uploadImage").addClass("hasImage").css("background-image","url("+ctp+"/sysFileData/download.do?pk_file_data="+ data.data +")");
			$("#imageId").val(data.data);
		});

		// 文件上传失败，现实上传出错。
		uploader.on( 'uploadError', function( file ,reason) {
			top.layer.alert('上传失败');
		});
	}, 300);
}
