import { graphql, useStaticQuery } from 'gatsby'
import { ComponentType } from 'react'

interface SEOProps {
  title?: string
  path?: string
  eyecatcherPath?: string
}

export const SEO: ComponentType<SEOProps> = ({
  title,
  path,
  eyecatcherPath,
}) => {
  const siteMetaDataQueryResult: Queries.siteMetaDataQuery = useStaticQuery(
    graphql`
      query siteMetaData {
        site {
          siteMetadata {
            title
            description
            twitterUserName
            image
            siteUrl
          }
        }
      }
    `
  )

  const siteMetaData = siteMetaDataQueryResult.site?.siteMetadata

  if (
    !siteMetaData?.title ||
    !siteMetaData?.description ||
    !siteMetaData?.siteUrl ||
    !siteMetaData.image ||
    !siteMetaData.twitterUserName
  ) {
    throw new Error('Insufficient Metadata')
  }

  const pageTitle = title
    ? `${title} | ${siteMetaData.title}`
    : siteMetaData.title
  const pageImage = eyecatcherPath ? eyecatcherPath : siteMetaData.image
  const pageUrl = path ? `${siteMetaData.siteUrl}${path}` : siteMetaData.siteUrl

  return (
    <>
      <html lang="ja" />
      <title>{pageTitle}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={siteMetaData.description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={siteMetaData.title} />
      <meta
        property="og:image"
        content={`${siteMetaData.siteUrl}${pageImage}`}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:site" content={siteMetaData.twitterUserName} />
    </>
  )
}

export default SEO
