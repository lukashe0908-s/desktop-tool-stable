'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, ButtonGroup, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

export default function HomePage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <title>Home - Desktop Tool</title>
      <div className='flex justify-center gap-3 py-2 flex-shrink-0 flex-wrap'>
        <OpenSettingsWindow>Go Settings</OpenSettingsWindow>
        <Link href='/float/index.html'>
          <Button color='primary' className='font-bold'>
            Go Legacy
          </Button>
        </Link>
        <OpenAiWindow>Ai Ability</OpenAiWindow>
        <Button color='primary' className='font-bold' onClick={onOpen}>
          关机
        </Button>
      </div>
      <Modal isOpen={isOpen} placement={'bottom'} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>确认关机</ModalHeader>
              <ModalBody>
                <p className='text-gray-500 text-sm'>关闭所有应用，然后关闭电脑。</p>
              </ModalBody>
              <ModalFooter>
                <Button color='default' variant='light' onPress={onClose} className='min-w-1' radius='full' fullWidth={true}>
                  <CloseIcon></CloseIcon>Cancel
                </Button>
                <Button color='danger' onPress={onClose} className='min-w-1' radius='full' fullWidth={true}>
                  <CheckIcon></CheckIcon>Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
function OpenSettingsWindow({ children }) {
  return (
    <>
      <Button
        color='primary'
        className='font-bold'
        onClick={() => {
          window.ipc?.send('settings-window', 'true');
        }}
      >
        {children}
      </Button>
    </>
  );
}
function OpenAiWindow({ children }) {
  return (
    <>
      <Button
        color='primary'
        className='font-bold'
        onClick={() => {
          window.ipc?.send('ai-window', 'true');
        }}
      >
        {children}
      </Button>
    </>
  );
}
