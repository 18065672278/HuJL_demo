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
    orgCode: '',
    labelName: '',
    labelValue: '',
    orderNo: '',
    //组织编码
    region: ['北京', '北京', '全部'],
  },

  //标签名称
  inputLabelName: function(e) {
    this.data.labelName = e.detail.value
  },

  //标签值
  inputLabelValue: function(e) {
    this.data.labelValue = e.detail.value
  },
  //排序编号
  inputOrderNo: function(e) {
    this.data.orderNo = e.detail.value
  },
  //组织编码
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value,
      orgCode: e.detail.code[2]
    })
  },
  //保存
  subAction: function(e) {
    if (cui.isEmpty(this.data.labelName)) {
      WXEXT.showModal('', "标签名称不能为空", false);
    }
    if (cui.isEmpty(this.data.labelValue)) {
      WXEXT.showModal('', "标签值不能为空", false);
    } else {
      var data;
      var me = this;
      var info = me.data
      data = {
        id: info.id,
        outletCode: info.outletCode,
        labelName: info.labelName,
        labelValue: info.labelValue,
        orderNo: info.orderNo,
      }
      console.log(data);
      WXEXT.request(API_SERVER + API_api.outletLabelsave, data, '', me.callback)
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
    this.setData({
      id: cui.isEmpty(info.id) ? '' : info.id,
      outletCode: cui.isEmpty(info.outletCode) ? '' : info.outletCode,
      labelName: cui.isEmpty(info.labelName) ? '' : info.labelName,
      labelValue: cui.isEmpty(info.labelValue) ? '' : info.labelValue,
      orderNo: cui.isEmpty(info.orderNo) ? '' : info.orderNo,
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
      WXEXT.request(API_SERVER + API_api.outletLabeldetail, {
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