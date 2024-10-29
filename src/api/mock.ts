import homeApi from '@/api/mockServeData/home'
import userApi from '@/api/mockServeData/user'
import Mock from 'mockjs'

//拦截接口
Mock.mock(/home\/getData/, homeApi.getStatisticalData)
Mock.mock(/user\/getUser/, userApi.getUserList)
Mock.mock(/user\/addUser/, 'post', userApi.createUser)
Mock.mock(/user\/editUser/, 'post', userApi.updateUser)
Mock.mock(/user\/deleteUser/, 'post', userApi.deleteUser)
