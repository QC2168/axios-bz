import Api, { ApiType } from '../request';
import {
  responseInterceptor,
  requestInterceptorErr,
  requestInterceptor,
  responseInterceptorErr,
} from '../Interceptors';

const option: ApiType = {
  cfg: {
    baseURL: 'API ADDRESS',
    timeout: 5000,
  },
  interceptor: {
    responseInterceptor,
    requestInterceptorErr,
    requestInterceptor,
    responseInterceptorErr,
  },
};

export default new Api(option);
