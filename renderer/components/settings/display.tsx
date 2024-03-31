'use client';
import React, { useState, useEffect } from 'react';
import { Listbox, ListboxItem, Card, CardBody, Switch, Button, ButtonGroup, Slider, select } from '@nextui-org/react';

async function getConfigSync(arg) {
  return new Promise((resolve, reject) => {
    window.ipc.send('get-config', arg);
    window.ipc.once('get-config/' + arg, data => {
      resolve(data);
    });
  });
}
export function Display() {
  const [windowWidth, setWindowWidth] = useState(0.13);
  const [windowHeight, setWindowHeight] = useState(1);
  const [fontSize, setFontSize] = useState(1.2);
  const [online, setOnline] = useState(false);
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
      const data = await getConfigSync('online');
      data && setOnline(Boolean(data));
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
  return (
    <>
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
        }}
        onChangeEnd={(value: number) => {
          window.ipc.send('set-config', 'display.windowWidth', value);
        }}
      />{' '}
      <Slider
        label='窗口高度'
        step={0.01}
        maxValue={1}
        minValue={0.05}
        className='max-w-4xl'
        value={windowHeight}
        onChange={(value: number) => {
          setWindowHeight(value);
        }}
        onChangeEnd={(value: number) => {
          window.ipc.send('set-config', 'display.windowHeight', value);
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
        }}
        onChangeEnd={(value: number) => {
          window.ipc.send('set-config', 'display.fontSize', value);
        }}
      />
      <div className='flex gap-4 flex-wrap'>
        <Switch
          isSelected={online}
          onChange={() => {
            setOnline(!online);
            window.ipc.send('set-config', 'online', !online);
          }}
        >
          使用在线模式（重启后生效）
        </Switch>
        <Switch isDisabled>自动更新主程序</Switch>
      </div>
      <div className='flex gap-4 flex-wrap'>
        <Switch
          isSelected={hiddenCloseWindow}
          onChange={() => {
            setHiddenCloseWindow(!hiddenCloseWindow);
            window.ipc.send('set-config', 'display.hidden.closeWindow', !hiddenCloseWindow);
          }}
        >
          隐藏关闭按钮
        </Switch>{' '}
        <Switch
          isSelected={hiddenRefreshWindow}
          onChange={() => {
            setHiddenRefreshWindow(!hiddenRefreshWindow);
            window.ipc.send('set-config', 'display.hidden.refreshWindow', !hiddenRefreshWindow);
          }}
        >
          隐藏刷新按钮
        </Switch>{' '}
        <Switch
          isSelected={hiddenPutaway}
          onChange={() => {
            setHiddenPutaway(!hiddenPutaway);
            window.ipc.send('set-config', 'display.hidden.putaway', !hiddenPutaway);
          }}
        >
          隐藏收起按钮
        </Switch>
      </div>
    </>
  );
}
