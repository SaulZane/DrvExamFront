import http from './axios.js';
/**
 * 以GET方法从Axios获取数据
 * @param {*} 地址路径 
 * @returns Promise中data对象
 */
export function getData(path) {
    return http(path);
}
/**
 * 以POST方法向Axios发送数据
 * @param {*} path 地址路径
 * @param {*} params 携带的数据
 * @returns Promise中data对象
 */
export function postData(path, params) {
    return http(path, {
        method: 'POST',
        params: params,
    });
}