import fetch from '../util/fetch'

export function getUsers(params) {
  return fetch({
    url: '/api/users',
    method: 'get',
    params: params
  });
}
