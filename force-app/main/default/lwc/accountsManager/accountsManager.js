import { LightningElement, wire } from 'lwc';
import getAccaunts from '@salesforce/apex/accountManager.getAccounts'
import getBudgetSum from '@salesforce/apex/accountManager.getBudgetSum'


export default class AccountsManager extends LightningElement {
    accounts;
    budgetSumQuery;
    budgetSumJs;
    error;
    value = ""

    @wire(getAccaunts, {actType:'$value'})
    wiredData({error, data}) {
        if(data) {
            this.accounts = data;
            this.budgetSumJs = data.reduce((acc, el)=>{
                return acc + el.Budget__c
            },0);
            this.error = undefined;
            window.console.log(data, this.budgetSumJs)
        } else if(error) {
            this.error = error;
            this.accounts = undefined;
            console.table(error)
        }
    }

    @wire(getBudgetSum, {actType:'$value'})
    wiredSum({error, data}) {
        if(data) {
            this.budgetSumQuery = data[0].expr0;
            this.error = undefined;
            window.console.log(data[0])
        } else if(error) {
            this.error = error;
            this.budgetSumQuery = undefined;
            console.table(error)
        }
    }
   

    get options() {
        return [
            { label: 'All Types', value: '' },
            { label: 'Prospect', value: 'prospect' },
            { label: 'Customer - Direct', value: 'direct' },
            { label: 'Customer - Channel', value: 'channel' },
            { label: 'Channel Partner / Reseller', value: 'reseller' },
            { label: 'Installation Partner', value: 'installation' },
            { label: 'Technology Partner', value: 'technology' }
        ];
    }

    onSetOption (event) {
        this.value = event.detail.value;
    }
}