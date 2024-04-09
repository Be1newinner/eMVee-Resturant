module.exports = ({ config }) => {
  config.android.googleServicesFile = process.env.GOOGLE_SERVICES_JSON;
//   console.log(config.android.googleServicesFile);cv

  return {
    ...config,
  };
};
