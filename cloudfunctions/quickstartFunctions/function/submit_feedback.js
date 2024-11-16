module.exports = async function (event, content, cloud) {
    const db = cloud.database()
    const _ = db.command
    const { room_id, content: uploadContent, images } = event.data || {}
    console.log("sub mit event", event.data)
    const OPENID = cloud.getWXContext().OPENID // 获取微信上下文
    const res = {}
    if(true){
        await db.collection('feedback').add({
            data: {
                user_id: OPENID,
                room_id,
                content: uploadContent,
                images,
                _createTime: Date.now(),
                _updateTime: Date.now()
            }
        })
        res.code = 0
    } else {
        res.code = -1
        res.msg = '提交的内容安全检测不通过，请检查后重新提交'
    }
    return res
  }
  