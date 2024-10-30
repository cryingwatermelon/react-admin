import { useAppDispatch } from '@/store'
import {
  type TTab,
  closeTab,
  selectCurrentMenu,
  selectTabList,
  setCurrentMenu,
} from '@/store/reducer/tab'
import { CloseOutlined } from '@ant-design/icons'
import { Space, Tag } from 'antd'
import { useSelector } from 'react-redux'

const CommonTag = () => {
  const tabList = useSelector(selectTabList)
  const currentMenu = useSelector(selectCurrentMenu)

  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const handleClose = (item: TTab, index: number) => {
    const lastIndex = tabList.length - 1
    dispatch(closeTab(item))
    // 关闭的页面不为当前路径（never）
    if (item.path !== location.pathname) {
      return
    }
    // 当前路径为最后一项，关闭后则选中前一项
    if (index === lastIndex) {
      const prevData = tabList[index - 1]
      dispatch(setCurrentMenu(prevData))
      navigate(prevData.path)
      return
    }
    // 剩余tab长度大于1，则选中后一项
    if (tabList.length > 1) {
      const nextData = tabList[index + 1]
      dispatch(setCurrentMenu(nextData))
      navigate(nextData.path)
      return
    }
    // 仅剩一项home
    const homeData = { path: '/', name: 'home', label: '首页' }
    dispatch(setCurrentMenu(homeData))
    navigate(homeData.path)
    return
  }

  const handleChange = (item: TTab) => {
    dispatch(setCurrentMenu(item))
    navigate(item.path)
  }

  const setTag = (flag: boolean, item: TTab, index: number) => {
    return flag ? (
      <Tag
        key={item.label}
        color="#55acee"
        closeIcon={item.path === '/home' ? <></> : <CloseOutlined />}
        onClose={() => handleClose(item, index)}
      >
        {item.label}
      </Tag>
    ) : (
      <Tag key={item.label} onClick={() => handleChange(item)}>
        {item.label}
      </Tag>
    )
  }

  return (
    <Space size={[0, 8]} wrap className="pt-[24px] pl-[24px]">
      {tabList.length > 1 &&
        tabList.map((item, index) =>
          setTag(item.path === currentMenu.path, item, index),
        )}
    </Space>
  )
}

export default CommonTag
