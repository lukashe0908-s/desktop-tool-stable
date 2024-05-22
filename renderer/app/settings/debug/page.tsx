'use client';
import { Card, CardBody, Switch, Button, Calendar, Divider } from '@nextui-org/react';
import { useEffect, useState } from 'react';
export default function App() {
  return (
    <>
      <div className='flex gap-5 flex-col'>
        <Card>
          <CardBody className='block'>
            <span className='font-bold text-xl'>作者：章教授</span>
          </CardBody>
        </Card>
        <Card>
          <CardBody className='block whitespace-pre-wrap'>
            <span className='font-bold text-xl block pb-4'>使用帮助：</span>
{`自启动：
使用 Win+R ,在 运行 中输入
或在 资源管理器 地址栏 中输入
shell:startup
将程序 快捷方式 放入此文件夹

课表编辑 名称：
第一行 单周课程
第二行 双周课程
（如没有双周则只输入第一行，不要换行）`}
          </CardBody>
        </Card>
        <div className='flex gap-4 flex-wrap hidden'>
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
