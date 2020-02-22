function createUpload(dir, tempPick) {
	setTimeout(function() {
		var index;
		if (!WebUploader.Uploader.support()) {
			top.layer.alert('附件上传控件不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
			throw new Error('WebUploader does not support the browser you are using.');
		}
		if (!tempPick) {
			tempPick = {
				id : '#uploadImage',
				multiple : false
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
				'dir' : dir
			}, // 上传目录,当前用户信息
			// swf文件路径
			swf : ctp + '/js/webuploader/Uploader.swf',
			// 设置头文件不然IE8 无法上传正常的文件只能上传图片
			headers : {
				'Access-Control-Allow-Origin' : '*'
			},
			// 文件接收服务端。
			server : ctp + '/sys/file/addVideoFileData.do',
			// server: '/sysFileData/addFileData.do',
			// server: '/sysFileData/addFileData.do',
			// accept : {
			// title : 'Images',
			// extensions : 'gif,jpg,jpeg,bmp,png',
			// mimeTypes :
			// 'image/gif,image/jpg,image/jpeg,image/bmp,image/png'
			// },
			duplicate : true,
			// 选择文件的按钮。可选。
			// 内部根据当前运行是创建，可能是input元素，也可能是flash.
			pick : tempPick
		});
		// 添加文件时调用，做上传前的验证，返回false 则不添加进上传队列
		uploader.on('beforeFileQueued', function(file) {
			index = layer.load(2, {
            	shade: [0.1,'#fff'] //0.1透明度的白色背景
            });
			var flag = true;
			$.ajax({
				type : 'POST',
				async : false,
				dataType : 'json',
				url : ctp + '/sys/file/uploadVideo_check.do',
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
								layer.close(index);
								top.layer.alert(data.msg, {
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
		// 文件上传成功，给item添加成功class, 用样式标记上传成功。
		uploader.on('uploadSuccess', function(file, data) {
			if (data.success) {
				layer.close(index);
				top.speech.location.reload();
			}
		});

		// 文件上传失败，现实上传出错。
		uploader.on('uploadError', function(file, reason) {
			layer.close(index);
			top.layer.alert('上传失败');
		});
	}, 300);
}