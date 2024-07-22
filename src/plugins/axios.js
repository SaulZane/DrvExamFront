// src/plugins/axios.js
import axios from 'axios';


const service = axios.create({
    baseURL: 'http://localhost:8000', // FastAPI服务器的地址
    timeout: 1000,
});

service.interceptors.request.use(
    // 请求拦截器代码...
)

service.interceptors.response.use(
    // 响应拦截器代码...
)

const Request = (url, option = {}) => {
    let method = option.method || 'get';
    let params = option.params || {};

    if (method === 'get' || method === 'GET') {
        return new Promise((resolve, reject) => {
            service.get(url, { params: params }).then(res => {
                if (res && res.data) {
                    resolve(res.data);
                }
            }).catch(err => {
                reject(err);
            });
        });
    } else {
        return new Promise((resolve, reject) => {
            service.post(url, params).then(res => {
                if (res && res.data) {
                    resolve(res.data);
                }
            }).catch(err => {
                reject(err);
            });
        });
    }
};


export default Request;