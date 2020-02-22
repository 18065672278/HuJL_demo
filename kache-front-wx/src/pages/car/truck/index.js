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
  //添加
  addBtn: function(e) {
    wx.navigateTo({
      url: '../truckEdit/index',
    })
  },
  //编辑
  showProductDetail: function(e) {
    console.log(e);
    wx.navigateTo({
      url: '../truckEdit/index?id=' + e.currentTarget.dataset.index,
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
        if (me.data.selectType == 'fleet') {
          let s = {
            fleetId: me.data.fleetId,
            carId: v.id
          }
          WXEXT.request(API_SERVER + API_api.fleetCarsaveBandInfo, s, '', function(data) {
            wx.showToast({
              title: '绑定成功',
            }, wx.navigateBack({}))
          })
        } else if (me.data.selectType == 'rescueOrder') {
          var pages = getCurrentPages();
          var currPage = pages[pages.length - 1]; //当前页面
          var prevPage = pages[pages.length - 2]; //上一个页面
          prevPage.setData({
            carNum: v.firstRowL
          });
          wx.navigateBack({})
        }
      }
    });
  },
  //左滑开始
  touchstart: function(e) {
    this.data.product.product_list.map(item => {
      if (item.isTouchMove) {
        item.isTouchMove = false;
      }
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      "product.product_list": this.data.product.product_list
    })
  },
  //滑动事件处理
  touchmove(e) {
    var
      index = e.currentTarget.dataset.index, //当前索引
      startX = this.data.startX, //开始X坐标
      startY = this.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = this.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    this.data.product.product_list.forEach(function(v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    this.setData({
      "product.product_list": this.data.product.product_list
    })
  },
  angle(start, end) {
    var X = end.X - start.X,
      Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(Y / X) / (2 * Math.PI);
  },
  //删除
  delProductItem(e) {
    const index = e.currentTarget.dataset.index;
    const id = e.currentTarget.dataset.id;
    let me = this;
    WXEXT.showModal('', "是否确定删除", true, '确定删除', '取消', function(data) {
      if (data.confirm) {
        console.log(index);
        me.data.product.product_list.splice(index, 1);
        me.setData({
          "product.product_list": me.data.product.product_list
        });
        WXEXT.request(API_SERVER + API_api.cardelete, {
          ids: id
        }, '', me.delcallback)
      }
    });

  },
  //删除回调
  delcallback: function(data) {
    var me = this;
    console.log(data);
    wx.showToast({
      title: '删除成功',
    })
  },
  //查询
  query: function(queryNext, searchNext) {
    let me = this,
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
    WXEXT.request(API_SERVER + API_api.carquery, s, '', me.callback)
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
    this.productList(favorList)
  },
  //搜索框内容
  input1: function(e) {
    this.data.searchinput = e.detail.value;
  },
  //搜索
  search: function() {
    this.setData({
      pageNum: 1,
      searchNext: true,
      lastPage: false
    })
    this.query(false, true);
  },
  //格式化json串（favorList=》product_list）
  productList: function(favorList) {
    console.log(favorList)
    let product_list = [];
    for (let i = 0, length = favorList.length; i < length; i++) {
      let listA = {};
      listA.id = favorList[i].id;
      listA.img = "https://i8.mifile.cn/v1/a1/7dc38112-bbf4-f3fa-db39-5f4674f9d0d4!720x792.webp";
      listA.firstRowL = cui.isEmpty(favorList[i].carNum) ? "" : favorList[i].carNum;
      listA.firstRowR = "";
      listA.secondRowL = cui.isEmpty(favorList[i].carNum) ? "" : favorList[i].carNum;
      listA.secondRowR = cui.isEmpty(favorList[i].yearlyInspectionTime) ? "" : favorList[i].yearlyInspectionTime;
      listA.remark = cui.isEmpty(favorList[i].remark) ? "" : favorList[i].remark;
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
    if (options.select == 'true') {
      this.setData({
        "product.hasSelect": true,
        fleetId: options.fleetId,
        selectType: options.type
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