const TOKEN_STORAGE_KEY = '_tt';


export const getToken = () => {
  return sessionStorage.getItem(TOKEN_STORAGE_KEY) || '';
};

export const setToken = (token) => {
  sessionStorage.setItem(TOKEN_STORAGE_KEY, token);

  return token;
};