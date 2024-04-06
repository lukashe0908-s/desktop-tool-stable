'use client';
import { useState, useEffect } from 'react';
import { Divider } from '@nextui-org/react';
import { Navigation, NavigationSub, NavigationItem } from '../../components/navigation';

export default function Template({ children }) {
  return (
    <>
      <title>Settings - Desktop Tool</title>
      <div className='flex h-full select-auto'>
        <div className='h-full flex select-none'>
          <div className='overflow-auto scrollbar-hide border-r-2 min-w-44'>
            <span className='block text-center font-bold text-xl p-2 [color:#F6821F]'>Settings</span>
            <Divider></Divider>
            <Navigation>
              <NavigationItem link={'/settings/lessonEdit'}>课表编辑</NavigationItem>
              <NavigationSub>
                <NavigationItem link={'/settings/lessonEdit/default'}>初始值</NavigationItem>
                <NavigationItem link={'/settings/lessonEdit/name'}>名称</NavigationItem>
                <NavigationItem link={'/settings/lessonEdit/time'}>时间</NavigationItem>
                <NavigationItem link={'/settings/lessonEdit/changeDay'}>换课 (天)</NavigationItem>
                <NavigationItem link={'/settings/lessonEdit/change'}>换课</NavigationItem>
              </NavigationSub>
              <NavigationItem link={'/settings/display'}>常规</NavigationItem>
              <NavigationItem link={'/settings/privacy'}>隐私和数据</NavigationItem>
              <NavigationItem link={'/settings/debug'}>Debug</NavigationItem>
            </Navigation>
          </div>
        </div>
        <div className='h-full w-full p-2 overflow-auto scrollbar-hide'>{children}</div>
      </div>
    </>
  );
}
