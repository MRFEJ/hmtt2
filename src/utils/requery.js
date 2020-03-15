import axios from "axios"
import { getToken } from "./token"
import JSONbig from "json-bigint"
const requery = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/',
  // 对响应数据进行修改
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理

    return JSONbig.parse(data);
  }],
})

requery.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  getToken('myToken') && (config.headers.Authorization = "Bearer " + getToken('myToken').token)
  // window.console.log(config);

  return config;
}, function (error) {
  window.console.log('请求错误!');

  // 对请求错误做些什么
  return Promise.reject(error);
});

requery.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  window.console.log('响应错误!');

  // 对响应错误做点什么
  return Promise.reject(error);
});

export default requery