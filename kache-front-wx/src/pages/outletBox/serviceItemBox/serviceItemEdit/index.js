// src/pages/fleet/index.js
import WXEXT from '../../../../components/common/common.js';
import cui from '../../../../components/base/cui.js';
import WXYZ from "../../../../components/verification/verification.js"
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
    serviceName: '',
    servicePrice: '',
    marketPrice: '',
    costPrice: '',
    remark: '',
    serviceTag: false,
    orgCode: '',
    dayTime: [{
        name: '1',
        value: '白天'
      },
      {
        name: '2',
        value: '夜晚'
      },
    ],
    dayTimeIndex: '',
    //组织编码
    region: ['北京', '北京', '全部'],
  },

  //服务项名称
  inputServiceName: function(e) {
    this.data.serviceName = e.detail.value
  },

  //价格
  inputServicePrice: function(e) {
    this.data.servicePrice = e.detail.value
  },
  //市场价格
  inputMarketPrice: function(e) {
    this.data.marketPrice = e.detail.value
  },
  //成本价
  inputCostPrice: function(e) {
    this.data.costPrice = e.detail.value
  },
  //是否为常用服务
  serviceTagChange: function(e) {
    this.setData({
      serviceTag: e.detail.value
    })
  },
  //组织编码
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value,
      orgCode: e.detail.code[2]
    })
  },
  //营业时间
  dayTimeChange: function(e) {
    this.data.dayTimeIndex = e.detail.value;
  },
  //说明
  inputremark: function(e) {
    this.data.remark = e.detail.value
  },

  //保存
  subAction: function(e) {
    if (cui.isEmpty(this.data.serviceName)) {
      WXEXT.showModal('', "服务项名称不能为空", false);
    } else {
      var data;
      var me = this;
      var info = me.data
      data = {
        id: info.id,
        outletCode: info.outletCode,
        serviceName: info.serviceName,
        servicePrice: info.servicePrice,
        marketPrice: info.marketPrice,
        costPrice: info.costPrice,
        remark: info.remark,
        serviceTag: info.serviceTag == true ? 1 : 0,
        orgCode: info.orgCode,
        dayTime: info.dayTimeIndex,
      }
      console.log(data);
      WXEXT.request(API_SERVER + API_api.outletServiceItemsave, data, '', me.callback)
    }

  },
  //保存回调
  callback: function(data) {
    console.log(data);
    WXEXT.showModal('', '保存成功', false, '', '', wx.navigateBack());
  },
  //获取详情回调
  outletdetailback: function(data) {
    console.log(data)
    var info = data;
    var dayTime = this.data.dayTime;
    if (!cui.isEmpty(info.dayTime) && info.dayTime == 1) {
      dayTime[0].checked = 'true';
      dayTime[1].checked = null;
    } else {
      dayTime[0].checked = null;
      dayTime[1].checked = 'true';
    }
    this.setData({
      id: cui.isEmpty(info.id) ? '' : info.id,
      outletCode: cui.isEmpty(info.outletCode) ? '' : info.outletCode,
      serviceName: cui.isEmpty(info.serviceName) ? '' : info.serviceName,
      servicePrice: cui.isEmpty(info.servicePrice) ? '' : info.servicePrice,
      marketPrice: cui.isEmpty(info.marketPrice) ? '' : info.marketPrice,
      costPrice: cui.isEmpty(info.costPrice) ? '' : info.costPrice,
      remark: cui.isEmpty(info.remark) ? '' : info.remark,
      serviceTag: cui.isEmpty(info.serviceTag) ? false : info.serviceTag == 1 ? true : false,
      orgCode: cui.isEmpty(info.orgCode) ? '' : info.orgCode,
      dayTime: dayTime
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
    }
    if (options.id) {
      me.setData({
        id: options.id
      })
      WXEXT.request(API_SERVER + API_api.outletServiceItemdetail, {
        id: options.id
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