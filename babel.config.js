module.exports = {
  presets: ['@babel/preset-typescript', '@babel/preset-env'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        alias: {
          '@assets': './src/ui/assets',
          '@components': './src/ui/components',
          '@epics': './src/redux/epics',
          '@hoc': './src/hoc',
          '@hooks': './src/hooks',
          '@navigation': './src/ui/navigation',
          '@services': './src/services',
          '@slices': './src/redux/slices',
          '@ui': './src/ui',
          '@util': './src/utilities',
          '@type': './src/type',
        },
      },
    ],
  ],
  env: {
    test: {
      plugins: ['transform-es2015-modules-commonjs'],
    },
  },
}
