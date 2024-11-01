import { Button, Form, type FormProps, Input } from 'antd'
import { getMenu } from '@/api'

export type FieldType = {
	username?: string
	password?: string
}
const Login = () => {
	const navigate = useNavigate()
	const handleSubmit: FormProps<FieldType>['onFinish'] = (values) => {
		getMenu(values).then(({ data }) => {
			// console.log(data, 'getMenu')
			if (!data.token) return
			localStorage.setItem('token', data.token)
			navigate('/home')
		})
	}
	const handleSubmitFailed: FormProps<FieldType>['onFinishFailed'] = (
		errorInfo,
	) => {
		console.log(errorInfo, 'Failed')
	}

	return (
		<div className="flex h-screen w-screen items-center">
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				onFinish={handleSubmit}
				onFinishFailed={handleSubmitFailed}
				className="m-auto box-border flex w-[350px] flex-col rounded-lg border-[1px] border-solid bg-[#fff] p-[35px] shadow-slate-500"
			>
				<div className="mb-6 text-center text-xl">登录系统</div>
				<Form.Item<FieldType>
					label="Username"
					name="username"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item<FieldType>
					label="Password"
					name="password"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
						Login
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default Login
