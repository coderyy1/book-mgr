import axios from 'axios';

// 获取列表的请求
export const list = (page, size) => {
  return axios.get('http://localhost:3000/forget-password/list', {
    params: {
      page,
      size
    }
  });
}


// 添加申请的请求
export const add = (data) => {
  return axios.post('http://localhost:3000/forget-password/add', data);
}

// 修改状态的请求
export const updateStatus = (data) => {
  return axios.post('http://localhost:3000/forget-password/update/status', data);
}