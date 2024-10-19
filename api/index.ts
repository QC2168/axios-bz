import { createAlova, Method } from 'alova';
import { xhrRequestAdapter } from '@alova/adapter-xhr';
import { messageFailed } from '../utils/showMessage';
import { Local } from '../utils/storage';
import VueHook from 'alova/vue';

export const alovaInstance = createAlova({
  baseURL: 'https://api.alovajs.dev',
  timeout: 1000 * 10,
  // 关闭缓存
  cacheFor: null,
  requestAdapter: xhrRequestAdapter(),
  statesHook: VueHook,
  beforeRequest(method) {
    // 假设我们需要添加token到请求头
    if (!method.meta.noAuth) {
      method.config.headers.token = `Bearer ${Local.get('accessToken')}`;
    }
  },
  responded: {
    // 请求成功的拦截器
    onSuccess: async (response, method) => {
      if (response.status >= 400) {
        throw new Error(response.statusText);
      }
    },

    // 请求失败的拦截器
    onError: (err, method) => {
      messageFailed('请求失败');
    },

    // 请求完成的拦截器
    onComplete: async (method) => {
      // 处理请求完成逻辑
    },
  },
});


export const request=()=>{

}

export default alovaInstance
