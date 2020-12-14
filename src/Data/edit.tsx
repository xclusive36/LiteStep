import { objectPosition } from "../Functions/ObjectPosition";
import { categorySnapshot, itemSnapshot, packagesSnapshot, updateCategory, updatePackages } from "./DataServiceComponent";

export const categoryNameSubmit = (headerNameBackup: any[]) => {
    if(!headerNameBackup[headerNameBackup.length - 1]) {
        restoreCategoryName(headerNameBackup);
    }
}

const restoreCategoryName = (headerNameBackup: any[]) => {
    setCategoryName(headerNameBackup[0]);
}

export const setCategoryName = (newName: string) => {
    // update category name // HeaderInput.tsx // Page.tsx
    console.log(newName)
    let obj = {...categorySnapshot()};
    obj.name = newName;
    updateCategory(obj);
  
    let array = [...packagesSnapshot()];
    array[obj.order] = obj;
    updatePackages(array);
}

export const updateItemName = (event: any) => {
    let array = [...packagesSnapshot()];
    let obj = {...categorySnapshot()};
    let item = itemSnapshot();
    if(event.detail.value) {
        item.name = event.detail.value;
        const catIndex= objectPosition(array, obj.id);
        const itemIndex= objectPosition(obj.items, item.id);
        obj.items[itemIndex] = item;
        array[catIndex] = obj;
        updatePackages(array);
    }
}