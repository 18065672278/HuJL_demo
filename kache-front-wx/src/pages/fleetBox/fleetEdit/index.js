// src/pages/fleet/index.js
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
    fleetId: '',
    companyId: '',
    fleetName: '',
    principalName: '',
    principalTel: '',
    remark: '',
    //组织编码
    region: ['北京', '北京', '全部'],
    //车队类型
    fleetTypeArray: ['个人', '公司'],
    fleetTypeIndex: 1,
    isShow: true
  },
  //企业ID
  inputFleetName: function(e) {
    this.data.fleetName = e.detail.value
  },
  //组织编码
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  //车队名称
  inputCompanyId: function(e) {
    this.data.companyId = e.detail.value
  },
  //车队类型
  bindFleetTypeChange: function(e) {
    var isShow;
    if (e.detail.value == 1) {
      isShow = true;
    } else {
      isShow = false
    }
    this.setData({
      fleetTypeIndex: e.detail.value,
      isShow
    })
  },
  //企业ID
  selectCompany: function(e) {
    wx.navigateTo({
      url: '../../legalPersonBox/legalPerson/index?select=true',
    })
  },
  //负责人姓名
  inputPrincipalName: function(e) {
    this.data.principalName = e.detail.value
  },
  //负责人联系电话
  inputPrincipalTel: function(e) {
    this.data.principalTel = e.detail.value
  },
  //说明
  inputremark: function(e) {
    this.data.remark = e.detail.value
  },
  //绑定网点
  bindOutlet: function(e) {
    wx.navigateTo({
      url: '../bindOutlet/index?fleetId=' + this.data.fleetId,
    })
  },
  bindCar: function(e) {
    wx.navigateTo({
      url: '../bindCar/index?fleetId=' + this.data.fleetId,
    })
  },
  //保存
  subAction: function(e) {
    let phone = this.data.principalTel;
    if (cui.isEmpty(this.data.fleetName)) {
      WXEXT.showModal('', "车队名称不能为空", false);
    } else if (parseInt(this.data.fleetTypeIndex) && cui.isEmpty(this.data.companyId)) {
      console.log(this.data.fleetTypeIndex, cui.isEmpty(this.data.companyId))
      WXEXT.showModal('', "企业ID不能为空", false);
    } else if (cui.isEmpty(this.data.principalName)) {
      WXEXT.showModal('', "负责人姓名不能为空", false);
    } else {
      //验证电话号码格式是否正确
      var istrue = WXYZ.TelFormat(phone);
      if (istrue) {
        var data;
        var me = this;
        var info = me.data
        wx.getStorage({
          key: 'userId',
          success: function(res) {
            data = {
              id: info.fleetId,
              companyId: info.companyId,
              fleetName: info.fleetName,
              orgCode: info.region,
              fleetType: parseInt(info.fleetTypeIndex + 1),
              principalName: info.principalName,
              principalTel: info.principalTel,
              remark: info.remark
            }
            console.log(data);
            WXEXT.request(API_SERVER + API_api.fleetsave, data, '', me.callback)
          }
        })
      }
    }

  },
  //保存回调
  callback: function(data) {
    console.log(data);
    WXEXT.showModal('', '保存成功', false, '', '', wx.navigateBack());
  },
  //获取详情回调
  fleetdetailback: function(data) {
    console.log(data)
    var info = data;
    var isShow = false;
    if (!cui.isEmpty(info.companyId)) {
      isShow = true;
    }
    this.setData({
      companyId: cui.isEmpty(info.companyId) ? '' : info.companyId,
      fleetName: cui.isEmpty(info.fleetName) ? '' : info.fleetName,
      principalName: cui.isEmpty(info.principalName) ? '' : info.principalName,
      principalTel: cui.isEmpty(info.principalTel) ? '' : info.principalTel,
      remark: cui.isEmpty(info.remark) ? '' : info.remark,
      //组织编码
      region: cui.isEmpty(info.orgCode) ? '' : (info.orgCode).split(','),
      //车队类型
      fleetTypeIndex: cui.isEmpty(info.fleetType) ? 0 : parseInt(info.fleetType - 1),
      isShow
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var me = this;
    if (options.id) {
      me.setData({
        fleetId: options.id
      })
      WXEXT.request(API_SERVER + API_api.fleetdetail, {
        id: options.id
      }, '', me.fleetdetailback)
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