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
    carNum: '请填写车牌号/车架号',
    carTypeArray: ['轿车', '货车', '客车'],
    carTypeIndex: 1,
    remark: '',
    ownerName: '',
    ownerAddress: '',
    useCharacterArray: ['家庭自用汽车', '非营业客车', '营业客车', '非营业货车', '营业货车', '特种车'],
    useCharacterIndex: 4,
    carModel: '',
    vinNum: '',
    engineNum: '',
    registrationDate: '2019-07-10',
    issueDate: '2019-07-10',
    issueUnit: '',
    archivesNum: '',
    carriers: '',
    FilePaths: [''],
    FileId: [''],
    removeshow: [false],
  },
  //车牌号
  /* 输入框聚焦显示车牌号键盘 */
  handleFocus: function(e) {
    this.setData({
      showKeyboard: true
    })
  },
  /* 车牌号键盘点击事件 */
  setNumber: function(e) {
    this.setData({
      carNum: e.detail.value == "" ? '请填写车牌号/车架号' : e.detail.value
    })
  },
  //车辆类型
  bindCarTypeChange: function(e) {
    this.setData({
      carTypeIndex: e.detail.value
    })
  },
  //所属人姓名
  inputeidtOwnerName: function(e) {
    this.setData({
      ownerName: e.detail.value
    })
  },
  //详细地址
  inputeidtOwnerAddress: function(e) {
    this.setData({
      ownerAddress: e.detail.value
    })
  },
  //使用性质
  bindUseCharacterChange: function(e) {
    this.setData({
      useCharacterIndex: e.detail.value
    })
  },
  //品牌型号
  inputeidtCarModel: function(e) {
    this.setData({
      carModel: e.detail.value
    })
  },
  //车辆识别号
  inputeidtVinNum: function(e) {
    this.setData({
      vinNum: e.detail.value
    })
  },
  //发动机号
  inputeidtEngineNum: function(e) {
    this.setData({
      engineNum: e.detail.value
    })
  },
  //初次登记时间
  registrationDateSelect: function(e) {
    this.setData({
      registrationDate: e.detail.value
    })
  },
  //发证时间
  issueDateSelect: function(e) {
    this.setData({
      issueDate: e.detail.value
    })
  },
  //发证单位
  inputeditIssueUnit: function(e) {
    this.setData({
      issueUnit: e.detail.value
    })
  },
  //档案号
  inputeditArchivesNum: function(e) {
    this.setData({
      archivesNum: e.detail.value
    })
  },
  //核定载人人数
  inputeditCarriers: function(e) {
    this.setData({
      carriers: e.detail.value
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
    if (info.carTypeIndex == "" || info.carTypeIndex.length == 0) {
      WXEXT.showModal('', "车辆类型不能为空", false);
      return false;
    } else if (info.ownerName == "" || info.ownerName.length == 0) {
      WXEXT.showModal('', "所属人姓名不能为空", false);
      return false;
    } else if (info.FilePaths == "" || info.FilePaths.length == 0) {
      WXEXT.showModal('', "请上传行驶证照", false);
      return false;
    } else {
      var istrue = WXYZ.carID(this.data.carNum, '');
      console.log(istrue)
      if (istrue) {
        wx.getStorage({
          key: 'userId',
          success: function(res) {
            console.log(res.data)
            data = {
              "id": info.id,
              "userId": res.data,
              "certType": 5,
              "remark": info.remark,
              "vehicleCert.carNum": info.carNum,
              "vehicleCert.carType": info.carTypeIndex + 1,
              "vehicleCert.ownerName": info.ownerName,
              "vehicleCert.ownerAddress": info.ownerAddress,
              "vehicleCert.useCharacter": info.useCharacterIndex + 1,
              "vehicleCert.carModel": info.carModel,
              "vehicleCert.vinNum": info.vinNum,
              "vehicleCert.engineNum": info.engineNum,
              "vehicleCert.registrationDate": info.registrationDate,
              "vehicleCert.issueDate": info.issueDate,
              "vehicleCert.issueUnit": info.issueUnit,
              "vehicleCert.archivesNum": info.archivesNum,
              "vehicleCert.carriers": info.carriers,
              "vehicleCert.photoId": info.FileId
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
      FileId.forEach(function(v, i) {
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
      carNum: cui.isEmpty(info.carNum) ? '' : info.carNum,
      carTypeIndex: cui.isEmpty(info.carType - 1) ? '' : info.carType - 1,
      ownerName: cui.isEmpty(info.ownerName) ? '' : info.ownerName,
      ownerAddress: cui.isEmpty(info.ownerAddress) ? '' : info.ownerAddress,
      useCharacter: cui.isEmpty(info.useCharacterIndex - 1) ? '' : info.useCharacterIndex - 1,
      carModel: cui.isEmpty(info.carModel) ? '' : info.carModel,
      vinNum: cui.isEmpty(info.vinNum) ? '' : info.vinNum,
      engineNum: cui.isEmpty(info.engineNum) ? '' : info.engineNum,
      registrationDate: cui.isEmpty(info.registrationDate) ? '' : info.registrationDate,
      issueDate: cui.isEmpty(info.issueDate) ? '' : info.issueDate,
      issueUnit: cui.isEmpty(info.issueUnit) ? '' : info.issueUnit,
      archivesNum: cui.isEmpty(info.archivesNum) ? '' : info.archivesNum,
      carriers: cui.isEmpty(info.carriers) ? '' : info.carriers,
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