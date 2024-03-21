// const domainUrl:string = 'mealaweLBprod-527069479.ap-southeast-1.elb.amazonaws.com:5000';
// const domainUrl:string = 'mealaweserverprod.el.r.appspot.com';
const domainUrl:string = 'localhost:7000';
export const environment = {
  production: true,
  withCredentials: false,
  webSocketUrl: 'wss://'+domainUrl,
  serverUrl : 'https://'+domainUrl,
  imageUrl : 'https://'+domainUrl + '/images/',
  googleAPIkey: 'AIzaSyCtIAU1RAa32Y9at1VnmL-fa79AP0NPreQ',
  envName: 'Production'
};
