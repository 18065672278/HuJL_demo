// src/pages/bindtel/index.js
import WXEXT from '../../../components/common/common.js';
import WXYZ from "../../../components/verification/verification.js"
const app = getApp();
const API_SERVER = app.getConfig("API_SERVER");
const API_api = app.getConfig("api");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subData: {
      tel: '',
      code: '',
    },
    codeName: '获取验证码',
    disabled: false
  },
  inputtel: function(e) {
    this.data.subData.tel = e.detail.value;
  },
  inputcode: function(e) {
    this.data.subData.code = e.detail.value;
  },
  getcode: function(e) {
    var tel = this.data.subData.tel;
    var istrue = WXYZ.TelFormat(tel);
    if (istrue) {
      this.settime(60)
      WXEXT.request(API_SERVER + API_api.code, {
        mobile: tel
      }, "已发送验证码到您的手机");
    }
  },
  settime: function(val) {
    var that = this;
    var countdown = val;
    if (countdown == 0) {
      that.setData({
        disabled: false,
        codeName: "获取验证码"
      })
      countdown = 60;
    } else {
      var codeName = "重新发送(" + countdown + ")";
      that.setData({
        disabled: true,
        codeName: codeName
      })
      countdown--;
      setTimeout(function() {
        that.settime(countdown)
      }, 1000)
    }
  },
  //绑定手机
  subAction: function(e) {
    var me = this;
    var tel = me.data.subData.tel;
    var code = me.data.subData.code;
    var openId;
    wx.getStorage({
      key: 'openId',
      success: function(res) {
        var openId = res.data;
        console.log(openId);
        var data = {
          "mobile": tel,
          "vcode": code,
          "openid": openId
        };
        var istrue = WXYZ.TelFormat(tel);
        if (istrue) {
          if (code.length) {
            WXEXT.request(API_SERVER + API_api.bandAccount, data, '', me.callback);
          } else {
            wx.showToast({
              title: '请输入验证码',
              icon: 'none'
            });
          }
        }
      },
    })
  },
  //绑定手机回调
  callback: function(data) {
    var me = this;
    console.log(data);
    var userId = data;
    wx.setStorageSync('userId', userId);
    me.getIdentifyInfo()
  },
  //认证信息
  getIdentifyInfo: function() {
    var me = this;
    WXEXT.request(API_SERVER + API_api.usergetIdentifyInfo, '', '', me.identityback);
  },
  identityback: function(data) {
    console.log(data);
    if (data && data.status == 1) {
      wx.setStorageSync('__com-tabbar-auth', 0);
      let identityType = [];
      data.roles.forEach(function (v, i) {
        identityType.push(v.roleId);
      })
      wx.setStorageSync('identityType', identityType);
      if (identityType.indexOf(1002)) {
        wx.setStorageSync('__com-tabbar-auth', 10);
      }
      app.globalData.hasLogin = true;
      setTimeout(function() {
        wx.switchTab({
          url: '/src/pages/index/index',
        })
      }, 2000)
    } else {
      wx.redirectTo({
        url: '/src/pages/user/attestbox/attest/index',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getStorage({
      key: 'userId',
      success: function(res) {
        console.log(res)
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})