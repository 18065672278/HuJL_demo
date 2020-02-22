// src/pages/user/attestHO/index.js
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
    name: '',
    orgCode: '',
    contact: '',
    mobile: '',
    address: '',
    latitude: '',
    longitude: '',
    remark: '',
    region: ['', '', ''],
    FilePaths: ['', '', '', '', '', '', '', '', ''],
    FileId: ['', '', '', '', '', '', '', '', ''],
    removeshow: [false, false, false, false, false, false, false, false, false],
  },
  //网点名称
  inputName: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  //组织编码
  bindRegionChange: function(e) {
    console.log(e)
    let orgCode = '';
    if (!cui.isEmpty(e.detail.code[2])) {
      orgCode = e.detail.code[2];
    } else if (!cui.isEmpty(e.detail.code[1])) {
      orgCode = e.detail.code[1];
    } else {
      orgCode = cui.isEmpty(e.detail.code[0]) ? '' : e.detail.code[0];
    }
    this.setData({
      region: e.detail.value,
      orgCode: orgCode
    })
  },
  //联系人姓名
  inputContact: function(e) {
    this.setData({
      contact: e.detail.value
    })
  },
  //联系方式
  inputMobile: function(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  //网点地址
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
  //附件上传
  ImagePreview: function(e) {
    var me = this;
    var FilePaths = this.data.FilePaths;
    var removeshow = this.data.removeshow;
    var num = e.currentTarget.dataset.id;
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
      WXEXT.uploadImg(API_SERVER + API_api.attachmentsave, 'car', me.imgcallback, num)
    }
  },
  imgcallback: function(res, filePath, num) {
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
    var FileId = this.data.FileId;
    var FilePaths = this.data.FilePaths;
    var removeshow = this.data.removeshow;
    var num = e.currentTarget.dataset.id;
    FileId[num] = '';
    FilePaths[num] = '';
    removeshow[num] = false;
    me.setData({
      FileId,
      FilePaths,
      removeshow
    })
  },
  //说明
  inputremark: function(e) {
    this.data.remark = e.detail.value
  },
  //删除服务车
  delCarItem: function(e) {
    console.log(e.currentTarget.dataset)
  },
  //编辑服务车
  editCarItem: function(e) {
    console.log(e.currentTarget.dataset)
  },
  //添加服务车
  addCarItem: function(e) {
    wx.navigateTo({
      url: '../attestNO/index',
    })
  },
  //保存
  subAction: function(e) {
    let phone = this.data.mobile;
    if (cui.isEmpty(this.data.name)) {
      WXEXT.showModal('', "网点名称不能为空", false);
    } else if (cui.isEmpty(this.data.orgCode)) {
      WXEXT.showModal('', "组织编码不能为空", false);
    } else if (cui.isEmpty(this.data.contact)) {
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
          identityType: 2,
          identifyPhotoPositiveId: info.FileId[0],
          identifyPhotoNegativeId: info.FileId[1],
          businessLicensePhotoId: info.FileId[2],
          openingPhotoId: info.FileId[3],
          driverPhotoFirstId: info.FileId[4],
          driverPhotoSecondId: info.FileId[5],
          vehiclePhotoId: info.FileId[6],
          remark: info.remark,
          'outletInfo.name': info.name,
          'outletInfo.orgCode': info.orgCode,
          'outletInfo.contact': info.contact,
          'outletInfo.mobile': info.mobile,
          'outletInfo.address': info.address,
          'outletInfo.latitude': info.latitude,
          'outletInfo.longitude': info.longitude,
          'outletInfo.photoIds': info.FileId[7],
          'outletInfo.thumbPhotoId': info.FileId[8]
        }
        WXEXT.request(API_SERVER + API_api.usersaveIdentifyInfo, data, '', me.callback)
      }
    }
  },
  //保存回调
  callback: function(data) {
    console.log(data);
    WXEXT.showModal('', '提交成功，请等待审核', false, '', '', function() {
      app.globalData.hasLogin = true;
      wx.switchTab({
        url: '../../../index/index',
      })
    });
  },
  //获取详情回调
  detailback: function(data) {
    console.log(data)
    var info = data.outletInfo;
    let FileId = [],
      FilePaths = [],
      removeshow = [];
    FileId[0] = cui.isEmpty(data.identifyPhotoPositiveId) ? '' : data.identifyPhotoPositiveId;
    FileId[1] = cui.isEmpty(data.identifyPhotoNegativeId) ? '' : data.identifyPhotoNegativeId;
    FileId[2] = cui.isEmpty(data.businessLicensePhotoId) ? '' : data.businessLicensePhotoId;
    FileId[3] = cui.isEmpty(data.openingPhotoId) ? '' : data.openingPhotoId;
    FileId[4] = cui.isEmpty(data.driverPhotoFirstId) ? '' : data.driverPhotoFirstId;
    FileId[5] = cui.isEmpty(data.driverPhotoSecondId) ? '' : data.driverPhotoSecondId;
    FileId[6] = cui.isEmpty(data.vehiclePhotoId) ? '' : data.vehiclePhotoId;
    FileId[7] = cui.isEmpty(info.photoIds) ? '' : info.photoIds;
    FileId[8] = cui.isEmpty(info.thumbPhotoId) ? '' : info.thumbPhotoId;
    if (!cui.isEmpty(data.photos) && !cui.isEmpty(FileId)) {
      if (data.photos.length == 1) {
        FilePaths.push(data.photos[0].url)
      } else {
        FilePaths = WXEXT.photo(cui.isEmpty(data.photos) ? [] : data.photos, FileId)
      }
    }
    if (FileId.length > 0) {
      FileId.forEach(function(v, i) {
        if (FileId[i] != "" && FileId[i].length != 0) {
          removeshow[i] = true
        } else {
          removeshow[i] = false
        }
      })
    }
    this.setData({
      address: cui.isEmpty(info.address) ? '' : info.address,
      companyId: cui.isEmpty(info.companyId) ? '' : info.companyId,
      contact: cui.isEmpty(info.contact) ? '' : info.contact,
      id: cui.isEmpty(info.id) ? '' : info.id,
      latitude: cui.isEmpty(info.latitude) ? '' : info.latitude,
      longitude: cui.isEmpty(info.longitude) ? '' : info.longitude,
      name: cui.isEmpty(info.name) ? '' : info.name,
      orgCode: cui.isEmpty(info.orgCode) ? '' : info.orgCode,
      region: cui.isEmpty(info.orgFullName) ? '' : info.orgFullName,
      outletCode: cui.isEmpty(info.outletCode) ? '' : info.outletCode,
      remark: cui.isEmpty(data.remark) ? '' : data.remark,
      mobile: cui.isEmpty(info.mobile) ? '' : info.mobile,
      FileId,
      FilePaths,
      removeshow
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var me = this;
    WXEXT.request(API_SERVER + API_api.usergetIdentifyInfo, '', '', me.detailback)
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