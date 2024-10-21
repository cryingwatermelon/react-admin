import homeApi from '@/api/mockServeData/home'
import Mock from 'mockjs'
//拦截接口
Mock.mock('/home/getData', homeApi.getStatisticalData())
