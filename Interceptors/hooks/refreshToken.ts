import { AxiosError } from 'axios';
import { ResponseDataType } from '../../types';
import { Session } from '../../utils/storage';
import ApiInstance from '../../api';
import { messageFailed } from '../../utils/showMessage';
import { UserAuthApi } from '../../api/auth';

const MAX_ERROR_COUNT = 5;
let currentCount = 0;
const queue: ((t: string) => any)[] = [];
let isRefresh = false;
/*

如使用react-router / vue-route请将 `window.location.replace('/login')` 推荐替换对应Api方法

*/
export default async function refreshToken(error: AxiosError<ResponseDataType>) {
  const logout = () => {
    messageFailed('身份过期，请重新登录');
    window.location.replace('/login');
    // 清空数据
    Session.clear();
    return Promise.reject(error);
  };
  if (error.config.url?.includes('refresh')) {
    logout();
  }
  const refresh = Session.get('refresh') ?? null;
  const { config } = error;
  if (!refresh) {
    logout();
  }
  if (!isRefresh) {
    isRefresh = true;
    if (currentCount > MAX_ERROR_COUNT) {
      logout();
    }
    currentCount += 1;

    try {
      const {
        data: { access },
      } = await UserAuthApi.refreshToken(refresh);
      Session.set('token', access);
      currentCount = 0;
      // 重新请求
      queue.forEach((cb) => cb(access));
      return ApiInstance.request(error.config);
    } catch {
      messageFailed('请重新登录');
      Session.clear();
      window.location.replace('/login');
      return Promise.reject(error);
    } finally {
      isRefresh = false;
    }
  } else {
    return new Promise((resolve) => {
      // 缓存网络请求，等token刷新后直接执行
      queue.push((newToken: string) => {
        Reflect.set(config.headers!, 'authorization', newToken);
        // @ts-ignore
        resolve(ApiInstance.request<ResponseDataType<any>>(config));
      });
    });
  }
}
