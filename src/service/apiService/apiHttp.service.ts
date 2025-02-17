import { LoaderstatusService } from './../../app/main-loader/loaderstatus.service';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RuntimeStorageService } from '../runtime-storage.service';
import { ToasterService } from 'src/app/toaster/toaster.service';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';

const SECRET_KEY = environment.api_secret_key;
const CryptoJS = require('crypto-js');

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {
  private withCredentials: boolean = environment.withCredentials ? environment.withCredentials : false;
  constructor(
    private httpClient: HttpClient,
    private loaderstatusService: LoaderstatusService,
    private toasterService: ToasterService,
    private localStorageService: LocalStorageService,
    private runtimeStorageService: RuntimeStorageService,
    public router: Router
  ) { }

  callFinalApi(requestObj: HttpRequest<any>,token:any,session_x:any,hideLoader?:any,): Promise<any> {
    const p = new Promise((resolve, reject) => {
      if(!hideLoader){
        this.loaderstatusService.show();
      }      
      this.httpClient
      .request(requestObj)
      .subscribe({next:this.successCallback(resolve,token,session_x),error:this.errorCallback(reject)});   
    });
    return p;
  }


  private successCallback = (resolve:any,token:any,session_x:any)=>{
    return (apiresponse: any) => {
      // console.log('successCallback ',response)      
      if (apiresponse && apiresponse.body) {         
        const encryptResponse:any = this.decryptData(apiresponse.body,token,session_x);
          this.loaderstatusService.hide();
          resolve(encryptResponse);          
      }
    }
  };

  private errorCallback = (reject:any)=>{
    return  (error:any) => {
      this.loaderstatusService.hide();
      if(error && error.status === 401){
        this.localStorageService.resetAllCacheData();
        this.runtimeStorageService.resetAllCacheData();       
        this.router.navigate(['/login']);
      }else if(error && error.error && error.error.msg){
        this.toasterService.error(error.error.msg);
        reject(error);
      }else{
        this.toasterService.error(300);
        reject(error);
      }        
    }
  }

  REQUEST(
    apiConfig: {method: string; url: string},
    data?: any,
    extraHeaderObj?: any,
    hideLoader?: boolean,
    useDdToken?:boolean
  ): Promise<any> {
    const session_x = this.makeid(64);
    const headerobj:any = {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      'session-token': this.makeid(64),
      'session_x': session_x
    };
    let responseType = 'json';
    let requestObj: HttpRequest<any>;
    let apiToken;
    if(useDdToken){      
      const token = this.localStorageService.getCacheData('DD_ADMIN_TOKEN');
      apiToken = token ? `Bearer ${token}` : token;
      if(token){
        headerobj['authorization'] = `Bearer ${token}`;
      }
    }else{
      const token = this.localStorageService.getCacheData('ADMIN_TOKEN');
      apiToken = token ? `Bearer ${token}` : token;
      if(token){
        headerobj['authorization'] = `Bearer ${token}`;
      }
    }
   
    if (extraHeaderObj) {
      if(extraHeaderObj['Accept']=== 'text/html'){
        responseType = 'text';
      }
      for (const prop in extraHeaderObj) {
        headerobj[prop] = extraHeaderObj[prop];
      }      
    }
    
    if(responseType === 'text'){
      requestObj = new HttpRequest(
        apiConfig.method,
        apiConfig.url,
        data ? this.encryptDate(data,apiToken,session_x)  : null,
        {
          headers: new HttpHeaders(headerobj),
          withCredentials: this.withCredentials,
          responseType: 'text'
        }
       );
    }else{
      requestObj = new HttpRequest(
        apiConfig.method,
        apiConfig.url,
        data ? this.encryptDate(data,apiToken,session_x)  : null,
        {
          headers: new HttpHeaders(headerobj),
          withCredentials: this.withCredentials,
          responseType: 'json'
        }
       );
    }    
    
    return this.callFinalApi(requestObj,apiToken,session_x,hideLoader);
  }

  encryptDate(data:any,token:any,session_x:any){
   if(data && data.constructor && data.constructor.name ==='FormData'){
      return data;
    }else{
      const key = token ? token+token : SECRET_KEY;
      const finalKey = session_x ? key+session_x : SECRET_KEY;
      const dataStrigyfy = JSON.stringify(data);
      return {data_key: CryptoJS.AES.encrypt(dataStrigyfy, finalKey).toString()};
    }    
  }

  decryptData(encryptedResponse:any,token:any,session_x:any){
    if(encryptedResponse && encryptedResponse.data_key){
      const key = token ? token+token : SECRET_KEY;
      const finalKey = session_x ? key+session_x : SECRET_KEY;
      let reponse = CryptoJS.AES.decrypt(encryptedResponse.data_key, finalKey).toString(CryptoJS.enc.Utf8);
      reponse = JSON.parse(reponse);
      return reponse;
    }else{       
        return encryptedResponse;
    }
  }

  makeid(length:number){
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

}
