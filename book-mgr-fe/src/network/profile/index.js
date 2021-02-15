import { post } from '@/helpers/request/index';

// 修改密码的请求
export const update = (data) => {
  return post('/profile/update/password', data);
};
