'use client';
import React, { useState, useEffect } from 'react';
import {
  Listbox,
  ListboxItem,
  Card,
  CardBody,
  Switch,
  Button,
  ButtonGroup,
  Slider,
} from '@nextui-org/react';

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
  const [fontSize, setFontSize] = useState(1.2);
  useEffect(() => {
    (async () => {
      const data = await getConfigSync('display.windowWidth');
      data && setWindowWidth(Number(data));
    })();
    (async () => {
      const data = await getConfigSync('display.fontSize');
      data && setFontSize(Number(data));
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
        <Switch isDisabled>自动更新</Switch>
      </div>
    </>
  );
}
