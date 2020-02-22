// src/pages/truck/index.js
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
    carNum: '请填写车牌号/车架号',
    ownerAddress: '',
    ownerName: '',
    ownerTel: '',
    carBrandArray: ['东风', '大运', '长征', '福田'],
    carBrandIndex: 0,
    manufacturer: '',
    carPrice: '',
    carColor: '',
    carMileage: '',
    fuelTypeArray: ['柴油', '汽油'],
    fuelTypeIndex: 0,
    tyreNumArray: ['4', '6', '8', '10', '10+'],
    tyreNumIndex: 1,
    //tyreSpecificationArray: ['轿车轮胎(PC)', '轻型载货汽车轮胎(LT)', '载货汽车及大客车胎(TB)', '农用车轮胎(AG)', '工程车轮胎(OTR)', '工业用车轮胎(ID)', '摩托车轮胎(MC)'],
    //tyreSpecificationIndex: 1,
    tyreSpecification: '',
    axleNumArray: ['1', '2', '3', '4', '5', '5+'],
    axleNumIndex: 1,
    remark: '',
    vehicleCertId: '',
    basicShow: true,
    extendShow: false,
    //出厂时间
    factoryTime: '2016-09-01',
    //车险到期
    insuranceExpiresTime: '2016-09-01',
    //年检到期
    yearlyInspectioTime: '2016-09-01',
    //排放等级
    emissionLevelArray: ['国I', '国Ⅱ', '国III', '国Ⅳ', '国V'],
    emissionLevelIndex: 4,
    //附件
    FileId: [],
    FilePaths: [],
  },
  //控制基础信息显示
  isBasicShow: function(e) {
    this.setData({
      basicShow: !this.data.basicShow
    })
  },
  //控制扩展信息显示
  isExtendShow: function(e) {
    this.setData({
      extendShow: !this.data.extendShow
    })
  },
  //行驶证ID
  vehicleCertIdSelect: function(e) {
    wx.navigateTo({
      url: '../../paperwork/drivingCard/drivingCarInfo/index?select=true',
    })
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
  //住址
  inputOwnerAddress: function(e) {
    this.data.ownerAddress = e.detail.value
  },
  //所属人姓名
  inputOwnerName: function(e) {
    this.data.ownerName = e.detail.value
  },
  //所属人电话
  inputOwnerTel: function(e) {
    this.data.ownerTel = e.detail.value
  },
  //车辆品牌
  bindCarBrandChange: function(e) {
    this.setData({
      carBrandIndex: e.detail.value
    })
  },
  //生产厂家
  inputManufacturer: function(e) {
    this.data.manufacturer = e.detail.value
  },
  //出厂时间
  factoryTimeSelect: function(e) {
    this.setData({
      factoryTime: e.detail.value
    })
  },
  //车辆价格
  inputCarPrice: function(e) {
    this.data.carPrice = e.detail.value
  },
  //车辆颜色
  inputCarColor: function(e) {
    this.data.carColor = e.detail.value
  },
  //车辆公里数
  inputCarMileage: function(e) {
    this.data.carMileage = e.detail.value
  },
  //燃料类型
  bindfuelTypeChange: function(e) {
    this.setData({
      fuelTypeIndex: e.detail.value
    })
  },
  //车险到期
  insuranceExpiresTimeSelect: function(e) {
    this.setData({
      insuranceExpiresTime: e.detail.value
    })
  },
  //年检到期
  yearlyInspectioTimeSelect: function(e) {
    this.setData({
      yearlyInspectioTime: e.detail.value
    })
  },
  //轮胎数
  bindtyreNumChange: function(e) {
    this.setData({
      tyreNumIndex: e.detail.value
    })
  },
  //轮胎规格
  /* bindtyreSpecificationChange: function(e) {
    this.setData({
      tyreSpecificationIndex: e.detail.value
    })
  }, */
  inputTyreSpecification: function(e) {
    this.setData({
      tyreSpecification: e.detail.value
    })
  },
  //车轴数量
  bindaxleNumChange: function(e) {
    this.setData({
      axleNumIndex: e.detail.value
    })
  },
  //附件上传
  ImageAdd: function(e) {
    let me = this,
      FilePaths = me.data.FilePaths;
    if (FilePaths.length >= 5) {
      WXEXT.showModal('', '图片最多上传5张', false);
    } else {
      WXEXT.uploadImg(API_SERVER + API_api.attachmentsave, 'car', me.imgcallback)
    }
  },
  imgcallback: function(res, filePath) {
    console.log(res)
    console.log(filePath); //chooseImage返回参数
    var FileId = this.data.FileId;
    var FilePaths = this.data.FilePaths;
    FileId.push(res.id);
    FilePaths.push(res.url);
    this.setData({
      FileId,
      FilePaths
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
    var num = e.currentTarget.dataset.id;
    FileId.splice(num, 1);
    FilePaths.splice(num, 1);
    me.setData({
      FileId,
      FilePaths
    })
  },
  //图片展示
  ImagePreview: function(e) {
    var me = this;
    var FilePaths = this.data.FilePaths;
    var num = e.currentTarget.dataset.id;
    //展示
    wx.previewImage({
      current: FilePaths[num], // 当前显示图片的http链接
      urls: FilePaths // 需要预览的图片http链接列表
    })
  },
  //绑定驾驶员
  bindDriver: function(e) {
    wx.navigateTo({
      url: '../binddriver/index?carId=' + this.data.id,
    })
  },
  //说明
  inputremark: function(e) {
    this.data.remark = e.detail.value
  },
  //保存
  subAction: function(e) {
    var me = this;
    var info = me.data;
    var carNum = me.data.carNum;
    var istrue = WXYZ.carID(carNum,'','',false);
    var data;
    if (istrue) {
      wx.getStorage({
        key: 'userId',
        success: function(res) {
          console.log(res.data)
          data = {
            id: info.id,
            userId: res.data,
            carNum: carNum,
            ownerAddress: info.ownerAddress,
            ownerName: info.ownerName,
            ownerTel: info.ownerTel,
            carBrand: parseInt(info.carBrandIndex) + 1,
            manufacturer: info.manufacturer,
            factoryTime: info.factoryTime,
            carPrice: info.carPrice,
            carColor: info.carColor,
            carMileage: info.carMileage,
            fuelType: parseInt(info.fuelTypeIndex) + 1,
            insuranceExpiresTime: info.insuranceExpiresTime,
            yearlyInspectionTime: info.yearlyInspectioTime,
            emissionLevel: info.emissionLevelIndex,
            tyreNum: parseInt(info.tyreNumIndex) + 1,
            //tyreSpecification: info.tyreSpecificationIndex + 1,
            tyreSpecification: info.tyreSpecification,
            axleNum: parseInt(info.axleNumIndex) + 1,
            photoIds: info.FileId,
            remark: info.remark,
            vehicleCertId: info.vehicleCertId
          };
          WXEXT.request(API_SERVER + API_api.carsave, data, '', me.callback)
        }
      })
    }
  },
  //保存回调
  callback: function(data) {
    console.log(data);
    wx.showToast({
      title: '保存车辆成功',
    }, wx.navigateBack())
  },
  //获取详情回调
  cardetailback: function(data) {
    console.log(data)
    let info = data;
    let FileId = cui.isEmpty(info.photoIds) ? [] : (info.photoIds).split(','),
      FilePaths = [];
    if (!cui.isEmpty(info.photos) && !cui.isEmpty(info.photoIds)) {
      if (info.photos.length == 1) {
        FilePaths.push(info.photos[0].url)
      } else {
        FilePaths = WXEXT.photo(cui.isEmpty(info.photos) ? [] : info.photos, info.photoIds)
      }
    }
    this.setData({
      id: cui.isEmpty(info.id) ? '' : info.id,
      carNum: cui.isEmpty(info.carNum) ? '' : info.carNum,
      ownerAddress: cui.isEmpty(info.ownerAddress) ? '' : info.ownerAddress,
      ownerName: cui.isEmpty(info.ownerName) ? '' : info.ownerName,
      ownerTel: cui.isEmpty(info.ownerTel) ? '' : info.ownerTel,
      carBrandIndex: cui.isEmpty(info.carBrand - 1) ? 0 : info.carBrand - 1,
      manufacturer: cui.isEmpty(info.manufacturer) ? '' : info.manufacturer,
      factoryTime: cui.isEmpty(info.factoryTime) ? '' : info.factoryTime,
      carPrice: cui.isEmpty(info.carPrice) ? '' : info.carPrice,
      carColor: cui.isEmpty(info.carColor) ? '' : info.carColor,
      carMileage: cui.isEmpty(info.carMileage) ? '' : info.carMileage,
      fuelTypeIndex: cui.isEmpty(info.fuelType - 1) ? 0 : info.fuelType - 1,
      insuranceExpiresTime: cui.isEmpty(info.insuranceExpiresTime) ? '' : info.insuranceExpiresTime,
      yearlyInspectionTime: cui.isEmpty(info.yearlyInspectioTime) ? '' : info.yearlyInspectioTime,
      emissionLevel: cui.isEmpty(info.emissionLevel) ? '' : info.emissionLevel,
      tyreNumIndex: cui.isEmpty(info.tyreNum - 1) ? 0 : info.tyreNum - 1,
      //tyreSpecificationIndex: cui.isEmpty(info.tyreSpecification - 1) ? '' : info.tyreSpecification - 1,
      tyreSpecification: cui.isEmpty(info.tyreSpecification) ? '' : info.tyreSpecification,
      axleNumIndex: cui.isEmpty(info.axleNum - 1) ? 0 : info.axleNum - 1,
      FileId: FileId,
      FilePaths: FilePaths,
      remark: cui.isEmpty(info.remark) ? '' : info.remark,
      vehicleCertId: cui.isEmpty(info.vehicleCertId) ? '' : info.vehicleCertId
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id)
    var me = this;
    if (options.id) {
      WXEXT.request(API_SERVER + API_api.cardetail, {
        id: options.id
      }, '', me.cardetailback)
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