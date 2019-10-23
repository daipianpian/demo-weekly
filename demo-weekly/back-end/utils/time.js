const moment = require('moment')

const $time = {
  formatTime(date) {
    let result = null
    if (!date) {
      // 当前时间格式化为24小时制年-月-日 时:分:秒
      result = moment().format('YYYY-MM-DD HH:mm:ss')
    } else {
      // 特定时间格式化为24小时制年-月-日 时:分:秒
      result = moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
    return result
  },
  formatYmd(date) {
    let result = null
    if (!date) {
      // 当前时间格式化为24小时制年-月-日
      result = moment().format('YYYY-MM-DD')
    } else {
      // 特定时间格式化为24小时制年-月-日 时:分:秒
      result = moment(date).format('YYYY-MM-DD')
    }
    return result
  }
}

module.exports = $time