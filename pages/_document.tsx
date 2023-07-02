import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Meet the Ocampo Family" />
          <meta property="og:site_name" content="Ocampo.io" />
          <meta property="og:description" content="Meet the Ocampo Family" />
          <meta property="og:title" content="Meet the Ocampo Family" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Meet the Ocampo Family" />
          <meta name="twitter:description" content="Meet the Ocampo Family" />
        </Head>
        <body className="bg-black antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
