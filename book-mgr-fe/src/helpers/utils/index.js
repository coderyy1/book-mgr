import { message } from 'ant-design-vue';

// 回调处理
export const result = (response, autoShowErrorMsg = true) => {
  const { data } = response;

  // 自动处理出错情况的汇报
  if((data.code === 0) && autoShowErrorMsg) {
    message.error(data.msg);
  }

  return {
    // 处理成功的回调
    success(cb) {
      if(data.code !== 0) {
        cb(data, response);
      }
      // 支持链式调用
      return this;
    },
    // 处理失败的回调
    fail(cb) {
      if(data.code === 0) {
        cb(data, response);
      }
      return this;
    },
    // 默认的回调
    finally(cb) {
      cb(data, response);
      return this;
    }
  }
}

// 深拷贝
export const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};  

// 填充0
const timestampPadStart = (str) => {
  str = String(str);

  return str.padStart(2, '0');
}

// 格式化时间戳 -> YYYY/MM/DD hh:mm:ss
export const formatTimestamp = (ts) => {
  const date = new Date(Number(ts));

  const YYYY = date.getFullYear();
  const MM = timestampPadStart(date.getMonth() + 1);
  const DD = timestampPadStart(date.getDate());

  const hh = timestampPadStart(date.getHours());

  const mm = timestampPadStart(date.getMinutes());

  const ss = timestampPadStart(date.getSeconds());

  return `${YYYY}/${MM}/${DD} ${hh}:${mm}:${ss}`;
};