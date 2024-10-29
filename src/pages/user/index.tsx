import { addUser, deleteUser, editUser, getUser } from '@/api/index'
import type { TUser } from '@/api/mockServeData/user'
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
import type {
  DatePickerProps,
  FormProps,
  RadioChangeEvent,
  TableColumnsType,
} from 'antd'
import dayjs from 'dayjs'

type ValueOfObject<T extends object> = T extends Record<keyof T, infer V>
  ? V
  : never

const GENDER = {
  FEMALE: 0,
  MALE: 1,
} as const

const MODALSTATUS = {
  CLOSE: 0,
  OPEN: 1,
} as const

const User = () => {
  //定义getUserList的参数
  const [listData, setListData] = useState({
    name: '',
  })
  const [sex, setSex] = useState(0)
  const [birth, setBirth] = useState<dayjs.Dayjs>()
  const [tableData, setTableData] = useState<TUser[]>([])
  //0代表新增 1代表编辑
  const [modalType, setModalType] = useState<ValueOfObject<typeof MODALSTATUS>>(
    MODALSTATUS.CLOSE,
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  //创建form实例
  const [form] = Form.useForm<TUser>()

  const handleClick = (type: 'add' | 'edit', rowData?: TUser) => {
    setIsModalOpen(!isModalOpen)
    if (type === 'add') {
      setModalType(0)
    } else {
      setModalType(1)
      const cloneData = JSON.parse(JSON.stringify(rowData))
      form.setFieldsValue({
        ...cloneData,
        birth: dayjs(cloneData.birth),
      })
    }
  }

  const handleFinish: FormProps<{ keyword: string }>['onFinish'] = (values) => {
    if (values.keyword === listData.name) return
    setListData({
      name: values.keyword,
    })
  }

  // TODO 如何添加更多分页的数据？
  const getTableData = useCallback(() => {
    getUser(listData).then((data) => {
      setTableData(data.list)
    })
  }, [listData])

  const handleDelete = ({ id }: TUser) => {
    deleteUser({ id }).then(() => {
      getTableData()
    })
  }

  const handleOk = () => {
    //表单校验
    form.validateFields().then((value) => {
      //对表单日期进行单独的校验
      const newValue = {
        ...value,
        birth: dayjs(value.birth).format('YYYY-MM-DD'),
      }
      // console.log(value, 'valid')
      //调接口实现数据更新
      if (modalType === MODALSTATUS.OPEN) {
        editUser(newValue).then(() => {
          handleCancel()
          getTableData()
        })
      } else {
        addUser(newValue).then(() => {
          handleCancel()
          getTableData()
        })
      }
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const changeSex = (e: RadioChangeEvent) => {
    // console.log('radio checked', e.target.value)
    setSex(e.target.value)
  }

  const changeBirth: DatePickerProps['onChange'] = (date) => {
    // console.log(date, dateString)
    setBirth(date)
  }

  const columns: TableColumnsType<TUser> = [
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
        return value === GENDER.MALE ? '男' : '女'
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
      render: (_, rowData) => {
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
  }, [getTableData])

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
      <Table
        style={{ marginTop: '10px' }}
        columns={columns}
        dataSource={tableData}
        rowKey={'id'}
      />
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
          {modalType === MODALSTATUS.OPEN && (
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
          )}
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
              <Radio value={GENDER.MALE}>男</Radio>
              <Radio value={GENDER.FEMALE}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="出生日期" name="birth">
            <DatePicker
              onChange={changeBirth}
              value={birth}
              format="YYYY-MM-DD"
            />
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
