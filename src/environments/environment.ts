export type EnvironmentType = 'local' | 'staging' | 'prod';

const activeEnv: EnvironmentType = 'local';

// 1. Local Configuration (Development)
const localConfig = {
  production: false,
  withCredentials: false,
  serverUrl: 'http://localhost:7000',
  // mlServerUrl: 'https://api.mealawe.com',
  mlServerUrl: 'http://mealawelbstaging-486868523.ap-southeast-1.elb.amazonaws.com:5000',
  // imageUrl: 'https://dd54a74ylcz91.cloudfront.net/content/image/',
  imageUrl: 'https://d26orgtgu8ika0.cloudfront.net/content/image/',
  // mlImageUrl: 'https://api.mealawe.com/images/',
  mlImageUrl: 'http://mealawelbstaging-486868523.ap-southeast-1.elb.amazonaws.com:5000/images/',
  // fileUrl: 'https://dd54a74ylcz91.cloudfront.net/content/file/',
  fileUrl: 'https://d26orgtgu8ika0.cloudfront.net/content/file/',
  googleAPIkey: 'AIzaSyCtIAU1RAa32Y9at1VnmL-fa79AP0NPreQ',
  envName: 'Devlopment',
  // api_secret_key: 'Xs7dRTbaqPkcxHp5WcriK8CHUnVXbWMg',
  api_secret_key: 'fFwzsLH3ynmfXqSSY2KPlTdv0WjzZlFm',
};

// 2. Staging Configuration
const stagingConfig = {
  production: true,
  withCredentials: false,
  serverUrl: 'http://mealawelbstaging-486868523.ap-southeast-1.elb.amazonaws.com:7000',
  mlServerUrl: 'http://mealawelbstaging-486868523.ap-southeast-1.elb.amazonaws.com:5000',
  imageUrl: 'https://d26orgtgu8ika0.cloudfront.net/content/image/',
  mlImageUrl: 'http://mealawelbstaging-486868523.ap-southeast-1.elb.amazonaws.com:5000/images/',
  fileUrl: 'https://d26orgtgu8ika0.cloudfront.net/content/file/',
  googleAPIkey: 'AIzaSyCtIAU1RAa32Y9at1VnmL-fa79AP0NPreQ',
  envName: 'Staging',
  api_secret_key: 'fFwzsLH3ynmfXqSSY2KPlTdv0WjzZlFm',
};

// 3. Production Configuration
const prodConfig = {
  production: true,
  withCredentials: false,
  serverUrl: 'https://api.deskdyne.com',
  mlServerUrl: 'https://api.mealawe.com',
  imageUrl: 'https://dd54a74ylcz91.cloudfront.net/content/image/',
  mlImageUrl: 'https://api.mealawe.com/images/',
  fileUrl: 'https://dd54a74ylcz91.cloudfront.net/content/file/',
  googleAPIkey: 'AIzaSyCtIAU1RAa32Y9at1VnmL-fa79AP0NPreQ',
  envName: 'Production',
  api_secret_key: 'Xs7dRTbaqPkcxHp5WcriK8CHUnVXbWMg',
};

const configs = {
  local: localConfig,
  staging: stagingConfig,
  prod: prodConfig,
};

export const environment = configs[activeEnv];
