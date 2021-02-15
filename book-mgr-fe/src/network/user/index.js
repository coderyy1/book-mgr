import { del, get, post } from '@/helpers/request/index';

// 查询用户list的请求
export const list = ( page = 1, size = 10, keyword = '') => {
  return get('/user/list', {
    keyword,
    page,
    size
  });
};

// 删除用户信息的请求
export const removeUser = (id) => {
  return del(`/user/delete/${id}`);
};

// 添加用户的请求
export const add = (data) => {
  return post('/user/add', data);
};

// 重置密码的请求
export const resetPwd = (id) => {
  return post('/user/reset/password', {
    id
  });
};

// 修改用户角色的请求
export const updateCharacter = (character, userId) => {
  return post('/user/update/character', {
    character,
    userId
  });
};

// 通过token获取用户信息的请求
export const info = () => {
  return get('/user/info');
};

// excel批量添加用户的请求
export const addMany = (key) => {
  return post('/user/addMany', {key});  
}