// src/pages/truck/index.js
import WXEXT from '../../../components/common/common.js';
import cui from '../../../components/base/cui.js';
const app = getApp();
const API_SERVER = app.getConfig("API_SERVER");
const API_api = app.getConfig("api");
import md5 from '../../../components/base/md5.js';
// 引入SDK核心类
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: '',
    showModalStatus: '',
    outletCode: '',
    outletId: '',
    address: '',
    latitude: '',
    longitude: '',
    mapType: 3,
    orderType: 1,
    carNum: '',
    mobile: '',
    remark: '',
    totalPrice: 0,
    //网点编码
    outletId: '',
    FileId: [],
    //附件
    FilePaths: [],
    serviceItems: [],
    serviceName: '',
    quantity: ''
  },
  //图片展示
  ImagePreview: function(e) {
    var me = this;
    var FilePaths = this.data.FilePaths;
    var num = e.currentTarget.dataset.id;
    //展示
    wx.previewImage({
      current: FilePaths[num], // 当前显示图片的http链接
      urls: FilePaths // 需要预览的图片http链接列表
    })
  },
  //订单编号
  copyOderNum: function(e) {
    wx.setClipboardData({
      data: this.data.orderNum,
      success: function(res) {}
    })
  },
  //救援位置
  mapGo: function(e) {
    if (this.data.latitude != "" && this.data.longitude != "") {
      wx.openLocation({
        latitude: this.data.latitude,
        longitude: this.data.longitude,
      })
    }
  },
  //操作
  subAction: function(e) {
    console.log(e.currentTarget.dataset);
    let me = this;
    let status = e.currentTarget.dataset.status;
    let orderId = e.currentTarget.dataset.orderid;
    let data = {
      orderId: orderId
    };
    switch (status) {
      case 1:
      case 2:
        //用户取消
        this.ordercancel(data);
        break;
      case 3:
      case 4:
        //WXEXT.request(API_SERVER + API_api.orderpay, data, '', me.back)
        //结算
        wx.showModal({
          title: '',
          content: '请选择支付方式',
          confirmText: '在线支付', //确认
          cancelText: '月结', //取消
          success: function(sm) {
            if (sm.confirm) {
              console.log('用户点击在线支付');
              WXEXT.request(API_SERVER + API_api.orderpay, data, '', me.back)
            } else if (sm.cancel) {
              console.log('用户点击月结');
              wx.navigateTo({
                url: '../monthly/index?orderId=' + me.data.orderId,
              })
            }
          }
        })
        break;
      case 5:
      case 6:
        //评价
        console.log('我要评价');
        wx.navigateTo({
          url: '../appraise/index?orderId=' + me.data.orderId,
        })
        break;
    }
  },
  //操作回调
  back(data) {
    console.log(data);
    wx.navigateBack({})
  },
  //是否确定取消订单
  ordercancel: function(data) {
    var me = this;
    data.cancelRemark = '取消';
    wx.showModal({
      title: '',
      content: '是否确定取消订单？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          WXEXT.request(API_SERVER + API_api.ordercancel, data, '', me.back)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //查询信息回调
  rescueOrderdetailback: function(data) {
    console.log(data)
    var info = data;
    var FileId = cui.isEmpty(info.photoIds) ? [] : (info.photoIds).split(','),
      FilePaths = [];
    if (!cui.isEmpty(info.photos) && !cui.isEmpty(info.photoIds)) {
      if (info.photos.length == 1) {
        FilePaths.push(info.photos[0].url)
      } else {
        FilePaths = WXEXT.photo(cui.isEmpty(info.photos) ? [] : info.photos, info.photoIds)
      }
    }
    this.setData({
      outletId: cui.isEmpty(info.outletId) ? "" : info.outletId,
      orderId: cui.isEmpty(info.id) ? "" : info.id,
      status: cui.isEmpty(info.status) ? "" : info.status,
      outletOrderStatus: cui.isEmpty(info.outletOrderStatus) ? "" : info.outletOrderStatus,
      orderNum: cui.isEmpty(info.orderNum) ? "" : info.orderNum,
      address: cui.isEmpty(info.address) ? "" : info.address,
      carNum: cui.isEmpty(info.carNum) ? "" : info.carNum,
      latitude: cui.isEmpty(info.latitude) ? "" : info.latitude,
      longitude: cui.isEmpty(info.longitude) ? "" : info.longitude,
      mobile: cui.isEmpty(info.mobile) ? "" : info.mobile,
      serviceItems: cui.isEmpty(info.serviceItems) ? "" : info.serviceItems,
      remark: cui.isEmpty(info.remark) ? "" : info.remark,
      FilePaths
    })
    this.totalPrice();
  },
  //计算总价
  totalPrice: function() {
    let serviceItems = this.data.serviceItems;
    let sum = 0;
    for (var i = 0; i < serviceItems.length; i++) {
      sum = sum + ((serviceItems[i].originalPrice == '待定' || serviceItems[i].originalPrice == undefined ? 0 : serviceItems[i].originalPrice) * serviceItems[i].quantity)
    }
    this.setData({
      totalPrice: sum
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    var me = this,
      data = {
        id: options.id
      };
    WXEXT.request(API_SERVER + API_api.orderdetail, data, '', me.rescueOrderdetailback)
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