// src/pages/truck/index.js
import WXEXT from '../../../components/common/common.js';
import cui from '../../../components/base/cui.js';
import WXYZ from "../../../components/verification/verification.js"
const app = getApp();
const API_SERVER = app.getConfig("API_SERVER");
const API_api = app.getConfig("api");
// 引入SDK核心类
var QQMapWX = require('../../../assets/js/common/qqmap-wx-jssdk.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: API_api.qqMapkey //申请的开发者秘钥key
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    outletId: '',
    outletName: '',
    animationData: '',
    showModalStatus: '',
    outletCode: '',
    address: '',
    latitude: '',
    longitude: '',
    mapType: 3,
    orderType: 1,
    carNum: '请填写车牌号/车架号',
    mobile: '',
    remark: '',
    totalPrice: 0,
    //网点编码
    outletId: '',
    //附件
    FileId: [],
    FilePaths: [],
    serviceItems: [],
    serviceName: '',
    quantity: '',
    display: false,
  },
  //救援位置
  addressSelect: function(e) {
    var me = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res);
        me.setData({
          address: res.address + '(' + res.name + ')',
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
    })
  },
  //选择车牌
  selectCarNum: function(e) {
    wx.navigateTo({
      url: '../../car/truck/index?select=true&&type=rescueOrder',
    })
  },
  /* 输入框聚焦显示车牌号键盘 */
  handleFocus: function(e) {
    console.log(e);
    this.setData({
      showKeyboard: true
    })
  },
  /* 车牌号键盘点击事件 */
  setNumber: function(e) {
    console.log(e);
    this.setData({
      carNum: e.detail.value == "" ? '请填写车牌号/车架号' : e.detail.value
    })
  },
  //手机号
  inputMobile: function(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  //选择网点
  selectOutlet: function(e) {
    let latitude = this.data.latitude,
      longitude = this.data.longitude;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function(res) {
        //获取当前地址成功
        console.log(res);
        let orgCode = res.result.ad_info.adcode;
        let region = [res.result.address_component.province, res.result.address_component.city, res.result.address_component.district]
        let regionSelect = res.result.address_component.district;
        wx.navigateTo({
          url: '../outletList/index?select=true&&orgCode=' + orgCode + '&&latitude=' + latitude + '&&longitude=' + longitude + '&&region=' + region + '&&regionSelect=' + regionSelect,
        })
      }
    });
  },
  //清除已选择网点
  clearOutlet: function(e) {
    this.setData({
      outletId: '',
      outletName: '',
      outletCode: ''
    });
    this.rescueOrder()
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
    var serviceItems = this.data.serviceItems;
    for (var i = 0; i < serviceItems.length; i++) {
      if (serviceItems[i].serviceName == e.currentTarget.dataset.servicename) {
        serviceItems[i].quantity = serviceItems[i].quantity - 1 <= 0 ? 0 : serviceItems[i].quantity - 1;
      }
    }
    this.setData({
      serviceItems
    })
    this.totalPrice()
  },
  //基础服务数量加
  addBtn: function(e) {
    var serviceItems = this.data.serviceItems;
    for (var i = 0; i < serviceItems.length; i++) {
      if (serviceItems[i].serviceName == e.currentTarget.dataset.servicename) {
        serviceItems[i].quantity++;
      }
    }
    this.setData({
      serviceItems
    });
    this.totalPrice()
  },
  //附件上传
  ImageAdd: function(e) {
    let me = this,
      FilePaths = me.data.FilePaths;
    if (FilePaths.length >= 5) {
      WXEXT.showModal('', '图片最多上传5张', false);
    } else {
      WXEXT.uploadImg(API_SERVER + API_api.attachmentsave, 'car', me.imgcallback)
    }
  },
  imgcallback: function(res, filePath) {
    console.log(res)
    console.log(filePath); //chooseImage返回参数
    var FileId = this.data.FileId;
    var FilePaths = this.data.FilePaths;
    FileId.push(res.id);
    FilePaths.push(res.url);
    this.setData({
      FileId,
      FilePaths
    })
    wx.showToast({
      title: '附件上传成功'
    })
  },
  //删除附件
  removeImage: function(e) {
    var me = this;
    var FileId = this.data.FileId;
    var FilePaths = this.data.FilePaths;
    var num = e.currentTarget.dataset.id;
    FileId.splice(num, 1);
    FilePaths.splice(num, 1);
    me.setData({
      FileId,
      FilePaths
    })
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
  //说明
  inputremark: function(e) {
    this.data.remark = e.detail.value
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
  //保存
  subAction: function(e) {
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
    if (info.address == "" && info.latitude == "" && info.longitude == "") {
      WXEXT.showModal('', "请选择救援位置", false);
    } else if (!isserviceItem) {
      WXEXT.showModal('', "请选择服务项目", false);
    } else {
      var issure = WXYZ.carID(info.carNum, "", "", true)
      if (issure) {
        var issure1 = WXYZ.TelFormat(info.mobile, "", "", true);
        if (issure1) {
          data = {
            outletId: info.outletId,
            address: info.address,
            latitude: info.latitude,
            longitude: info.longitude,
            mapType: info.mapType,
            carNum: info.carNum,
            mobile: info.mobile,
            photoIds: info.FileId,
            orderType: info.orderType,
            remark: info.remark,
          }
          for (var i = 0; i < items.length; i++) {
            data["serviceItems[" + i + "].serviceCode"] = serviceItems[i].serviceCode;
            data["serviceItems[" + i + "].serviceName"] = serviceItems[i].serviceName;
            data["serviceItems[" + i + "].quantity"] = serviceItems[i].quantity;
          }
          WXEXT.request(API_SERVER + API_api.ordersave, data, '', me.callback)
        }
      }
    }
  },
  //保存回调
  callback: function(data) {
    console.log(data);
    wx.showToast({
      title: '下单成功',
    }, wx.navigateTo({
      url: '/src/pages/rescueOrderBox/rescueOrder/index',
    }))
  },
  //救援单服务项
  rescueOrder: function(e) {
    var me = this;
    var info = me.data;
    var data;
    if (me.data.outletCode == "") {
      data = {};
      WXEXT.request(API_SERVER + API_api.outletServiceItemdefault, data, '', me.rescueOrderback)
    } else {
      data = {
        outletCode: me.data.outletCode
      }
      WXEXT.request(API_SERVER + API_api.outletServiceItemquery, data, '', me.rescueOrderback)
    }
  },
  //救援单服务项回调
  rescueOrderback: function(data) {
    var me = this;
    console.log(data)
    var serviceList = data;
    var serviceItems1 = [];
    for (var i = 0; i < serviceList.length; i++) {
      var serviceItem = {};
      serviceItem.serviceCode = serviceList[i].serviceCode;
      serviceItem.serviceName = serviceList[i].serviceName;
      serviceItem.servicePrice = serviceList[i].servicePrice;
      serviceItem.quantity = 0;
      serviceItems1.push(serviceItem);
    }
    console.log(serviceItems1);
    me.setData({
      serviceItems: serviceItems1
    })
  },
  //计算总价
  totalPrice: function() {
    let serviceItems = this.data.serviceItems;
    let sum = 0;
    for (var i = 0; i < serviceItems.length; i++) {
      sum = sum + ((serviceItems[i].servicePrice == '待定' || serviceItems[i].servicePrice == undefined ? 0 : serviceItems[i].servicePrice) * serviceItems[i].quantity)
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
    //获取当前位置
    var me = this,
      address = "",
      latitude = "",
      longitude = "",
      identityType = '';
    if (options.outletCode) {
      me.setData({
        outletCode: options.outletCode,
        orderType: 2
      })
    }
    if (options.id) {
      me.setData({
        outletId: options.id
      })
    }
    if (cui.isEmpty(app.globalData.userInfo.fleetList[0].id)) {
      wx.showToast({
        title: '车队权限问题[ID]请联系管理员',
      })
      return;
    }else{
      identityType = 1
    }
    this.setData({
      mobile: app.globalData.userInfo.mobile,
      identityType
    })
    this.rescueOrder();
    wx.getLocation({
      success: function(res) {
        latitude = res.latitude;
        longitude = res.longitude;
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function(res) {
            //获取当前地址成功
            console.log(res);
            address = res.result.address;
            me.setData({
              latitude,
              longitude,
              address
            })
          },
          fail: function(res) {
            console.log('获取当前地址失败');
          }
        });
      },
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