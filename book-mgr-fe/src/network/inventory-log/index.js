import axios from 'axios';

// 日志列表查询的请求
export const getLog = (bid, type = 'IN_COUNT', page = 1) => {
  return axios.get('http://localhost:3000/inventory-log/list', {
    params: {
      bid,
      type,
      page
    }
  });
};
