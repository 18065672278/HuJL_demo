// src/pages/personnelDetail/index.js
import WXEXT from '../../components/common/common.js';
import cui from '../../components/base/cui.js';
import WXYZ from "../../components/verification/verification.js"
const app = getApp();
const API_SERVER = app.getConfig("API_SERVER");
const API_api = app.getConfig("api");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    mobile: '',
    bindTime: '',
    unbindTime: '',
    remark: ''
  },
  callback: function(data) {
    console.log(data);
    this.setData({
      name: cui.isEmpty(data.name) ? '' : data.name,
      mobile: cui.isEmpty(data.mobile) ? '' : data.mobile,
      bindTime: cui.isEmpty(data.bindTime) ? '' : data.bindTime,
      unbindTime: cui.isEmpty(data.unbindTime) ? '' : data.unbindTime,
      remark: cui.isEmpty(data.remark) ? '' : data.remark,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    if (options.id && options.type) {
      this.setData({
        type: options.type,
        id: options.id
      })
      //网点outletEmployeeDetail

      //车队fleetEmployeeDetail
      let api = '',
        me = this,
        data = {
          id: options.id
        };
      if (options.type = 'outlet') {
        api = API_api.outletEmployeeDetail
      } else if (options.type = 'fleet') {
        api = API_api.fleetEmployeeDetail
      }
      WXEXT.request(API_SERVER + api, data, '', me.callback)
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