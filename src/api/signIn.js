import fetch from '../util/fetch'

export function signIn(params) {
  return fetch({
    url: '/api/session',
    method: 'post',
    data: params
  });
}

export function getUserInfo() {
  return fetch({
    url: '/api/session',
    method: 'get',
  });
}

export function signOut() {
  return fetch({
    url: '/api/session',
    method: 'delete'
  });
}

export function modifyPassword(params) {
  return fetch({
    url: '/api/session/password',
    method: 'put',
    data: params
  });
}
