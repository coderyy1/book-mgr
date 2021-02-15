import { get} from '@/helpers/request/index';

// 日志列表查询的请求
export const list = (page, size) => {
  return get('/log/list', {
    page,
    size
  });
};
