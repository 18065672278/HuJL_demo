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
                url : ctp + '/sys/file/uploadExcelCheck.do',
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
            var ext = file.ext;
            if (ext == "bmp" || ext == "doc" || ext == "docx"
                    || ext == "jpg" || ext == "png" || ext == "ppt"
                    || ext == "pptx" || ext == "pdf" || ext == "txt"
                    || ext == "rar" || ext == "zip" || ext == "jpeg" || ext == "gif" || ext == "bmp") {
                top.layer.alert("只允许上传Excel文件类型");
            } else {
                // ajax请求
                // 上传中的时候需要加载图，加载完成需要上传成功提醒。
                // 弹窗提醒上传内容是否重复，是否失败，是否完成
                // 成功之后：点击确定刷新关闭弹窗增加数据显示列表；
                // 失败之后：弹窗失败原因
                // 加载中时，必须保证上传完成之后关闭上传提醒
        		var msgIndex=top.layer.msg('正在导入数据，请耐心等待！', {shade:0.3,icon: 16,time:99999});
        		$.ajax({
        			url: ctp+"/project/addproject/importProject.json?fileName="+fileData.data.pk_file_data+"&attid="+fileData.data.pk_file_data+"&dir="+dir+"&file_path="+fileData.data.file_path,
        			type:"POST",
        			dataType:"json",
        			success:function(result){
        				if(result.success){
        					top.layer.close(msgIndex);
        					top.layer.alert(result.msg,{
        						shift: 2,
        					    closeBtn :false
        					});
        				}else{
        					top.layer.close(msgIndex);
        					top.layer.alert(result.msg, {closeBtn:false});
        				}
        			}
        		});
            };
        });

        // 文件上传失败，现实上传出错。
        uploader.on('uploadError', function(file, reason) {
            top.layer.alert('上传失败');
        });
    }, 300);
}
