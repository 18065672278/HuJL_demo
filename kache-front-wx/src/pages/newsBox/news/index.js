import WXEXT from '../../../components/common/common.js';
import WXYZ from "../../../components/verification/verification.js";
import cui from "../../../components/base/cui.js";
const app = getApp();
const API_SERVER = app.getConfig("API_SERVER");
const API_api = app.getConfig("api");
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
    queryNext: false, //是否下拉
    searchNext: false, //是否搜索
    lastPage: false, //是否最后一页
    startX: 0, //开始坐标
    startY: 0
  },
  //查询
  query: function(queryNext, searchNext) {
    /* let me = this,
      pageNum = me.data.pageNum,
      searchinput = me.data.searchinput;
    console.log(searchinput, pageNum)
    this.setData({
      queryNext: queryNext,
      searchNext: searchNext
    })
    let s = {
      pageNum: pageNum,
      pageSize: 10
    }
    if (searchNext && searchinput.length != 0) {
      s.carNum = searchinput
    }
    WXEXT.request(API_SERVER + API_api.carquery, s, '', me.callback) */
    this.callback()
  },
  //查询回调
  callback: function(data) {
    setTimeout(function() {
      wx.hideLoading();
    })
    let queryNext = this.data.queryNext,
      searchNext = this.data.searchNext,
      favorList = this.data.favorList,
      result = data;
    if (queryNext) {
      if (result.length == 0) {
        this.setData({
          lastPage: true
        })
        wx.showToast({
          title: '已经没有更多数据了！',
          icon: 'none'
        })
        return;
      } else {
        for (var i = 0; i < result.length; i++) {
          favorList.push(result[i])
        }
      }
    } else if (searchNext) {
      if (result.length == 0) {
        this.setData({
          lastPage: true
        })
        wx.showToast({
          title: '已经没有更多数据了！',
          icon: 'none'
        })
        favorList = data;
      } else {
        favorList = data;
      }
    }
    favorList: [{
      id: 1,
      auth: '',
      title: '欧曼超级重卡：自带C位光环 生来如此惊艳！',
      imgUrl: '/src/assets/images/truck.jpg',
      word: '茫茫车海，滚滚车流，只会开车撩人是不够的，关键是， 你还要学会时刻保持优雅。有了欧曼超级重卡的这几种智能黑科技解锁更多开车新姿势。 ',
      date: '2019年9月20日'
    }, {
      id: 2,
      auth: '',
      title: '上汽红岩：5G时代 你的驾照将失效？',
      imgUrl: '/src/assets/images/truck.jpg',
      word: '“4G改变生活，5G改变世界。”作为通信技术更新的重要节点，5G将全面提升网络的速率、稳定性、可靠性和低延时，实现包括3D通信、4K+超高清视频观看、在线AR/VR、云办公、云游戏等全新体验，人们的生活方式将会发生翻天覆地的变化。',
      date: ' 2019年9月17日'
    }]
    this.productList(favorList)
  },
  //格式化json串（favorList=》product_list）
  productList: function(favorList) {
    console.log(favorList)
    let product_list = [];
    for (let i = 0, length = favorList.length; i < length; i++) {
      let listA = {};
      listA.id = favorList[i].id;
      listA.img = "https://i8.mifile.cn/v1/a1/7dc38112-bbf4-f3fa-db39-5f4674f9d0d4!720x792.webp";
      listA.firstRowL = cui.isEmpty(favorList[i].title) ? "" : favorList[i].title;
      listA.firstRowR = "";
      listA.secondRowL = "";
      listA.secondRowR = cui.isEmpty(favorList[i].data) ? "" : favorList[i].data;
      listA.remark = "";
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
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(data) {
    wx.showLoading({
      title: '玩命加载中',
    })
    this.query(true, false)
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
    if (!this.data.lastPage) {
      console.log(this.data.lastPage)
      wx.showLoading({
        title: '玩命加载中',
      })
      this.setData({
        queryNext: true,
        pageNum: this.data.pageNum + 1 // 一般上拉触底是为了加载更多分页数据，所以这里页数自增
      })
      let searchNext = this.data.searchNext;
      this.query(true, searchNext);
    } else {
      wx.showToast({
        title: '已经没有更多数据了！',
        icon: 'none'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})