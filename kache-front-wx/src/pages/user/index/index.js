import WXEXT from '../../../components/common/common.js';
import cui from "../../../components/base/cui.js";
const app = getApp();
const API_SERVER = app.getConfig("API_SERVER");
const API_api = app.getConfig("api");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    avatarUrl: '/src/assets/images/defaultUser.jpg',
    nickName: "点击登录账户",
    level: "小萌新",
    integral: 0,
    articleInfo: '',
    personId: '',
    integralRules: []
  },
  onShow: function() {
    let me = this,
      hasLogin = app.globalData.hasLogin;
    me.setData({
      hasLogin
    })
    if (hasLogin) {
      me.getUserInfo();
      if (app.globalData.userInfo != null) {
        console.log(cui.isEmpty(app.globalData.userInfo) && cui.isEmpty(app.globalData.userInfo.photos))
        this.setData({
          avatarUrl: cui.isEmpty(app.globalData.userInfo) ? '/src/assets/images/defaultUser.jpg' : cui.isEmpty(app.globalData.userInfo.photos) ? '/src/assets/images/defaultUser.jpg' : app.globalData.userInfo.photos[0].url,
          nickName: app.globalData.userInfo.nickname
        });
      }
    } else {
      this.setData({
        avatarUrl: '/src/assets/images/defaultUser.jpg',
        nickName: "点击登录账户",
        integral: 0
      });
    }
  },
  onLoad: function() {
    this.setData({
      auth: 0
    })
  },
  //收货地址
  getAddress: function() {
    if (this.data.personId != "") {
      wx.navigateTo({
        url: '/src/pages/contact/contactinfo/index?personId=' + this.data.personId,
      })
    } else {
      wx.showToast({
        title: '请先登录账户',
        icon: 'none'
      })
    }
  },
  //我的账单
  myBill: function() {
    if (this.data.personId != "") {
      wx.navigateTo({
        url: '../billBox/index/index?personId=' + this.data.personId,
      })
    } else {
      wx.showToast({
        title: '请先登录账户',
        icon: 'none'
      })
    }
  },
  //我的分销
  myDistribution: function() {
    if (this.data.personId != "") {
      wx.navigateTo({
        url: '',
        //url: '/src/pages/contact/contactinfo/index?personId=' + this.data.personId,
      })
    } else {
      wx.showToast({
        title: '请先登录账户',
        icon: 'none'
      })
    }
  },
  loginPage(e) {
    var me = this;
    if (!this.data.hasLogin) {
      me.showModal();
    } else {
      wx.navigateTo({
        url: '../info/info',
      })
    }
  },
  //暂不登录
  unLogin: function(e) {
    this.hideModal();
  },
  //确定登录
  bindGetUserInfo: function(e) {
    //用户按了拒绝按钮
    if (!e.detail.userInfo) {
      wx.navigateTo({
        url: '../index/index',
      })
      return;
    }
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var me = this;
      var openId = wx.getStorageSync('openId');
      me.hideModal();
      me.wxGetUserInfo(openId);
    }
  },
  goMsg(e) {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      })
    } else {
      wx.showToast({
        title: '请先登录，以体验更多功能',
        icon: 'none',
      })
    }
  },
  /** 
   *获取用户信息
   */
  getUserInfo() {
    var me = this;
    WXEXT.request(API_SERVER + API_api.getUserInfo, '', '', me.callback)
  },
  /**
   * 获取用户信息回调
   */
  callback(data) {
    console.log(data);
    this.setData({
      nickName: data.nickname,
      personId: data.personId,
      avatarUrl: cui.isEmpty(data.photos) ? '/src/assets/images/defaultUser.jpg' : data.photos[0].url
    })
  },
  /**
   * 退出登录
   */
  loginOut(e) {
    var me = this;
    wx.showModal({
      title: '提示',
      content: '退出登录后将情况您所有的本地数据，确认继续退出？',
      confirmText: '是',
      cancelText: '否',
      success: function(res) {
        if (res.confirm) {
          WXEXT.request(API_SERVER + API_api.loginOut, '', '', function(data) {
            wx.setStorageSync("userId", "");
            wx.removeStorageSync('identityType');
            wx.removeStorageSync('__com-tabbar-auth');
            app.globalData.hasLogin = false;
            app.globalData.userInfo = null;
            console.log("aaa");
            me.setData({
              personId: ''
            })
            wx.switchTab({
              url: '/src/pages/index/index',
            });
          })
        } else if (res.cancel) {

        }
      }
    });
  },
  /**
   * 登录
   */
  //保存微信用户信息
  wxGetUserInfo: function(openid) {
    var me = this;
    wx.getUserInfo({
      success: function(res) {
        console.log(res)
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        var language = userInfo.language
        var data = {
          uid: '',
          openid: openid,
          unionid: '',
          subscribe: '',
          nickname: nickName,
          sex: gender,
          city: city,
          country: country,
          province: province,
          language: language,
          headimgurl: avatarUrl,
          subscribeTime: '',
          remark: ''
        }
        console.log(data)
        WXEXT.request(API_SERVER + API_api.saveUserWeixin, data, '', me.savecallback);
      }
    })
  },
  //保存微信用户信息回调
  savecallback: function(data) {
    console.log(data)
    if (!cui.isEmpty(data)) {
      wx.setStorageSync('userId', data);
      //认证信息
      this.getIdentifyInfo();
    } else {
      wx.navigateTo({
        url: '/src/pages/user/bindtel/index',
      })
    }
  },
  //认证信息
  getIdentifyInfo: function() {
    var me = this;
    WXEXT.request(API_SERVER + API_api.usergetIdentifyInfo, '', '', me.identityback);
  },
  identityback: function(data) {
    console.log(data);
    let me = this;
    if (data && data.status == 1) {
      me.setData({
        auth: 0
      })
      let identityType = [];
      data.roles.forEach(function(v, i) {
        identityType.push(v.roleId);
      })
      wx.setStorageSync('identityType', identityType);
      if (identityType.indexOf(1002)) {
        me.setData({
          auth: 10
        })
      }
      app.globalData.hasLogin = true;
      this.onShow();
      this.hideModal();
    } else {
      wx.redirectTo({
        url: '/src/pages/user/attestbox/attest/index',
      })
    }
  },
  // 隐藏遮罩层
  hideModal: function() {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

  /*显示*/
  showModal: function() {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
})