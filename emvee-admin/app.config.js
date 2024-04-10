module.exports = ({ config }) => {
  config.android.googleServicesFile =
    process.env.EXPO_PUBLIC_GOOGLE_SERVICE_JSON;
  return {
    ...config,
  };
};
