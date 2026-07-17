import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://gari.live';
const DEFAULT_IMAGE = `${BASE_URL}/gari-logo.png`;
const ORG_ID = `${BASE_URL}/#organization`;
const SITE_ID = `${BASE_URL}/#website`;

const SEO = ({
  title,
  description,
  path = '',
  image,
  imageAlt,
  imageWidth = '1200',
  imageHeight = '630',
  type = 'website',
  keywords = '',
  schema = null,
  noindex = false,
  datePublished = '',
  dateModified = '',
  breadcrumbs = [],        // [{ name, url }]
  faq = [],                // [{ q, a }]
}) => {
  const fullUrl = `${BASE_URL}${path}`;
  const fullImage = image
    ? image.startsWith('http') ? image : `${BASE_URL}${image}`
    : DEFAULT_IMAGE;

  const fullTitle = title
    ? `${title} | GARI — GITAM Aerospace Rocketry`
    : 'GARI | GITAM Aerospace Rocketry Initiative';

  const fullDesc =
    description ||
    'Student-driven aerospace and rocketry team at GITAM University, Hyderabad. Competing in IN-SPACe CAN-7USAT 2026 and building next-gen rockets in India.';

  const fullImageAlt = imageAlt || 'GARI — GITAM Aerospace Rocketry Initiative';

  const defaultKeywords =
    'GARI, GARI GITAM, GITAM Aerospace Rocketry Initiative, Singam Sai Harshith GARI, Bodapati Bharat Chandra GARI, Harshith avionics GARI, Bharat Chandra ground station GARI, GARI aerospace, GARI rocketry, GARI rocket team, GITAM aerospace, GITAM rocketry, GITAM rocket team, GITAM University Hyderabad aerospace, rocketry India, CanSat India, IN-SPACe, IN-SPACe CAN-7USAT, GITAM University Hyderabad, aerospace engineering students India, student rocket team India, gari.live, GARI space team, GARI student team';

  const allKeywords = keywords
    ? `${keywords}, ${defaultKeywords}`
    : defaultKeywords;

  // Build breadcrumb schema
  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${BASE_URL}/` },
      ...breadcrumbs.map((b, i) => ({
        '@type': 'ListItem',
        'position': i + 2,
        'name': b.name,
        'item': b.url,
      })),
    ],
  } : null;

  // Build FAQ schema
  const faqSchema = faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faq.map(({ q, a }) => ({
      '@type': 'Question',
      'name': q,
      'acceptedAnswer': { '@type': 'Answer', 'text': a },
    })),
  } : null;

  // Default WebPage schema
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${fullUrl}#webpage`,
    'url': fullUrl,
    'name': fullTitle,
    'description': fullDesc,
    'isPartOf': { '@id': SITE_ID },
    'about': { '@id': ORG_ID },
    'inLanguage': 'en-IN',
    ...(dateModified && { 'dateModified': dateModified }),
    ...(datePublished && { 'datePublished': datePublished }),
    'breadcrumb': breadcrumbSchema || {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${BASE_URL}/` },
      ],
    },
    'primaryImageOfPage': {
      '@type': 'ImageObject',
      'url': fullImage,
      'width': parseInt(imageWidth),
      'height': parseInt(imageHeight),
    },
  };

  return (
    <Helmet>
      {/* ── Core ── */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDesc} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content="GARI — GITAM Aerospace Rocketry Initiative" />
      <meta
        name="robots"
        content={
          noindex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />
      <link rel="canonical" href={fullUrl} />

      {/* ── Language ── */}
      <html lang="en-IN" />
      <meta name="content-language" content="en-IN" />
      <link rel="alternate" hreflang="en-IN" href={fullUrl} />
      <link rel="alternate" hreflang="en" href={fullUrl} />
      <link rel="alternate" hreflang="x-default" href={fullUrl} />

      {/* ── Open Graph ── */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="GARI" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDesc} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:secure_url" content={fullImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content={imageWidth} />
      <meta property="og:image:height" content={imageHeight} />
      <meta property="og:image:alt" content={fullImageAlt} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:locale:alternate" content="en_US" />
      {datePublished && (
        <meta property="article:published_time" content={datePublished} />
      )}
      {dateModified && (
        <meta property="article:modified_time" content={dateModified} />
      )}

      {/* ── Twitter / X ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@gari_gitam" />
      <meta name="twitter:creator" content="@gari_gitam" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDesc} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={fullImageAlt} />

      {/* ── Geographic ── */}
      <meta name="geo.region" content="IN-TG" />
      <meta name="geo.placename" content="Hyderabad, Telangana, India" />

      {/* ── Schemas ── */}
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>

      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}

      {schema && Array.isArray(schema)
        ? schema.map((s, i) => (
            <script key={i} type="application/ld+json">
              {JSON.stringify(s)}
            </script>
          ))
        : schema && (
            <script type="application/ld+json">
              {JSON.stringify(schema)}
            </script>
          )}
    </Helmet>
  );
};

export default SEO;
