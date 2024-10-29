import axios, {
  type AxiosResponse,
  type AxiosInstance,
  type AxiosRequestConfig,
} from 'axios'

const baseUrl = '/api'

class HttpRequest {
  instance: AxiosInstance
  //基础配置
  baseConfig: AxiosRequestConfig = {
    baseURL: baseUrl,
    timeout: 6000,
  }

  constructor(config: AxiosRequestConfig) {
    //使用axios.create创建axios实例，配置为基础配置和传递进来的config
    this.instance = axios.create(Object.assign(this.baseConfig, config))
    this.interceptors(this.instance)
  }

  private interceptors(instance: AxiosInstance) {
    // 添加请求拦截器
    instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        return error
      },
    )

    // 添加响应拦截器
    instance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        // console.log(error, "error");
        alert(error)
        return Promise.reject(error)
      },
    )
  }

  public async request<T>(options: AxiosRequestConfig) {
    const response = await this.instance.request<T>(options)
    return this.responseBody(response)
  }

  private responseBody<T>(response: AxiosResponse<T>) {
    return response.data
  }
}

export default new HttpRequest({})

//导出Request可以用来自定义传递配置来创建实例
// export class Request {
//   //axios实例
//   instance: AxiosInstance;
//   //基础配置
//   baseConfig: AxiosRequestConfig = {
//     baseURL: "/api",
//     timeout: 60000,
//   };
//   constructor(config: AxiosRequestConfig) {
//     //使用axios.create创建axios实例，配置为基础配置和传递进来的config
//     this.instance = axios.create(Object.assign(this.baseConfig, config));
//     this.instance.interceptors.request.use(
//       (config) => {
//         //这里加token用于后端的验证TODO
//         const token = localStorage.getItem("token") as string;
//         if (token) {
//           config.headers!.Authorization = token;
//         }
//         return config;
//       },
//       (error) => {
//         //请求错误,TODO 全局提示框提示错误
//         return Promise.reject(error);
//       }
//     );
//     this.instance.interceptors.response.use(
//       (result) => {
//         //直接返回result，也可以用result.data的形式
//         return result;
//       },
//       (error) => {
//         let message = "";
//         switch (error.response.status) {
//           case 400:
//             message = "请求错误(400)";
//             break;
//           case 401:
//             message = "未授权,请重新登录(401)";
//             break;
//           case 403:
//             message = "拒绝访问(403)";
//             break;
//           case 404:
//             message = "请求出错(404)";
//             break;
//           case 408:
//             message = "请求超时(408)";
//             break;
//           case 500:
//             message = "服务器错误(500)";
//             break;
//           case 501:
//             message = "服务未实现(501)";
//             break;
//           case 502:
//             message = "网络错误(502)";
//             break;
//           case 503:
//             message = "服务不可用(503)";
//             break;
//           case 504:
//             message = "网络超时(504)";
//             break;
//           case 505:
//             message = "HTTP版本不受支持(505)";
//             break;
//           default:
//             message = `连接出错(${error.response.status})!`;
//         }
//         //TODO 错误抛出
//         alert(message);
//         return Promise.reject(error.response);
//       }
//     );
//   }
//   //定义请求方法
//   public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
//     return this.instance.request(config);
//   }
// }
// export default new Request({});
