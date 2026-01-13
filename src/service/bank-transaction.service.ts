import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BankTransactionService {

    constructor() { }

    /**
     * Calculates the bank transfer mode and charges based on the amount.
     * Logic:
     * - Amount <= 1000: Charge = 2, Mode = 'IMPS'
     * - Amount <= 25000 (and > 1000): Charge = 3, Mode = 'IMPS'
     * - Amount > 25000: Charge = 5, Mode = 'NEFT'
     * 
     * Returns calculated values and the final transfer amount (original amount - charge).
     */
    calculateTransferModeAndCharges(amount: number) {
        let mode = '';
        let charge = 0;

        if (amount <= 1000) {
            mode = 'IMPS';
            charge = 2;
        } else if (amount <= 25000) {
            mode = 'IMPS';
            charge = 3;
        } else {
            mode = 'NEFT';
            charge = 5;
        }

        return {
            mode,
            charge,
            finalTransferAmount: amount - charge
        };
    }
}
