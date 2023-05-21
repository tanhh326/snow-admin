import router from 'src/router/index';
import { indexRoute, loginRoute } from 'src/router/static-router';

export function jumpToLogin(before?: () => void) {
  before && before();
  router.push(loginRoute.path).then();
}

export function jumpToIndex() {
  router.push(indexRoute.path).then();
}

export function getToken(): string {
  return localStorage.token;
}

export function setToken(token: string) {
  localStorage.token = token;
}


export async function checkAuth() {
}
