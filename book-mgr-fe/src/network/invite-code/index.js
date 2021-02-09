import axios from 'axios';

// 邀请码列表查询的请求
export const list = (page, size) => {
  return axios.get('http://localhost:3000/invite/list', {
    params: {
      page,
      size
    }
  });
};

export const add = (count) => {
  return axios.get('http://localhost:3000/invite/add', {
    params: {
      count
    }
  });
}

export const remove = (id) => {
  return axios.delete(`http://localhost:3000/invite/delete/${id}`);
}
