// src/pages/legalPerson/index.js
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
    companyId: '',
    creditCode: '',
    companyName: '',
    openingCertId: '',
    businessCertId: '',
    legalName: '',
    legalTel: '',
    personId: '',
    companyAddress: '',
    companyTel: '',
    companyEmpNum: '',
    companyEmail: '',
    companyContactName: '',
    companyContactTel: '',
    companySite: '',
    attachIds: '',
    dataSource: '',
    remark: '',
    basicShow: true,
    extendShow: false,
    region: ['北京', '北京', '全部'],
    //企业状态
    companyStatusArry: ['登记成立', '变更登记', '年检中', '吊销', '注销', '吊销中', '注销中'],
    companyStatusIndex: 0,
    //验证状态
    approveStatusArry: ['未验证', '已打款', '人工验证'],
    approveStatusIndex: 0

  },
  //控制基础信息显示
  isBasicShow: function(e) {
    this.setData({
      basicShow: !this.data.basicShow
    })
  },
  //控制扩展信息显示
  isExtendShow: function(e) {
    this.setData({
      extendShow: !this.data.extendShow
    })
  },
  //统一社会信用代码ID
  inputcreditCode: function(e) {
    this.data.creditCode = e.detail.value
  },
  //公司名称
  inputcompanyName: function(e) {
    this.data.companyName = e.detail.value
  },
  //行政编码
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  //法人代表人姓名
  inputlegalName: function(e) {
    this.data.legalName = e.detail.value
  },
  //法人选择
  personselect: function(e) {
    wx.navigateTo({
      url: '../../personBox/person/index?select=true',
    })
  },
  //法人代表人电话
  inputlegalTel: function(e) {
    this.data.legalTel = e.detail.value
  },


  //公司详细地址
  inputcompanyAddress: function(e) {
    this.data.companyAddress = e.detail.value
  },
  //企业状态
  bindcompanyStatusChange: function(e) {
    this.setData({
      companyStatusIndex: e.detail.value
    })
  },
  //公司电话
  inputcompanyTel: function(e) {
    this.data.companyTel = e.detail.value
  },
  //员工总数
  inputcompanyEmpNum: function(e) {
    this.data.companyEmpNum = e.detail.value
  },
  //电子邮箱
  inputcompanyEmail: function(e) {
    this.data.companyEmail = e.detail.value
  },

  //联系人姓名
  inputcompanyContactName: function(e) {
    this.data.companyContactName = e.detail.value
  },
  //联系人电话
  inputcompanyContactTel: function(e) {
    this.data.companyContactTel = e.detail.value
  },
  //公司网址
  inputcompanySite: function(e) {
    this.data.companySite = e.detail.value
  },
  //验证状态
  bindapproveStatusChange: function(e) {
    this.setData({
      approveStatusIndex: e.detail.value
    })
  },
  //数据来源
  inputdataSource: function(e) {
    this.data.dataSource = e.detail.value
  },
  //说明
  inputremark: function(e) {
    this.data.remark = e.detail.value
  },
  //保存
  subAction: function(e) {
    if (cui.isEmpty(this.data.companyName)) {
      WXEXT.showModal('', "公司名称不能为空", false);
    } else if (cui.isEmpty(this.data.creditCode)) {
      WXEXT.showModal('', "统一社会信用代码ID不能为空", false);
    } else if (cui.isEmpty(this.data.legalName)) {
      WXEXT.showModal('', "法人代表人姓名不能为空", false);
    } else {
      var istrue = WXYZ.TelFormat(this.data.legalTel, '', '法人代表人电话');
      var b = WXYZ.TelFormat(this.data.companyTel, '', '公司电话', false);
      var c = WXYZ.EmailFormat(this.data.companyEmail, '', '电子邮箱', false);
      var d = WXYZ.TelFormat(this.data.companyContactTel, '', '联系人电话', false);
      if (istrue) {
        var data;
        var me = this;
        var info = me.data;
        data = {
          id: info.companyId,
          creditCode: info.creditCode,
          companyName: info.companyName,
          legalName: info.legalName,
          legalTel: info.legalTel,
          openingCertId: info.openingCertId,
          businessCertId: info.businessCertId,
          personId: info.personId,
          orgCode: info.region,
          companyAddress: info.companyAddress,
          companyTel: info.companyTel,
          companyEmpNum: info.companyEmpNum,
          companyEmail: info.companyEmail,
          companyContactName: info.companyContactName,
          companyContactTel: info.companyContactTel,
          companySite: info.companySite,
          attachIds: info.attachIds,
          remark: info.remark
        }
        WXEXT.request(API_SERVER + API_api.firmsave, data, '', me.callback)
      }
    }
  },
  //保存回调
  callback: function(data) {
    WXEXT.showModal('', "保存成功", false, '', '', wx.navigateBack({}));
  },
  //获取详情回调
  firmdetailback: function(data) {
    var info = data;
    this.setData({
      attachIds: info.attachIds,
      companyAddress: info.companyAddress,
      companyContactName: info.companyContactName,
      companyContactTel: info.companyContactTel,
      companyEmail: info.companyEmail,
      companyName: info.companyName,
      companySite: info.companySite,
      companyTel: info.companyTel,
      creditCode: info.creditCode,
      companyId: info.id,
      legalName: info.legalName,
      legalTel: info.legalTel,
      region: (info.orgCode).split(','),
      remark: info.remark,
      companyStatusIndex: parseInt(info.status - 1),
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
      WXEXT.request(API_SERVER + API_api.firmdetail, {
        id: options.id
      }, '', me.firmdetailback)
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
