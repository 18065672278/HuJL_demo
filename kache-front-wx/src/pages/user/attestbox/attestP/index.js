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
    region: '',
    nameEn: '',
    remark: '',
    FilePaths: ['', '', '', ''],
    FileId: ['', '', '', ''],
    removeshow: [false, false, false, false],
    //国籍
    nationalityArray: ['美国', '中国', '巴西', '日本'],
    nationalityIndex: 1,

    //政治面貌
    politicsArray: ['中共党员', '中共预备党员', '共青团员', '其他'],
    politicsIndex: 0,

    //婚姻状况
    marriageArray: ['保密', '已婚', '未婚'],
    marriageIndex: 0,

    //月收入情况
    monthIncomeArry: ['0-2K', '2K-3K', '3.5K-4.5K', '4.5K-6K', '6K-8K', '8K-10K', '10K-15K', '15K-20K', '20K-30K', '30K+'],
    monthIncomeIndex: 0,
    //职业
    careerArry: [
      ['大类1', '大类2', '大类3'],
      ['中类1', '中类2'],
      ['小类1', '小类2']
    ], //二维数组，长度是多少是几列
    careerIndex: [0, 0, 0],

    //文化程度
    educationArry: ['研究生', '大学本科', '大学专科', '中专', '中技', '高中', '初中', '其他'],
    educationIndex: 0,
  },

  //姓名
  inputName: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  //英文名
  inputNameEn: function(e) {
    this.setData({
      nameEn: e.detail.value
    })
  },
  //组织编码
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value,
      orgCode: e.detail.code[2]
    })
  }, //国籍选择
  bindNationalityChange: function(e) {
    console.log(e)
    this.setData({
      nationalityIndex: e.detail.value
    })
  },

  //政治面貌选择
  bindpoliticsChange: function(e) {
    this.setData({
      politicsIndex: e.detail.value
    })
  },

  //婚姻状况选择
  bindIsMarryChange: function(e) {
    this.setData({
      ismarryIndex: e.detail.value
    })
  },

  //月收入情况
  bindmonthIncomeChange: function(e) {
    this.setData({
      monthIncomeIndex: e.detail.value
    })
  },
  //职业选择
  bindcareerChange: function(e) {
    console.log(e);
    this.setData({
      careerIndex: e.detail.value
    })
  },
  bindcareerColumnChange: function(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      careerArry: this.data.careerArry,
      careerIndex: this.data.careerIndex
    }
    console.log(data);
    data.careerIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.careerIndex[0]) {
          case 0:
            data.careerArry[1] = ['中类1', '中类2'];
            data.careerArry[2] = ['小类1', '小类2'];
            break;
          case 1:
            data.careerArry[1] = ['中类3', '中类4'];
            data.careerArry[2] = ['小类5', '小类6'];
            break;
          case 2:
            data.careerArry[1] = ['中类5', '中类6'];
            data.careerArry[2] = ['小类9', '小类10'];
            break;
        }
        data.careerIndex[1] = 0;
        data.careerIndex[2] = 0;
        break;
      case 1:
        switch (data.careerIndex[0]) {
          case 0:
            switch (data.careerIndex[1]) {
              case 0:
                data.careerArry[2] = ['小类1', '小类2'];
                break;
              case 1:
                data.careerArry[2] = ['小类3', '小类4'];
                break;
            }
            break;
          case 1:
            switch (data.careerIndex[1]) {
              case 0:
                data.careerArry[2] = ['小类5', '小类6'];
                break;
              case 1:
                data.careerArry[2] = ['小类7', '小类8'];
                break;
            }
            break;
          case 2:
            switch (data.careerIndex[1]) {
              case 0:
                data.careerArry[2] = ['小类9', '小类10'];
                break;
              case 1:
                data.careerArry[2] = ['小类11', '小类12'];
                break;
            }
            break;
        }
        data.careerIndex[2] = 0;
        break;
    }
    console.log(data)
    this.setData(data);
  },
  //文化程度
  bindeducationChange: function(e) {
    this.setData({
      educationIndex: e.detail.value
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
    if (cui.isEmpty(this.data.name)) {
      WXEXT.showModal('', "姓名不能为空", false);
    } else if (cui.isEmpty(this.data.orgCode)) {
      WXEXT.showModal('', "组织编码不能为空", false);
    } else {
      var data;
      var me = this;
      var info = me.data
      data = {
        identityType: 4,
        identifyPhotoPositiveId: info.FileId[0],
        identifyPhotoNegativeId: info.FileId[1],
        driverPhotoFirstId: info.FileId[2],
        driverPhotoSecondId: info.FileId[3],
        remark: info.remark,
        'personInfo.name': info.name,
        'personInfo.orgCode': info.orgCode,
        'personInfo.nameEn': info.nameEn,
        'personInfo.nationality': info.nationalityIndex,
        'personInfo.politics': info.politicsIndex,
        'personInfo.marriage': info.marriageIndex,
        'personInfo.monthIncome': info.monthIncomeIndex,
        'personInfo.career': info.careerIndex[2],
        'personInfo.education': info.educationIndex
      }
      WXEXT.request(API_SERVER + API_api.usersaveIdentifyInfo, data, '', me.callback)
    }
  },
  //保存回调
  callback: function(data) {
    console.log(data);
    WXEXT.showModal('', '提交成功，请等待审核', false, '', '');
    app.globalData.hasLogin = true;
    wx.switchTab({
      url: '../../../index/index',
    })
  },
  //获取详情回调
  detailback: function(data) {
    console.log(data)
    if (!cui.isEmpty(data) && !cui.isEmpty(data.personInfo)) {
      var info = data.personInfo;
      let FileId = [],
        FilePaths = [],
        removeshow = [];
      FileId[0] = cui.isEmpty(data.identifyPhotoPositiveId) ? '' : data.identifyPhotoPositiveId;
      FileId[1] = cui.isEmpty(data.identifyPhotoNegativeId) ? '' : data.identifyPhotoNegativeId;
      FileId[2] = cui.isEmpty(data.driverPhotoFirstId) ? '' : data.driverPhotoFirstId;
      FileId[3] = cui.isEmpty(data.driverPhotoSecondId) ? '' : data.driverPhotoSecondId;
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
        career: cui.isEmpty(info.career) ? 0 : info.career,
        educationIndex: cui.isEmpty(info.education) ? 0 : info.education,
        monthIncomeIndex: cui.isEmpty(info.monthIncome) ? 0 : info.monthIncome,
        name: cui.isEmpty(info.name) ? '' : info.name,
        nameEn: cui.isEmpty(info.nameEn) ? '' : info.nameEn,
        orgCode: cui.isEmpty(info.orgCode) ? '' : info.orgCode,
        region: cui.isEmpty(info.orgFullName) ? '' : info.orgFullName,
        nationalityIndex: cui.isEmpty(info.nationality) ? 0 : info.nationality,
        politicsIndex: cui.isEmpty(info.politics) ? 0 : info.politics,
        remark: cui.isEmpty(data.remark) ? 0 : data.remark,
        FileId,
        FilePaths,
        removeshow
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var me = this;
    WXEXT.request(API_SERVER + API_api.usergetIdentifyInfo, {}, '', me.detailback)
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