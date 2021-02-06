import axios from 'axios';

// 获取角色列表的请求
export const list = () => {
  return axios.get('http://localhost:3000/character/list');
};