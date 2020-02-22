var common = require('../../../components/common/common.js');
var commonObj = common.commonObj;
// var targetPage;
var paramObj;
var app = getApp();
Page({
  data:{
    vcodeBtnDisabled:true,//获取验证码是否可点击
    loginBtnDisabled:true,//登录按钮是否可点击
    closeShowFlag:false, //叉叉是否显示
    vcodeText:'获取验证码',
    phoneNum:'',
    vCode:''
  },
  onLoad: function (options) {
    // targetPage = options.urlInfo;
    paramObj = options && options.paramObj ? options.paramObj : '';
    wx.hideLoading();
    wx.setNavigationBarTitle({
      title: '登录'
    })
   var phoneNumber = wx.getStorageSync('phoneNumber');
   phoneNumber && this.setData({ phoneNum: phoneNumber, vcodeBtnDisabled:false});
  },
  bindCloseTap:function(){ //叉叉按钮事件处理
    this.setData({
      vcodeBtnDisabled:true,
      loginBtnDisabled:true,
      phoneNum:'',
      getfocus: true
    });
  },
  bindBlurHandler:function(){ //失去焦点,叉叉隐藏
    this.setData({
      closeShowFlag:false
    });
  },
  bindFocusHandler:function(){ //聚焦,叉叉显示
    this.setData({
      closeShowFlag:true
    })
  },
  bindPhoneTap:function(e){ //手机号验证,是否发送验证码
    var that = this,value;
    value = e.detail.value;
    if ((/^1[0-9]\d{9}$/).test(value) && value.length == 11) {
      this.setData({
        phoneNum:e.detail.value,
        vcodeBtnDisabled: false
      });
      if(that.data.vCode){that.setData({loginBtnDisabled:false})}
    } else {
      this.setData({
        vcodeBtnDisabled: true,
        loginBtnDisabled:true
      });
    }
  },
  bindCodeTap: function (e) { //验证码验证,是否开放登录
    var that = this, value;
    value = e.detail.value;
    that.setData({ vCode: value });
    value && that.data.phoneNum ? this.setData({ loginBtnDisabled: false }) : this.setData({ loginBtnDisabled: true })
  },
  sendCode: function(userInfo){ //发送验证码
    var num = 60,that = this,timer;
    if (that.data.vcodeBtnDisabled) return;
    that.setData({
      vcodeBtnDisabled:true,
      vcodeText:num + 's'
    });
    timer = setInterval(function () {
      num--;
      that.setData({
        vcodeBtnDisabled:true,
        vcodeText:num + 's'
      });
      if (num == 0) {
        clearInterval(timer);
        that.setData({
          vcodeBtnDisabled: false,
          vcodeText:'获取验证码'
        });
      } 
    }, 1000);
    // //获取验证码
    wx.request({
      url: commonObj.api.code,
      data: {
        'telephone': that.data.phoneNum
      },success(res){
        if (res.data.errorCode == 0) {
          wx.showToast({
            title: '发送验证码成功',
            duration: 2000
          })
        } else if (res.data.errorCode == 6008) {
          commonObj.showModal('提示', res.data.errorMsg, false);
        }
      }
    });
    
  },
  getUserInfo(e){//获取用户信息
    if (app.globalData.userInfo == null){
      app.globalData.userInfo = e.detail.userInfo;
    }
    this.sendCode(app.globalData.userInfo);
  },
  bindLoginTap:function(e){
    var that = this;
    var userInfo = app.globalData.userInfo;
    if (userInfo == null){
      commonObj.showModal('提示', "请先获取验证码。", false);
      return;
    }
    wx.showLoading({ title: '登录中' });
    wx.request({
      url: commonObj.api.login,
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
      data:{
        telephone: that.data.phoneNum,
        code: that.data.vCode,
        img: userInfo.avatarUrl,
        nickName: userInfo.nickName,
        sex: userInfo.gender,
        city: userInfo.city,
        country: userInfo.country,
        province: userInfo.province
      },success(res){
        if (res.data.status == 0){
          wx.setStorageSync("sn", res.data.re);
          app.globalData.hasLogin = true;
          app.globalData.userInfo = that.createUserInfo(userInfo);
          wx.setStorageSync("userInfo", app.globalData.userInfo);
          setTimeout(function () {
            wx.switchTab({
              url: `../index/index`,
            });
          }, 500);
        }else{
          commonObj.showModal('提示', res.data.msg, false);
        }
        wx.hideLoading();
      },error(err){
        commonObj.showModal('提示', err.data.msg, false);
        wx.hideLoading();
      }
    })
  },
  //生成登录表单数据
  createUserInfo(userInfo){
    return{
      telephone: this.data.phoneNum,
      code: this.data.vCode,
      img: userInfo.avatarUrl,
      nickName: userInfo.nickName,
      sex: userInfo.gender,
      city: userInfo.city,
      country: userInfo.country,
      province: userInfo.province
    };
  }
})