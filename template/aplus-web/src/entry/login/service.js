import fetch from '../../common/fetch';

export function login({ name, password }) {
  return fetch({
    url: '/user/login',
    method: 'post',
    data: {
      name,
      password,
    },
  });
}
