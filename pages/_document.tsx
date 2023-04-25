import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <div id='portal' />
      <body className='px-6 dark:bg-zinc-700'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
