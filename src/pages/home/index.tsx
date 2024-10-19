import { Col, Row, Card, Table } from "antd";
import { getData } from "@/api";
import type { IconNames } from "@/config";
import * as AllIcons from "@ant-design/icons";
import type { CountData } from "@/config";
import * as echarts from "echarts";
import { useRef } from "react";

const url =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvq0Th12s2DdB94TomTrlK3rEHVPKSF_Hj4Q&s";

const columns = [
  {
    title: "课程",
    dataIndex: "name",
  },
  {
    title: "今日购买",
    dataIndex: "todayBuy",
  },
  {
    title: "本月购买",
    dataIndex: "monthBuy",
  },
  {
    title: "总购买",
    dataIndex: "totalBuy",
  },
];
//订单统计的数据
const countData: CountData[] = [
  {
    name: "今日支付订单",
    value: 1234,
    icon: "CheckCircleOutlined",
    color: "#2ec7c9",
  },
  {
    name: "今日收藏订单",
    value: 3421,
    icon: "CheckCircleOutlined",
    color: "#ffb980",
  },
  {
    name: "今日未支付订单",
    value: 1234,
    icon: "CheckCircleOutlined",
    color: "#5ab1ef",
  },
  {
    name: "本月支付订单",
    value: 1234,
    icon: "CheckCircleOutlined",
    color: "#2ec7c9",
  },
  {
    name: "本月收藏订单",
    value: 1234,
    icon: "CheckCircleOutlined",
    color: "#ffb980",
  },
  {
    name: "本月未支付订单",
    value: 1234,
    icon: "CheckCircleOutlined",
    color: "#5ab1ef",
  },
];
//动态获取icon
// const iconToElement = (name: IconNames, width?: string) => {
//   const AntdIcon = AllIcons[name];
//   return (
//     <AntdIcon
//       value=""
//       style={{ fontSize: width, textAlign: "center", marginTop: "10px" }}
//     />
//   );
// };

const getElementByName = (
  name: IconNames,
  props: React.HTMLAttributes<HTMLSpanElement>
) => {
  const AntdIcon = AllIcons[name];
  return <AntdIcon {...props} value="" />;
};
// const GetElementByName = (
//   name: IconNames,
//   props: React.HTMLAttributes<HTMLSpanElement>
// ) => {
//   const AntdIcon = AllIcons[name];
//   return <AntdIcon {...props} value="" />;
// };
const Home = () => {
  useEffect(() => {
    getData().then(({ data }) => {
      // console.log(res.data, "home_res");
      const { tableData } = data.data;
      setTableData(tableData);
      // console.log(data.data.tableData, "tableData");
    });
  });
  const [tableData, setTableData] = useState();

  // let myChart = echarts.init(document.getElementById("main"));
  // // 绘制图表
  // myChart.setOption({
  //   title: {
  //     text: "ECharts 入门示例",
  //   },
  //   tooltip: {},
  //   xAxis: {
  //     data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
  //   },
  //   yAxis: {},
  //   series: [
  //     {
  //       name: "销量",
  //       type: "bar",
  //       data: [5, 20, 36, 10, 10, 20],
  //     },
  //   ],
  // });

  const chartsRef = useRef(null);
  useEffect(() => {
    const myChart = echarts.init(chartsRef.current);
    myChart.setOption({
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
    return () => myChart.dispose();
  }, []);
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
                rowKey={"name"}
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
                      {/* {iconToElement(item.icon, "60px")} */}
                      {getElementByName(item.icon, {
                        className: "text-[40px] m-[20px] text-white",
                      })}
                      {/* {<GetElementByName name={item.icon} />} */}
                    </div>
                    <div className="ml-[15px] flex flex-col justify-center">
                      <p className="mb-[10px] text-[30px]">¥{item.value}</p>
                      <p className="text-[14px] decoration-black">
                        {item.name}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          {/* <div id="main" style={{ height: "300px" }} /> */}
          <div ref={chartsRef} style={{ height: "300px" }} />
        </Col>
      </Row>
    </>
  );
};

export default Home;
