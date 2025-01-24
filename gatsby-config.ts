import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    author: `barleytea`,
    title: `barlog.tech`,
    description: `ソフトウェア開発を生業とするエンジニアのブログ。Webアプリケーション開発に関するメモや読書感想文など。`,
    siteUrl: `https://barlog.tech`,
    twitterUserName: `@barlog_tech`,
    image: '/images/barleytea.png',
  },
  graphqlTypegen: false,  // GraphQL Codegen を一時的に無効化
  jsxRuntime: 'automatic',
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/',
      },
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: ['G-Z6KEETN4GT'],
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://barlog.tech`,
        stripQueryString: true,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://barlog.tech',
        sitemap: 'https://barlog.tech/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    'gatsby-plugin-mdx',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'contents',
        path: './src/contents/',
      },
      __key: 'contents',
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-mermaid`,
            options: {
              language: 'mermaid',
              theme: 'dark',
              mermaidConfig: {
                theme: 'dark'
              }
            }
          },
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: 'Table of Contents',
              tight: false,
              ordered: false,
              fromHeading: 2,
              toHeading: 6,
              className: 'toc',
            },
          },
          'gatsby-remark-code-titles',
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `80`,
              icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              showLineNumbers: false,
            },
          },
          {
            resolve: `gatsby-plugin-manifest`,
            options: {
              name: `barlog.tech`,
              short_name: `barlog.tech`,
              start_url: `/`,
              background_color: `#FFF`,
              theme_color: `#000`,
              display: `standalone`,
              icon: `src/images/barleytea.png`,
              icons: [
                {
                  src: `src/images/maskable_icon_x48.png`,
                  sizes: `48x48`,
                  type: `image/png`,
                  purpose: 'any',
                },
                {
                  src: `src/images/maskable_icon_x72.png`,
                  sizes: `72x72`,
                  type: `image/png`,
                  purpose: 'any',
                },
                {
                  src: `src/images/maskable_icon_x128.png`,
                  sizes: `128x128`,
                  type: `image/png`,
                  purpose: 'any',
                },
                {
                  src: `src/images/maskable_icon_x192.png`,
                  sizes: `192x192`,
                  type: `image/png`,
                  purpose: 'maskable any',
                },
                {
                  src: `src/images/maskable_icon_x384.png`,
                  sizes: `384x384`,
                  type: `image/png`,
                  purpose: 'maskable any',
                },
                {
                  src: `src/images/maskable_icon_x512.png`,
                  sizes: `512x512`,
                  type: `image/png`,
                  purpose: 'maskable any',
                },
              ],
            },
          },
          `gatsby-plugin-offline`,
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-graphql-codegen',
      options: {
        fileName: `types/graphql-types.d.ts`,
      },
    },
  ],
}

export default config
