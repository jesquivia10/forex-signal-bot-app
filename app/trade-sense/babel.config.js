module.exports = function (api) {
  const isTest = api.env('test');
  api.cache(true);
  const plugins = ['react-native-paper/babel'];
  if (!isTest) {
    plugins.push('react-native-reanimated/plugin');
  }
  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};
