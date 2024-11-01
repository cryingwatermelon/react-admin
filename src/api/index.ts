import type home from '@/api/mockServeData/home'
import type user from '@/api/mockServeData/user'
import type permission from '@/api/mockServeData/permission'
import http from './axios'
import type { TGetUserListParams, userDataType } from '@/api/mockServeData/user'
import type { FieldType } from '@/pages/login'

// 给每个接口设置返回类型
type THomeData = ReturnType<typeof home.getStatisticalData>
type TUserData = ReturnType<typeof user.getUserList>
type TUserAddData = ReturnType<typeof user.createUser>
type TUserEditData = ReturnType<typeof user.updateUser>
type TUserDeleteData = ReturnType<typeof user.deleteUser>
type TPermissionGetMenu = ReturnType<typeof permission.getMenu>

export const getData = () => {
	return http.request<THomeData>({
		url: '/home/getData',
		method: 'get',
	})
}

export const getUser = (params?: TGetUserListParams) => {
	return http.request<TUserData>({
		url: '/user/getUser',
		method: 'get',
		params,
	})
}

export const addUser = (data: userDataType) => {
	return http.request<TUserAddData>({
		url: '/user/addUser',
		method: 'post',
		data,
	})
}

export const editUser = (data: userDataType) => {
	return http.request<TUserEditData>({
		url: '/user/editUser',
		method: 'post',
		data,
	})
}

export const deleteUser = (data: userDataType) => {
	return http.request<TUserDeleteData>({
		url: '/user/deleteUser',
		method: 'post',
		data,
	})
}

export const getMenu = (params: FieldType) => {
	return http.request<TPermissionGetMenu>({
		url: '/permission/getMenu',
		method: 'post',
		params,
	})
}
