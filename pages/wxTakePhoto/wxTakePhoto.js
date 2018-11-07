// pages/wxTakePhoto/wxTakePhoto.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 100,
    loading:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight,
          loading: true
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res);
        this.setData({
          src: res.tempImagePath
        },()=>{
          wx.uploadFile({
            url: 'https://jiaoxue.maaee.com/Excoord_Upload_Server/file/upload',
            filePath: res.tempImagePath,
            name: 'uploadfile_ant',
            formData: {
              'imgIndex': 1
            },
            header: {
              "Content-Type": "multipart/form-data"
            }, 
            success:(res)=>{ 
              console.log('跳转');
                wx.reLaunch({
                  url: '../webview/webview?image=' + res.data +'&storage=true',
                })
              
            },
            fail:(res)=>{
              console.log(res);
            }
          })
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})