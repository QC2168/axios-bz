import { AxiosError } from 'axios';
import { ResponseDataType } from '../types/index';
import { messageFailed } from '../utils/showMessage';
import forbidden from './forbidden';
import refreshToken from './refreshToken';

export default (error: AxiosError<ResponseDataType>) => {
  const statusCode = error.response?.status;
  switch (statusCode) {
    case 400:
      messageFailed('请求错误');
      return Promise.reject(error);
    case 401:
      messageFailed('身份过期，请重新登录');
      // 一些操作，例如：刷新令牌，如令牌刷新失败时退出到登录页面
      return refreshToken(error);
    case 403:
      return forbidden();
    case 404:
      messageFailed('请求出错');
      return Promise.reject(error);
    case 408:
      messageFailed('请求超时，请重试');
      return Promise.reject(error);
    case 500:
      messageFailed('系统异常，请联系管理员');
      return Promise.reject(error);
    case 501:
      messageFailed('服务未实现');
      return Promise.reject(error);
    case 502:
      messageFailed('网络错误');
      return Promise.reject(error);
    case 503:
      messageFailed('服务不可用');
      return Promise.reject(error);
    case 504:
      messageFailed('网络超时，请重试');
      return Promise.reject(error);
    case 505:
      messageFailed('HTTP版本不受支持');
      return Promise.reject(error);
    default:
      messageFailed(`系统异常，请联系管理员 - ${statusCode}`);
      return Promise.reject(error);
  }
};
