import { del, get, post } from '@/helpers/request/index';

// 获取分类列表的请求
export const list = () => {
  return get('/book-classify/list');
};

// 添加分类的请求
export const add = (data) => {
  return post('/book-classify/add',data);
}

// 删除分类的请求
export const removeClassify = (id) => {
  return del(`/book-classify/delete/${id}`);
}

// 修改分类的请求
export const update = (data) => {
  return post('/book-classify/update', data);
}