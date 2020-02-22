// pages/driver/index.js
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
    id: "",
    name: "",
    mobile: "",
    idCertId: "",
    driverCertId: "",
    nameEn: "",
    nameShortEn: "",
    weight: "",
    height: "",
    basicShow: true,
    extendShow: false,

    //现居住地
    region: ['北京市', '北京市', '全部'],
    customItem: '',

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

    //血型
    bloodArry: ['A型', 'B型', 'O型', 'AB型'],
    bloodIndex: '',

    //健康状况
    healthStatusArry: ['健康', '亚健康', '非健康'],
    healthStatusIndex: 0,

    //职业
    careerArry: [
      ['大类1', '大类2', '大类3'],
      ['中类1', '中类2'],
      ['小类1', '小类2']
    ], //二维数组，长度是多少是几列
    careerIndex: [0, 0, 0],

    //宗教
    religionArry: ['基督教', '天主教', '依斯兰教', '印度教', '尤太教', '佛教', '道教'],
    religionIndex: 0,

    //兴趣爱好
    interestArry: [
      ['大类1', '大类2', '大类3'],
      ['中类1', '中类2'],
      ['小类1', '小类2']
    ], //二维数组，长度是多少是几列
    interestIndex: [0, 0, 0],

    //文化程度
    educationArry: ['研究生', '大学本科', '大学专科', '中专', '中技', '高中', '初中', '其他'],
    educationIndex: 0,

    //附件数量
    FileId: [],
    FilePaths: []
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
  //身份证ID

  idCertIdSelect: function(e) {
    wx.navigateTo({
      url: '/src/pages/paperwork/idCard/idCardInfo/index?select=true',
    })
  },
  //驾驶证ID

  driverCertIdSelect: function(e) {
    wx.navigateTo({
      url: '/src/pages/paperwork/driverLicense/identityinfo/index?select=true',
    })
  },
  //联系方式

  contacSelect: function(e) {
    console.log(this.data.id)
    wx.navigateTo({
      url: '/src/pages/contact/contactinfo/index?select=true&&personId=' + this.data.id,
    })
  },
  //姓名
  inputeidtName: function(e) {
    this.data.name = e.detail.value
  },
  inputeidtMobile: function(e) {
    this.data.mobile = e.detail.value
  },
  //英文名
  inputeidtnameEn: function(e) {
    this.data.nameEn = e.detail.value
  },

  //英文名缩写
  inputeidtnameEnShort: function(e) {
    this.data.nameShortEn = e.detail.value
  },

  //现居住地选择
  bindRegionChange: function(e) {
    region: e.detail.value
  },

  //国籍选择
  bindNationalityChange: function(e) {
    console.log(e)
    this.setData({
      nationalityIndex: e.detail.value
    })
  },

  //政治面貌选择
  bindPoliceChange: function(e) {
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

  //体重
  inputeidtweight: function(e) {
    this.data.weight = e.detail.value
  },

  //身高
  inputeidtheightt: function(e) {
    this.data.height = e.detail.value
  },

  //血型
  bindbloodChange: function(e) {
    this.setData({
      bloodIndex: e.detail.value
    })
  },

  //健康状况选择
  bindHealthStatusChange: function(e) {
    this.setData({
      healthStatusIndex: e.detail.value
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

  //宗教选择
  bindreligionChange: function(e) {
    this.setData({
      religionIndex: e.detail.value
    })
  },

  //兴趣爱好
  bindinterestChange: function(e) {
    this.setData({
      interestIndex: e.detail.value
    })
  },
  bindinterestColumnChange: function(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      interestArry: this.data.interestArry,
      interestIndex: this.data.interestIndex
    }
    console.log(data);
    data.interestIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.interestIndex[0]) {
          case 0:
            data.interestArry[1] = ['中类1', '中类2'];
            data.interestArry[2] = ['小类1', '小类2'];
            break;
          case 1:
            data.interestArry[1] = ['中类3', '中类4'];
            data.interestArry[2] = ['小类5', '小类6'];
            break;
          case 2:
            data.interestArry[1] = ['中类5', '中类6'];
            data.interestArry[2] = ['小类9', '小类10'];
            break;
        }
        data.interestIndex[1] = 0;
        data.interestIndex[2] = 0;
        break;
      case 1:
        switch (data.interestIndex[0]) {
          case 0:
            switch (data.interestIndex[1]) {
              case 0:
                data.interestArry[2] = ['小类1', '小类2'];
                break;
              case 1:
                data.interestArry[2] = ['小类3', '小类4'];
                break;
            }
            break;
          case 1:
            switch (data.interestIndex[1]) {
              case 0:
                data.interestArry[2] = ['小类5', '小类6'];
                break;
              case 1:
                data.interestArry[2] = ['小类7', '小类8'];
                break;
            }
            break;
          case 2:
            switch (data.interestIndex[1]) {
              case 0:
                data.interestArry[2] = ['小类9', '小类10'];
                break;
              case 1:
                data.interestArry[2] = ['小类11', '小类12'];
                break;
            }
            break;
        }
        data.interestIndex[2] = 0;
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
  //保存
  subAction: function(e) {
    let phone = this.data.mobile;
    if (cui.isEmpty(this.data.name)) {
      WXEXT.showModal('', "姓名不能为空", false);
    } else {
      var istrue = WXYZ.TelFormat(phone, '', '', true);
      if (istrue) {
        var data;
        var me = this;
        var info = me.data;
        data = {
          id: info.id,
          name: info.name,
          mobile: info.mobile,
          idCertId: info.idCertId,
          driverCertId: info.driverCertId,
          nameEn: info.nameEn,
          nameShortEn: info.nameShortEn,
          nationality: info.nationalityIndex,
          politics: info.politicsIndex,
          marriage: info.marriageIndex,
          monthIncome: info.monthIncomeIndex,
          weight: info.weight,
          height: info.height,
          blood: info.bloodIndex,
          healthStatus: info.healthStatusIndex,
          //career: info.careerIndex[2] + 1,
          religion: info.religionIndex,
          //interest: info.interestIndex[2] + 1,
          education: info.educationIndex,
          photoIds: info.FileId
        }
        console.log(data);
        WXEXT.request(API_SERVER + API_api.personsave, data, '', me.callback)
      }
    }
  },
  //保存回调
  callback: function(data) {
    console.log(data);
    WXEXT.showModal('', '保存成功', false, '', '', wx.navigateBack());
  },
  //获取详情回调
  persondetailback: function(data) {
    console.log(data)
    var info = data;
    var careerIndex = this.data.careerIndex;
    careerIndex[2] = info.career;
    var interestIndex = this.data.interestIndex;
    interestIndex[2] = info.interest;
    var removeshow = this.data.removeshow;
    let FileId = cui.isEmpty(info.photoIds) ? [] : (info.photoIds).split(','),
      FilePaths = [];
    if (!cui.isEmpty(info.photos) && !cui.isEmpty(info.photoIds)) {
      console.log(info.photos.length)
      if (info.photos.length == 1) {
        FilePaths.push(info.photos[0].url)
      } else {
        FilePaths = WXEXT.photo(cui.isEmpty(info.photos) ? [] : info.photos, info.photoIds)
      }
    }
    this.setData({
      id: cui.isEmpty(info.id) ? '' : info.id,
      name: cui.isEmpty(info.name) ? '' : info.name,
      mobile: cui.isEmpty(info.mobile) ? '' : info.mobile,
      idCertId: cui.isEmpty(info.idCertId) ? '' : info.idCertId,
      driverCertId: cui.isEmpty(info.driverCertId) ? '' : info.driverCertId,
      nameEn: cui.isEmpty(info.nameEn) ? '' : info.nameEn,
      nameShortEn: cui.isEmpty(info.nameShortEn) ? '' : info.nameShortEn,
      nationalityIndex: cui.isEmpty(info.nationality) ? '' : info.nationality,
      politicsIndex: cui.isEmpty(info.politics) ? 0 : info.politics,
      marriageIndex: cui.isEmpty(info.marriage) ? 0 : info.marriage,
      monthIncomeIndex: cui.isEmpty(info.monthIncome) ? 0 : info.monthIncome,
      weight: cui.isEmpty(info.weight) ? '' : info.weight,
      height: cui.isEmpty(info.height) ? '' : info.height,
      bloodIndex: cui.isEmpty(info.blood) ? 0 : info.blood,
      healthStatusIndex: cui.isEmpty(info.healthStatus) ? 0 : info.healthStatus,
      careerIndex,
      religionIndex: cui.isEmpty(info.religion) ? 0 : info.religion,
      interestIndex,
      educationIndex: cui.isEmpty(info.education) ? 0 : info.education,
      FileId: FileId,
      FilePaths: FilePaths
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var me = this;
    if (options.id) {
      me.setData({

        id: options.id
      })
      WXEXT.request(API_SERVER + API_api.persondetail, {
        id: options.id
      }, '', me.persondetailback)
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

  },
})