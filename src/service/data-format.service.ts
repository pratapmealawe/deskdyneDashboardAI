import { Injectable } from "@angular/core";
import { ApiMainService } from "./apiService/apiMain.service";

@Injectable({
    providedIn: 'root'
  })
export class DataFormatService{
    constructor(){}

     getformattedOrgList(orglist:any){
        const foramttedList:any = [];
        orglist.forEach((org:any) => {
            org.cafeteriaList.forEach((cafeteria:any) => {
                foramttedList.push({
                    key: org.organization_name+' '+cafeteria.cafeteria_city+' '+cafeteria.cafeteria_name,
                    cafeteriaDetails: {
                        cafeteria_name: cafeteria.cafeteria_name,
                        cafeteria_city: cafeteria.cafeteria_city,
                        cafeteria_location: cafeteria.cafeteria_location,
                        address1: cafeteria.address1,
                        address2: cafeteria.address2,
                        landmark: cafeteria.landmark,
                        location: cafeteria.location
                    },
                    organizationDetails: {
                        organization_name:org.organization_name,
                        organizationId: org._id,
                        city: org.city,
                        location: org.location,
                    }
                });
            });
        });
        return foramttedList;
    }
}