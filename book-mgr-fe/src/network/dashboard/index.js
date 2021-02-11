import axios from 'axios';

// 获取total数据的请求
export const list = () => {
  return axios.get('http://localhost:3000/dashboard/base-info');
};