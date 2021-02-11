export default [
  {
    title: '总览',
    url: '/dashboard',
    onlyAdmin: true
  },
  {
    title: '书籍管理',
    url: '/books',
    onlyAdmin: false
  },
  {
    title: '用户管理',
    url: '/user',
    onlyAdmin: true
  },
  {
    title: '日志列表',
    url: '/log',
    onlyAdmin: true
  },
  {
    title: '杂项',
    onlyAdmin: true,
    children: [
      {
        title: '重置密码列表',
        url: '/forget/password',
        onlyAdmin: true
      },
      {
        title: '邀请码列表',
        url: '/invite',
        onlyAdmin: true
      },
      {
        title: '分类管理',
        url: '/bookclassify',
        onlyAdmin: true
      }
    ]
  },
  {
    title: '个人设置',
    url: '/profile',
    onlyAdmin: false
  }
]