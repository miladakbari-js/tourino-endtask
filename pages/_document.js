import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fa" dir='rtl'>
      
      <Head>
      <title>تورینو </title>
      <meta name="description" content="رزرو تورهای مسافرتی با تورینو" />
      <link rel="icon" href="/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
