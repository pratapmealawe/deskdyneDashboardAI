const domainUrl: string = 'https://api.deskdyne.com';
const mlDomainUrl: string = 'https://api.mealawe.com';
const cdnUrl: string = 'https://dd54a74ylcz91.cloudfront.net';

export const environment = {
  production: true,
  withCredentials: false,
  serverUrl: domainUrl,
  mlServerUrl: mlDomainUrl,
  imageUrl: cdnUrl + '/content/image/',
  mlImageUrl: mlDomainUrl + '/images/',
  fileUrl: cdnUrl + '/content/file/',
  googleAPIkey: 'AIzaSyCtIAU1RAa32Y9at1VnmL-fa79AP0NPreQ',
  envName: 'Production',
  api_secret_key: 'Xs7dRTbaqPkcxHp5WcriK8CHUnVXbWMg'
};
