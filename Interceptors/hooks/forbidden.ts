import { messageFailed } from '../../utils/showMessage';
import { Session } from '../../utils/storage';

/*

如使用react-router / vue-route请将 `window.location.replace('/login')` 推荐替换对应Api方法

*/
export default function forbidden() {
  // 根据业务逻辑，执行对应处理
  // 需求：账号权限发生改变，触发403 退出到登录页
  messageFailed('账号权限改变，请重新登录');
  Session.clear();
  window.location.replace('/login');
}
