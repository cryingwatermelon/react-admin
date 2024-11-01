import { Button, Checkbox, Form, FormProps, Input } from 'antd'

type FieldType = {
	username?: string
	password?: string
	remember?: string
}
const Login = () => {
	const handleSubmit: FormProps<FieldType>['onFinish'] = (values) => {
		console.log(values, 'Success')
	}
	const handleSubmitFailed: FormProps<FieldType>['onFinishFailed'] = (
		errorInfo,
	) => {
		console.log(errorInfo, 'Failed')
	}
	return (
		<div className="flex h-screen w-screen items-center justify-center ">
			<div className="rounded px-10 py-2 ring-4 drop-shadow-md">
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					initialValues={{ remember: true }}
					onFinish={() => handleSubmit}
					onFinishFailed={() => handleSubmitFailed}
					className="flex flex-col "
				>
					<text className="mb-6 text-center text-xl">登录系统</text>
					<Form.Item<FieldType>
						label="username"
						name="username"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item<FieldType>
						label="password"
						name="password"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item<FieldType>
						name="remember"
						valuePropName="checked"
						wrapperCol={{ offset: 8, span: 16 }}
					>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit">
							Login
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}

export default Login
