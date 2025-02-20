import { Injectable } from '@angular/core';
import { MakePDFService } from './make-pdf.service';
import { DatePipe } from '@angular/common';
import { b2b_orders_mapper } from 'src/config/b2b_orders.mapping.config'
import { HttpClient } from '@angular/common/http';
const converter = require('number-to-words');

@Injectable({
    providedIn: 'root'
})
export class B2bInvoiceService {
    orderType: any = '';
    hsn: Number = 996331;
    invoiceDate: any;
    dueDate: any;
    itemBody: any = [];
    cgst = 2.5;
    sgst = 2.5;
    subTotal: any = 0;
    totalDue: any = 0;
    totalCgst: any = 0;
    totalSgst: any = 0;
    b2bOrdersMapper: any;
    org_address:any;
    totalInWords:any;
    gstin:any;
    logo: any;
    seal: any;
    sign: any;

    constructor(private makePDFService: MakePDFService, private http: HttpClient) {
        this.b2bOrdersMapper = b2b_orders_mapper;
        this.getBase64('/assets/images/logo_new.png', 'logo');
        this.getBase64('/assets/images/seal.jpg', 'seal');
        this.getBase64('/assets/images/digital_sign.png', 'sign');
    }

    getBase64(img: any, type: any) {
        this.http.get(img, { responseType: 'blob' })
            .subscribe(res => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    var base64data = reader.result;
                    type === 'logo' ? this.logo = base64data : type === 'seal' ? this.seal = base64data : this.sign = base64data;
                }
                reader.readAsDataURL(res);
            });
    }

    getVariables(order: any) {
        console.log(order)
        var datePipe = new DatePipe("en-US");
        const currDate = new Date();
        const lastDate = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0);
        this.orderType = this.b2bOrdersMapper[order.orderType];
        this.invoiceDate = datePipe.transform(new Date(), 'dd/MM/yyyy');
        this.dueDate = datePipe.transform(lastDate, 'dd/MM/yyyy');
        this.org_address = order.org_address;
        this.gstin = order.gstin;
        this.setItems(order);
        this.totalInWords = converter.toWords(this.totalDue)
    }

    setItems(order: any) {
        let itemBody = [[{ text: '#', border: [1, 0, 1, 0] }, { text: 'Item and Desc', border: [1, 0, 1, 0] }, { text: 'HSN/SAC', border: [1, 0, 1, 0] }, { text: 'Qty', border: [1, 0, 1, 0] }, { text: 'Rate', border: [0, 0, 0, 0] }, { text: 'CGST', colSpan: 2, border: [1, 0, 1, 0] }, 'Data', { text: 'SGST', colSpan: 2, border: [0, 0, 1, 1] }, { text: 'CGST', border: [1, 0, 0, 0] }, { text: 'Amount', border: [1, 0, 1, 0] }],
        [{ text: '', border: [1, 0, 1, 1] }, { text: '', border: [0, 0, 1, 1] }, { text: '', border: [0, 0, 1, 1] }, { text: '', border: [0, 0, 1, 1] }, { text: '', border: [0, 0, 1, 1] }, '%', 'Amt', '%', { text: 'Amt', border: [0, 0, 1, 1] }, { text: '', border: [0, 0, 1, 1] }]];
        order.itemList.forEach((item: any, index: any) => {
            let cgstVal = (item.itemPrice * item.count) * (this.cgst / 100);
            this.totalCgst = this.totalCgst + cgstVal;
            let sgstVal = (item.itemPrice * item.count) * (this.sgst / 100);
            this.totalSgst = this.totalSgst + sgstVal;
            let finalAmt = (item.itemPrice * item.count);
            this.subTotal = this.subTotal + finalAmt;
            this.totalDue = this.subTotal + this.totalCgst + this.totalSgst;
            itemBody.push([{ text: index + 1, border: [1, 0, 1, 1] }, { text: `${this.orderType}`, border: [0, 0, 1, 1] }, { text: `${this.hsn}`, border: [0, 0, 1, 1] }, { text: `${item.count}`, border: [0, 0, 1, 1] }, `${item.itemPrice}`, `${this.cgst}`, `${cgstVal}`, `${this.sgst}`, { text: `${sgstVal}`, border: [0, 0, 0, 1] }, { text: `${finalAmt}`, border: [1, 0, 1, 1] }]);
        })
        this.itemBody = itemBody
    }

    createDocumentDefinition() {
        let dd = {};
        return dd = {
            content: [
                {
                    table: {
                        widths: ['30%', '50%', '20%'],
                        body: [
                            [{ image: this.logo, width: 145, height: 40 }, 'Climbing Seeds Pvt Ltd\nOffice no. 203, Altus Commercial, Laxman Nagar, Baner\nPune, Maharastra, 411045, India\nGSTIN 27AAJCC8595N1ZO', { text: 'TAX INVOICE', fontSize: 15 }]
                        ],
                        height: 100 // Set the height of the table to 100
                    }
                },
                {
                    table: {
                        widths: ['20%', '30%', '25%', '25%'],
                        heights: [10],
                        body: [

                            [
                                { text: '#', border: [1, 0, 0, 0] },
                                { text: ': INV-24130', bold: true, border: [0, 0, 1, 0] },
                                { text: 'Place of Supply', border: [0, 0, 0, 0] },
                                { text: ': Maharastra', bold: true, border: [0, 0, 1, 0] }
                            ],
                            [
                                { text: 'Invoice Date', border: [1, 0, 0, 0] },
                                { text: `: ${this.invoiceDate}`, bold: true, border: [0, 0, 1, 0] },
                                { text: '', border: [0, 0, 0, 0] },
                                { text: '', bold: true, border: [0, 0, 1, 0] }
                            ],
                            [
                                { text: 'Terms', border: [1, 0, 0, 0] },
                                { text: ': Due end of the month', bold: true, border: [0, 0, 1, 0] },
                                { text: '', border: [0, 0, 0, 0] },
                                { text: '', bold: true, border: [0, 0, 1, 0] }
                            ],
                            [
                                { text: 'Due Date', border: [1, 0, 0, 0] },
                                { text: `: ${this.dueDate}`, bold: true, border: [0, 0, 1, 0] },
                                { text: '', border: [0, 0, 0, 0] },
                                { text: '', bold: true, border: [0, 0, 1, 0] }
                            ],
                            [
                                { text: 'P.O.#', border: [1, 0, 0, 1] },
                                { text: ': 4300197028', bold: true, border: [0, 0, 1, 1] },
                                { text: '', border: [0, 0, 0, 1] },
                                { text: '', bold: true, border: [0, 0, 1, 1] }
                            ],
                        ]
                    }
                },
                {
                    table: {
                        widths: ['50%', '50%'],
                        heights: [10, 100],
                        body: [
                            [{ text: 'Bill To', border: [1, 0, 0, 1] }, { text: 'Ship To', border: [1, 0, 1, 1] }],
                            [
                                { text: 'Climbing Seeds Pvt Ltd\n Office no. 203, Altus Commercial, Laxman Nagar, Baner \n Pune, Maharastra, 411045, India\n GSTIN 27AAJCC8595N1ZO', lineHeight: 1.1, color: 'black', border: [1, 1, 0, 1] }, // Updated text properties
                                { text: `${this.org_address.addressLine1}\n ${this.org_address.addressLine2} \n ${this.org_address.addressLine3}\n GSTIN ${this.gstin}`, lineHeight: 1.1, color: 'black', border: [1, 0, 1, 1] } // Updated text properties
                            ]
                        ]
                    }
                },
                {
                    table: {
                        widths: ['50%', '50%', '0%', '0%'],
                        heights: [10],
                        body: [
                            [
                                { text: 'Subject', border: [1, 0, 0, 0] },
                                { text: '', bold: true, border: [0, 0, 0, 0] },
                                { text: '', border: [0, 0, 0, 0] },
                                { text: '', bold: true, border: [0, 0, 1, 0] }
                            ],
                            [
                                { text: 'Work Order Number : 4300197028', border: [1, 0, 0, 1] },
                                { text: '', bold: true, border: [0, 0, 0, 1] },
                                { text: '', border: [0, 0, 0, 1] },
                                { text: '', bold: true, border: [0, 0, 1, 1] }
                            ],
                        ]
                    }
                },
                {
                    table: {
                        widths: ['5%', '15%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%'],
                        body:
                            this.itemBody

                    }
                },
                {
                    table: {
                        widths: ['50%', '50%'],
                        heights: [100],
                        body: [
                            [{ text: `Total in words\n\nIndian Rupee ${this.totalInWords} Only\n\nThanks for your business.\n\nAccount Name - Climbing Seeds Private Ltd\nAccount Type - Current\nBank - DBS Bank\nIFSC Code - DBSS0IN0830\nAccount Number - 8830210000000718`, border: [1, 0, 0, 0] }, { text: `\nSub Total - ${this.subTotal}\nCGST2.5(2.5%) - ${this.totalCgst}\nSGST2.5(2.5%) - ${this.totalSgst}\nTotal - ${this.totalDue}\nBalance Due - ${this.totalDue}`, alignment: 'right', border: [1, 0, 1, 1] }],
                            [
                                { text: '', lineHeight: 1.1, color: 'black', border: [1, 0, 0, 1] }, // Updated text properties
                                { image: this.sign, alignment: "center", width: 145, height: 40, border: [1, 0, 1, 1] } // Updated text properties
                            ]
                        ]
                    }
                },
                {
                    table: {
                        widths: ['50%', '50%'],
                        heights: [70],
                        body: [
                            [{ text: '', border: [0, 0, 0, 0] }, { image: this.seal, alignment: "center", width: 100, height: 100, border: [0, 0, 0, 0] }],
                            [
                                { text: '', border: [0, 0, 0, 0] }, // Updated text properties
                                { text: '', border: [0, 0, 0, 0] } // Updated text properties
                            ]
                        ]
                    }
                }
            ]
        };
    }

    download(order: any) {
        this.getVariables(order);
        this.makePDFService.makePDF(this.createDocumentDefinition(), order);
    }

    view(order: any) {
        this.getVariables(order)
        this.makePDFService.viewPDF(this.createDocumentDefinition());
    }

}
