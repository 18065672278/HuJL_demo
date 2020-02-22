// src/pages/identityinfor/index.js
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
    id: '',
    name: '',
    ethnic: '',
    certNum: "",
    photoFirst: "",
    photoSecond: "",
    remark: "",
    genderArray: ['男', '女'],
    genderIndex: 0,
    birthday: '2016-09-01',
    address: '',
    issueUnit: '',
    FilePaths: ['', ''],
    FileId: ['', ''],
    removeshow: [false, false],

    //有效开始日期
    validityStartDate: "2016-09-01",

    //有效结束日期
    validityEndDate: "2016-09-01",
  },
  //姓名
  inputeidtName: function(e) {
    this.data.name = e.detail.value
  },
  //地址
  inputeidtAddress: function(e) {
    this.data.address = e.detail.value
  },
  //性别
  bindgenderChange: function(e) {
    this.setData({
      genderIndex: e.detail.value
    })
  },
  //民族
  inputeidtEthnic: function(e) {
    this.setData({
      ethnic: e.detail.value
    })
  },
  //出生日期
  birthdaySelect: function(e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  //证号
  inputCertNum: function(e) {
    this.data.certNum = e.detail.value
  },

  //有效开始日期
  validityStartSelect: function(e) {
    this.setData({
      validityStartDate: e.detail.value
    })
  },

  //有效结束日期
  validityEndSelect: function(e) {
    this.setData({
      validityEndDate: e.detail.value
    })
  },

  //发证单位
  inputissueUnit: function(e) {
    this.data.issueUnit = e.detail.value
  },

  //身份证图ID
  inputphotoFirst: function(e) {
    this.data.photoFirst = e.detail.value
  },

  //身份证副页图ID
  inputphotoSecond: function(e) {
    this.data.photoSecond = e.detail.value
  },

  //说明
  inputremark: function(e) {
    this.data.remark = e.detail.value
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
    var me = this;
    var info = me.data;
    var identityCert, data;
    if (info.name == "" || info.name.length == 0) {
      WXEXT.showModal('', "姓名不能为空", false);
      return false;
    } else if (info.FilePaths[0] == "" || info.FilePaths[0].length == 0) {
      WXEXT.showModal('', "请上传身份证正面", false);
      return false;
    } else if (info.FilePaths[1] == "" || info.FilePaths[1] == 0) {
      WXEXT.showModal('', "请上传身份证背面", false);
      return false;
    } else {
      var istrue = WXYZ.IDcard(this.data.certNum, '', '证件号');
      console.log(istrue)
      if (istrue) {
        wx.getStorage({
          key: 'userId',
          success: function(res) {
            console.log(res.data)
            data = {
              "id": info.id,
              "userId": res.data,
              "certType": 1,
              "remark": info.remark,
              "identityCert.name": info.name,
              "identityCert.gender": info.genderIndex,
              "identityCert.ethnic": info.ethnic,
              "identityCert.birthday": info.birthday,
              "identityCert.address": info.address,
              "identityCert.certNum": info.certNum,
              "identityCert.validityStartDate": info.validityStartDate,
              "identityCert.validityEndDate": info.validityEndDate,
              "identityCert.issueUnit": info.issueUnit,
              "identityCert.photoPositiveId": info.FileId[0],
              "identityCert.photoNegativeId": info.FileId[1]
            };
            WXEXT.request(API_SERVER + API_api.certsave, data, '', me.callback)
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
  //查询详情回调
  certdetailback: function(data) {
    console.log(data);
    var FileId = [],
      FilePaths = [],
      removeshow = [false, false];
    var info = data;
    FileId.push(cui.isEmpty(info.photoPositiveId) ? '' : info.photoPositiveId, cui.isEmpty(info.photoNegativeId) ? '' : info.photoNegativeId);
    if (!cui.isEmpty(info.photos) && !cui.isEmpty(FileId.toString())) {
      if (info.photos.length == 1) {
        FilePaths.push(info.photos[0].url)
      } else {
        FilePaths = WXEXT.photo(cui.isEmpty(info.photos) ? [] : info.photos, FileId.toString())
      }
    }
    if (FileId.length > 0) {
      FileId.forEach(function(v, i) {
        if (v != "") {
          removeshow[i] = true;
        }
      })
    }
    this.setData({
      id: cui.isEmpty(info.certId) ? '' : info.certId,
      remark: cui.isEmpty(info.remark) ? '' : info.remark,
      name: cui.isEmpty(info.name) ? '' : info.name,
      genderIndex: cui.isEmpty(info.gender) ? 0 : info.gender,
      nationalityIndex: cui.isEmpty(info.nationality - 1) ? 0 : info.nationality - 1,
      birthday: cui.isEmpty(info.birthday) ? '' : info.birthday,
      address: cui.isEmpty(info.address) ? '' : info.address,
      driverCarIndex: cui.isEmpty(info.driverCarLevel) ? 0 : info.driverCarLevel,
      certNum: cui.isEmpty(info.certNum) ? '' : info.certNum,
      archivesNum: cui.isEmpty(info.archivesNum) ? '' : info.archivesNum,
      fieldworkEndDate: cui.isEmpty(info.fieldworkEndDate) ? '' : info.fieldworkEndDate,
      validityStartDate: cui.isEmpty(info.validityStartDate) ? '' : info.validityStartDate,
      validityEndDate: cui.isEmpty(info.validityEndDate) ? '' : info.validityEndDate,
      firstLicenseDate: cui.isEmpty(info.firstLicenseDate) ? '' : info.firstLicenseDate,
      issueUnit: cui.isEmpty(info.issueUnit) ? '' : info.issueUnit,
      nextResetDate: cui.isEmpty(info.nextResetDate) ? '' : info.nextResetDate,
      nextMedicalDate: cui.isEmpty(info.nextMedicalDate) ? '' : info.nextMedicalDate,
      FileId,
      FilePaths,
      removeshow
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id)
    var me = this;
    if (options.id) {
      this.setData({
        id: options.id
      })
      WXEXT.request(API_SERVER + API_api.certdetail, {
        id: options.id
      }, '', me.certdetailback)
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