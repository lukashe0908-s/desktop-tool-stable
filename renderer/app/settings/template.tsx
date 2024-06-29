'use client';
import { useState, useEffect } from 'react';
import { Divider } from '@nextui-org/react';
import { Navigation, NavigationSub, NavigationItem } from '../../components/navigation';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function Template({ children }) {
  return (
    <>
      <title>设置 - Desktop Tool</title>
      <div className='flex h-full select-auto'>
        <div className='h-full flex select-none'>
          <div className='overflow-auto scrollbar-hide border-r-2 min-w-44'>
            <span className='block text-center font-bold text-xl p-2 [color:#F6821F]'>设置</span>
            <Divider></Divider>
            <Navigation>
              <NavigationItem link={'/settings/lessonEdit'}>
                <EditOutlinedIcon className='pr-1'></EditOutlinedIcon>课表编辑
              </NavigationItem>
              <NavigationSub>
                <NavigationItem link={'/settings/lessonEdit/name'}>
                  <FormatColorTextOutlinedIcon className='pr-1'></FormatColorTextOutlinedIcon>名称
                </NavigationItem>
                <NavigationItem link={'/settings/lessonEdit/time'}>
                  <AccessTimeOutlinedIcon className='pr-1'></AccessTimeOutlinedIcon>时间
                </NavigationItem>
{/*                 <NavigationItem link={'/settings/lessonEdit/changeDay'}>
                  <DateRangeOutlinedIcon className='pr-1'></DateRangeOutlinedIcon>换课 (天)
                </NavigationItem> */}
{/*                 <NavigationItem link={'/settings/lessonEdit/change'}>
                  <DateRangeOutlinedIcon className='pr-1'></DateRangeOutlinedIcon>换课
                </NavigationItem> */}
              </NavigationSub>
{/*               <NavigationItem link={'/settings/display'}>
                <SettingsOutlinedIcon className='pr-1'></SettingsOutlinedIcon>常规
              </NavigationItem> */}
              <NavigationItem link={'/settings/debug'}>
                <InfoOutlinedIcon className='pr-1'></InfoOutlinedIcon>关于
              </NavigationItem>
            </Navigation>
          </div>
        </div>
        <div className='h-full w-full p-2 overflow-auto scrollbar-hide'>{children}</div>
      </div>
    </>
  );
}
