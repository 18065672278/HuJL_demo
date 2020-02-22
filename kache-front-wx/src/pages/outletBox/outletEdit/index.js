// src/pages/fleet/index.js
import WXEXT from '../../../components/common/common.js';
import cui from '../../../components/base/cui.js';
import WXYZ from "../../../components/verification/verification.js"
const app = getApp();
const API_SERVER = app.getConfig("API_SERVER");
const API_api = app.getConfig("api");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    outletCode: '',
    name: '',
    companyId: '',
    contact: '',
    mobile: '',
    orgCode: '',
    address: '',
    latitude: '',
    longitude: '',
    remark: '',
    //组织编码
    region: ['福建省', '厦门市', '湖里区'],
    orgCode: '350206',
    customItem: '全部',
    FilePaths: ['', '', '', ''],
    FileId: ['', '', '', ''],
    removeshow: [false, false, false, false]
  },

  //网点名称
  inputName: function(e) {
    this.data.name = e.detail.value
  },
  //企业ID
  selectCompany: function(e) {
    wx.navigateTo({
      url: '../../legalPersonBox/legalPerson/index?select=true',
    })
  },
  //服务项选择
  selectOutletItem: function(e) {
    wx.navigateTo({
      url: '../serviceItemBox/serviceItem/index?select=true&outletCode=' + this.data.outletCode,
    })
  },
  //标签选择
  selectLabelItem: function(e) {
    wx.navigateTo({
      url: '../outletLabelBox/outletLabel/index?select=true&outletCode=' + this.data.outletCode,
    })
  },
  //负责人姓名
  inputContact: function(e) {
    this.data.contact = e.detail.value
  },
  //负责人联系电话
  inputMobile: function(e) {
    this.data.mobile = e.detail.value
  },
  //区域编码
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
  //地址
  selectAddress: function(e) {
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
  //说明
  inputremark: function(e) {
    this.data.remark = e.detail.value
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
      WXEXT.uploadImg(API_SERVER + API_api.attachmentsave, 'outlet', me.imgcallback, num)
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
  //保存
  subAction: function(e) {
    let phone = this.data.mobile;
    if (cui.isEmpty(this.data.name)) {
      WXEXT.showModal('', "网点名称不能为空", false);
    } else if (cui.isEmpty(this.data.contact)) {
      WXEXT.showModal('', "联系人姓名不能为空", false);
    } else if (cui.isEmpty(this.data.orgCode)) {
      WXEXT.showModal('', "区域编码不能为空", false);
    } else if (cui.isEmpty(this.data.address)) {
      WXEXT.showModal('', "地址不能为空", false);
    } else {
      //验证电话号码格式是否正确
      var istrue = WXYZ.TelFormat(phone);
      if (istrue) {
        var data;
        var me = this;
        var info = me.data
        var photoIds = [],
          thumbPhotoId;
        var FileId = this.data.FileId;
        for (var i = 0; i < FileId.length; i++) {
          if (i < 3 && FileId[i] != "") {
            photoIds.push(FileId[i]);
          }
        }
        thumbPhotoId = FileId[3];
        wx.getStorage({
          key: 'userId',
          success: function(res) {
            data = {
              id: info.id,
              companyId: info.companyId,
              name: info.name,
              mobile: info.mobile,
              contact: info.contact,
              orgCode: info.orgCode,
              address: info.address,
              latitude: info.latitude,
              longitude: info.longitude,
              remark: info.remark,
              photoIds: photoIds,
              thumbPhotoId: thumbPhotoId
            }
            console.log(data);
            WXEXT.request(API_SERVER + API_api.outletsave, data, '', me.callback)
          }
        })
      }
    }

  },
  //保存回调
  callback: function(data) {
    console.log(data);
    WXEXT.showModal('', '保存成功', false, '', '', wx.navigateBack());
  },
  //获取详情回调
  outletdetailback: function(data) {
    console.log(data)
    var info = data,
      removeshow = this.data.removeshow,
      FileId = this.data.FileId,
      FilePaths = this.data.FilePaths;
    if (!cui.isEmpty(info.photoIds)) {
      FileId = (info.photoIds).split(',');
      FilePaths = WXEXT.photo(cui.isEmpty(info.photos) ? [] : info.photos, info.photoIds)
    } else {
      FileId = ['', '', ''];
      FilePaths = ['', '', ''];
    }
    if (!cui.isEmpty(info.thumbPhotoId)) {
      FileId[3] = info.thumbPhotoId;
      FilePaths[3] = WXEXT.photo(cui.isEmpty(info.photos) ? [] : info.photos, info.thumbPhotoId)
    } else {
      FileId[3] = '';
      FilePaths[3] = '';
    }
    console.log(FileId)
    for (var i = 0; i < FileId.length; i++) {
      if (FileId[i].length != 0 && FileId[i] != "") {
        removeshow[i] = true;
      }
    }
    this.setData({
      id: cui.isEmpty(info.id) ? '' : info.id,
      outletCode: cui.isEmpty(info.outletCode) ? '' : info.outletCode,
      companyId: cui.isEmpty(info.companyId) ? '' : info.companyId,
      name: cui.isEmpty(info.name) ? '' : info.name,
      mobile: cui.isEmpty(info.mobile) ? '' : info.mobile,
      contact: cui.isEmpty(info.contact) ? '' : info.contact,
      orgCode: cui.isEmpty(info.orgCode) ? '' : info.orgCode,
      address: cui.isEmpty(info.address) ? '' : info.address,
      latitude: cui.isEmpty(info.latitude) ? '' : info.latitude,
      longitude: cui.isEmpty(info.longitude) ? '' : info.longitude,
      remark: cui.isEmpty(info.remark) ? '' : info.remark,
      FileId,
      FilePaths,
      removeshow
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var me = this;
    if (options.outletCode) {
      me.setData({
        outletCode: options.outletCode
      })
      WXEXT.request(API_SERVER + API_api.outletdetail, {
        outletCode: options.outletCode
      }, '', me.outletdetailback)
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
