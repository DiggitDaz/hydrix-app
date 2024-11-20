module.exports = {
  presets: ['module:@react-native/babel-preset'],

  plugins: [
    
    'react-native-iconify/plugin',
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
      },
    ],
  ],
 
  
};
