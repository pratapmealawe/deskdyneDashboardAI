const domainUrl: string = 'http://localhost:7000';
const mlDomainUrl:string = 'http://localhost:5000';
// const domainUrl:string = 'http://mealawelbstaging-486868523.ap-southeast-1.elb.amazonaws.com:7000';
// const domainUrl:string = 'https://api.deskdyne.com';
export const environment = {
  production: false,
  withCredentials: false,
  serverUrl: domainUrl,
  mlServerUrl: mlDomainUrl,
  imageUrl: domainUrl + '/images/',
  fileUrl: domainUrl + '/api/pdfs/',
  googleAPIkey: 'AIzaSyCtIAU1RAa32Y9at1VnmL-fa79AP0NPreQ',
  envName: 'Devlopment',
  api_secret_key: 'fFwzsLH3ynmfXqSSY2KPlTdv0WjzZlFm'
  // api_secret_key: 'Xs7dRTbaqPkcxHp5WcriK8CHUnVXbWMg',
};
