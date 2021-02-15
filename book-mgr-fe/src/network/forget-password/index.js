import { get, post } from '@/helpers/request/index';

// 获取列表的请求
export const list = (page, size) => {
  return get('/forget-password/list', {
    page,
    size
  });
}


// 添加申请的请求
export const add = (data) => {
  return post('/forget-password/add', data);
}

// 修改状态的请求
export const updateStatus = (data) => {
  return post('/forget-password/update/status', data);
}