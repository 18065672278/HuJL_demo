import WXEXT from '../../../components/common/common.js';
import cui from "../../../components/base/cui.js";
const app = getApp();
const API_SERVER = app.getConfig("API_SERVER");
const API_api = app.getConfig("api");
Page({
  data: {
    avatarUrl: '',
    nickname: '',
    mobile: ''
  },
  onLoad: function(options) {
    console.log(app);
    let userInfo = app.globalData.userInfo;
    this.setData({
      avatarUrl: cui.isEmpty(userInfo) ? '/src/assets/images/defaultUser.jpg' : cui.isEmpty(userInfo.photos) ? '/src/assets/images/defaultUser.jpg' : userInfo.photos[0].url,
      nickname: userInfo.nickname,
      mobile: userInfo.mobile
    })

  },

})