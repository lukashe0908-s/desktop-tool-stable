'use client';
import { Card, CardBody, Switch, Button, Calendar, Divider, Code, CardHeader } from '@nextui-org/react';
import { useEffect, useState } from 'react';
export default function App() {
  return (
    <>
      <div className='flex gap-5 flex-col'>
        <Card>
          <CardBody className='block'>
            <span className='font-bold text-2xl'>作者：471 XXX</span>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <span className='font-bold text-2xl'>使用教程：</span>
          </CardHeader>
          <CardBody className='whitespace-pre-wrap *:whitespace-pre-wrap !gap-0'>
            <span className='font-bold text-xl block'>1.自启动：</span>
            <span>
              {`功能现已放入常规，最新版本可用 (`}
              <Code>Failed Found</Code>
              {`为版本过旧)
旧版：`}
            </span>
            <span className='pl-8'>
              {`使用 Win+R ,在 运行 中输入
或在 资源管理器 地址栏 中输入
`}
              <Code>shell:startup</Code>
              {`
将程序 快捷方式 放入此文件夹`}
            </span>
            <span className='font-bold text-xl block pt-4'>2.课表编辑 名称：</span>
            <span>{`（表格中的列“所有”为整行设置默认值，会被具体星期的值覆盖）
第一行 单周课程
第二行 双周课程
（如没有双周则只输入第一行，不要换行）`}</span>
            <span className='font-bold text-xl block pt-4'>3.课表编辑 时间：</span>
            <span>{`填写学期开始日期以确定单双周`}</span>
          </CardBody>
        </Card>
        <div className='flex gap-4 flex-wrap'>
          <Button
            onClick={() => {
              var serviceWorker = navigator.serviceWorker;
              serviceWorker.getRegistrations
                ? serviceWorker.getRegistrations().then(function (sws) {
                    sws.forEach(function (sw) {
                      sw.unregister();
                      console.log('sw unregister 1', sw);
                    });
                  })
                : serviceWorker.getRegistration &&
                  serviceWorker.getRegistration().then(function (sw) {
                    sw && sw.unregister();
                    console.log('sw unregister 2', sw);
                  });
            }}
          >
            删除离线加载器
          </Button>
          <Button
            onClick={async () => {
              caches.delete('desktop-tool').then(function (e) {
                console.log('cache storage', e);
              });
              var request = indexedDB.deleteDatabase('workbox-expiration');
              console.log(request);
            }}
          >
            删除缓存
          </Button>
        </div>
      </div>
    </>
  );
}
