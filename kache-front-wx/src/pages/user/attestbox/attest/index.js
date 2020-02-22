// src/pages/user/attest/index.js
import WXEXT from '../../../../components/common/common.js';
import cui from '../../../../components/base/cui.js';
const app = getApp();
const API_SERVER = app.getConfig("API_SERVER");
const API_api = app.getConfig("api");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nameP: '',
    nameC: '',
    nameH: '',
    nameD: '',
    roleId: ''
  },
  //跳转
  navGo(e) {
    //判断是否有认证过
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
    /* if (this.data.roleId == "" || this.data.roleId == e.currentTarget.dataset.role) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      })
    } else {
      switch (this.data.roleId) {
        case 1001:
          WXEXT.showModal('', "您已经认证过车队，不能重复认证", false);
          break;
        case 1002:
          WXEXT.showModal('', "您已经认证过服务网点，不能重复认证", false);
          break;
        case 1003:
          WXEXT.showModal('', "您已经认证过供应商，不能重复认证", false);
          break;
        case 1004:
          WXEXT.showModal('', "您已经认证过普通用户，不能重复认证", false);
          break;
      }
    } */
  },
  //获取认证状态
  attest: function() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let me = this,
      roleId = me.data.roleId,
      nameP = me.data.nameP,
      nameC = me.data.nameC,
      nameH = me.data.nameH,
      nameD = me.data.nameD;
    WXEXT.request(API_SERVER + API_api.usergetIdentifyInfo, {}, '', function(data) {
      console.log(data);
      if (!cui.isEmpty(data) && !cui.isEmpty(data.roles)) {
        roleId = data.roles[0].roleId
      }
      if (!cui.isEmpty(data) && !cui.isEmpty(data.personInfo)) {
        nameP = true
      }
      if (!cui.isEmpty(data) && !cui.isEmpty(data.fleetInfo)) {
        nameC = true
      }
      if (!cui.isEmpty(data) && !cui.isEmpty(data.outletInfo)) {
        nameH = true
      }
      if (!cui.isEmpty(data) && !cui.isEmpty(data.fleetInfo)) {
        nameD = true
      }
      me.setData({
        roleId,
        nameP,
        nameC,
        nameH,
        nameD
      })
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