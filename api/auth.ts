import { alovaInstance } from '.';
import { ResponseDataType } from '../types';

export namespace UserAuthApi {
  export interface RefreshResultType {
    refresh?: string;
    access: string;
  }

  // 刷新令牌
  export const refreshToken = (refresh: string) => alovaInstance.Post<ResponseDataType<RefreshResultType>>('/token/refresh', {
    refresh
  });
}
