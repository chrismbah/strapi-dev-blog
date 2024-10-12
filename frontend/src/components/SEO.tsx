import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  favicon: string;
  coverImage?: string;
  defaultSeo: {
    metaTitle: string;
    metaDescription: string;
    shareImage: { url: string };
  };
  siteName: string;
}

export default function SEO({
  title,
  description,
  favicon,
  coverImage,
  defaultSeo,
  siteName,
}: Readonly<SEOProps>) {
  return (
    <Head>
      {/* Dynamically set the page title */}
      <title>{title ? `${title} | ${siteName}` : defaultSeo.metaTitle}</title>
      <meta
        name="description"
        content={description ?? defaultSeo.metaDescription}
      />
      <link
        rel="icon"
        href={coverImage ?? favicon}
        type="image/png"
      />

      {/* Open Graph (social sharing) image */}
      <meta
        property="og:image"
        content={coverImage ?? defaultSeo.shareImage.url}
      />

      {/* Additional meta tags for SEO */}
      <meta property="og:title" content={title ?? defaultSeo.metaTitle} />
      <meta
        property="og:description"
        content={description ?? defaultSeo.metaDescription}
      />
      <meta property="og:type" content="article" />
    </Head>
  );
}
