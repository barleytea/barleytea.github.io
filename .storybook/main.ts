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
    // workaround: https://github.com/storybookjs/storybook/issues/22796#issuecomment-1622399451
    config.module.rules[2].exclude = [
      /node_modules\/(?!(gatsby|gatsby-script)\/)/,
    ]
    config.module.rules.push({
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
    });
    return config
  },
}
export default storyBookConfig
