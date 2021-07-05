import { LightningElement, api,wire } from 'lwc';
import { CurrentPageReference} from "lightning/navigation"
import { fireEvent } from 'c/pubsub';
export default class AccountCard extends LightningElement {

    @api myData = "Ok";

    @wire(CurrentPageReference) pageRef;

    publishData(event){
        fireEvent(this.pageRef,'datasend', this.myData)
    }

}