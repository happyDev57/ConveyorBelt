import {COMPONENT_A,COMPONENT_B, PRODUCT} from './constants.js'

class Worker {
    constructor() {
        this.assemblyTime = 4;
        this.maxNumberOfItems = 2;
    }
    
    items = [];
    assembling = false;
    timeLeftToAssemble = 0;

    canTakeItemFromSlot(slotItem) { 
        return !this.items.includes(slotItem) && slotItem !== PRODUCT && this.items.length !== this.maxNumberOfItems 
    }

    takeItem(slotItem) {
        if (this.canTakeItemFromSlot(slotItem)) {
            this.items.push(slotItem);
            if (this.canAssembleProduct(this.items)){ 
                this.assembling = true;
                this.timeLeftToAssemble = this.assemblyTime; 
            };
            return true;
        }
    }

    returnProduct() {
       return this.items.shift();
    }

    canAssembleProduct(items) {
        return [COMPONENT_A,COMPONENT_B].every( (component) => items.includes(component))
    }

    step() {
        if (this.timeLeftToAssemble > 1){   
            return this.timeLeftToAssemble -= 1;
        }
        if (this.canAssembleProduct(this.items)) { 
            this.assembling = false;          
            this.items = [PRODUCT];
        }
    }
}

export default Worker;