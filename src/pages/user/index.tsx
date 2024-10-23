import { Button, Form, Input, Modal, Popconfirm, Table } from 'antd'
import { getUser } from '@/api/index'
const User = () => {
	//定义getUserList的参数
	const [listData, setListData] = useState({
		name: '',
	})
	const [tableData, setTableData] = useState([])
	//0代表新增 1代表编辑
	const [modalType, setModalType] = useState(0)
	const [isModalOpen, setIsModalOpen] = useState(false)
	//创建form实例
	const [form] = Form.useForm()

	const handleClick = (type: string, rowData?) => {
		setIsModalOpen(!isModalOpen)
		if (type === 'add') {
			setModalType(0)
		} else if (type === 'edit') {
			setModalType(1)
		} else {
		}
	}

	const handleFinish = (e) => {
		setListData({
			name: e.name,
		})
	}
	const getTableData = () => {
		getUser().then((data) => {
			console.log(data)
			setTableData(data.list)
		})
	}
	const handleDelete = (rowData) => {}
	const handleOk = () => {}
	const handleCancel = () => {
		setIsModalOpen(false)
	}
	const columns = [
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
			render: (rowData) => {
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
				</Form>
			</Modal>
		</div>
	)
}

export default User
