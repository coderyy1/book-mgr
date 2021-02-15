import { del, get, post } from '@/helpers/request/index';

// 添加书籍的请求
export const add = (form) => {
  return post('/book/add', form);
};

// 查询书籍的请求
export const list = (data) => {
  return get('/book/list', data);
}

// 删除书籍的请求
export const deleteBook = (id) => {
  return del(`/book/deleteBook/${id}`);
}

// 入库出库的请求
export const updateCount = (data = {}) => {
  return post('/book/update/count', data);
}

// 修改书籍的请求
export const update = (data) => {
  return post('/book/update', data);
}

// 详情页的请求
export const detail = (id) => {
  return get(`/book/detail/${id}`);
}

// excel批量添加书籍的请求
export const addMany = (key) => {
  return post('/book/addMany', {
    key
  });
}