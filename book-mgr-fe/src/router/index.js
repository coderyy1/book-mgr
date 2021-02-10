import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';
import { getToken } from '@/helpers/token/index';

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */'../views/Auth/index.vue')
  },
  {
    path: '/',
    name: 'BasicLayout',
    redirect: '/auth',
    component: () => import(/* webpackChunkName: "BasicLayout" */'../layout/Basic/index.vue'),
    children: [
      {
        path: '/books',
        name: 'Books',
        component: () => import(/* webpackChunkName: "book" */'../views/Books/index.vue')
      },
      {
        path: '/books/:id',
        name: 'BookDetail',
        component: () => import(/* webpackChunkName: "bookdetail" */'../views/BookDetail/index.vue')
      },
      {
        path: '/user',
        name: 'User',
        component: () => import(/* webpackChunkName: "User" */'../views/Users/index.vue')
      },
      {
        path: '/log',
        name: 'Log',
        component: () => import(/* webpackChunkName: "Log" */'../views/Log/index.vue')
      },
      {
        path: '/forget/password',
        name: 'ForgetPassword',
        component: () => import(/* webpackChunkName: "ForgetPassword" */'../views/RestPwd/index.vue')
      },
      {
        path: '/invite',
        name: 'Invite',
        component: () => import(/* webpackChunkName: "Invite" */'../views/invite/index.vue')
      },
      {
        path: '/bookclassify',
        name: 'BookClassify',
        component: () => import(/* webpackChunkName: "BookClassify" */'../views/BookClassify/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {



  // 获取权限列表
  if(!store.state.characterInfo.length) {
      await store.dispatch('getCharacterInfo');
    }

  // 登陆拦截
  if(to.path !== '/auth') {
    if(!getToken()) {
      next('/auth');
      return;
    }
  }

  // 不能访问登陆页
  if(to.path === '/auth' && getToken()) {
      next('/books');
      return;
  }

  // 通过token获取用户信息 -> 只有不是从登陆页面来的才需要获取
  if(from.path !== '/auth' && !store.state.userInfo.account) {

    if(getToken()) {
      await store.dispatch('getUserInfo');
    }
  }

  next();
});

export default router
