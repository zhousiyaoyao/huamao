Page({
  data: {
    images: [],
    imageUrls: [],
    // statusBarHeight: 0,
  },
  onLoad (options) {
    wx.cloud.getTempFileURL({
      fileList: [
        { fileID: 'cloud://huamao-1go6njsdbc59a621.6875-huamao-1go6njsdbc59a621-1329850573/image/images/swiper1.jpg', maxAge: 3600 },
        { fileID: 'cloud://huamao-1go6njsdbc59a621.6875-huamao-1go6njsdbc59a621-1329850573/image/images/swiper2.jpg', maxAge: 3600 },
        { fileID: 'cloud://huamao-1go6njsdbc59a621.6875-huamao-1go6njsdbc59a621-1329850573/image/images/swiper3.jpg', maxAge: 3600 },
        { fileID: 'cloud://huamao-1go6njsdbc59a621.6875-huamao-1go6njsdbc59a621-1329850573/image/images/swiper4.jpg', maxAge: 3600 },
        { fileID: 'cloud://huamao-1go6njsdbc59a621.6875-huamao-1go6njsdbc59a621-1329850573/image/images/front.jpg', maxAge: 3600 },
        { fileID: 'cloud://huamao-1go6njsdbc59a621.6875-huamao-1go6njsdbc59a621-1329850573/image/images/ele.jpg', maxAge: 3600 },
        { fileID: 'cloud://huamao-1go6njsdbc59a621.6875-huamao-1go6njsdbc59a621-1329850573/image/images/new1.jpg', maxAge: 3600 },
        { fileID: 'cloud://huamao-1go6njsdbc59a621.6875-huamao-1go6njsdbc59a621-1329850573/image/images/old1.jpg', maxAge: 3600 },
        { fileID: 'cloud://huamao-1go6njsdbc59a621.6875-huamao-1go6njsdbc59a621-1329850573/image/images/family.jpg', maxAge: 3600 },
        { fileID: 'cloud://huamao-1go6njsdbc59a621.6875-huamao-1go6njsdbc59a621-1329850573/image/images/breakfast1.jpg', maxAge: 3600 },
      ],
      success: (res) => {
        this.setData({
          imageUrls: res.fileList.slice(4).map((item) =>item.tempFileURL),
          images: res.fileList.slice(0,4).map((item) => {
            return {
              url: item.tempFileURL
            }
          }),
        });
      },
      fail: (err) => console.error('获取临时链接失败：', err),
    });
  },
  onPullDownRefresh () {
  },
  onFeedback() {
    wx.navigateTo({
			url: '/pages/feedback/index?room_id=9999',  // 假设 room_id 是 1234
		});
  }
})
