import { Injectable } from '@angular/core';
// import SecureStorage from 'secure-web-storage';
// import CryptoJS as * from 'crypto-js';
const SecureStorage = require('secure-web-storage');
const CryptoJS = require('crypto-js');
const SECRET_KEY = 'ka1PqUQzEcvqWNamalHDHQ==';



@Injectable({
    providedIn: 'root'
  })
  export class LocalStorageService {

    // private cacheObj = localStorage;

    public secureStorage = new SecureStorage(localStorage, {
        hash: function hash(key:any): any {
            key = CryptoJS.SHA256(key, SECRET_KEY);
            return key.toString();
        },
        // Encrypt the localstorage data
        encrypt: function encrypt(data:any) {
            data = CryptoJS.AES.encrypt(data, SECRET_KEY);
            data = data.toString();
            return data;
        },
        // Decrypt the encrypted data
        decrypt: function decrypt(data:any) {
            data = CryptoJS.AES.decrypt(data, SECRET_KEY);
            data = data.toString(CryptoJS.enc.Utf8);
            return data;
        }
        });

    checkItTimeIsValid(dataSetTime: number){
        const timeDiff = dataSetTime - (new Date()).getTime();
        if(timeDiff > 0){
            return true;
        }else{
            return false;
        }
    }

    getCacheData(key: string): any{
        const data:any = this.secureStorage.getItem(key);
        if(data){
            const localdata = JSON.parse(data)
            if ('data' in localdata){
                const cacheStorageModel:CacheStorageModel = JSON.parse(data);
                if(!cacheStorageModel.dataSetTime || this.checkItTimeIsValid(cacheStorageModel.dataSetTime)){
                    return cacheStorageModel.data;
                } else {
                    return null;
                }
            }else{
                return localdata; 
            }
        }else{
            return null;
        }
    }

    setCacheData(key: string, data: any, time?: number): void{
        const cacheStorageModel = new CacheStorageModel();
        const currentTime:number = (new Date()).getTime();
        cacheStorageModel.data = data;
        cacheStorageModel.dataSetTime = time ? currentTime + time : null;
        this.secureStorage.setItem(key, JSON.stringify(cacheStorageModel));
    }

    resetCacheData(key: string): void{
        this.secureStorage.removeItem(key);
    }
    resetAllCacheData(): void{
        this.secureStorage.clear();
    }
    insertNewDataInArray(key: string, data: any, limit?: number){
        const existing = this.getCacheData(key);
        if (existing){
            if (existing.indexOf(data) < 0){
                if (limit){
                    if (existing.length === limit){
                        existing.pop();
                    }
                    existing.unshift(data);
                    this.setCacheData(key, existing);
                }else{
                    existing.push(data);
                    this.setCacheData(key, existing);
                }
            }
        }else{
            this.setCacheData(key, [data]);
        }
    }
    removeDataFromArray(key: string, data: any){
        const existing = this.getCacheData(key);
        if (existing){
            const index = existing.indexOf(data);
            if (index >= 0){
                existing.splice(index, 1);
                this.setCacheData(key, existing);
            }
        }
    }
  }

  class CacheStorageModel{
    data:any;
    dataSetTime!: number | null;
  }
