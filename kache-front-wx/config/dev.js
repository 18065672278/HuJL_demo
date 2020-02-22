module.exports = {
  apiPrefix: '/api/wx',
  api: {
    //登录凭证校验
    jscode2session: '/api/wx/miniapp/jscode2session',
    //获取接口调用凭证
    getAccessToken: '/api/wx/miniapp/getAccessToken',
    //判断是否登录
    checkLoginWeixin: '/api/oauth/checkLoginWeixin',
    //获取用户信息
    getpaidunionid: '/api/wx/miniapp/getpaidunionid',
    //菜单
    viewMenu: '/api/viewMenu/getMinProgramView',
    // 获取验证码
    code: '/api/oauth/sendAuthCode',
    //绑定手机
    bandAccount: '/api/oauth/bandAccount',
    // 登录
    login: '/api/oauth/mobileLogin',
    //账号登出
    loginOut: '/api/oauth/loginOut',
    //附件上传
    attachmentsave: '/api/attachment/save',
    //车辆保存
    carsave: '/api/car/save',
    //车辆查询
    carquery: '/api/car/query',
    //车辆删除
    cardelete: '/api/car/delete',
    //获取车辆详情
    cardetail: '/api/car/detail',
    //车队查询
    fleetquery: '/api/fleet/query',
    //车队信息详情
    fleetdetail: '/api/fleet/detail',
    //车队信息保存
    fleetsave: '/api/fleet/save',
    //车队信息删除
    fleetdelete: '/api/fleet/delete',
    //车队网点绑定
    fleetOutletsaveBandInfo: '/api/fleetOutlet/saveBandInfo',
    //车队网点解除
    fleetOutletsaveUnBandInfo: '/api/fleetOutlet/saveUnBandInfo',
    //查询车队绑定的网点
    fleetOutletqueryBindOutlet: '/api/fleetOutlet/queryBindOutlet',
    //车队车辆绑定
    fleetCarsaveBandInfo: '/api/fleetCar/saveBandInfo',
    //车队车辆解除
    fleetCarsaveUnBandInfo: '/api/fleetCar/saveUnBandInfo',
    //查询车队绑定的车辆
    fleetCarqueryBindCar: '/api/fleetCar/queryBindCar',
    //车队员工关系查询
    fleetEmployeequery: '/api/fleetEmployee/queryBindEmployee',
    //车队员工绑定
    fleetEmployeeBandInfo: '/api/fleetEmployee/saveBandInfo',
    //车队员工解除绑定
    fleetEmployeeUnBand: '/api/fleetEmployee/saveUnBandInfo',
    //车队员工详情
    fleetEmployeeDetail: '/api/fleetEmployee/detail',
    //法人信息保存
    firmsave: '/api/firm/save',
    //法人信息查询
    firmquery: '/api/firm/query',
    //法人信息详情
    firmdetail: '/api/firm/detail',
    //法人信息删除
    firmdelete: '/api/firm/delete',
    //人员信息保存
    personsave: '/api/person/save',
    //人员信息查询
    personquery: '/api/person/query',
    //人员信息详情
    persondetail: '/api/person/detail',
    //人员信息删除
    persondelete: '/api/person/delete',
    //驾驶员保存
    driversave: '/api/driver/save',
    //驾驶员信息查询
    driverquery: '/api/driver/query',
    //驾驶员详情
    driverdetail: '/api/driver/detail',
    //已绑定驾驶员查询
    driverbandQuery: '/api/driver/queryBindDriver',
    //人车（车人）绑定
    driversaveBandInfo: '/api/driver/saveBandInfo',
    //人车（车人）绑定解除
    driversaveUnBandInfo: '/api/driver/saveUnBandInfo',
    //驾驶员删除
    driverdelete: '/api/person/delete',
    //获取用户信息(根据微信认证)
    getUserWeixinDetail: '/api/user/getUserWeixinDetail',
    //保存微信用户信息
    saveUserWeixin: '/api/user/saveUserWeixin',
    //证件信息保存
    certsave: '/api/cert/save',
    //证件信息查询
    certquery: '/api/cert/query',
    //证件信息详情
    certdetail: '/api/cert/detail',
    //证件信息删除
    certdelete: '/api/cert/delete',
    //联系信息保存
    contactsave: '/api/contact/save',
    //联系信息查询
    contactquery: '/api/contact/query',
    //联系信息详情
    contactdetail: '/api/contact/detail',
    //联系信息删除
    contactdelete: '/api/contact/delete',
    //网点保存
    outletsave: '/api/outlet/save',
    //网点查询列表(根据距离计算)
    outletquery: '/api/outlet/queryDistance',
    //网点详情
    outletdetail: '/api/outlet/detail',
    //网点详情(复杂)
    outletdetailAll: '/api/outlet/detailAll',
    //网点删除
    outletdelete: '/api/outlet/delete',
    //网点员工绑定
    outletEmployeeBandInfo: '/api/outletEmployee/saveBandInfo',
    //网点员工关系查询
    outletEmployeequery: '/api/outletEmployee/queryBindEmployee',
    //网点员工解除绑定
    outletEmployeeUnBand: '/api/outletEmployee/saveUnBandInfo',
    //网点员工详情
    outletEmployeeDetail: '/api/outletEmployee/detail',
    //QQMapKey
    qqMapkey: 'T23BZ-XGFCJ-FR3F7-FJM7D-DOSE3-RCBMY',
    //网点服务项信息保存
    outletServiceItemsave: '/api/outletServiceItem/save',
    //网点服务项查询
    outletServiceItemquery: '/api/outletServiceItem/query',
    //网点服务项详情
    outletServiceItemdetail: '/api/outletServiceItem/detail',
    //网点服务项删除
    outletServiceItemdelete: '/api/outletServiceItem/delete',
    //获取默认服务项
    outletServiceItemdefault: '/api/outletServiceItem/getServiceItems',
    //网点标签保存
    outletLabelsave: '/api/outletLabel/save',
    //网点标签查询
    outletLabelquery: '/api/outletLabel/query',
    //网点标签详情
    outletLabeldetail: '/api/outletLabel/detail',
    //网点标签删除
    outletLabeldelete: '/api/outletLabel/delete',
    //获取用户识别信息
    usergetIdentifyInfo: '/api/user/getIdentifyInfo',
    //保存用户识别信息
    usersaveIdentifyInfo: '/api/user/saveIdentifyInfo',
    //获取用户信息
    getUserInfo: '/api/user/getUserInfo',
    //救援单据保存
    ordersave: '/api/rescueOrder/save',
    //救援单查询(司机)
    orderquery: '/api/rescueOrder/query',
    //救援单查询(网点)
    orderqueryO: '/api/rescueOrder/queryOutletOrder',
    //获取单据详情
    orderdetail: '/api/rescueOrder/detail',
    //救援单服务中(网点端)
    orderserving: '/api/rescueOrder/serving',
    //救援单完成(网点端)
    orderfinish: '/api/rescueOrder/finish',
    //救援单支付(司机端)
    orderpay: '/api/rescueOrder/pay',
    //救援单评价(司机端)
    orderappraise: '/api/rescueOrder/appraise',
    //救援单绑定
    orderband: '/api/rescueOrder/band',
    //救援单签名(司机端)
    ordersign: '/api/rescueOrder/sign',
    //支付确认/签约确认(网点端)
    orderconfirm: '/api/rescueOrder/confirm',
    //订单价格调整(网点)
    orderadjust: '/api/rescueOrder/adjust',
    //取消绑定/订单(网点)
    orderunBand: '/api/rescueOrder/unBand',
    //取消绑定/订单(网点)
    ordercancel: '/api/rescueOrder/cancel',
    //可分配救援单查询(网点)
    queryOutletOrder: '/api/rescueOrder/queryOrderNewList'
  },
  API_SERVER: 'http://192.168.124.10:8001',
  appid: 'wx2d781211573b8c21'
}