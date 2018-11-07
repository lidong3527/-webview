//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    
  },
  onLoad: function (params) {
    var userInfo = wx.getStorageSync('userInfo');
    // console.log(userInfo);
    if (userInfo){
      wx.reLaunch({
        url: '../gradeList/gradeList',
      })
    }else{
      wx.reLaunch({
        url: '../login/login',
      })
    }
  },
})
  