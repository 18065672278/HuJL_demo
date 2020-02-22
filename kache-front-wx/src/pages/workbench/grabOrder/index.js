// src/pages/workbench/grabOrder/index.js
import WXEXT from '../../../components/common/common.js';
import WXYZ from "../../../components/verification/verification.js"
import cui from "../../../components/base/cui.js"
const app = getApp();
const API_SERVER = app.getConfig("API_SERVER");
const API_api = app.getConfig("api");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 1,
    searchinput: '',
    favorList: [],
    status: '1'
  },
  //导航
  mapGo: function(e) {
    wx.openLocation({
      latitude: e.currentTarget.dataset.latitude,
      longitude: e.currentTarget.dataset.longitude,
    })
  },
  //详情
  editBtn: function(e) {
    /* wx.navigateTo({
      url: '../orderDetail/index?id=' + e.currentTarget.dataset.id,
    }) */
  },
  //立即抢单
  grabBtn: function(e) {
    console.log(app);
    var me = this;
    if (cui.isEmpty(app.globalData.userInfo.outletList[0].id)){
      wx.showToast({
        title: '网点权限问题[ID]请联系管理员',
      })
      return;
    }
    var s = {
      orderId: e.currentTarget.dataset.id,
      outletId: app.globalData.userInfo.outletList[0].id
    }
    WXEXT.request(API_SERVER + API_api.orderband, s, '', me.orderbandback)
  },
  //立即抢单回调
  orderbandback: function(data) {
    console.log(data);
    wx.showToast({
      title: '抢单成功',
    });
    wx.navigateTo({
      url: '../index/index',
    })
  },
  //查询
  query: function() {
    var me = this;
    var s = {
      pageNum: this.data.pageNum,
      pageSize: 10
    }
    WXEXT.request(API_SERVER + API_api.queryOutletOrder, s, '', me.callback)
  },
  //查询回调
  callback: function(data) {
    console.log(data)
    setTimeout(function() {
      wx.hideLoading();
    }, 500)
    var favorList = this.data.favorList;
    var result = data;
    for (var i = 0; i < result.length; i++) {
      favorList.push(result[i])
    }
    console.log(favorList)
    this.setData({
      favorList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    WXEXT.request(API_SERVER + API_api.getUserInfo, '', '', function(data) {
      console.log(data)
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
  onShow: function(data) {
    this.query()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      favorList: [],
      pageNum: 1
    })
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
    wx.showLoading({
      title: '玩命加载中',
    })
    this.setData({
      pageNum: this.data.pageNum + 1 // 一般上拉触底是为了加载更多分页数据，所以这里页数自增
    });
    this.query() // 查询方法
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})