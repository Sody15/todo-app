import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="px-6">
        <div id="portal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
