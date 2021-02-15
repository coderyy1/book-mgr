import { get } from '@/helpers/request/index';

// 获取角色列表的请求
export const list = () => {
  return get('/character/list');
};