const domainUrl:string = 'localhost:7000';
export const environment = {
  production: false,
  withCredentials: false,
  webSocketUrl: 'ws://'+domainUrl,
  serverUrl : 'http://'+domainUrl,
  imageUrl : 'http://'+domainUrl + '/images/',
  googleAPIkey: 'AIzaSyCtIAU1RAa32Y9at1VnmL-fa79AP0NPreQ',
  envName: 'Devlopment'
};
