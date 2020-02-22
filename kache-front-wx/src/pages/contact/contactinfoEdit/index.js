// src/pages/contactinfo/index.js
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
    personId: '',
    address: "",
    orgCode: "",
    addressAlias: "",
    zipCode: "",
    num1: '',
    num2: '',
    isDefault: "",
    remark: "",
    longitude: '请选择精度',
    latitude: '请选择纬度',
    defaultContact: false,
    //地址类型
    typeArray: ['户籍地', '现居住地', '办公地'],
    typeIndex: 0,

    //地址选择初始化信息
    region: ['北京市', '北京市', '全部'],
    customItem: '',
  },

  //地址类型
  bindTypeChange: function(e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },

  inputnum1: function(e) {
    this.setData({
      num1: e.detail.value
    })
  },
  inputnum2: function(e) {
    this.setData({
      num2: e.detail.value
    })
  },
  //地址选择
  bindRegionChange: function(e) {
    console.log(e);
    this.setData({
      region: e.detail.value,
      orgCode: e.detail.code[2]
    })
  },

  //详细地址
  inputeAddress: function(e) {

    this.data.address = e.detail.value
  },

  //地址别名
  inputeAddressAlias: function(e) {

    this.data.addressAlias = e.detail.value
  },

  //邮政编码
  inputezipCode: function(e) {

    this.data.zipCode = e.detail.value
  },
  //精度纬度选择
  mapSelect: function(e) {
    var me = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res);
        me.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
    })
  },
  //说明
  inputremark: function(e) {
    this.data.remark = e.detail.value
  },
  //是否默认
  switchChange: function(e) {
    console.log(e)
    var defaultContact = this.data.defaultContact;
    this.setData({
      defaultContact: e.detail.value
    })
  },
  //保存
  subAction: function(e) {
    var a = WXYZ.TelFormat(this.data.num1); //邮政编码验证
    if (a) {
      var data;
      var me = this;
      var info = me.data
      wx.getStorage({
        key: 'userId',
        success: function(res) {
          data = {
            id: info.id,
            personId: info.personId,
            type: parseInt(info.typeIndex) + 1,
            address: info.region + '[address]' + info.address,
            addressAlias: info.addressAlias,
            orgCode: info.orgCode,
            zipCode: info.zipCode,
            num1: info.num1,
            num2: info.num2,
            defaultContact: (info.defaultContact) ? 1 : 0,
            longitude: info.longitude,
            latitude: info.latitude,
            remark: info.remark
          }
          console.log(data);
          WXEXT.request(API_SERVER + API_api.contactsave, data, '', me.callback)
        }
      })
    }

  },
  //保存回调
  callback: function(data) {
    console.log(data);
    WXEXT.showModal('', '保存成功', false, '', '', wx.navigateBack())
  },
  //获取详情回调
  contactdetailback: function(data) {
    console.log(data)
    var info = data;
    var addressList = cui.isEmpty(info.address) ? '' : info.address,
      region, address;
    if (addressList != "") {
      var startIdx = addressList.indexOf('[address]');
      region = (addressList.substring(0, startIdx)).split(',');
      address = addressList.substring(startIdx + 9)
    }
    this.setData({
      typeIndex: cui.isEmpty(info.type - 1) ? 0 : info.type - 1,
      region,
      address,
      addressAlias: cui.isEmpty(info.addressAlias) ? '' : info.addressAlias,
      orgCode: cui.isEmpty(info.orgCode) ? '' : info.orgCode,
      zipCode: cui.isEmpty(info.zipCode) ? '' : info.zipCode,
      num1: cui.isEmpty(info.num1) ? '' : info.num1,
      num2: cui.isEmpty(info.num2) ? '' : info.num2,
      defaultContact: cui.isEmpty(info.defaultContact) ? false : info.defaultContact == 1 ? true : false,
      longitude: cui.isEmpty(info.longitude) ? '请选择精度' : info.longitude,
      latitude: cui.isEmpty(info.latitude) ? '请选择纬度' : info.latitude,
      remark: cui.isEmpty(info.remark) ? '' : info.remark,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var me = this;
    if (options.personId) {
      me.setData({
        personId: options.personId
      })
    }
    if (options.id) {
      me.setData({
        id: options.id
      })
      WXEXT.request(API_SERVER + API_api.contactdetail, {
        id: options.id
      }, '', me.contactdetailback)
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