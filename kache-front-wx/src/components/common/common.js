'use strict';
//var CryptoJS = require('../../assets/js/common/crypto-min');
import CUI from '../../components/base/cui.js';

export default {
  // dev url
  // url: 'http://localhost/front',
  //pro url
  showModal: function(title, content, showCancel, confirmText, cancelText, callback) { //模态弹框
    var me = this;
    if (!me.isCompatible(wx.showModal)) {
      return;
    }
    wx.showModal({
      title: title, //弹框标题
      content: content, //提示内容
      showCancel: showCancel, //是否显示取消按钮
      confirmText: confirmText || '我知道了',
      cancelText: cancelText || '随便看看',
      cancelColor: '#999999',
      confirmColor: '#37D260',
      success: callback || function() {}
    });
  },
  isCompatible: function(x) { //判断兼容性
    var me = this;
    if (!x) {
      me.showModal('提示', '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。', false);
      return false;
    }
    return true;
  },
  loadEnvConfig: function(app) {
    app.globalData = app.globalData || {};
    if (!app.globalData.env) {
      app.globalData.env = "prod";
    }
    app.globalData.context = require('../../../config/' + app.globalData.env);
  },
  doAction: function(param) {
    if (!CUI.isObject(param)) {
      CUI.Logger.error("参数[param]必须是object类型");
    }
    if (CUI.isEmpty(param.action)) {
      CUI.Logger.error("参数[param.action]跳转地址不能为空");
    }
    if (CUI.isEmpty(param.actionRouter)) {
      CUI.Logger.error("参数[param.actionRouter]跳转地址不能为空");
    }
    wx[param.action]({
      url: param.actionRouter,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  animationUtil: function(currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例
    var animation = wx.createAnimation({
      duration: 200, //动画时长
      timingFunction: "linear", //线性
      delay: 0 //0则不延迟
    });
    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;
    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();
    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })
    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function() {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })
      //关闭
      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
      //添加
      if (currentStatu == "add") {
        this.addToCart();
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200);

    // 显示
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },
  request(url, data, title, callback) {
    console.log(url, data)
    var userId = wx.getStorageSync('userId');
    var headParam = {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
    if (!CUI.isEmpty(userId)) {
      headParam["userId"] = userId;
    }
    //模拟支付
    wx.request({
      url: url,
      method: "POST",
      header: headParam,
      data: data,
      success(res) {
        // 停止下拉动作
        wx.stopPullDownRefresh();
        if (callback) {
          if (res.data.code == 1) {
            console.log('成功');
            callback(res.data.result);
          } else {
            console.log(res);
            wx.showModal({
              title: '',
              content: res.data.note,
              showCancel: false
            })
          }
        }
      },
      fail(res) {
        console.log("请求超时")
      },
      complete(res) {
        console.log("请求成功")
      }
    })
  },
  //图片上传
  uploadImg: function(url, type, callback, num) {
    console.log(url, type, callback, num)
    wx.chooseImage({
      count: 1,
      success: function(res) {
        var filePath = res.tempFilePaths[0];
        wx.uploadFile({
          url: url,
          filePath: filePath,
          header: {
            "content-type": "multipart/form-data",
            "chartset": "utf-8"
          },
          name: type,
          formData: {
            refObj: type,
            metaFile: filePath
          },
          success: function(res) {
            let data = JSON.parse(res.data);
            if (callback) {
              if (data.code == 1 && !CUI.isEmpty(data.result)) {
                callback(data.result[0], filePath, num);
              } else {
                wx.showModal({
                  title: '',
                  content: data.note,
                  showCancel: false
                })
              }
            }
          },
          fail(res) {
            console.log("上传失败");
            console.log(res);
          }
        })
      },
    })
  },
  //图片ID分解
  photo: function(phots, id) {
    var photsList = [],
      ids = [];
    if (id.toString().indexOf(',') > -1) {
      ids = id.toString().split(',');
    } else {
      ids.push(id);
    }
    if (phots.length > 0) {
      for (var i = 0; i < ids.length; i++) {
        if (ids[i] == "") {
          photsList.push("");
        } else {
          for (var j = 0; j < phots.length; j++) {
            if (phots[j].id == ids[i]) {
              if (ids.length == 1) {
                photsList = phots[j].url;
              } else {
                photsList.push(phots[j].url)
              }
            }
          }
        }
      }
    } else {
      console.log("photos为空");
      for (var i = 0; i < ids.length; i++) {
        photsList.push("");
      }
    }
    return photsList;
  }
};