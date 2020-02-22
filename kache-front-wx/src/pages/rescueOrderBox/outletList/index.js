import WXEXT from '../../../components/common/common.js';
import WXYZ from "../../../components/verification/verification.js";
import cui from "../../../components/base/cui.js";
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
    pageNum: 1,
    searchinput: '',
    favorList: [],
    product: {
      hasSelect: false,
      product_list: [],
    },
    startX: 0, //开始坐标
    startY: 0,
    //组织编码
    region: ['北京', '北京', '全部'],
    regionSelect: '北京'
  },
  tomap: function() {
    wx.navigateTo({
      url: '../outlet/index'
    })
  },
  //区域选择
  bindRegionChange: function(e) {
    console.log(e);
    let length = parseInt(e.detail.code.length) - 1;
    if (length < 0) {
      WXEXT.showModal('', "地域选择错误，请重新选择", false);
    } else {
      let regionSelect = e.detail.value[length],
        orgCode = e.detail.code[length].replace(/(0+)$/g, "");
      this.setData({
        region: e.detail.value,
        regionSelect: regionSelect,
        orgCode: orgCode
      })
      this.query(true);
    }
  },
  touchstart: function(e) {
    return false;
  },
  touchmove: function(e) {
    return false;
  },
  //编辑
  showProductDetail: function(e) {
    console.log(e);
    let outletId = e.currentTarget.dataset.index,
      outletCode = "";
    this.data.product.product_list.forEach(function(v, i) {
      if (v.id == outletId) {
        outletCode = v.outletCode;
        wx.navigateTo({
          url: '../outletDetail/index?outletCode=' + outletCode,
        })
      } else {
        return;
      }
    })
  },
  //选中
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let product_list = this.data.product.product_list;
    const selected = product_list[index].selected;
    product_list.forEach(function(v, i) {
      v.selected = false;
    });
    product_list[index].selected = !selected;
    this.setData({
      "product.product_list": product_list
    });
  },
  //选中后数据传到前一个页面（确定按钮）
  checkOut: function(e) {
    let me = this;
    let product_list = me.data.product.product_list;
    product_list.forEach(function(v, i) {
      if (v.selected == true) {
        console.log(v);
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage.setData({
          outletId: v.id,
          outletName: v.firstRowL,
          outletCode: v.outletCode
        })
        prevPage.rescueOrder();
        wx.navigateBack({});
      }
    });
  },
  //查询
  query: function(bindRegionChange) {
    var me = this;
    var s = {
      orgCode: me.data.orgCode,
      latitude: me.data.latitude,
      longitude: me.data.longitude,
      pageNum: me.data.pageNum,
      pageSize: 10
    }
    if (bindRegionChange) {
      let favorList = [];
      this.setData({
        favorList
      })
    }
    WXEXT.request(API_SERVER + API_api.outletquery, s, '', me.callback)
  },
  //查询回调
  callback: function(data) {
    console.log(data);
    setTimeout(function() {
      wx.hideLoading();
    }, 500)
    var favorList = this.data.favorList;
    var result = data;
    console.log(result)
    for (var i = 0; i < result.length; i++) {
      favorList.push(result[i])
    }
    console.log(favorList)
    this.productList(favorList)
  },
  //搜索框内容
  input1: function(e) {
    this.data.searchinput = e.detail.value;
  },
  //搜索
  search: function() {
    var me = this;
    var s = {
      orgCode: me.data.orgCode,
      latitude: me.data.latitude,
      longitude: me.data.longitude,
      pageNum: me.data.pageNum,
      pageSize: 10
    }
    if (me.data.searchinput != "") {
      s.name = me.data.searchinput
    } else {
      WXEXT.showModal('', '搜索内容不能为空', false);
      return;
    }
    WXEXT.request(API_SERVER + API_api.outletquery, s, '', me.searchBack)
  },
  //搜索回调
  searchBack: function(data) {
    console.log(data)
    var favorList = data;
    this.productList(favorList)
  },
  //点击导航
  mapGo: function(e) {
    console.log(e)
    wx.openLocation({
      latitude: e.currentTarget.dataset.latitude,
      longitude: e.currentTarget.dataset.longitude,
    })
  },
  //格式化json串（favorList=》product_list）
  productList: function(favorList) {
    console.log(favorList)
    let product_list = [];
    for (let i = 0, length = favorList.length; i < length; i++) {
      let listA = {};
      listA.id = favorList[i].id;
      listA.img = "https://i8.mifile.cn/v1/a1/7dc38112-bbf4-f3fa-db39-5f4674f9d0d4!720x792.webp";
      listA.firstRowL = cui.isEmpty(favorList[i].name) ? "" : favorList[i].name;
      listA.firstRowR = "";
      listA.secondRowL = cui.isEmpty(favorList[i].contact) ? "" : favorList[i].contact;
      listA.secondRowR = cui.isEmpty(favorList[i].mobile) ? "" : favorList[i].mobile;
      listA.remark = cui.isEmpty(favorList[i].address) ? "" : favorList[i].address;
      listA.outletCode = cui.isEmpty(favorList[i].outletCode) ? "" : favorList[i].outletCode;
      listA.isTouchMove = false;
      listA.selected = false;
      listA.unSelect = true;
      product_list.push(listA);
    }
    console.log(product_list)
    this.setData({
      "product.product_list": product_list
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    let me = this;
    if (options.select == 'true') {
      me.setData({
        "product.hasSelect": true,
        region: (options.region).split(','),
        regionSelect: options.regionSelect,
        orgCode: options.orgCode,
        latitude: options.latitude,
        longitude: options.longitude
      })
      me.query();
    } else {
      wx.getLocation({
        success: function(res) {
          console.log(res)
          let latitude = res.latitude;
          let longitude = res.longitude;
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
              me.setData({
                region,
                regionSelect,
                orgCode,
                latitude,
                longitude
              })
              me.query();
            },
            fail: function(res) {
              console.log('获取当前地址失败');
            }
          });
        }
      })
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
  onShow: function(data) {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      favorList: [],
      pageNum: 1
    })
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
    wx.showLoading({
      title: '玩命加载中',
    })
    this.setData({
      pageNum: this.data.pageNum + 1 // 一般上拉触底是为了加载更多分页数据，所以这里页数自增
    });
    this.query() // 查询方法
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})