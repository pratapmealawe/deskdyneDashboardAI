const domainUrl: string = 'http://localhost:7000';
const cdnUrl: string = 'https://dd54a74ylcz91.cloudfront.net';
// const cdnUrl: string = 'https://d26orgtgu8ika0.cloudfront.net';
// const domainUrl: string = 'http://192.168.1.37:7000';
// const mlDomainUrl: string = 'http://localhost:5000';
// const domainUrl: string = 'http://mealawelbstaging-486868523.ap-southeast-1.elb.amazonaws.com:7000';
// const mlDomainUrl: string = 'http://mealawelbstaging-486868523.ap-southeast-1.elb.amazonaws.com:5000';
// const domainUrl: string = 'https://api.deskdyne.com';
const mlDomainUrl: string = 'https://api.mealawe.com';
export const environment = {
  production: false,
  withCredentials: false,
  serverUrl: domainUrl,
  mlServerUrl: mlDomainUrl,
  imageUrl: cdnUrl + '/content/image/',
  mlImageUrl: mlDomainUrl + '/images/',
  fileUrl: cdnUrl + '/content/file/',
  googleAPIkey: 'AIzaSyCtIAU1RAa32Y9at1VnmL-fa79AP0NPreQ',
  envName: 'Devlopment',
  // api_secret_key: 'fFwzsLH3ynmfXqSSY2KPlTdv0WjzZlFm'
  api_secret_key: 'Xs7dRTbaqPkcxHp5WcriK8CHUnVXbWMg',
};
