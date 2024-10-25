import {
	Button,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Modal,
	Popconfirm,
	Radio,
	Table,
} from 'antd'
import { getUser } from '@/api/index'
import type { userDataType } from '@/api/mockServeData/user'
import type { RadioChangeEvent, DatePickerProps, TableColumnsType } from 'antd'
import dayjs from 'dayjs'

const User = () => {
	//定义getUserList的参数
	const [listData, setListData] = useState({
		name: '',
	})
	const [tableData, setTableData] = useState([])
	const [sex, setSex] = useState(0)
	//0代表新增 1代表编辑
	const [modalType, setModalType] = useState(0)
	const [isModalOpen, setIsModalOpen] = useState(false)
	//创建form实例
	const [form] = Form.useForm()

	const handleClick = (type: string, rowData?: userDataType) => {
		setIsModalOpen(!isModalOpen)
		if (type === 'add') {
			setModalType(0)
		} else if (type === 'edit') {
			setModalType(1)
		} else {
		}
	}

	const handleFinish = (e: any) => {
		setListData({
			name: e.name,
		})
	}
	const getTableData = () => {
		getUser().then((data) => {
			setTableData(data.list)
		})
	}
	const handleDelete = (rowData: userDataType) => {}
	const handleOk = () => {
		//表单校验
		form.validateFields().then((value) => {
			//对表单日期进行单独的校验
			value.birth = dayjs(value.birth).format('YYYY-MM-DD')
			// console.log(value, 'valid')
			//调接口实现数据更新
			// if()
		})
	}
	const handleCancel = () => {
		setIsModalOpen(false)
	}
	const changeSex = (e: RadioChangeEvent) => {
		console.log('radio checked', e.target.value)
		setSex(e.target.value)
	}
	const changeBirth: DatePickerProps['onChange'] = (date, dateString) => {
		console.log(date, dateString)
	}

	const columns: TableColumnsType<userDataType> = [
		{
			title: '姓名',
			dataIndex: 'name',
		},
		{
			title: '年龄',
			dataIndex: 'age',
		},
		{
			title: '性别',
			dataIndex: 'sex',
			render: (value: number) => {
				return value ? '男' : '女'
			},
		},
		{
			title: '出生日期',
			dataIndex: 'birth',
		},
		{
			title: '地址',
			dataIndex: 'addr',
		},
		{
			title: '操作',
			render: (rowData: userDataType) => {
				return (
					<div className="flex">
						<Button
							style={{ marginRight: '5px' }}
							onClick={() => handleClick('edit', rowData)}
						>
							编辑
						</Button>
						<Popconfirm
							title="提示"
							description="你确定要删除吗"
							onConfirm={() => handleDelete(rowData)}
							okText="是"
							cancelText="否"
						>
							<Button type="primary" danger>
								删除
							</Button>
						</Popconfirm>
					</div>
				)
			},
		},
	]
	useEffect(() => {
		//获取用户信息
		getTableData()
	}, [])
	return (
		<div className="flex flex-col">
			<div className="flex w-full justify-between">
				<Button type="primary" onClick={() => handleClick('add')}>
					新增
				</Button>
				<Form layout="inline" onFinish={handleFinish}>
					<Form.Item name="keyword">
						<Input placeholder="请输入用户名" />
					</Form.Item>
					<Form.Item>
						<Button htmlType="submit" type="primary">
							搜索
						</Button>
					</Form.Item>
				</Form>
			</div>
			<Table columns={columns} dataSource={tableData} rowKey={'id'} />
			<Modal
				title={modalType ? '编辑' : '新增'}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				okText="确定"
				cancelText="取消"
			>
				<Form
					form={form}
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 18 }}
					labelAlign="left"
				>
					<Form.Item
						label="姓名"
						name="name"
						rules={[{ required: true, message: '请输入姓名' }]}
					>
						<Input placeholder="请输入姓名" />
					</Form.Item>
					<Form.Item
						label="年龄"
						name="age"
						rules={[
							{
								required: true,
								type: 'number',
								min: 0,
								max: 99,
								message: '年龄不能为负数',
							},
						]}
					>
						<InputNumber />
					</Form.Item>
					<Form.Item
						label="性别"
						name="sex"
						rules={[{ required: true, message: '请选择性别' }]}
					>
						<Radio.Group onChange={changeSex} value={sex}>
							<Radio value={0}>男</Radio>
							<Radio value={1}>女</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="出生日期" name="birth">
						<DatePicker onChange={changeBirth} format="YYYY-MM-DD" />
					</Form.Item>
					<Form.Item
						label="地址"
						name="addr"
						rules={[{ required: true, message: '请输入地址' }]}
					>
						<Input.TextArea
							placeholder="请输入地址"
							autoSize={{ maxRows: 6 }}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)
}

export default User
