// src/pages/rescueOrderBox/outletDetail/index.js
import WXEXT from '../../../components/common/common.js';
import cui from '../../../components/base/cui.js';
import WXYZ from "../../../components/verification/verification.js"
const app = getApp();
const API_SERVER = app.getConfig("API_SERVER");
const API_api = app.getConfig("api");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    outletCode: '',
    address: '',
    latitude: '',
    longitude: '',
    thumbPhoto: '',
    name: '',
    contact: '',
    mobile: '',
    listData: []
  },
  //点击电话拨打
  PhoneCall: function(e) {
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.mobile,
    })
  },
  //详情回调
  outletdetailback: function(data) {
    console.log(data);
    var info = data;
    var me = this;
    this.setData({
      id: cui.isEmpty(info.id) ? "" : info.id,
      outletCode: cui.isEmpty(info.outletCode) ? "" : info.outletCode,
      address: cui.isEmpty(info.address) ? "" : info.address,
      latitude: cui.isEmpty(info.latitude) ? "" : info.latitude,
      longitude: cui.isEmpty(info.longitude) ? "" : info.longitude,
      thumbPhoto: cui.isEmpty(info.thumbPhotoId) ? "" : WXEXT.photo(cui.isEmpty(info.photos) ? [] : info.photos, info.thumbPhotoId),
      name: cui.isEmpty(info.name) ? "" : info.name,
      contact: cui.isEmpty(info.contact) ? "" : info.contact,
      mobile: cui.isEmpty(info.mobile) ? "" : info.mobile,
    })
    WXEXT.request(API_SERVER + API_api.outletServiceItemquery, {
      outletCode: me.data.outletCode
    }, '', me.outletServiceItemback)
  },
  //网点服务项回调
  outletServiceItemback: function(data) {
    console.log(data);
    this.setData({
      listData: cui.isEmpty(data) ? [] : data
    })
  },
  //立即下单
  subAction: function(e) {
    wx.navigateTo({
      url: '../rescueOrderEdit/index?outletCode=' + this.data.outletCode + '&id=' + this.data.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var me = this;
    if (options.outletCode) {
      me.setData({
        outletCode: options.outletCode
      })
      WXEXT.request(API_SERVER + API_api.outletdetail, {
        outletCode: options.outletCode
      }, '', me.outletdetailback)
    }
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