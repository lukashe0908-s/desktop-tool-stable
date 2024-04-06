'use client';
import { Card, CardBody, Switch, Button } from '@nextui-org/react';
export default function App() {
  return (
    <>
      <div className='h-full flex gap-5 flex-col'>
        <Card>
          <CardBody className='block'>
            <del>有意见给我憋着</del>
            <br />
            <span className='text-red-600 font-bold text-xl'>仅供调试使用，使用可能会暂时减慢打开速度</span>
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
            删除Service Worker
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
