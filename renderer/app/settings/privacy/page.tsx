import { Card, CardBody, Switch } from '@nextui-org/react';
export default function App() {
  return (
    <>
      <div className='h-full flex gap-5 flex-col'>
        <Card>
          <CardBody className='block'>
            <p>你正在发送必需诊断数据</p>
            <span className='text-gray-600 text-sm'>帮助改进软件并使其保特安全、最新并按预期工作</span>
            <br /> <br />
            <p>问题</p>
            <span className='text-gray-600 text-sm'>
              周数起始时间大于目前时间 一直为双周
              <br />
              (-1/-0)==1 // false (isSingleWeek)
            </span>
          </CardBody>
        </Card>
        <div className='flex gap-4 flex-wrap'>
          <Switch isDisabled defaultSelected>
            参数使用云控值
          </Switch>
          <Switch>配置云端备份</Switch>
        </div>
      </div>
    </>
  );
}
