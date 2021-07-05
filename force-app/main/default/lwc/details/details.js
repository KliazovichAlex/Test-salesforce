import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin} from "lightning/navigation"
import { registerListener,unregisterAllListeners, fireEvent } from 'c/pubsub';

export default class Details extends NavigationMixin(LightningElement) {
    @track accData;
    @wire(CurrentPageReference) pageRef;

    navigateToDetails(event){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId:this.accData.Id,
                objectApiName:'Account',
                actionName:'view'
            }
        })
    }

    connectedCallback() {
        registerListener('datasend', this.handlemessagesend, this);
    }

    handlemessagesend(publisherMessage){
        this.accData = publisherMessage;
    }

    disconnectedCallback(){
        unregisterAllListeners(this)
    }

    
}