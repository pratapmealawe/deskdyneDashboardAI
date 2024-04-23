import { Component, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiMainService } from 'src/service/apiService/apiMain.service';

@Component({
    selector: 'app-add-vendor',
    templateUrl: 'add-vendor.component.html',
    styleUrls: ['add-vendor.component.scss']
})
export class AddVendorCommponent {
    form: any;
    showError = false;
    showUpdate = false;
    orgList: any;
    orgName = "select organization";
    cafeteriaNameNCity: any;
    outletByCafeteriaList: any;
    showOutletList = false;
    selectedOutletsList: any = [];
    // selectedOutlet: any;
    showAddedOutlet: any;
    showAddbutton=false;
    vendorRole=['Owner', 'Manager', 'Cashier'];
    ; @ViewChild('outletModal') outlet: any
    constructor(private fb: FormBuilder, private apiMainService: ApiMainService, public modalService: NgbModal, private activeModal: NgbActiveModal, private router:Router) {
        this.getOrgList();

    }

    ngOnInit() {
        this.createForm()
    }
    async getOrgList() {
        try {
            this.orgList = await this.apiMainService.getOrgList()
            console.log(this.orgList)
        } catch (error) {
            console.log('getOrgList', error)
        }

    }

    createForm() {
        this.form = this.fb.group({
            vendorName: [''],
            vendorPhoneNo: [''],
            vendorEmail: [''],
            vendorRole: ['']

        })
    }
selectedCafeterria:any={};
selectedOrganization:any={};
    async submit(type?: any) {
        try {
            console.log('company details',this.selectedOutletsList);
            this.selectedOutletsList.forEach((elm:any)=>{
               this.selectedCafeterria.cafeteriaDetails=elm.cafeteriaDetails;
               console.log('cafeteria',this.selectedCafeterria);
               this.selectedOrganization.organizationDetails=elm.companyDetails;
               console.log('organization',this.selectedOrganization);
               
            })
            const finalObj = {...this.form.value,...this.selectedCafeterria,...this.selectedOrganization};
            console.log('final Obj',finalObj);
            const res = await this.apiMainService.saveVendor(finalObj);
            this.router.navigate(['/vendor/search-vendor']);
            console.log('response',res);
        } catch (error) {
            console.log('savevendor submit error',error)
        }
    }

    getOrgName(org: any) {
        console.log(org.target.value)
        if (org && org.target) {
            this.orgName = org.target.value;
        }
    }
    selectCafeteria(event: any) {
        console.log(event);
        console.log(event.target.value)
        let arr = event.target.value.split(',')
        let cafeteriaName = arr[0];
        let cafeteriaCity = arr[1]
        let organization = arr[2];
        this.getOutletByCafeteriaList(cafeteriaName, cafeteriaCity, organization)
        this.showOutletList = true




    }
    addOutlet() {
        this.modalService.open(this.outlet)
    }
    async getOutletByCafeteriaList(cafeteriaName: any, cafeteriaCity: any, organization: any) {
        try {
            console.log(cafeteriaName, cafeteriaCity, organization)
            this.outletByCafeteriaList = await this.apiMainService.getOutletByCafeteria(cafeteriaName, cafeteriaCity, organization)
            console.log(this.outletByCafeteriaList);
        } catch (error) {
            console.log('getOutletByCafeteriaList', error)
        }

    }
  //  outletExists:any;
    onCheckboxChange(event: any, selectedOutlet: any) {
        if (event.target.checked) {
            // this.outletExists.length=0;
            // console.log("the checkbox is checked")
            // if (this.selectedOutletsList.length != 0) {
            //     this.outletExists = this.selectedOutletsList.filter((elm: any) => {
            //         if (elm._id == selectedOutlet._id) {
            //             // this.selectedOutletsList.push(selectedOutlet)
            //             alert('the element already exist')
            //         }
            //     })
            //     if (!this.outletExists) {
            //         this.selectedOutletsList.push(selectedOutlet)
            //     }
            // }else{
            //     this.selectedOutletsList.push(selectedOutlet)
            // }
            this.selectedOutletsList.push(selectedOutlet);
            this.showAddbutton=true;

        } else {
            console.log('the checkbox is not checked')
            
            this.selectedOutletsList.forEach((elm: any, index: any) => {
                if (elm._id == selectedOutlet._id) {
                    console.log(elm._id)
                    this.selectedOutletsList.splice(index, 1)
                }
            })
        }
        
    }

    getSelectedOutlets(outlet: any) {
        this.outletByCafeteriaList.forEach((elm:any,index:any)=>{
            if(elm._id==outlet._id){
                console.log('elm id',elm._id);
                console.log('outletid',outlet._id);
                this.outletByCafeteriaList.splice(index,1)
            }
            console.log('elm id',elm._id);
            console.log('outletid',outlet._id);
        })
        this.showAddedOutlet = true;
        this.modalService.dismissAll();
        console.log('selected outlet list',this.selectedOutletsList);
    }
}