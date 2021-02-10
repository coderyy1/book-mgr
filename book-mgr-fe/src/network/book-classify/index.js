import axios from 'axios';

// 获取分类列表的请求
export const list = () => {
  return axios.get('http://localhost:3000/book-classify/list');
};

// 添加分类的请求
export const add = (data) => {
  return axios.post('http://localhost:3000/book-classify/add',data);
}

// 删除分类的请求
export const removeClassify = (id) => {
  return axios.delete(`http://localhost:3000/book-classify/delete/${id}`);
}

// 修改分类的请求
export const update = (data) => {
  return axios.post('http://localhost:3000/book-classify/update', data);
}