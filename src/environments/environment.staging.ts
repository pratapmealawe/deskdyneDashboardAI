const domainUrl: string = 'http://mealawelbstaging-486868523.ap-southeast-1.elb.amazonaws.com:7000';
const mlDomainUrl:string = 'http://mealawelbstaging-486868523.ap-southeast-1.elb.amazonaws.com:5000';
export const environment = {
  production: true,
  withCredentials: false,
  serverUrl: domainUrl,
  mlServerUrl: mlDomainUrl,
  imageUrl: domainUrl + '/images/',
  mlImageUrl: mlDomainUrl + '/images/',
  fileUrl: domainUrl + '/api/pdfs/',
  googleAPIkey: 'AIzaSyCtIAU1RAa32Y9at1VnmL-fa79AP0NPreQ',
  envName: 'Staging',
  api_secret_key: 'fFwzsLH3ynmfXqSSY2KPlTdv0WjzZlFm'
};
