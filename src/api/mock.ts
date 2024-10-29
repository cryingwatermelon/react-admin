import homeApi from '@/api/mockServeData/home'
import userApi from '@/api/mockServeData/user'
import Mock from 'mockjs'

//拦截接口
Mock.mock(/home\/getData/, homeApi.getStatisticalData)
Mock.mock(/user\/getUser/, userApi.getUserList)
Mock.mock(/user\/addUser/, userApi.createUser)
Mock.mock(/user\/editUser/, userApi.updateUser)
Mock.mock(/user\/deleteUser/, userApi.deleteUser)
