## 📦 Axios general packaging scheme

### Language
[English](https://github.com/QC2168/axios-bz) | [中文](https://github.com/QC2168/axios-bz/blob/main/README.zh-cn.md)


### Feature
- 🌊 Token insensitive refresh
- 🕸️ Api Centralized Management
- 🦍 Typescript response type encapsulation
- 🤖 Interceptor encapsulation

### Usage

Create a `network` folder in your project root directory, and move all files and folders under this project to the `network` folder.

### Project Api Management

The `api` folder in the project stores all the `api` management. You can use 'namespace' to divide modules according to the project to solve the function naming conflict.

###  Demo For Vue3.x

#### Api

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

  // LOGIN
  export const login = (data: LoginParamsType) => ApiInstance.request<LoginResultType>({
    url: '/token/login',
    method: 'post',
    data
  });
}

```
#### script

```vue
<script setup lang="ts">
// import Api
import UserAuthApi from '@/network/api/UserAuthApi.ts'
// data
const formData=ref<UserAuthApi.LoginParamsType>({
    username:'张三',
    password:'123456',
})

const login = async () => {
    // request data
    const result = await UserAuthApi.login(formData.value)
    // some things ...
}
</script>
```

### More

### Interceptors

#### requestInterceptor

If you want to change the request parameters or some options before the request, you can do so in `Interceptors/requestInterceptor`

#### requestInterceptorErr

If the request fails, the `Interceptors/requestInterceptorErr` method will be executed


#### responseInterceptor

If you want to process the response data as soon as possible, such as snake case to camelcase, you can process it in `Interceptors/responseInterceptor`

#### responseInterceptorErr

If the response fails, the `Interceptors/responseInterceptorErr` method will be executed, where you can handle it according to business requirements

### ResponseResultType

#### Default

```typescript
export interface ResponseDataType<T = any> {
  data: T;
  msg: string;
  status: number;
}
```

If there is a difference between the backend response and the response, it is necessary to change the `ResponseDataType` in `types/common/index`
