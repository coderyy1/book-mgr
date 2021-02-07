const LOG_MAP = [
  ['/book/add', '添加书籍'],
  ['/book/list', '获取书籍列表'],
  ['/book/deleteBook', '删除书籍'],
  ['/character/list', '获取角色列表']
];

export const getLogInfoByPath = (path) => {
  let title = '';
  
  LOG_MAP.forEach((item) => {
    if(path.includes(item[0])) {
      title = item[1];
    }
  });

  return title || path;
}