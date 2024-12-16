import type { StorybookConfig } from '@storybook/react-webpack5'
import path from 'path';

const storyBookConfig: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {
        postCss: {
          implementation: require.resolve('postcss'),
        },
      },
    },
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    }
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  core: {},
  webpackFinal: (config) => {
    type Rule = {
      use?: Array<string | { loader: string }>
      exclude?: Array<string | RegExp>
    }
    const babelLoader = (config.module?.rules as Rule[])?.find(rule =>
      rule.use?.some(use =>
        (typeof use === 'string' ? use : use.loader).includes('/babel-loader/')
      )
    )
    if (babelLoader?.exclude) {
      babelLoader.exclude[0] = /node_modules\/(?!gatsby|gatsby-script)/
    }

    const scssRule = {
      test: /\.scss$/,
      use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
        modules: {
          auto: true,
        },
        url: false,
        },
      },
      "sass-loader",
      ],
      include: path.resolve(__dirname, "../src/"),
    };
    config.module?.rules?.push(scssRule);

    
    return config
  },
}
export default storyBookConfig
