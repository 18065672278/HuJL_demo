// src/pages/truck/index.js
import WXEXT from '../../../components/common/common.js';
import cui from '../../../components/base/cui.js';
var WxParse = require('../../../components/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsTitle: '上汽红岩：5G时代 你的驾照将失效？',
    newsAuth: 'HuJL',
    newsDate: '2019年9月17日',
    content: '<div style="color:red">“4G改变生活，5G改变世界。”</div>作为通信技术更新的重要节点，5G将全面提升网络的速率、稳定性、可靠性和低延时，实现包括3D通信、4K+超高清视频观看、在线AR/VR、云办公、云游戏等全新体验，人们的生活方式将会发生翻天覆地的变化。',
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
    var that = this,
      content = this.data.content;
    WxParse.wxParse('content', 'html', content, that, 5);
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