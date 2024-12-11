// metro.config.js
// const { getDefaultConfig } = require("expo/metro-config");
// const { withNativeWind } = require("nativewind/metro");
// const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

// const config = getDefaultConfig(__dirname);


// const nativeWindConfig = withNativeWind(config, { input: "./global.css" });
// const reanimatedConfig = wrapWithReanimatedMetroConfig(nativeWindConfig);

// module.exports = reanimatedConfig;


const {
    wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const config = {};

module.exports = wrapWithReanimatedMetroConfig(config);