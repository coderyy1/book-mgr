import axios from 'axios';

// 添加书籍的请求
export const add = (form) => {
  return axios.post('http://localhost:3000/book/add', form);
};

// 查询书籍的请求
export const list = (data) => {
  return axios.get('http://localhost:3000/book/list', {
    params: data
  });
}

// 删除书籍的请求
export const deleteBook = (id) => {
  return axios.delete(`http://localhost:3000/book/deleteBook/${id}`);
}

// 入库出库的请求
export const updateCount = (data = {}) => {
  return axios.post('http://localhost:3000/book/update/count', data);
}

// 修改书籍的请求
export const update = (data) => {
  return axios.post('http://localhost:3000/book/update', data);
}

// 详情页的请求
export const detail = (id) => {
  return axios.get(`http://localhost:3000/book/detail/${id}`);
}