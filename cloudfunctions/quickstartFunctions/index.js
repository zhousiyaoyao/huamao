const cloud = require('wx-server-sdk') // 云开发服务端SDK引入
cloud.init({ // 初始化云开发环境
  env: cloud.DYNAMIC_CURRENT_ENV // 当前环境的常量
})
const db = cloud.database()
const name = 'register' // 该模版的标识
exports.main = async (event, context) => {
  const type = event.type || 'get_project' // 默认的执行方法
  const res = { name }
  try {
		// 尝试执行执行方法，直接通过名称读取文件，获取其中的执行函数
    res.data = await require(`./function/${type}`)(event, context, cloud)
  } catch (e) {
    res.errmsg = e.toString()
    res.data = false
  }
  return res
}
