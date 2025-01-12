const domainUrl:string = 'api.deskdyne.com';
export const environment = {
  production: true,
  withCredentials: false,
  webSocketUrl: 'wss://'+domainUrl,
  serverUrl : 'https://'+domainUrl,
  imageUrl : 'https://'+domainUrl + '/images/',
  fileUrl: 'https://'+domainUrl + '/files/',
  googleAPIkey: 'AIzaSyCtIAU1RAa32Y9at1VnmL-fa79AP0NPreQ',
  envName: 'Production'
};
