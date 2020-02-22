// src/pages/user/attestNO/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fFilePaths: '',
    rFilePaths: '',
    dFilePaths: '',
    drFilePaths: '',

    removeshowf: false,
    removeshowr: false,
    removeshowd: false,
    removeshowdr: false,

    checkboxArr: [{
      id: '1',
      name: '选项A',
      show: true,
      checked: false
    }, {
      id: '2',
      name: '选项B',
      show: true,
      checked: false
    }, {
      id: '3',
      name: '选项C',
      show: true,
      checked: false
    }, {
      id: '4',
      name: '选项D',
      show: true,
      checked: false
    }, {
      id: '5',
      name: '选项E',
      show: true,
      checked: false
    }, {
      id: '6',
      name: '选项F',
      show: true,
      checked: false
    }, {
      id: '7',
      name: '选项D',
      show: true,
      checked: false
    }, {
      id: '8',
      name: '选项E',
      show: true,
      checked: false
    }, {
      id: '9',
      name: '选项F',
      show: true,
      checked: false
    }, {
      id: '10',
      name: '选项D',
      show: true,
      checked: false
    }, {
      id: '11',
      name: '选项E',
      show: true,
      checked: false
    }, {
      id: '12',
      name: '选项F',
      show: true,
      checked: false
    }, {
      id: '13',
      name: '选项D',
      show: true,
      checked: false
    }, {
      id: '14',
      name: '选项E',
      show: true,
      checked: false
    }, {
      id: '15',
      name: '选项F',
      show: true,
      checked: false
    }],
    serviceRadiusArray: ['10KM', '20KM', '30KM', '40KM', '50KM'],
    serviceRadiusIndex: 0,
  },
  //上传身份证正面照
  handleFImagePreview: function(e) {
    var _this = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        _this.setData({
          fFilePaths: res.tempFilePaths,
          removeshowf: true
        })
      },
    })
  },
  //移除身份证正面照
  removeFImage: function(e) {
    this.setData({
      fFilePaths: '',
      removeshowf: false
    })
  },
  //上传身份证反面照
  handleRImagePreview: function(e) {
    var _this = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        _this.setData({
          rFilePaths: res.tempFilePaths,
          removeshowr: true
        })
      },
    })
  },
  //移除身份证反面照
  removeRImage: function(e) {
    this.setData({
      rFilePaths: '',
      removeshowr: false
    })
  },
  //上传行驶证照(正面)
  handleDImagePreview: function(e) {
    var _this = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        _this.setData({
          dFilePaths: res.tempFilePaths,
          removeshowd: true
        })
      },
    })
  },
  //移除行驶证照(正面)
  removeDImage: function(e) {
    this.setData({
      dFilePaths: '',
      removeshowd: false
    })
  },
  //上传行驶证照(副页)
  handleDRImagePreview: function(e) {
    var _this = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        _this.setData({
          drFilePaths: res.tempFilePaths,
          removeshowdr: true
        })
      },
    })
  },
  //移除行驶证照(副页)
  removeDRImage: function(e) {
    this.setData({
      drFilePaths: '',
      removeshowdr: false
    })
  },
  //服务项目选泽
  checkbox: function(e) {
    var index = e.currentTarget.dataset.index; //获取当前点击的下标
    var checkboxArr = this.data.checkboxArr; //选项集合
    checkboxArr[index].checked = !checkboxArr[index].checked; //改变当前选中的checked值
    this.setData({
      checkboxArr: checkboxArr
    });
  },
  //服务半径
  bindserviceRadiusChange: function(e) {
    this.setData({
      serviceRadiusIndex: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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