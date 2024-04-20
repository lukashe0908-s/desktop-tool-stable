'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function SettingsPage() {
  const router = useRouter();
  useEffect(() => {
    router.push('/settings/lessonEdit');
  }, []);
  return <></>;
}
