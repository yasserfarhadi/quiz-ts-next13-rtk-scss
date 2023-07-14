/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = (phase, { defaultConfig }) => {
  if ('sassOptions' in defaultConfig) {
    defaultConfig['sassOptions'] = {
      includePaths: ['./src'],
      prependData: `@import "~@styles/variables.scss";`,
    };
  }
  return defaultConfig;
};

module.exports = nextConfig;
