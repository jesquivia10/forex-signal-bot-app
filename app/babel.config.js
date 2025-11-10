module.exports = function (api) {
  api.cache(true);
  return {
      presets: ['babel-preset-expo'],
      plugins: [
        // Required for expo-router
        'expo-router/babel',
        [
          'module-resolver',
          {
            root: ['./'],
            extensions: ['.ts', '.tsx', '.js', '.json'],
            alias: {
              '@application': './src/application',
              '@config': './src/config',
              '@data': './src/data',
              '@domain': './src/domain',
              '@presentation': './src/presentation',
              '@ui': './src/presentation/components',
              '@utils': './src/utils',
            },
          },
        ],
      ],
  };
};
