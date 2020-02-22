import WXEXT from '../../../components/common/common.js';
import cui from '../../../components/base/cui.js';
const app = getApp();
const API_SERVER = app.getConfig("API_SERVER");
const API_api = app.getConfig("api");
import SignaturePad from '../../../components/base/signature_pad.js'
let signaturePad = {};
let pix = 7;
let penColor = 'black';
let lineWidth = 0.6;
Page({
  data: {
    orderId: '',
    penColor: 'black',
    lineWidth: 0.6,
    isEmpty: true
  },
  uploadScaleStart(e) {
    const item = {
      penColor: penColor,
      lineWidth: lineWidth
    };
    signaturePad._handleTouchStart(e, item);
  },
  uploadScaleMove(e) {
    signaturePad._handleTouchMove(e);
  },
  uploadScaleEnd: function(e) {
    signaturePad._handleTouchEnd(e);
    const isEmpty = signaturePad.isEmpty();
    this.setData({
      isEmpty: isEmpty
    })
  },
  retDraw: function() {
    signaturePad.clear();
    const isEmpty = signaturePad.isEmpty();
    this.setData({
      isEmpty: isEmpty
    })
  },
  onLoad: function(options) {
    var ctx = wx.createCanvasContext('handWriting');
    const data = {
      devicePixelRatio: pix,
    };
    signaturePad = new SignaturePad(ctx, data);
    console.info(ctx, SignaturePad);
    console.log(options);

    if (options.orderId != "") {
      this.setData({
        orderId: options.orderId
      })
    }
  },
  getSysInfo: function() {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        pix = res.pixelRatio
        that.setData({
          width: res.windowWidth * pix,
          height: res.windowHeight * pix
        })
      }
    })
  },
  subCanvas: function() {
    if (this.data.isEmpty) {
      return false
    }
    this.onConfirm()
  }, //保存canvas图像
  onConfirm: function() {
    console.log("aaa");
    if (this.data.isEmpty) {
      return false
    }
    const self = this;
    wx.canvasToTempFilePath({
      canvasId: 'handWriting',
      success: function(res) {
        self.setData({
          modalShow: false,
          hiddenLoading: false
        })
        console.log(res.tempFilePath)
        wx.uploadFile({
          url: API_SERVER + API_api.attachmentsave,
          filePath: res.tempFilePath,
          header: {
            "content-type": "multipart/form-data",
            "chartset": "utf-8"
          },
          name: 'rescueorder',
          formData: {
            refObj: 'rescueorder',
            metaFile: res.tempFilePath
          },
          success: function(res) {
            let dataList = JSON.parse(res.data);
            console.log(dataList);
            if (dataList.code ==1){
              let data = {
                orderId: self.data.orderId,
                signPhotoId: dataList.result[0].id
              }
              WXEXT.request(API_SERVER + API_api.ordersign, data, '', self.back)
            }
          }
        })
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {
        console.log(res)
      }
    })
  }, //模态框保存签名操作
  //回调
  back(data) {
    console.log(data);
    WXEXT.showModal('已成功签名，等待确认！', '', '', wx.navigateBack({
      delta: 2
    }))
  },

})