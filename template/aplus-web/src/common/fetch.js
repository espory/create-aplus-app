import axios from 'axios';
import { message } from 'antd';

// const HOST = 'http://139.196.236.96:7001';
const HOST = '';

export default function fetch(option = {}) {
  const { url, ...rest } = option;
  return axios({
    url: `${HOST}${url}`,
    withCredentials: true,
    ...rest,
  }).then(res => {
    const { status, data } = res;
    if (status !== 200) {
      message.error('服务器错误，请重试');
      return Promise.reject(new Error('服务器错误，请重试'));
    }
    const { code, msg } = data || {};
    if (code === '1000') {
      return data.data;
    }
    message.error(msg || '服务器错误，请重试');
    return Promise.reject(new Error(msg));
  });
}
