import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://gari.live';
const DEFAULT_IMAGE = `${BASE_URL}/gari-logo-new.png`;
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
  breadcrumbs = [],
  faq = [],
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

  // Enterprise keyword set — maximum coverage: branded, long-tail, multilingual, intent, competition, person-level
  const defaultKeywords =
    // Primary branded
    'GARI, GARI GITAM, GITAM Aerospace Rocketry Initiative, gari.live, GARI aerospace, GARI rocketry, GARI rocket team, GARI space team, GARI student team, GARI Hyderabad, GARI GITAM University, ' +
    // IN-SPACe rocket team intent (highest priority new targets)
    'IN-SPACe rocket team, IN-SPACe rocket team India, IN-SPACe student rocket team, IN-SPACe rocketry competition team, student rocket team India, student rocket team India 2026, IN-SPACe Model Rocketry India student team, IN-SPACe Model Rocketry team, IN-SPACe rocketry 2026, IN-SPACe 2026 student team, rocket team India 2026, student rocketry India, model rocketry India, ' +
    // IN-SPACe CanSat team intent
    'IN-SPACe CanSat team, IN-SPACe CAN-7USAT team, IN-SPACe CanSat team India, student CanSat team India, CanSat team India 2026, CanSat competition India 2026, IN-SPACe CAN-7USAT 2026 team, IN-SPACe competition team 2026, IN-SPACe selected team GITAM, IN-SPACe CAN-7USAT, IN-SPACe CAN-7USAT 2026, CanSat India, CanSat competition India, IN-SPACe student competition, student CanSat India 2026, NavIC CanSat, NavIC GNSS CanSat India, ' +
    // General aerospace team India
    'aerospace team India, aerospace team Hyderabad, student aerospace team India, aerospace student team India 2026, best student rocket team India, ' +
    // Person-level (E-E-A-T)
    'Harshith Venkata Naga Pavana Jangala GARI, Bodapati Bharat Chandra GARI, Harshith GITAM aerospace engineer, Bharat Chandra ground station GARI, Shaik Aadil Iftikhar GARI, Harsha Vardan GARI, Singam Sai Harshith GARI, Tanmaay Sharma GARI, ' +
    // University affiliation
    'GITAM aerospace, GITAM rocketry, GITAM rocket team, GITAM aerospace club, GITAM University Hyderabad aerospace, GITAM aerospace engineering, GITAM rocketry club, GITAM student team, GITAM aerospace team, ' +
    // Domain-specific technical
    'aerospace engineering students India, amateur rocketry India, sounding rocket India, student satellite India, NavIC integration student, PDR cleared student team, CDR aerospace India, ' +
    // Intent-based local
    'aerospace club Hyderabad, rocketry team Hyderabad, aerospace team GITAM, student aerospace India, GITAM aerospace research, GITAM University rocketry, ' +
    // Multilingual — Telugu
    'GARI అంతరిక్ష జట్టు, GARI రాకెట్ టీమ్, GITAM అంతరిక్ష జట్టు, GITAM రాకెట్ జట్టు, IN-SPACe రాకెట్ టీమ్, IN-SPACe రాకెట్ పోటీ, ' +
    // Multilingual — Hindi
    'GARI एयरोस्पेस टीम, GITAM रॉकेट टीम, IN-SPACe रॉकेट टीम, IN-SPACe छात्र रॉकेट टीम, भारत में छात्र रॉकेट टीम, भारत में एयरोस्पेस टीम';

  // Hidden SEO schema injected on every page — invisible to users, read by crawlers
  const hiddenSeoSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    'name': 'GARI — GITAM Aerospace Rocketry Initiative',
    'alternateName': [
      'GARI', 'GARI GITAM', 'GITAM Aerospace', 'GITAM Rocketry',
      'GITAM Aerospace Rocketry Initiative', 'GARI rocket team',
      'GARI CanSat team', 'GARI space team', 'GITAM aerospace team',
      'IN-SPACe rocket team GITAM', 'IN-SPACe CanSat team GITAM',
      'student rocket team India GARI', 'student CanSat team India GARI',
      'GARI IN-SPACe 2026 team', 'GARI aerospace Hyderabad'
    ],
    'url': BASE_URL,
    'sameAs': [
      'https://www.instagram.com/gari.gitam',
      'https://www.linkedin.com/company/gari-gitam'
    ],
    'knowsAbout': [
      'IN-SPACe rocket team competition',
      'IN-SPACe CAN-7USAT CanSat competition',
      'IN-SPACe Model Rocketry India Student Competition',
      'student rocket team India',
      'student CanSat team India',
      'model rocketry India',
      'CanSat competition India',
      'NavIC GNSS integration',
      'real-time telemetry',
      'aerospace engineering',
      'avionics',
      'propulsion systems',
      'dual parachute recovery',
      'ground station software'
    ],
    'award': [
      'IN-SPACe CAN-7USAT 2026 National Selection',
      'IN-SPACe Model Rocketry India 2026 National Selection'
    ],
  };

  const allKeywords = keywords
    ? `${keywords}, ${defaultKeywords}`
    : defaultKeywords;

  // Breadcrumb schema
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

  // FAQ schema
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
    'speakable': {
      '@type': 'SpeakableSpecification',
      'cssSelector': ['h1', 'h2', '.hero-subtitle', '.csf-lead'],
    },
  };

  return (
    <Helmet>
      {/* ── Core ── */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDesc} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content="GARI — GITAM Aerospace Rocketry Initiative" />
      <meta name="publisher" content="GARI" />
      <meta name="copyright" content="GARI — GITAM Aerospace Rocketry Initiative" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />
      <meta
        name="robots"
        content={
          noindex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="bingbot" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      {/* ── Language & International (hreflang for all) ── */}
      <html lang="en-IN" />
      <meta name="content-language" content="en-IN" />
      <link rel="alternate" hreflang="en-IN" href={fullUrl} />
      <link rel="alternate" hreflang="en" href={fullUrl} />
      <link rel="alternate" hreflang="te" href={fullUrl} />
      <link rel="alternate" hreflang="hi" href={fullUrl} />
      <link rel="alternate" hreflang="x-default" href={fullUrl} />

      {/* ── Geographic ── */}
      <meta name="geo.region" content="IN-TG" />
      <meta name="geo.placename" content="Hyderabad, Telangana, India" />
      <meta name="geo.position" content="17.4065;78.4772" />
      <meta name="ICBM" content="17.4065, 78.4772" />
      <meta name="DC.coverage" content="India" />

      {/* ── Dublin Core (extra crawl signals) ── */}
      <meta name="DC.title" content={fullTitle} />
      <meta name="DC.description" content={fullDesc} />
      <meta name="DC.language" content="en-IN" />
      <meta name="DC.publisher" content="GARI — GITAM Aerospace Rocketry Initiative" />
      <meta name="DC.subject" content="Aerospace Engineering, Rocketry, CanSat, Student Team, GITAM" />
      <meta name="DC.type" content="Text" />
      <meta name="DC.format" content="text/html" />
      <meta name="DC.identifier" content={fullUrl} />
      {datePublished && <meta name="DC.date" content={datePublished} />}

      {/* ── Open Graph ── */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="GARI — GITAM Aerospace Rocketry Initiative" />
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
      <meta property="og:locale:alternate" content="te_IN" />
      <meta property="og:locale:alternate" content="hi_IN" />
      {datePublished && <meta property="article:published_time" content={datePublished} />}
      {dateModified && <meta property="article:modified_time" content={dateModified} />}
      <meta property="article:author" content="GARI — GITAM Aerospace Rocketry Initiative" />
      <meta property="article:section" content="Aerospace" />
      <meta property="article:tag" content="GARI" />
      <meta property="article:tag" content="GITAM" />
      <meta property="article:tag" content="Aerospace" />
      <meta property="article:tag" content="Rocketry" />

      {/* ── Twitter / X ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@gari_gitam" />
      <meta name="twitter:creator" content="@gari_gitam" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDesc} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={fullImageAlt} />
      <meta name="twitter:domain" content="gari.live" />
      <meta name="twitter:label1" content="Team Size" />
      <meta name="twitter:data1" content="30+ Engineers" />
      <meta name="twitter:label2" content="Competitions" />
      <meta name="twitter:data2" content="IN-SPACe Rocketry + CAN-7USAT 2026" />

      {/* ── App / PWA ── */}
      <meta name="application-name" content="GARI" />
      <meta name="apple-mobile-web-app-title" content="GARI" />
      <meta name="theme-color" content="#0f172a" />

      {/* ── Hidden SEO — extra crawl intent signals on every page ── */}
      <meta name="subject" content="IN-SPACe student rocket team, IN-SPACe CanSat team, student aerospace team India" />
      <meta name="category" content="Aerospace, Rocketry, CanSat, IN-SPACe, Student Competition India" />
      <meta name="classification" content="Student Rocket Team, IN-SPACe Competition, CanSat India, Aerospace India" />
      <meta name="topic" content="IN-SPACe rocket team India, student CanSat team India, GARI GITAM aerospace" />
      <meta name="abstract" content="GARI is India's student rocket team from GITAM University competing in IN-SPACe Model Rocketry and CAN-7USAT CanSat competitions 2026. PDR cleared for both programs." />
      <meta name="summary" content="Student rocket team and CanSat team from GITAM University Hyderabad competing in two IN-SPACe 2026 national competitions." />
      <meta name="coverage" content="India, Hyderabad, Telangana, IN-SPACe, GITAM University" />
      <meta name="target" content="student engineers, aerospace enthusiasts, sponsors, IN-SPACe judges, space industry" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />

      {/* ── Schema: WebPage ── */}
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>

      {/* ── Schema: Hidden org signal on every page ── */}
      <script type="application/ld+json">
        {JSON.stringify(hiddenSeoSchema)}
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
