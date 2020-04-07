import axios from "axios"
import { getToken, setToken } from "./token"
import store from "@/store/index.js"
import JSONbig from "json-bigint"
const requery = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/',
  // 对响应数据进行修改
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    try {
      return JSONbig.parse(data);

    } catch (error) {
      return data
    }
  }],
})
// 在创建一个请求的对象
const resRequery = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/',
  // 对响应数据进行修改
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return JSONbig.parse(data);
  }],

})
// 请求拦截
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

// 响应拦截
requery.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, async function (error) {
  // window.console.log('响应错误!');
  // window.console.dir(error);
  if (error.response.status == 401) {
    let res = await resRequery({
      url: 'authorizations',
      method: 'put',
      headers: {
        'Authorization': 'Bearer ' + store.state.resToken
      }
    })
    // window.console.log(res.data.data.token);
    // 把新的token存到store
    store.commit('changeMytoken', res.data.data.token);
    // 把新的token存到本地
    setToken('myToken', JSON.stringify({
      token: res.data.data.token,
      refresh_token: store.state.resToken
    }));

    let res2 = await requery(error.config)
    return res2
  } else {
    // 对响应错误做点什么
    return Promise.reject(error);

  }

});

export default requery