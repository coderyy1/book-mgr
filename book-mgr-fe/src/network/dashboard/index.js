import { get } from '@/helpers/request/index';

// 获取total数据的请求
export const list = () => {
  return get('/dashboard/base-info');
};