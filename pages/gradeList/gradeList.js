// pages/gradeList/gradeList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var userInfo = wx.getStorageSync('userInfo');
    var password = wx.getStorageSync('password');
    app.globalData.userInfo = userInfo;
    app.globalData.password = password;
    this.setData({
      userInfo: userInfo
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getClasses();
  },

  getClasses: function() {
    wx.request({
      // url: 'https://www.maaee.com/Excoord_For_Education/webservice',
      url: app.globalData.domin,
      data: {
        params: JSON.stringify({
          "method": "getTeacherClasses",
          "ident": this.data.userInfo.colUid,
        }) 
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      success: res => {
        console.log(res);
        if (res.data.success) {
          if (res.data.response.length > 0) {
            var data = res.data.response;
            var classArray = [];
            console.log(data);
            for (var k in data) {
              classArray.push({
                className: data[k].split('#')[1],
                classId: data[k].split('#')[0]
              })
            }
            this.setData({
              classArray
            });
          } else {
            wx.showModal({
              title: '温馨提示',
              content: '无班级!',
              showCancel: false,
            });
          }
        }
      }
    })
  },


  openClass: function(e) {
    let classId = e.currentTarget.dataset.classid;
    console.log(classId);
    app.globalData.classId = classId;
    wx.navigateTo({
      url: '../webview/webview',
    })
  },


  exitLoagin: function() {
    wx.clearStorage();
    wx.reLaunch({
      url: '../index/index',
    })
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
    // return {　　　　
    //   title: "小蚂蚁课堂小能手", // 默认是小程序的名称(可以写slogan等)
    //   path: '/pages/index/index', // 默认是当前页面，必须是以‘/’开头的完整路径
    //   success: function(res) {},
    //   fail: function() {}　　　
    // }　　
  }
})