/*
 * Copyright (c) 2019,create by mingzi.li@ucarinc.com
 * All rights reserved.
 */
import WXEXT from '../../../components/common/common.js';
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
  data: {
    longitude: 116.397390,
    latitude: 39.908860,
    markers: [],
    scale: 18,
    lastLongitude: 0,
    lastLatitude: 0,
    polyline: [],
    distanceArr: []
  },
  /*生命周期函数--监听页面加载*/
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    });
    //获取位置信息
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log(res)
        let longitude = res.longitude;
        let latitude = res.latitude;
        this.setData({
          longitude,
          latitude
        })
        //模拟请求单车数据
        setTimeout(() => {
          this.tocreate(res);
          this.mapCtx.getCenterLocation({
            type: 'gcj02',
            success: (res) => {
              this.nearestBic(res)
            }
          })
          wx.hideLoading();
        }, 1000)
      }
    })
  },
  onReady() {
    // 创建map上下文  保存map信息的对象
    this.mapCtx = wx.createMapContext('myMap');
  },
  onHide: function() {
    /* wx.removeStorage({
      key: 'bicycle',
      success: (res) => {
        console.log('模拟单车数据已清除')
      }
    }) */
  },
  //复位按钮  已完成
  toReset() {
    console.log('重置定位')
    //调回缩放比，提升体验
    var promise = new Promise((resolve) => {
      this.mapCtx.moveToLocation();
      resolve('调回缩放比')
    })
    promise.then((value) => {
      setTimeout(() => {
        this.setData({
          scale: 18
        })
      }, 1000)
    })

  },
  // 跳转到个人中心
  toList() {
    wx.navigateTo({
      url: '../outletList/index',
    })
  },
  // 扫码开锁
  /* toScan() {
    if (!app.globalData.loginStatus) {
      wx.showModal({
        title: '提示',
        content: '请先登录',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login'
            })
          }
        }
      })
    } else {
      wx.scanCode({
        success: (res) => {
          onlyFromCamera: false,
          console.log('扫码成功');
          wx.navigateTo({
            url: '/pages/unlock/unlock',
          })
        }
      })
    }
  }, */
  regionchange(e) {
    // 拿到起点经纬度
    if (e.type == 'begin') {
      this.mapCtx.getCenterLocation({
        type: 'gcj02',
        success: (res) => {
          this.setData({
            lastLongitude: res.longitude,
            lastLatitude: res.latitude,
            polyline: []
          })
        }
      })
    }
    // 拿到当前经纬度
    if (e.type == 'end') {
      this.mapCtx.getCenterLocation({
        type: 'gcj02',
        success: (res) => {
          let lon_distance = res.longitude - this.data.lastLongitude;
          let lat_distance = res.latitude - this.data.lastLatitude;
          // console.log(lon_distance,lat_distance)
          // 判断屏幕移动距离，如果超过设定的阈值，模拟刷新单车
          if (Math.abs(lon_distance) >= 0.0035 || Math.abs(lat_distance) >= 0.0022) {
            console.log('刷新单车')
            this.setData({
              // 清空
              markers: []
            })
            this.tocreate(res)
          }
        }
      })
    }
    this.mapCtx.getCenterLocation({
      type: 'gcj02',
      success: (res) => {
        this.nearestBic(res)
      }
    })
  },
  //随机函数，根据所在地  模拟单车经纬度数据伪造单车
  tocreate(res) {
    // 随机单车数量设置
    let markers = this.data.markers;
    let me = this;
    console.log(markers)
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: res.latitude,
        longitude: res.longitude
      },
      success: function(res) {
        //获取当前地址成功
        console.log(res);
        let orgCode = res.result.ad_info.adcode,
          latitude = res.result.location.lat,
          longitude = res.result.location.lng;
        if (orgCode != "" && res.latitude != "" && res.longitude != "") {
          var s = {
            orgCode: orgCode,
            latitude: latitude,
            longitude: longitude,
            pageNum: 1,
            pageSize: 50
          }
          WXEXT.request(API_SERVER + API_api.outletquery, s, '', function (data) {
            var ran = data;
            for (let i = 0; i < ran.length; i++) {
              // 定义一个临时单车对象
              var t_bic = {
                "id": 0,
                "title": '去这里',
                "iconPath": "/src/assets/images/outlet/map-bicycle.png",
                "callout": {},
                "latitude": 0,
                "longitude": 0,
                "width": 52.5,
                "height": 30
              }
              // 随机
              var sign_a = Math.random();
              var sign_b = Math.random();
              // 单车分布密集度设置
              var a = (Math.ceil(Math.random() * 99)) * 0.00002;
              var b = (Math.ceil(Math.random() * 99)) * 0.00002;
              t_bic.id = i;
              t_bic.title = ran[i].name;
              t_bic.longitude = ran[i].longitude;
              t_bic.latitude = ran[i].latitude;
              markers.push(t_bic);
            }
            // console.log(markers)
            //将模拟的单车数据暂时存储到本地
            wx.setStorageSync('bicycle', markers);
            me.setData({
              markers
            })
          })
        }
      }
    });

  },
  // 自动判断距离最近的单车的方法
  nearestBic(res) {
    // 找出最近的单车
    let markers = this.data.markers;
    let min_index = 0;
    let distanceArr = [];
    for (let i = 0; i < markers.length; i++) {
      let lon = markers[i].longitude;
      let lat = markers[i].latitude;
      // 计算距离
      let t = Math.sqrt((lon - res.longitude) * (lon - res.longitude) + (lat - res.latitude) * (lat - res.latitude));
      let distance = t;
      // 将每一次计算的距离加入数组 distanceArr
      distanceArr.push(distance)
    }
    //从距离数组中找出最小值，js是弱类型，数字不能直接比较大小。需要进行转换用 parseFloat（小数）  | parseInt（整数）
    let min = distanceArr[0];
    for (let i = 0; i < distanceArr.length; i++) {
      if (parseFloat(distanceArr[i]) < parseFloat(min)) {
        min = distanceArr[i];
        min_index = i;
      }
    }
    // console.log(distanceArr)
    // console.log(min_index)
    let callout = `markers[${min_index}].callout`;
    // 清楚旧的气泡，设置新气泡
    wx.getStorage({
      key: 'bicycle',
      success: (res) => {
        this.setData({
          markers: res.data,
          [callout]: {
            "content": '离我最近',
            "color": "#ffffff",
            "fontSize": "16",
            "borderRadius": "50",
            "padding": "10",
            "bgColor": "#0082FCaa",
            "display": 'ALWAYS'
          }
        })
      }
    })
  },
  //点击图标事件
  toVisit(e) {
    console.log(e)
    let bic = e.markerId;
    wx.getStorage({
      key: 'bicycle',
      success: (res) => {
        console.log(res);
        this.route(res.data[bic])
      }
    })
  },
  route(bic) {
    console.log(bic);
    wx.showModal({
      title: '导航',
      content: '时候要导航到' + bic.title + '门店?',
      success: function(sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          console.log('用户点击确定');
          wx.openLocation({
            latitude: bic.latitude,
            longitude: bic.longitude,
          })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    // 获取当前中心经纬度
    this.mapCtx.getCenterLocation({
      success: (res) => {
        console.log(res);
      }
    })
  }
})