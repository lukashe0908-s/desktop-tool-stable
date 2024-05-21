'use client';
import { Card, CardBody, Switch, Button, Calendar, Divider } from '@nextui-org/react';
import { useEffect, useState } from 'react';
export default function App() {
  return (
    <>
      <div className='flex gap-5 flex-col'>
        <Card>
          <CardBody className='block'>
            <span className='font-bold text-xl'>作者：472 秦子元</span>
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
