// src/pages/truck/index.js
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
    pageNum: 1,
    searchinput: '',
    favorList: [],
    status: 0,
  },
  //导航
  mapGo: function(e) {
    wx.openLocation({
      latitude: e.currentTarget.dataset.latitude,
      longitude: e.currentTarget.dataset.longitude,
    })
  },
  //Tab切换
  clickTab: function(e) {
    var me = this;
    if (this.data.status === e.target.dataset.current) {
      return false;
    } else {
      me.setData({
        pageNum: 1,
        favorList: [],
        status: e.target.dataset.current,
      });
      me.query();
    }
  },
  //详情
  editBtn: function(e) {
    wx.navigateTo({
      url: '../rescueOrderDetail/index?id=' + e.currentTarget.dataset.id,
    })
  },
  //查询
  query: function() {
    var me = this;
    var s = {
      pageNum: this.data.pageNum,
      pageSize: 10
    }
    //司机-》1：待处理，2：服务中，3：待结算，4：已完成，无：全部
    switch (this.data.status) {
      case '1':
        s.status = '1';
        break;
      case '2':
        s.status = '2';
        break;
      case '3':
        s.status = '3,4';
        break;
      case '4':
        s.status = '5,6,9,10';
        break;
    }
    WXEXT.request(API_SERVER + API_api.orderquery, s, '', me.callback)
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
  //搜索框内容
  input1: function(e) {
    this.data.searchinput = e.detail.value;
  },
  //搜索
  search: function() {
    console.log(this.data.searchinput)
    var me = this;
    var s = {
      carNum: this.data.searchinput,
      status: this.data.status,
      pageNum: this.data.pageNum,
      pageSize: 10
    }
    WXEXT.request(API_SERVER + API_api.orderquery, s, '', me.searchBack)
  },
  //搜索回调
  searchBack: function(data) {
    console.log(data)
    var favorList = data;
    this.setData({
      favorList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
    wx.switchTab({
      url: '/src/pages/index/index'
    })
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