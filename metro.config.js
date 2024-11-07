/* eslint-env node */

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

//const config = getDefaultConfig(__dirname);
// module.exports = withNativeWind(config, { input: "./css/global.css" });

// const createConfig = () => {
//   const config = getDefaultConfig(__dirname);

//   const { transformer, resolver } = config;

//   config.transformer = {
//     ...transformer,
//     babelTransformerPath: require.resolve("react-native-svg-transformer"),
//   };
//   config.resolver = {
//     ...resolver,
//     assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
//     sourceExts: [...resolver.sourceExts, "svg"],
//   };
//   return config;
// };

// const config = createConfig();

module.exports = withNativeWind(getDefaultConfig(__dirname), {
  input: "./css/global.css",
});