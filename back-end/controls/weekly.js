const $sql = require('../sql/sqlMap')
const $http = require('../sql/http')
const $time = require('../utils/time')

function formatData(rows) {
  return rows.map(row => {
    if(row.create_time) {
      row.create_time = $time.formatTime(row.create_time)
    }
    if(row.update_time) {
      row.update_time = $time.formatTime(row.update_time)
    }
    if(row.startTime) {
      row.startTime = $time.formatYmd(row.startTime)
    }
    if(row.endTime) {
      row.endTime = $time.formatYmd(row.endTime)
    }
    return Object.assign({}, row)
  })
}

const weekly = {
  /*添加周报 start*/
  add (req, res) {
    let params = req.body
    $http.userVerify(req, res, () => {
      let curTime = $time.formatTime()
      let userId = params.userId
      let startTime = params.startTime
      let endTime = params.endTime
      let title = params.title
      let thisWeekWork = params.thisWeekWork
      let nextWeekWork = params.nextWeekWork
      let collaboration = params.collaboration
      let create_time = curTime
      let update_time = curTime
      if(!startTime || !endTime || !title || !thisWeekWork || !nextWeekWork) $http.writeJson(res, {code: 2, message:'参数有误'})
      else {
        let sql = $sql.weekly.add
        let arrayParams = [userId, startTime, endTime, title, thisWeekWork, nextWeekWork, collaboration, create_time, update_time]
        $http.connPool(sql, arrayParams, (err, result) => {
          if(err) return $http.writeJson(res, {code:-2, message:'失败',errMsg: err})
          if(result.affectedRows != 1) return $http.writeJson(res, {code: 2, message:'添加失败'})
          return $http.writeJson(res, {code: 1, message: '添加周报成功'})
        })
      }
    })
  },
  /*添加周报 end*/

  /*更新周报信息 start*/
  updateInfo (req, res) {
    let params = req.body
    $http.userVerify(req, res, () => {
      let curTime = $time.formatTime()
      let id = params.id
      let startTime = params.startTime
      let endTime = params.endTime
      let title = params.title
      let thisWeekWork = params.thisWeekWork
      let nextWeekWork = params.nextWeekWork
      let collaboration = params.collaboration
      let update_time = curTime
      if(!id || !startTime || !endTime || !title || !thisWeekWork || !nextWeekWork) {
        $http.writeJson(res, {code: 2, message:'参数有误'})
      } else {
        let sql = $sql.weekly.updateInfo
        let arrayParams = [startTime, endTime, title, thisWeekWork, nextWeekWork, collaboration, update_time, id]
        $http.connPool(sql, arrayParams, (err, result) => {
          if(err) return $http.writeJson(res, {code:-2, message:'失败',errMsg: err})
          if(result.affectedRows != 1) return $http.writeJson(res, {code: 2, message:'更新失败'})
          return $http.writeJson(res, {code: 1, data: result, message: '更新周报成功'})
        })
      }
    })
  },
  /*更新周报信息 end*/

  /*更新周报状态 start*/
  updateState (req, res) {
    let params = req.body
    $http.userVerify(req, res, () => {
      let curTime = $time.formatTime()
      let id = params.id
      let state = params.state
      let update_time = curTime
      if(!id) {$http.writeJson(res, {code: 2, message:'参数有误'})}
      else {
        let sql = $sql.weekly.updateState
        let arrayParams = [state, update_time, id]
        $http.connPool(sql, arrayParams, (err, result) => {
          if(err) return $http.writeJson(res, {code:-2, message:'失败',errMsg: err})
          if(result.affectedRows != 1) return $http.writeJson(res, {code: 2, data: result, message:'更新周报状态失败'})
          return $http.writeJson(res, {code: 1, message: '更新周报状态成功'})
        })
      }
    })
  },
  /*更新周报状态 end*/

  /*获取周报信息 start*/
  detail (req, res) {
    let params = req.body
    $http.userVerify(req, res, () => {
      let userId = params.userId
      let id = params.id
      if(!id) {$http.writeJson(res, {code: 2, message:'参数有误'})}
      else {
        let sql = $sql.weekly.getDetail
        let arrayParams = [id]
        $http.connPool(sql, arrayParams, (err, result) => {
          if(err) {return $http.writeJson(res, {code:-2, message:'失败',errMsg: err})}
          if(result.length != 1) {
            return $http.writeJson(res, {code: 2, message:'获取周报信息不存在'})
          } else {
            let resultData = formatData(result)[0]
            return $http.writeJson(res, {code: 1, data: resultData, message: '获取周报信息成功'})
          }
        })
      }
    })
  },
  /*获取周报信息 end*/  

  /*获取周报列表 start*/
  list (req, res) {
    let params = req.body
    $http.userVerify(req, res, () => {
      let sqlSelectTotal = $sql.weekly.selectTotal
      let sqlSelectList= $sql.weekly.selectList
      let userId = params.userId
      let searchId = params.searchId
      let searchUserId = params.searchUserId
      let searchTitle = params.searchTitle
      let searchStartTime = params.searchStartTime
      let searchEndTime = params.searchEndTime

      params.pageSize = !params.pageSize ? 10 : params.pageSize
      // 分页查询入参 start
      let limitFirst = (params.pageNum-1)*params.pageSize;
      let limitLast = params.pageSize;
      // 分页查询入参 end

      if(userId==1 && searchUserId){
        sqlSelectTotal += " and userId = "+searchUserId
        sqlSelectList += " and userId = "+searchUserId
      }else{
        sqlSelectTotal += " and userId = "+userId
        sqlSelectList += " and userId = "+userId
      }
      if(searchId){
        sqlSelectTotal += " and weekly.id = "+searchId
        sqlSelectList += " and weekly.id = "+searchId
      }
      if(searchTitle){
        sqlSelectTotal += " and weekly.title like '%"+searchTitle+"%'"
        sqlSelectList += " and weekly.title like '%"+searchTitle+"%'"
      }
      if(searchStartTime){
        sqlSelectTotal += " and weekly.create_time >= "+searchStartTime
        sqlSelectList += " and weekly.create_time >= "+searchStartTime
      }
      if(searchEndTime){
        sqlSelectTotal += " and weekly.create_time <= "+searchEndTime
        sqlSelectList += " and weekly.create_time <= "+searchEndTime
      }

      let sql= sqlSelectTotal + '; ' + sqlSelectList
      sql += " order by weekly.id desc limit ?,?"; // id倒序排
      let arrayParams = [limitFirst, limitLast]

      $http.connPool(sql, arrayParams, (err, result) => {
        if(err) {
          return $http.writeJson(res, {code:-2, message:'失败',errMsg: err})
        } else {
          let resultData = {}
          resultData.totalCount = result[0][0]['totalCount']
          resultData.list = formatData(result[1])
          return $http.writeJson(res, {code: 1, data: resultData, message: '获取周报列表成功'})
        }
        
      })
    })
  },
  /*获取周报列表 end*/

}

module.exports = weekly
