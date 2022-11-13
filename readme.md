### 📦 axios通用封装方案

### 功能
- 🌊 token无感刷新
- 🕸️ Api集中式管理
- 🦍 typescript响应类型封装
- 🤖 拦截器封装

### 使用方法

在你的项目中新建`network`文件夹，将本项目下的所有文件及文件夹移动到`network`文件夹即可。

### API放哪里？
项目中的`api`文件夹中存放着所有`api`的管理，您可以按照项目使用`namespace`进行划分模块，解决函数命名冲突问题。

####  Demo
```typescript
import ApiInstance from '@/network'

export namespace UserAuthApi {
  export interface LoginParamsType {
    username: string;
    password: string;
  }

  export interface LoginResultType {
    access: string;
    permission: string[];
  }

  // 刷新令牌
  export const login = (data: LoginParamsType) => ApiInstance.request<LoginResultType>({
    url: '/token/refresh',
    method: 'post',
    data
  });
}

```
业务代码中使用，例如在`vue3.x`框架中使用。

```vue
<script setup lang="ts">
// 引入Api文件
import UserAuthApi from '@/network/api/UserAuthApi.ts'
// 数据
const formData=ref<UserAuthApi.LoginParamsType>({
    username:'张三',
    password:'123456',
})

const login = async () => {
    // 请求数据
    const result = await UserAuthApi.login(formData.value)
    // 对请求回来的数据进行一些处理...
}
</script>
```

