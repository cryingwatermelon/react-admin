import Mock from "mockjs";
import homeApi from "@/api/mockServeData/home";
//拦截接口
Mock.mock("/home/getData", homeApi.getStatisticalData());
