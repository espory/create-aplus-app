import fetch from '../../common/fetch';

export function register({ name, mail, password }) {
  return fetch({
    url: '/user/login',
    method: 'post',
    data: {
      name,
      mail,
      password,
    },
  });
}
