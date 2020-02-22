// src/pages/user/attestC/index.js
import WXEXT from '../../../../components/common/common.js';
import cui from '../../../../components/base/cui.js';
import WXYZ from "../../../../components/verification/verification.js"
const app = getApp();
const API_SERVER = app.getConfig("API_SERVER");
const API_api = app.getConfig("api");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fleetName: '',
    principalName: '',
    principalTel: '',
    remark: '',
    //组织编码
    region: ['北京', '北京', '全部'],
    orgCode: '',
    FilePaths: ['', '', '', ''],
    FileId: ['', '', '', ''],
    removeshow: [false, false, false, false],
  },
  //组织编码
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value,
      orgCode: e.detail.code[2]
    })
  },
  //车队名称
  inputFleetName: function(e) {
    this.data.fleetName = e.detail.value
  },
  //负责人姓名
  inputPrincipalName: function(e) {
    this.data.principalName = e.detail.value
  },
  //负责人联系电话
  inputPrincipalTel: function(e) {
    this.data.principalTel = e.detail.value
  },
  //附件上传
  ImagePreview: function(e) {
    var me = this;
    var num = e.currentTarget.dataset.id;
    var FilePaths = this.data.FilePaths;
    var removeshow = this.data.removeshow;
    //判断时候有图片，有全屏展示，没有添加
    if (removeshow[num]) {
      var imgList = [];
      for (var i = 0; i < FilePaths.length; i++) {
        if (FilePaths[i] != "") {
          imgList.push(FilePaths[i])
        }
      }
      //展示
      wx.previewImage({
        current: FilePaths[num], // 当前显示图片的http链接
        urls: imgList // 需要预览的图片http链接列表
      })
    } else {
      //添加
      WXEXT.uploadImg(API_SERVER + API_api.attachmentsave, 'cert', me.imgcallback, num)
    }
  },
  imgcallback: function (res, filePath, num) {
    console.log(filePath); //chooseImage返回参数
    var FileId = this.data.FileId;
    var FilePaths = this.data.FilePaths;
    var removeshow = this.data.removeshow;
    FileId[num] = res.id;
    FilePaths[num] = res.url;
    removeshow[num] = true;
    this.setData({
      FileId,
      FilePaths,
      removeshow
    })
    wx.showToast({
      title: '附件上传成功'
    })
  },
  //删除附件
  removeImage: function(e) {
    var me = this;
    var FilePaths = this.data.FilePaths;
    var FileId = this.data.FileId;
    var removeshow = this.data.removeshow;
    var num = e.currentTarget.dataset.id;
    FilePaths[num] = '';
    FileId[num] = '';
    removeshow[num] = false;
    me.setData({
      FilePaths,
      FileId,
      removeshow
    })
  },
  //说明
  inputremark: function(e) {
    this.data.remark = e.detail.value
  },
  //保存
  subAction: function(e) {
    let phone = this.data.principalTel;
    if (cui.isEmpty(this.data.fleetName)) {
      WXEXT.showModal('', "车队名称不能为空", false);
    } else if (cui.isEmpty(this.data.orgCode)) {
      WXEXT.showModal('', "组织编码不能为空", false);
    } else if (cui.isEmpty(this.data.principalName)) {
      WXEXT.showModal('', "负责人姓名不能为空", false);
    } else if (cui.isEmpty(this.data.FileId[0])) {
      WXEXT.showModal('', "请上传法人证件照(正面)", false);
    } else if (cui.isEmpty(this.data.FileId[1])) {
      WXEXT.showModal('', "请上传法人证件照(背面)", false);
    } else {
      //验证电话号码格式是否正确
      var istrue = WXYZ.TelFormat(phone, '', '', true);
      if (istrue) {
        var data;
        var me = this;
        var info = me.data
        data = {
          identityType: 1,
          identifyPhotoPositiveId: info.FileId[0],
          identifyPhotoNegativeId: info.FileId[1],
          businessLicensePhotoId: info.FileId[2],
          openingPhotoId: info.FileId[3],
          remark: info.remark,
          'fleetInfo.fleetName': info.fleetName,
          'fleetInfo.orgCode': info.orgCode,
          'fleetInfo.principalName': info.principalName,
          'fleetInfo.principalTel': info.principalTel
        }
        WXEXT.request(API_SERVER + API_api.usersaveIdentifyInfo, data, '', me.callback)
      }
    }
  },
  //保存回调
  callback: function (data) {
    console.log(data);
    WXEXT.showModal('', '提交成功，请等待审核', false, '', '');
    app.globalData.hasLogin = true;
    wx.switchTab({
      url: '../../../index/index',
    })
  },
  //获取详情回调
  fleetdetailback: function (data) {
    console.log(data)
    var info = data;
    var isShow = false;
    if (!cui.isEmpty(info.companyId)) {
      isShow = true;
    }
    this.setData({
      companyId: cui.isEmpty(info.companyId) ? '' : info.companyId,
      fleetName: cui.isEmpty(info.fleetName) ? '' : info.fleetName,
      principalName: cui.isEmpty(info.principalName) ? '' : info.principalName,
      principalTel: cui.isEmpty(info.principalTel) ? '' : info.principalTel,
      remark: cui.isEmpty(info.remark) ? '' : info.remark,
      //组织编码
      region: cui.isEmpty(info.orgCode) ? '' : (info.orgCode).split(','),
      //车队类型
      fleetTypeIndex: cui.isEmpty(info.fleetType) ? 0 : parseInt(info.fleetType - 1),
      isShow
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var me = this;
    if (options.id) {
      me.setData({
        fleetId: options.id
      })
      WXEXT.request(API_SERVER + API_api.fleetdetail, {
        id: options.id
      }, '', me.fleetdetailback)
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