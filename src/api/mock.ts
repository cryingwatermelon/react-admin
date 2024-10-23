import homeApi from '@/api/mockServeData/home'
import UserApi from '@/api/mockServeData/user'
import Mock from 'mockjs'

//拦截接口
Mock.mock('/home/getData', homeApi.getStatisticalData)
Mock.mock('/user/getUser', UserApi.getUserList)
