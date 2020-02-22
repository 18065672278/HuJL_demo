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
    creditCode: '',
    companyName: '',
    companyAddress: '',
    legalName: '',
    companyTypeArray: ['有限责任公司', '股份有限公司'],
    companyTypeIndex: 1,
    companyCapital: '',
    establishDate: '2019-07-10',
    openStartDate: '2019-07-10',
    openEndDate: '2019-07-10',
    bussRange: '',
    registerUnit: '',
    approveDate: '2019-07-10',
    FilePaths: [''],
    FileId: [''],
    removeshow: [false],
    remark: ''
  },
  //统一社会信用代码
  inputeidtCreditCode: function(e) {
    this.setData({
      creditCode: e.detail.value
    })
  },
  //公司名称
  inputeidtCompanyName: function(e) {
    this.setData({
      companyName: e.detail.value
    })
  },
  //公司地址
  inputeidtCompanyAddress: function(e) {
    this.setData({
      companyAddress: e.detail.value
    })
  },
  //法人代表
  inputeidtLegalName: function(e) {
    this.setData({
      legalName: e.detail.value
    })
  },
  //企业类型
  bindCompanyTypeChange: function(e) {
    this.setData({
      companyTypeIndex: e.detail.value
    })
  },
  //注册资本(万元)
  inputeidtCompanyCapital: function(e) {
    this.setData({
      companyCapital: e.detail.value
    })
  },
  //公司创建时间
  establishDateSelect: function(e) {
    this.setData({
      establishDate: e.detail.value
    })
  },
  //营业开始日期
  openStartDateSelect: function(e) {
    this.setData({
      openStartDate: e.detail.value
    })
  },
  //营业结束日期
  openEndDateSelect: function(e) {
    this.setData({
      openEndDate: e.detail.value
    })
  },
  //经营范围
  inputeidtBussRange: function(e) {
    this.setData({
      bussRange: e.detail.value
    })
  },
  //登记机关
  inputeidtRegisterUnit: function(e) {
    registerUnit: e.detail.value
  },
  //核准日期
  approveDateSelect: function(e) {
    this.setData({
      approveDate: e.detail.value
    })
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
    if (info.creditCode == "" || info.creditCode.length == 0) {
      WXEXT.showModal('', "统一社会信用代码不能为空", false);
      return false;
    } else if (info.companyName == "" || info.companyName.length == 0) {
      WXEXT.showModal('', "公司名称不能为空", false);
      return false;
    } else if (info.companyAddress == "" || info.companyAddress.length == 0) {
      WXEXT.showModal('', "公司所在地不能为空", false);
      return false;
    } else if (info.legalName == "" || info.legalName.length == 0) {
      WXEXT.showModal('', "法人代表不能为空", false);
      return false;
    } else if (info.FilePaths == "" || info.FilePaths.length == 0) {
      WXEXT.showModal('', "请上传营业执照照片", false);
      return false;
    } else {
      wx.getStorage({
        key: 'userId',
        success: function(res) {
          console.log(res.data)
          data = {
            "id": info.id,
            "userId": res.data,
            "certType": 3,
            "remark": info.remark,
            "businessCert.creditCode": info.creditCode,
            "businessCert.companyName": info.companyName,
            "businessCert.companyAddress": info.companyAddress,
            "businessCert.legalName": info.legalName,
            "businessCert.companyType": info.companyTypeIndex + 1,
            "businessCert.companyCapital": info.companyCapital,
            "businessCert.establishDate": info.establishDate,
            "businessCert.openStartDate": info.openStartDate,
            "businessCert.openEndDate": info.openEndDate,
            "businessCert.bussRange": info.bussRange,
            "businessCert.approveDate": info.approveDate,
            "businessCert.registerUnit": info.registerUnit,
            "businessCert.photoId": info.FileId
          };
          WXEXT.request(API_SERVER + API_api.certsave, data, '', me.callback)
        }
      })
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
    var info = data;
    var FileId = [],
      FilePaths = [],
      removeshow = [];
    var info = data;
    FileId.push(cui.isEmpty(info.photoId) ? '' : info.photoId);
    if (!cui.isEmpty(info.photos) && !cui.isEmpty(FileId.toString())) {
      if (info.photos.length == 1) {
        FilePaths.push(info.photos[0].url)
      } else {
        FilePaths = WXEXT.photo(cui.isEmpty(info.photos) ? [] : info.photos, FileId.toString())
      }
    }
    if (FileId.length > 0) {
      FileId.forEach(function (v, i) {
        if (v != "") {
          removeshow[i] = true;
        } else {
          removeshow[i] = false;
        }
      })
    }
    this.setData({
      id: cui.isEmpty(info.certId) ? '' : info.certId,
      remark: cui.isEmpty(info.remark) ? '' : info.remark,
      creditCode: cui.isEmpty(info.creditCode) ? '' : info.creditCode,
      companyName: cui.isEmpty(info.companyName) ? '' : info.companyName,
      companyAddress: cui.isEmpty(info.companyAddress) ? '' : info.companyAddress,
      legalName: cui.isEmpty(info.legalName) ? '' : info.legalName,
      companyTypeIndex: cui.isEmpty(info.companyType - 1) ? 0 : info.companyType - 1,
      companyCapital: cui.isEmpty(info.companyCapital) ? '' : info.companyCapital,
      establishDate: cui.isEmpty(info.establishDate) ? '' : info.establishDate,
      openStartDate: cui.isEmpty(info.openStartDate) ? '' : info.openStartDate,
      openEndDate: cui.isEmpty(info.openEndDate) ? '' : info.openEndDate,
      bussRange: cui.isEmpty(info.bussRange) ? '' : info.bussRange,
      approveDate: cui.isEmpty(info.approveDate) ? '' : info.approveDate,
      registerUnit: cui.isEmpty(info.registerUnit) ? '' : info.registerUnit,
      FileId: FileId,
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