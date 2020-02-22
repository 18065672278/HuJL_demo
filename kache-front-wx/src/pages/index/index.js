import WXEXT from '../../components/common/common.js';
import cui from '../../components/base/cui.js';
const app = getApp();
const API_SERVER = app.getConfig("API_SERVER");
const API_api = app.getConfig("api");
Page({
  data: {
    animationData: '',
    showModalStatus: '',
    imgUrls: [
      '/src/assets/images/AD818.png',
      '/src/assets/images/CM958.png',
      '/src/assets/images/CR189II.png',
      '/src/assets/images/CR969.png',
      '/src/assets/images/JX-200.png',
      '/src/assets/images/JX-559.png',
      '/src/assets/images/S811.png',
      '/src/assets/images/S812.png',
      '/src/assets/images/UM816.png'
    ],
    categoryList: {},
    favorList: [{
      id: 1,
      auth: '',
      title: '欧曼超级重卡：自带C位光环 生来如此惊艳！',
      imgUrl: '/src/assets/images/truck.jpg',
      word: '茫茫车海，滚滚车流，只会开车撩人是不够的，关键是， 你还要学会时刻保持优雅。有了欧曼超级重卡的这几种智能黑科技解锁更多开车新姿势。 ',
      date: '2019年9月20日'
    }, {
      id: 2,
      auth: '',
      title: '上汽红岩：5G时代 你的驾照将失效？',
      imgUrl: '/src/assets/images/truck.jpg',
      word: '“4G改变生活，5G改变世界。”作为通信技术更新的重要节点，5G将全面提升网络的速率、稳定性、可靠性和低延时，实现包括3D通信、4K+超高清视频观看、在线AR/VR、云办公、云游戏等全新体验，人们的生活方式将会发生翻天覆地的变化。',
      date: ' 2019年9月17日'
    }]
  },
  //获取菜单
  viewMenu: function() {
    var me = this;
    WXEXT.request(API_SERVER + API_api.viewMenu, '', '', me.callback)
  },
  callback: function(data) {
    console.log(data);
    if (!cui.isEmpty(data) && !cui.isEmpty(data.children) && !cui.isEmpty(data.children[0].children)) {
      let menuList = data.children[0].children;
      let categoryList = {};
      if (menuList.length <= 8) {
        let pageone = [];
        for (let i = 0; i < menuList.length; i++) {
          pageone.push(menuList[i]);
        }
        categoryList.pageone = pageone;
      } else {
        let pageone = [],
          pagetwo = [];
        for (let j = 0; j < 8; j++) {
          pageone.push(menuList[j]);
        }
        for (let k = 8; k < menuList.length; k++) {
          pagetwo.push(menuList[k]);
        }
        categoryList.pageone = pageone;
        categoryList.pagetwo = pagetwo;
      }
      console.log(categoryList)
      this.setData({
        categoryList
      })
    } else {
      WXEXT.showModal('', "请联系管理员获取用户权限", false);
    }
  },
  onLoad: function() {
    wx.hideTabBar({});
    this.setData({
      auth: 0
    })
  },
  onShow: function() {
    var me = this,
      hasLogin = app.globalData.hasLogin;
    console.log(hasLogin)
    this.hideModal();
    this.setData({
      hasLogin
    });
    if (hasLogin) {
      me.viewMenu();
      WXEXT.request(API_SERVER + API_api.getUserInfo, '', '', function(data) {
        console.log(data);
        app.globalData.userInfo = data;
        if (!cui.isEmpty(data.outletList)) {
          me.setData({
            auth: 10
          })
        }
      })
    }
  },
  onReady: function() {

  },
  /**
   * 跳转到某个页面
   */
  switchPage(e) {
    let param = {
      action: e.currentTarget.dataset.action,
      actionRouter: e.currentTarget.dataset.actionRouter
    };
    console.log(param)
    WXEXT.doAction(param);
  },
  //登录
  loginBtn: function(e) {
    var me = this;
    if (!me.data.loginBtn) {
      me.showModal();
    } else {
      wx.showToast({
        title: '已在登录，请稍候！',
        icon: 'none'
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
      wx.switchTab({
        url: '../index/index',
      })
      return;
    }
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var me = this;
      var openId = wx.getStorageSync('openId');
      me.wxGetUserInfo(openId);
    }
  },

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
  //最新资讯
  jump: function() {
    wx.navigateTo({
      url: '../newsBox/news/index',
    })

  },
  jumpDetail: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../newsBox/newsDetail/index?id=' + e.currentTarget.dataset.id,
    })
  }
})