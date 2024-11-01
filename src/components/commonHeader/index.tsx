import { collapseMenu } from '@/store/reducer/tab'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
// import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, type MenuProps } from 'antd'
import { useDispatch } from 'react-redux'

const { Header } = Layout
const url =
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvq0Th12s2DdB94TomTrlK3rEHVPKSF_Hj4Q&s'

type commonHeaderProps = {
	collapsed: boolean
}
const CommonHeader = ({ collapsed }: commonHeaderProps) => {
	// console.log(collapsed, "commonHeader");
	const navigate = useNavigate()
	const logout = () => {
		localStorage.removeItem('token')
		navigate('/login')
	}
	const items: MenuProps['items'] = [
		{
			label: <Button>个人中心</Button>,
			key: '0',
		},
		{
			label: <Button onClick={() => logout()}>退出登录</Button>,
			key: '1',
		},
	]
	//创建dispatch
	const dispatch = useDispatch()
	//侧边栏的展开收起
	const setCollapsed = () => {
		dispatch(collapseMenu())
	}
	return (
		<Header className="flex items-center justify-between ">
			<Button
				type="text"
				icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				style={{
					fontSize: '16px',
					width: 64,
					height: 32,
					backgroundColor: 'white',
				}}
				onClick={setCollapsed}
			/>
			<Dropdown menu={{ items }} trigger={['click']}>
				<Avatar src={<img src={url} alt="avatar" />} size={36} />
			</Dropdown>
		</Header>
	)
}

export default CommonHeader
