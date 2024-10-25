import type home from '@/api/mockServeData/home'
import type user from '@/api/mockServeData/user'
import type { userDataType } from '@/api/mockServeData/user'
import http from './axios'

// 给每个接口设置返回类型
type THomeData = ReturnType<typeof home.getStatisticalData>
type TUserData = ReturnType<typeof user.getUserList>
type TUserAddData = ReturnType<typeof user.createUser>

export const getData = () => {
	return http.request<THomeData>({
		url: '/home/getData',
		method: 'get',
	})
}

export const getUser = (params?: string) => {
	return http.request<TUserData>({
		url: '/user/getUser',
		method: 'get',
		params,
	})
}

export const addUser = (data: string) => {
	return http.request<TUserAddData>({
		url: '/user/add',
		method: 'post',
		data,
	})
}
