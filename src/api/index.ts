import type home from '@/api/mockServeData/home'
import http from './axios'

// 给每个接口设置返回类型
type THomeData = ReturnType<typeof home.getStatisticalData>

export const getData = () => {
	return http.request<THomeData>({
		url: '/home/getData',
		method: 'get',
	})
}
