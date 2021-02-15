import { post } from '@/helpers/request/index';

export const register = (account, password, inviteCode) => {
  return post('/auth/register', {
    account,
    password,
    inviteCode
  });
};

export const login = (account, password) => {
  return post('/auth/login', {
    account,
    password
  });
};