// src/pages/identityinfor/index.js
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
    personId: '',
    name: '',
    mobile: '',
    certNum: "",
    issueUnits: "",
    photoFirst: "",
    photoSecond: "",
    genderArray: ['男', '女'],
    genderIndex: 0,
    nationalityArray: ['中国', '外国'],
    nationalityIndex: 0,
    birthday: '2016-09-01',
    address: '',
    issueUnit: '',
    archivesNum: '',
    //准驾车型
    driverCarArray: ['A1', 'A2', 'A3', 'B1', 'B2', 'C1', 'C2', 'C3'],
    driverCarIndex: 0,
    FilePaths: ['', ''],
    FileId: ['', ''],
    removeshow: [false, false],
    //实习到期日期
    fieldworkEndDate: "2016-09-01",

    //有效开始日期
    validityStartDate: "2016-09-01",

    //有效结束日期
    validityEndDate: "2016-09-01",

    //初次领证日期
    firstLicenseDate: "2016-09-01",

    //下次清分日期
    nextResetDate: "2016-09-01",

    //下次体检日期
    nextMedicalDate: "2016-09-01",
  },
  //姓名
  inputeidtName: function(e) {
    this.data.name = e.detail.value
  },
  //电话
  inputeidtMobile: function(e) {
    this.data.mobile = e.detail.value
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
  //国籍
  bindNationalityChange: function(e) {
    this.setData({
      nationalityIndex: e.detail.value
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
  //验证
  yzCertNum: function(e) {
    var istrue = WXYZ.IDcard(this.data.certNum,'','',false);
    if (!istrue) {
      this.setData({
        certNum: ""
      })
    }
  },
  //档案号
  inputarchivesNum: function(e) {
    this.data.archivesNum = e.detail.value;
  },
  //准驾车型
  binddriverCarChange: function(e) {
    this.setData({
      driverCarIndex: e.detail.value
    })
  },
  //实习到期日
  fieldworkEndSelect: function(e) {
    this.setData({
      fieldworkEndDate: e.detail.value
    })
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

  //初次领证日期
  firstLicenseSelect: function(e) {
    this.setData({
      firstLicenseDate: e.detail.value
    })
  },

  //发证单位
  inputissueUnit: function(e) {
    this.data.issueUnit = e.detail.value
  },

  //下次清分日期
  nextResetSelect: function(e) {
    this.setData({
      nextResetDate: e.detail.value
    })
  },

  //下次体检日期
  nextMedicalSelect: function(e) {
    this.setData({
      nextMedicalDate: e.detail.value
    })
  },

  //驾照图ID
  inputphotoFirst: function(e) {
    this.data.photoFirst = e.detail.value
  },

  //驾照副页图ID
  inputphotoSecond: function(e) {
    this.data.photoSecond = e.detail.value
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
    } else if (info.certNum == "" || info.certNum.length == 0) {
      WXEXT.showModal('', "证号不能为空", false);
      return false;
    } else if (info.FilePaths[0] == "" || info.FilePaths[0].length == 0) {
      WXEXT.showModal('', "请上传驾驶证主页", false);
      return false;
    } else if (info.FilePaths[1] == "" || info.FilePaths[1] == 0) {
      WXEXT.showModal('', "请上传驾驶证附页", false);
      return false;
    } else {
      var data = {
        "personId": info.personId,
        "remark": info.remark,
        "driverCert.name": info.name,
        "driverCert.mobile": info.mobile,
        "driverCert.gender": info.genderIndex,
        "driverCert.nationality": info.nationalityIndex + 1,
        "driverCert.birthday": info.birthday,
        "driverCert.address": info.address,
        "driverCert.driverCarLevel": info.driverCarIndex,
        "driverCert.certNum": info.certNum,
        "driverCert.archivesNum": info.archivesNum,
        "driverCert.fieldworkEndDate": info.fieldworkEndDate,
        "driverCert.validityStartDate": info.validityStartDate,
        "driverCert.validityEndDate": info.validityEndDate,
        "driverCert.firstLicenseDate": info.firstLicenseDate,
        "driverCert.issueUnit": info.issueUnit,
        "driverCert.nextResetDate": info.nextResetDate,
        "driverCert.nextMedicalDate": info.nextMedicalDate,
        "driverCert.photoFirstId": info.FileId[0],
        "driverCert.photoSecondId": info.FileId[1]
      };
      WXEXT.request(API_SERVER + API_api.driversave, data, '', me.callback)
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
      removeshow = [];
    var info = data;
    FileId.push(cui.isEmpty(info.photoFirstId) ? '' : info.photoFirstId, cui.isEmpty(info.photoSecondId) ? '' : info.photoSecondId);
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
        } else {
          removeshow[i] = false;
        }
      })
    }
    this.setData({
      personId: cui.isEmpty(info.personId) ? '' : info.personId,
      remark: cui.isEmpty(info.remark) ? '' : info.remark,
      name: cui.isEmpty(info.name) ? '' : info.name,
      mobile: cui.isEmpty(info.mobile) ? '' : info.mobile,
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
        personId: options.id
      })
      WXEXT.request(API_SERVER + API_api.driverdetail, {
        personId: options.id
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