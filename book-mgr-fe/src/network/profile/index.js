import axios from 'axios';

// 修改密码的请求
export const update = (data) => {
  return axios.post('http://localhost:3000/profile/update/password', data);
};
