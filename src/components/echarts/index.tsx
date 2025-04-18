import * as echarts from 'echarts'
import type { EChartsOption, SeriesOption } from 'echarts'
import type React from 'react'

//配置echarts 有坐标系
const axisOption: EChartsOption = {
	// 图例文字颜色
	textStyle: {
		color: '#333',
	},
	// 提示框
	tooltip: {
		trigger: 'axis',
	},
	xAxis: {
		type: 'category', // 类目轴
		data: [],
		axisLine: {
			lineStyle: {
				color: '#17b3a3',
			},
		},
		axisLabel: {
			interval: 0,
			color: '#333',
		},
	},
	yAxis: [
		{
			type: 'value',
			axisLine: {
				lineStyle: {
					color: '#17b3a3',
				},
			},
		},
	],
	color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3'],
	series: [],
}

//没有坐标系
const normalOption: EChartsOption = {
	tooltip: {
		trigger: 'item',
	},
	color: [
		'#0f78f4',
		'#dd536b',
		'#9462e5',
		'#a6a6a6',
		'#e1bb22',
		'#39c362',
		'#3ed1cf',
	],
	series: [],
}

type EchartsProps = {
	style: React.CSSProperties
	chartData: {
		xData?: string[]
		series: SeriesOption[]
	}
	isAxisChart?: boolean
}

const Echarts = ({ style, chartData, isAxisChart = true }: EchartsProps) => {
	//获取dom实例
	const echartRef = useRef<HTMLDivElement | null>(null)
	const echartObj = useRef<echarts.ECharts>()

	useEffect(() => {
		//echarts初始化
		echartObj.current = echarts.init(echartRef.current)

		let options: EChartsOption

		//设置option
		if (isAxisChart) {
			options = axisOption
			if (Array.isArray(options.xAxis)) {
				options.xAxis[0] = {
					...options.xAxis,
					type: 'category',
					data: chartData.xData,
				}
			} else {
				options.xAxis = [
					{
						...options.xAxis,
						type: 'category',
						data: chartData.xData,
					},
				]
			}
		} else {
			options = normalOption
		}
		options.series = chartData.series

		echartObj.current.setOption(options)

		return () => echartObj.current?.dispose()
	}, [chartData])

	return <div style={style} ref={echartRef} />
}

export default Echarts
