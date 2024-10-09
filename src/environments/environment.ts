// const domainUrl:string = 'localhost:7000';
// const domainUrl:string = 'mealawelbstaging-486868523.ap-southeast-1.elb.amazonaws.com:7000';
const domainUrl:string = 'api.deskdyne.com';
export const environment = {
  production: false,
  withCredentials: false,
  webSocketUrl: 'wss://'+domainUrl,
  serverUrl : 'https://'+domainUrl,
  imageUrl : 'https://'+domainUrl + '/images/',
  googleAPIkey: 'AIzaSyCtIAU1RAa32Y9at1VnmL-fa79AP0NPreQ',
  envName: 'Devlopment'
};
