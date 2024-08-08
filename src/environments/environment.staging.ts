const domainUrl:string = 'mealawelbstaging-486868523.ap-southeast-1.elb.amazonaws.com:7000';
export const environment = {
  production: true,
  withCredentials: false,
  webSocketUrl: 'ws://'+domainUrl,
  serverUrl : 'http://'+domainUrl,
  imageUrl : 'http://'+domainUrl + '/images/',
  googleAPIkey: 'AIzaSyCtIAU1RAa32Y9at1VnmL-fa79AP0NPreQ',
  envName: 'Staging'
};
