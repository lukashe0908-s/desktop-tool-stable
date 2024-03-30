'use client';
import '../styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { LicenseInfo } from '@mui/x-license-pro';

LicenseInfo.setLicenseKey(
  'f68799e8c93fcaf73ad1f7ab9394f43eTz1yZWdpc3RlcmVkIHRvIEx1a2FzSGUwOTA4LEU9OTk5OTk5OTk5OTk5OTk5OTk5OTksUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y'
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
          <meta name='viewport' content='width=2device-width, initial-scale=1.0' />
        </head>
        <body>
          <NextUIProvider className='h-full'>{children}</NextUIProvider>
        </body>
      </html>
    </>
  );
}
