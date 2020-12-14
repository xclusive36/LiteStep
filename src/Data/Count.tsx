import { hapticsImpactLight, hapticsNotification } from "../capacitor/haptics";
import { categorySnapshot, packagesSnapshot, updatePackages } from "./DataServiceComponent";
import { ItemInterface } from "../Interfaces/Interfaces";
import { objectPosition } from "../Functions/ObjectPosition";

export const updateCount = (item: ItemInterface, event: any) => {
    let array = [...packagesSnapshot()];
    let obj = {...categorySnapshot()};
    let itemObj = {...item};
    if(parseInt(event.detail.value) > 0) {
        itemObj.count = parseInt(event.detail.value);
    } else {
        itemObj.count = 0;
    }
    const catIndex= objectPosition(array, obj.id);
    const itemIndex= objectPosition(obj.items, item.id);
    obj.items[itemIndex] = itemObj;
    array[catIndex] = obj;
    updatePackages(array);
    hapticsImpactLight();
}

export  const countDown = (item: ItemInterface) => {
    hapticsImpactLight();
    let array = [...packagesSnapshot()];
    let obj = {...categorySnapshot()};
    let itemObj = {...item};
    if(itemObj.count > 0) {
        itemObj.count = item.count - 1;
    }
    
    const catIndex= objectPosition(array, obj.id);
    const itemIndex= objectPosition(obj.items, item.id);
    obj.items[itemIndex] = itemObj;
    array[catIndex] = obj;
    updatePackages(array);
}

export const countUp = (item: ItemInterface) => {
    hapticsImpactLight();
    let array = [...packagesSnapshot()];
    let obj = {...categorySnapshot()};
    let itemObj = {...item};
    itemObj.count = item.count + 1;
    
    const catIndex= objectPosition(array, obj.id);
    const itemIndex= objectPosition(obj.items, item.id);
    obj.items[itemIndex] = itemObj;
    array[catIndex] = obj;
    updatePackages(array);
}

export const countClear = (item: ItemInterface, vibrate: boolean = true) => {
    let array = [...packagesSnapshot()];
    let obj = {...categorySnapshot()};
    item.count = 0;
    
    const catIndex= objectPosition(array, obj.id);
    const itemIndex= objectPosition(obj.items, item.id);
    obj.items[itemIndex] = item;
    array[catIndex] = obj;
    updatePackages(array);
    if(vibrate) hapticsNotification('SUCCESS');
}

export const resetCount = () => {
    let categories = packagesSnapshot();
    categories.forEach((array) => array.items.forEach((item) => countClear(item, false)));
    hapticsNotification('SUCCESS');
}