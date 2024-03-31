'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Listbox, ListboxItem, Card, CardBody, Switch, Button, ButtonGroup, Slider, Divider } from '@nextui-org/react';
import { LessonsListName, LessonsListTime } from '../../components/settings/lessonsList';
import { Display as DisplayTab } from '../../components/settings/display';
import IconMenu from '../../components/Icon menu';

async function getConfigSync(arg) {
  return new Promise((resolve, reject) => {
    window.ipc.send('get-config', arg);
    window.ipc.once('get-config/' + arg, data => {
      resolve(data);
    });
  });
}
export default function SettingsPage() {
  const [mainTab, setMainTab] = useState('');
  return (
    <>
      <title>Settings - Desktop Tool</title>
      <div className='flex h-full select-none'>
        <div className='h-full flex'>
          <div className='m-2 border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 overflow-auto'>
            <Listbox
              aria-label='d0f0cc60-dbc5-43c2-9838-46c620935d9f'
              color='primary'
              onAction={(key: string) => {
                setMainTab(key);
              }}
            >
              <ListboxItem key='lesson-edit'>课表编辑(名称)</ListboxItem>
              <ListboxItem key='lesson-edit2'>课表编辑(时间)</ListboxItem>
              <ListboxItem key='display'>常规</ListboxItem>
              <ListboxItem key='privacy'>隐私和安全性</ListboxItem>
              {/* <ListboxItem key='404'>404</ListboxItem> */}
            </Listbox>
          </div>
        </div>
        <div className='h-full w-full p-2 overflow-auto'>
          {(() => {
            if (mainTab == '' || mainTab == 'lesson-edit') {
              return (
                <div className='h-full' key={mainTab}>
                  <LessonsListName></LessonsListName>
                </div>
              );
            } else if (mainTab == 'lesson-edit2') {
              return (
                <div className='h-full' key={mainTab}>
                  <LessonsListTime></LessonsListTime>
                </div>
              );
            } else if (mainTab == 'display') {
              return (
                <>
                  <div className='h-full flex gap-5 flex-col' key={mainTab}>
                    <DisplayTab></DisplayTab>
                    <Divider></Divider>
                    <IconMenu></IconMenu>
                  </div>
                </>
              );
            } else if (mainTab == 'privacy') {
              return (
                <>
                  <div className='h-full flex gap-5 flex-col' key={mainTab}>
                    <Card>
                      <CardBody>
                        <p>你正在发送必需诊断数据</p>
                        <span className='text-gray-600 text-sm'>帮助改进软件并使其保特安全、最新并按预期工作</span>
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
            return (
              <>
                <div className='px-[40%] h-full' key={mainTab}>
                  <Card>
                    <CardBody>
                      <p className='text-center text-lg font-bold'>Tab Not Found</p>
                    </CardBody>
                  </Card>
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </>
  );
}
