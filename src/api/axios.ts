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
		//请求拦截器
		instance.interceptors.request.use(
			(config) => {
				return config
			},
			(error) => {
				return error
			},
		)
		//响应拦截器
		instance.interceptors.response.use(
			(response) => {
				return response
			},
			(error) => {
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
