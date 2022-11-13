import ApiInstance from './index';

export namespace UserAuthApi {
  export interface RefreshResultType {
    refresh?: string;
    access: string;
  }

  // 刷新令牌
  export const refreshToken = (refresh: string) => ApiInstance.request<RefreshResultType>({
    url: '/token/refresh',
    method: 'post',
    data: {
      refresh,
    },
  });
}
