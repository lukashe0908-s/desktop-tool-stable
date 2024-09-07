'use client';
import React, { useState, useEffect } from 'react';
import { Switch, Slider, Autocomplete, AutocompleteItem, Button, Divider, Chip } from '@nextui-org/react';
import { getAutoLaunchSync, getConfigSync } from '../p_function';

export function Display() {
  const [windowWidth, setWindowWidth] = useState(0.13);
  const [windowHeight, setWindowHeight] = useState(1);
  const [fontSize, setFontSize] = useState(1.2);
  const [slidingPosition, setSlidingPosition] = useState('center');
  const [progressDisplay, setProgressDisplay] = useState('always');
  const [hiddenCloseWindow, setHiddenCloseWindow] = useState(false);
  const [hiddenRefreshWindow, setHiddenRefreshWindow] = useState(false);
  const [hiddenPutaway, setHiddenPutaway] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getConfigSync('display.windowWidth');
      data && setWindowWidth(Number(data));
    })();
    (async () => {
      const data = await getConfigSync('display.windowHeight');
      data && setWindowHeight(Number(data));
    })();
    (async () => {
      const data = await getConfigSync('display.fontSize');
      data && setFontSize(Number(data));
    })();
    (async () => {
      const data = await getConfigSync('display.slidingPosition');
      data && setSlidingPosition(String(data));
    })();
    (async () => {
      const data = await getConfigSync('display.progressDisplay');
      data && setProgressDisplay(String(data));
    })();
    (async () => {
      const data = await getConfigSync('display.hidden.closeWindow');
      data && setHiddenCloseWindow(Boolean(data));
    })();
    (async () => {
      const data = await getConfigSync('display.hidden.refreshWindow');
      data && setHiddenRefreshWindow(Boolean(data));
    })();
    (async () => {
      const data = await getConfigSync('display.hidden.putaway');
      data && setHiddenPutaway(Boolean(data));
    })();
  }, []);

  const [autoLaunch, setAutoLaunch] = useState(false);
  const [autoLaunchE, setAutoLaunchE] = useState('Finding');
  useEffect(() => {
    (async () => {
      try {
        setAutoLaunch(await getAutoLaunchSync());
        setAutoLaunchE(null);
      } catch (error) {
        setAutoLaunchE('Failed Found');
      }
    })();
  }, []);
  return (
    <>
      <div className='flex w-full flex-col gap-3 overflow-hidden'>
        <Slider
          label='窗口宽度'
          step={0.01}
          maxValue={1}
          minValue={0.05}
          marks={[
            {
              value: 0.1,
              label: '0.1',
            },
            {
              value: 0.2,
              label: '0.2',
            },
            {
              value: 0.3,
              label: '0.3',
            },
            {
              value: 0.4,
              label: '0.4',
            },
            {
              value: 0.5,
              label: '0.5',
            },
          ]}
          className='max-w-4xl'
          value={windowWidth}
          onChange={(value: number) => {
            setWindowWidth(value);
            window.ipc?.send('set-config', 'display.windowWidth', value);
          }}
        />
        <Slider
          label='窗口高度'
          step={0.01}
          maxValue={1}
          minValue={0.05}
          className='max-w-4xl'
          value={windowHeight}
          onChange={(value: number) => {
            setWindowHeight(value);
            window.ipc?.send('set-config', 'display.windowHeight', value);
          }}
        />
        <Slider
          label='字体大小'
          step={0.1}
          maxValue={5}
          minValue={0.1}
          showSteps={true}
          className='max-w-4xl'
          value={fontSize}
          onChange={(value: number) => {
            setFontSize(value);
            window.ipc?.send('set-config', 'display.fontSize', value);
          }}
        />
      </div>
      <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
        <Autocomplete
          label='滑动位置'
          className='max-w-xs'
          selectedKey={slidingPosition}
          onSelectionChange={(value: string) => {
            setSlidingPosition(value);
            window.ipc?.send('set-config', 'display.slidingPosition', value);
          }}
          defaultItems={[
            { value: 'start', label: '尽可能顶部' },
            { value: 'center', label: '尽可能中间' },
            { value: 'end', label: '尽可能底部' },
            { value: 'nearest', label: '最少距离' },
          ]}
        >
          {item => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
        </Autocomplete>
        <Autocomplete
          label='进度条显示'
          isDisabled
          className='max-w-xs'
          selectedKey={progressDisplay}
          onSelectionChange={(value: string) => {
            setProgressDisplay(value);
            window.ipc?.send('set-config', 'display.progressDisplay', value);
          }}
          defaultItems={[
            { value: 'always', label: '一直显示' },
            { value: 'active', label: 'When Active' },
            { value: 'never', label: 'Never' },
          ]}
        >
          {item => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
        </Autocomplete>
      </div>
      <div className='flex gap-4 flex-wrap'>
        <Switch
          isSelected={hiddenCloseWindow}
          onChange={() => {
            setHiddenCloseWindow(!hiddenCloseWindow);
            window.ipc?.send('set-config', 'display.hidden.closeWindow', !hiddenCloseWindow);
          }}
        >
          隐藏关闭按钮
        </Switch>
        <Switch
          isSelected={hiddenRefreshWindow}
          onChange={() => {
            setHiddenRefreshWindow(!hiddenRefreshWindow);
            window.ipc?.send('set-config', 'display.hidden.refreshWindow', !hiddenRefreshWindow);
          }}
        >
          隐藏刷新按钮
        </Switch>
        <Switch
          isSelected={hiddenPutaway}
          onChange={() => {
            setHiddenPutaway(!hiddenPutaway);
            window.ipc?.send('set-config', 'display.hidden.putaway', !hiddenPutaway);
          }}
        >
          隐藏收起按钮
        </Switch>
      </div>
      <Divider></Divider>
      <div className='flex flex-col flex-wrap gap-2'>
        <div className='flex flex-col flex-wrap'>
          <span className='pr-2 font-bold'>自启动</span>
          <span>
            <span className={`ml-4 ${autoLaunch ? 'text-green-600' : 'text-gray-500'}`}>
              {autoLaunchE ?? (autoLaunch ? '找到自启动' : '未找到自启动')}
            </span>
          </span>
        </div>
        <div className='flex flex-wrap gap-1'>
          <Button
            color='primary'
            variant='bordered'
            onClick={async () => {
              window.ipc.send('autoLaunch', 'set', true);
              setAutoLaunch(await getAutoLaunchSync());
            }}
          >
            开启
          </Button>
          <Button
            color='primary'
            variant='bordered'
            onClick={async () => {
              window.ipc.send('autoLaunch', 'set', false);
              setAutoLaunch(await getAutoLaunchSync());
            }}
          >
            关闭
          </Button>
        </div>
        <Chip radius='sm' size='lg' color='warning' variant='shadow' className='!h-fit py-1 !text-wrap'>
          关掉，关掉，一定要关掉，<br></br>再不关掉那些网络游戏，小孩哪有美好的未来，<br></br>哪有美好的前程，祖国哪有栋梁之才
        </Chip>
        <Chip radius='sm' size='lg' color='warning' variant='dot'>
          大雾
        </Chip>
      </div>
    </>
  );
}
