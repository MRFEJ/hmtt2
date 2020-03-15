import Vue from "vue"

// 导入dayjs
var dayjs = require('dayjs')
// 导入相对时间的插件
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
// 导入中文插件
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
Vue.filter('filterData', function (data) {
    return dayjs().to(dayjs(data)) // 2 年以前
})
