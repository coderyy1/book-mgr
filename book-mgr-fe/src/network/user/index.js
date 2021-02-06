import axios from 'axios';

// 查询用户list的请求
export const list = ( page = 1, size = 10, keyword = '') => {
  return axios.get('http://localhost:3000/user/list', {
    params: {
      keyword,
      page,
      size
    }
  });
};

// 删除用户信息的请求
export const removeUser = (id) => {
  return axios.delete(`http://localhost:3000/user/delete/${id}`);
};

// 添加用户的请求
export const add = (data) => {
  return axios.post('http://localhost:3000/user/add', data);
};

// 重置密码的请求
export const resetPwd = (id) => {
  return axios.post('http://localhost:3000/user/reset/password', {
    id
  });
};