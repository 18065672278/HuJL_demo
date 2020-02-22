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
  //价格修改
  inputPrice: function(e) {
    let reg = /^[0-9]*$/;
    var serviceItems = this.data.serviceItems;
    for (var i = 0; i < serviceItems.length; i++) {
      if (serviceItems[i].serviceName == e.currentTarget.dataset.servicename) {
        serviceItems[i].originalPrice = e.detail.value;
      }
    }
    this.setData({
      serviceItems
    }, this.totalPrice())
  },
  //服务项目
  inputServiceName: function(e) {
    this.data.serviceName = e.detail.value
  },
  //服务数量
  inputQuantity: function(e) {
    let reg = /^[0-9]*$/;
    this.setData({
      quantity: reg.test(e.detail.value) ? e.detail.value : ''
    })
  },
  //确定按钮
  sureBtn: function(e) {
    var me = this;
    var serviceItems1 = me.data.serviceItems;
    var serviceItem = {};
    if (me.data.serviceName == "") {
      wx.showToast({
        title: '请输入服务项目名称',
        icon: 'none',
        duration: 2000
      })
    } else if (me.data.quantity == "") {
      wx.showToast({
        title: '请输入服务数量',
        icon: 'none',
        duration: 2000
      })
    } else {
      for (var i = 0; i < serviceItems1.length; i++) {
        if (serviceItems1[i].serviceName == me.data.serviceName) {
          wx.showToast({
            title: '已有相同名称的服务项，请重新输入服务项名称',
            icon: 'none',
            duration: 2000
          })
          return false;
        }
      }
      serviceItem.serviceCode = '';
      serviceItem.serviceName = me.data.serviceName;
      serviceItem.quantity = me.data.quantity;
      serviceItems1.push(serviceItem);
      console.log(serviceItems1);
      me.setData({
        serviceItems: serviceItems1
      }, me.aleat())
    }
  },
  aleat() {
    wx.showToast({
      title: '添加成功',
      icon: 'none',
      duration: 2000
    }, this.totalPrice());
    this.hideModal();
    this.setData({
      serviceName: '',
      quantity: ''
    })
  },
  //基础服务数量减
  delBtn: function(e) {
    if (!this.data.disabled) {
      return;
    }
    var serviceItems = this.data.serviceItems;
    for (var i = 0; i < serviceItems.length; i++) {
      if (serviceItems[i].serviceName == e.currentTarget.dataset.servicename) {
        serviceItems[i].quantity = serviceItems[i].quantity - 1 <= 0 ? 0 : serviceItems[i].quantity - 1;
      }
    }
    this.setData({
      serviceItems
    }, this.totalPrice())
  },
  //基础服务数量加
  addBtn: function(e) {
    if (!this.data.disabled) {
      return;
    }
    var serviceItems = this.data.serviceItems;
    for (var i = 0; i < serviceItems.length; i++) {
      if (serviceItems[i].serviceName == e.currentTarget.dataset.servicename) {
        serviceItems[i].quantity++;
      }
    }
    this.setData({
      serviceItems
    }, this.totalPrice());
  },
  // 隐藏遮罩层
  hideModal: function() {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

  /*显示*/
  showModal: function() {
    if (!this.data.disabled) {
      return;
    }
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
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
        //接单
        WXEXT.request(API_SERVER + API_api.orderserving, data, '', me.back);
        break;
      case 2:
        //完成服务
        WXEXT.request(API_SERVER + API_api.orderfinish, data, '', me.back);
        break;
      case 7:
        //确认签单
        WXEXT.request(API_SERVER + API_api.orderconfirm, data, '', me.back);
        break;
    }
  },
  //操作回调
  back(data) {
    console.log(data);
    wx.navigateBack({})
  },
  //是否确定取消订单
  ordercancel: function(e) {
    var me = this,
      data = {
        orderId: e.currentTarget.dataset.orderid,
        outletId: app.globalData.userInfo.outletList[0].id,
        cancelRemark: '取消'
      };
    wx.showModal({
      title: '',
      content: '是否确定取消订单？',
      success(res) {
        if (res.confirm) {
          console.log('网点点击确定')
          WXEXT.request(API_SERVER + API_api.orderunBand, data, '', me.back)
        } else if (res.cancel) {
          console.log('网点点击取消')
        }
      }
    })
  },
  //网点服务完成
  outletSave: function(e) {
    var me = this,
      info = me.data,
      data, isserviceItem;
    var serviceItems = me.data.serviceItems;
    var items = [];
    for (var i = 0; i < serviceItems.length; i++) {
      if (serviceItems[i].quantity != 0) {
        isserviceItem = true;
        items.push(serviceItems[i]);
      }
    }
    serviceItems = items;
    data = {
      id: this.data.orderId
    }
    for (var i = 0; i < items.length; i++) {
      data["serviceItems[" + i + "].serviceCode"] = serviceItems[i].serviceCode;
      data["serviceItems[" + i + "].serviceName"] = serviceItems[i].serviceName;
      data["serviceItems[" + i + "].servicePrice"] = serviceItems[i].originalPrice;
      data["serviceItems[" + i + "].quantity"] = serviceItems[i].quantity;
    }
    WXEXT.request(API_SERVER + API_api.orderadjust, data, '', me.saveback)
  },
  //网点服务完成回调
  saveback: function(data) {
    console.log(data);
    WXEXT.request(API_SERVER + API_api.orderfinish, data, '', me.back)
  },
  //查询信息回调
  rescueOrderdetailback: function(data) {
    console.log(data)
    var info = data;
    var FileId = cui.isEmpty(info.photoIds) ? [] : (info.photoIds).split(','),
      FilePaths = [],
      disabled = this.data.disabled;
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