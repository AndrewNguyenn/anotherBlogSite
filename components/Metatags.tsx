import Head from 'next/head';

export default function Metatags({
  title = 'Another Blogging Site',
  description = 'Another blogging site by Andrew Nguyen',
  image = 'https://github.com/AndrewNguyenn/anotherBlogSite',
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="AndrewNguyenn" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}