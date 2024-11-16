Page({
  data: {
    images: [
      { url: './images/swiper1.jpg' },
      { url: './images/swiper2.jpg' },
      { url: './images/swiper3.jpg' },
      { url: './images/swiper4.jpg' },
    ],
    // statusBarHeight: 0,
  },
  onLoad (options) {
    // const systemInfo = wx.getSystemInfoSync();
    // this.setData({
    //   statusBarHeight: systemInfo.statusBarHeight,
    // });
  },
  onPullDownRefresh () {
  },
  onFeedback() {
    wx.navigateTo({
			url: '/pages/feedback/index?room_id=9999',  // 假设 room_id 是 1234
		});
  }
})
