const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  transformer: {
    // Optimize bundle size and speed
    minifierConfig: {
      // Faster minification
      keep_fnames: true,
    },
  },
  resolver: {
    // Blacklist problematic modules that slow down bundling
    blockList: [
      /node_modules\/.*\/Pods\/.*/,
      /.*\/__tests__\/.*/,
    ],
  },
  watchFolders: [],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
