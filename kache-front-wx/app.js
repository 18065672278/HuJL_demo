//var common = require('src/components/common/common.js');
import WXEXT from 'src/components/common/common.js';
import Touches from 'src/components/base/Touches.js';
import cui from 'src/components/base/cui.js'
App({
  globalData: {
    //上下文
    context: {
      //seesion
    },
    userContext: {
      //seesion
    },
    env: 'prod', //dev,prod
    hasLogin: false,
    userInfo: null,
    api: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    selected: 0
  },
  onLaunch: function() {
    var me = this;
    WXEXT.loadEnvConfig(me);
    wx.setStorageSync('userId', '');
    wx.removeStorageSync('identityType');
    wx.removeStorageSync('__com-tabbar-auth');
    me.globalData.hasLogin = false;
    me.saveUser();
    wx.hideTabBar();
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  },
  unfinished: function() {
    wx.showToast({
      title: '敬请期待',
      icon: "none"
    })
  },
  //用户openid
  saveUser: function(e) {
    var me = this,
      code, openid;
    wx.login({
      success: function(res) {
        code = res.code;
        console.log("code:" + code)
        WXEXT.request(me.getConfig("API_SERVER") + me.getConfig("api").jscode2session, {
          code: code
        }, '', me.sessionback)
      }
    });
  },
  //获取openid回调
  sessionback: function(data) {
    var me = this,
      openid = data.openid;
    wx.setStorageSync('openId', openid);
    wx.getSetting({
      success: function(res) {
        console.log(res);
        if (res.authSetting['scope.userInfo'] === true) { // 成功授权
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          //执行判断是否登录的接口 已经登录的话me.globalData.hasLogin = true;
          WXEXT.request(me.getConfig("API_SERVER") + me.getConfig("api").checkLoginWeixin, {
            openid: openid
          }, '', function(data) {
            console.log(data);
            if (data.loginStatus === false) {
              me.globalData.hasLogin = false;
            } else {
              me.globalData.hasLogin = true;
              wx.setStorageSync('userId', data.userId);
            }
          })
        } else {
          wx.switchTab({
            url: '/src/pages/index/index',
          })
        }
      }
    })
  },
  getConfig: function(key) {
    let me = this;
    if (!key) return;
    return me.globalData.context && me.globalData.context[key];
  },
  Touches: new Touches()
})
