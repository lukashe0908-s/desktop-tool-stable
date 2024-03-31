'use client';
import '../styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { LicenseInfo } from '@mui/x-license-pro';

LicenseInfo.setLicenseKey(
  'a6cd63f803393a33165ef9d2b180b307Tz0sRT05OTk5OTk5OTk5OTk5OTk5OTk5OSxTPXByZW1pdW0sTE09cGVycGV0dWFsLEtWPTI='
);

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang='en'>
        <head>
          <title>Desktop Tool</title>
          <meta charSet='UTF-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        </head>
        <body>
          <NextUIProvider className='h-full'>{children}</NextUIProvider>
        </body>
      </html>
    </>
  );
}
