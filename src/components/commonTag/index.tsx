import { CloseCircleOutlined } from '@ant-design/icons'
import { Space, Tag } from 'antd'
import { useSelector } from 'react-redux'

const CommonTag = () => {
	const tabList = useSelector((state) => state.tab.tabList)
	const handleClose = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault()
		console.log('Clicked! But prevent default')
	}
	return (
		<Space size={[0, 8]} wrap className="pt-[24px] pl-[24px]">
			<Tag>首页</Tag>
			<Tag>
				<a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
			</Tag>
			<Tag color="#55acee" closeIcon onClose={() => handleClose}>
				Prevent Default
			</Tag>
			<Tag closeIcon={<CloseCircleOutlined />} onClose={console.log}>
				Tag 2
			</Tag>
		</Space>
	)
}

export default CommonTag
