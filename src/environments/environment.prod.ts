const domainUrl:string = 'https://api.deskdyne.com';
const mlDomainUrl:string = 'https://api.mealawe.com';

export const environment = {
  production: true,
  withCredentials: false,
  serverUrl : domainUrl,
  mlServerUrl : mlDomainUrl,
  imageUrl : domainUrl + '/images/',
  mlImageUrl: mlDomainUrl + '/images/',
  fileUrl: domainUrl + '/api/pdfs/',
  googleAPIkey: 'AIzaSyCtIAU1RAa32Y9at1VnmL-fa79AP0NPreQ',
  envName: 'Production',
  api_secret_key: 'Xs7dRTbaqPkcxHp5WcriK8CHUnVXbWMg'
};
