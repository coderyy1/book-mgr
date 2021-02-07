import axios from 'axios';

// 日志列表查询的请求
export const list = (page, size) => {
  return axios.get('http://localhost:3000/log/list', {
    params: {
      page,
      size
    }
  });
};
