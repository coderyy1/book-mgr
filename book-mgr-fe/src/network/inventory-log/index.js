import { get } from '@/helpers/request/index';

// 日志列表查询的请求
export const getLog = (bid, type = 'IN_COUNT', page = 1) => {
  return get('/inventory-log/list', {
    bid,
    type,
    page
  });
};
