import { getData } from '@/api'
import MyEcharts from '@/components/echarts/index'
import type { CountData } from '@/config'
import { iconToElement } from '@/utils/function'
import { Card, Col, Row, Table } from 'antd'
import type { SeriesOption } from 'echarts'

const url =
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvq0Th12s2DdB94TomTrlK3rEHVPKSF_Hj4Q&s'

const columns = [
	{
		title: '课程',
		dataIndex: 'name',
	},
	{
		title: '今日购买',
		dataIndex: 'todayBuy',
	},
	{
		title: '本月购买',
		dataIndex: 'monthBuy',
	},
	{
		title: '总购买',
		dataIndex: 'totalBuy',
	},
]

//订单统计的数据
const countData: CountData[] = [
	{
		name: '今日支付订单',
		value: 1234,
		icon: 'CheckCircleOutlined',
		color: '#2ec7c9',
	},
	{
		name: '今日收藏订单',
		value: 3421,
		icon: 'CheckCircleOutlined',
		color: '#ffb980',
	},
	{
		name: '今日未支付订单',
		value: 1234,
		icon: 'CheckCircleOutlined',
		color: '#5ab1ef',
	},
	{
		name: '本月支付订单',
		value: 1234,
		icon: 'CheckCircleOutlined',
		color: '#2ec7c9',
	},
	{
		name: '本月收藏订单',
		value: 1234,
		icon: 'CheckCircleOutlined',
		color: '#ffb980',
	},
	{
		name: '本月未支付订单',
		value: 1234,
		icon: 'CheckCircleOutlined',
		color: '#5ab1ef',
	},
]

const Home = () => {
	// 创建echart响应数据
	const [echartData, setEchartData] = useState<
		Record<
			string,
			{
				xData: string[]
				series: SeriesOption[]
			}
		>
	>({})

	const [tableData, setTableData] = useState<
		{
			name: string
			todayBuy: number
			monthBuy: number
			totalBuy: number
		}[]
	>([])

	useEffect(() => {
		getData().then(({ data }) => {
			const { tableData, orderData } = data
			// console.log(orderData, 'orderData')
			setTableData(tableData)
			//对于echarts数据的组装
			const order = orderData
			//x轴的数据
			const xData = order.date
			//series的数据
			const keyArray = Object.keys(order.data[0])
			const series = keyArray.map((key) => ({
				name: key,
				data: order.data.map((item) => item[key]),
				type: 'line' as const,
			}))

			setEchartData({
				order: {
					xData,
					series,
				},
			})
		})
	}, [])

	return (
		<>
			<Row className="mb-[10px] font-[32px]">
				<Col span={8}>
					<div>
						<Card hoverable>
							<div className="mb-[20px] flex items-center border-stone-200 border-b-[1px] border-solid pb-[20px] ">
								<img className="mr-[40px] size-[150px] border-50%" src={url} />
								<div>
									{/* <p style={{ fontSize: 32 }} className="mb-[10px]"> */}
									<p className="mb-[10px] text-[32px]">Admin</p>
									<p>超级管理员</p>
								</div>
							</div>
							<div className="line-height-[28px] text-[14px] text-gray-400">
								<p>
									上次登陆时间:
									<span className="ml-[60px] text-gray-600">2021-07-19</span>
								</p>
								<p>
									上次登陆地点:
									<span className="ml-[60px] text-gray-600">武汉</span>
								</p>
							</div>
						</Card>
						<Card>
							<Table
								dataSource={tableData}
								columns={columns}
								rowKey={'name'}
								pagination={false}
							/>
						</Card>
					</div>
				</Col>
				<Col span={16}>
					<div className="ml-[5px] flex flex-wrap justify-between">
						{countData.map((item) => {
							return (
								<Card className="mb-[20px] w-1/3" key={item.name}>
									<div className="flex">
										<div
											className="line-height-[80px] h-[80px] w-[80px] text-center text-[30px] decoration-white"
											style={{ background: item.color }}
										>
											{iconToElement(item.icon, {
												className: 'text-[40px] m-[20px] text-white',
											})}
										</div>
										<div className="ml-[15px] flex flex-col justify-center">
											<p className="mb-[10px] text-[30px]">¥{item.value}</p>
											<p className="text-[14px] decoration-black">
												{item.name}
											</p>
										</div>
									</div>
								</Card>
							)
						})}
					</div>
					{echartData.order && (
						<MyEcharts
							chartData={echartData.order}
							style={{ height: '280px' }}
						/>
					)}
				</Col>
			</Row>
		</>
	)
}

export default Home
