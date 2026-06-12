import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, path = '', image = '/gari-logo.png' }) => {
  const baseUrl = 'https://gari.live';
  const fullUrl = `${baseUrl}${path}`;
  const fullTitle = title ? `${title} | GARI` : 'GARI | GITAM Aerospace Rocketry Initiative';
  const fullDesc = description || 'Student-driven aerospace and rocketry team at GITAM University, Hyderabad. Competing in CanSat and building next-gen rockets.';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDesc} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDesc} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={`${baseUrl}${image}`} />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDesc} />
      <meta name="twitter:image" content={`${baseUrl}${image}`} />
    </Helmet>
  );
};

export default SEO;
